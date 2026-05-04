// scrape-images.mjs
// Baixa imagens reais dos produtos da loja dpolice.com.br via Playwright headless.
// - Lê catalog.json
// - Deduplicates produtos por slug
// - Visita a URL de cada produto, espera lazy-load da imagem real
// - Baixa a imagem cover (e até 3 imagens adicionais de galeria)
// - Salva em web/public/products/{slug}.jpg
// - Gera catalog-with-images.json e scrape-images-report.json

// Import via path absoluto pro node_modules de web/, já que este script vive em research/
// e o ESM não usa NODE_PATH/cwd para resolver pacotes.
const { chromium } = await import(
  "/Users/gabrielgomide/Documents/D police/web/node_modules/playwright/index.mjs"
);
import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CATALOG_PATH = join(__dirname, "catalog.json");
const CATALOG_OUT_PATH = join(__dirname, "catalog-with-images.json");
const REPORT_PATH = join(__dirname, "scrape-images-report.json");
const IMAGES_DIR = "/Users/gabrielgomide/Documents/D police/web/public/products";

const CONCURRENCY = 4;
const PAGE_TIMEOUT_MS = 15_000;
const DOWNLOAD_TIMEOUT_MS = 10_000;
const BATCH_JITTER_MS = 300;
const MAX_GALLERY = 3; // até 3 adicionais (além da cover)

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36";

const CDN_MARKER = "galaxcommerce.com.br/sistema/upload";
// Filtro estrito: só imagens que estão sob /produtos/ (não logos, não layout)
const PRODUCT_PATH_MARKER = "/sistema/upload/523/produtos/";

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

function isRealImageUrl(url) {
  if (!url) return false;
  if (url.includes("loading.gif")) return false;
  if (url.includes("ajax-loader")) return false;
  // Só queremos imagens de produto, não logos/layout/banners
  if (!url.includes(PRODUCT_PATH_MARKER)) return false;
  return true;
}

function pickExtensionFromUrl(url) {
  try {
    const u = new URL(url);
    const path = u.pathname.toLowerCase();
    if (path.endsWith(".png")) return ".png";
    if (path.endsWith(".webp")) return ".webp";
    if (path.endsWith(".gif")) return ".gif";
    if (path.endsWith(".jpeg")) return ".jpeg";
  } catch {
    // ignore
  }
  return ".jpg";
}

// Extrai todas as URLs de imagem do produto que apontam pro CDN.
// Tenta priorizar versões grandes (não-thumb).
async function extractImageUrls(page) {
  // O lazy loader pode trocar o src. Esperamos a imagem real do produto carregar.
  try {
    await page.waitForSelector(`img[src*="${PRODUCT_PATH_MARKER}"]`, {
      timeout: PAGE_TIMEOUT_MS,
    });
  } catch {
    // segue mesmo se não achou — vamos tentar coletar do que tiver (data-src etc.)
  }

  // dá um respiro pro JS popular galeria
  await page.waitForTimeout(500);

  const urls = await page.evaluate((marker) => {
    const set = new Set();

    function add(raw) {
      if (!raw) return;
      try {
        const abs = new URL(raw, location.href).href;
        if (abs.includes(marker) && !abs.includes("loading.gif")) {
          set.add(abs);
        }
      } catch {
        /* ignore */
      }
    }

    document.querySelectorAll("img").forEach((img) => {
      add(img.getAttribute("src"));
      add(img.getAttribute("data-src"));
      add(img.getAttribute("data-original"));
      add(img.getAttribute("data-lazy"));
      add(img.getAttribute("data-zoom-image"));
      add(img.getAttribute("data-large"));
      const srcset = img.getAttribute("srcset");
      if (srcset) {
        srcset.split(",").forEach((part) => add(part.trim().split(/\s+/)[0]));
      }
    });

    // Galaxcommerce frequentemente usa <a data-zoom-image> em wrappers
    document
      .querySelectorAll("a[data-zoom-image], a[data-image], a[href*='produtos']")
      .forEach((a) => {
        add(a.getAttribute("data-zoom-image"));
        add(a.getAttribute("data-image"));
        const href = a.getAttribute("href");
        if (href && href.includes("/sistema/upload/")) add(href);
      });

    return [...set];
  }, CDN_MARKER);

  return urls;
}

// Heurística para "preferir" a versão grande:
// - URLs com /produtos/{id}/ costumam ter variantes em pastas com sufixo (/g/, /p/, /m/)
// - dropamos miniaturas conhecidas ("/p/" pequena) preferindo "/g/" se houver par
function rankImages(urls) {
  // Score: maior = melhor (versão grande).
  function score(u) {
    let s = 0;
    if (/\/g\//.test(u)) s += 5;
    if (/\/m\//.test(u)) s += 2;
    if (/\/p\//.test(u)) s -= 3;
    if (/thumb/i.test(u)) s -= 5;
    if (/large|big|original|zoom/i.test(u)) s += 4;
    // Quanto mais profundo o path, menos provável que seja ícone/logo
    s += Math.min(u.split("/").length, 12) * 0.1;
    return s;
  }

  // Dedup por nome de arquivo base (alguns sites repetem com query strings)
  const byKey = new Map();
  for (const u of urls) {
    let key = u;
    try {
      const url = new URL(u);
      key = url.pathname; // ignora query
    } catch {
      // ignore
    }
    const prev = byKey.get(key);
    if (!prev || score(u) > score(prev)) byKey.set(key, u);
  }
  const unique = [...byKey.values()];
  unique.sort((a, b) => score(b) - score(a));
  return unique;
}

async function downloadImage(url, dest, signalTimeoutMs = DOWNLOAD_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), signalTimeoutMs);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Referer: "https://www.dpolice.com.br/",
        Accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
      signal: ctrl.signal,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 200) {
      throw new Error(`Image too small (${buf.length} bytes)`);
    }
    await writeFile(dest, buf);
    return buf.length;
  } finally {
    clearTimeout(t);
  }
}

async function processProduct(browser, item, idx, total) {
  const { slug, url } = item;
  const tag = `[${String(idx + 1).padStart(3, " ")}/${total}] ${slug}`;
  let context;
  try {
    context = await browser.newContext({
      userAgent: USER_AGENT,
      viewport: { width: 1280, height: 900 },
      locale: "pt-BR",
    });
    const page = await context.newPage();
    // bloqueia recursos pesados (fontes, vídeo) pra acelerar
    await page.route("**/*", (route) => {
      const type = route.request().resourceType();
      if (type === "media" || type === "font") return route.abort();
      return route.continue();
    });

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_TIMEOUT_MS,
    });

    const rawUrls = await extractImageUrls(page);
    const filtered = rawUrls.filter(isRealImageUrl);
    if (filtered.length === 0) {
      throw new Error("nenhuma imagem do CDN encontrada");
    }
    const ranked = rankImages(filtered);

    const cover = ranked[0];
    const gallery = ranked.slice(1, 1 + MAX_GALLERY);

    const coverExt = pickExtensionFromUrl(cover);
    const coverPath = join(IMAGES_DIR, `${slug}${coverExt === ".jpg" ? ".jpg" : coverExt}`);
    await downloadImage(cover, coverPath);

    const savedGallery = [];
    for (let i = 0; i < gallery.length; i++) {
      const g = gallery[i];
      const ext = pickExtensionFromUrl(g);
      const dest = join(IMAGES_DIR, `${slug}-${i + 2}${ext === ".jpg" ? ".jpg" : ext}`);
      try {
        await downloadImage(g, dest);
        savedGallery.push({
          remote: g,
          local: `/products/${slug}-${i + 2}${ext === ".jpg" ? ".jpg" : ext}`,
        });
      } catch (e) {
        // galeria é best-effort
        // eslint-disable-next-line no-console
        console.log(`${tag}   gallery[${i + 2}] falhou: ${e.message}`);
      }
    }

    console.log(`${tag} OK (cover + ${savedGallery.length} galeria)`);
    return {
      slug,
      ok: true,
      cover_remote: cover,
      cover_local: `/products/${slug}${coverExt === ".jpg" ? ".jpg" : coverExt}`,
      gallery: savedGallery,
    };
  } catch (err) {
    console.log(`${tag} FAIL ${err.message}`);
    return { slug, ok: false, error: err.message, url };
  } finally {
    if (context) await context.close().catch(() => {});
  }
}

async function runBatched(items, browser) {
  const results = new Map();
  let cursor = 0;
  const total = items.length;

  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      const item = items[i];
      const res = await processProduct(browser, item, i, total);
      results.set(item.slug, res);
      // jitter entre items (não bloqueia outros workers)
      await sleep(BATCH_JITTER_MS + Math.floor(Math.random() * 200));
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);
  return results;
}

async function dirSizeBytes(dir) {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(dir, { withFileTypes: true });
  let total = 0;
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) total += await dirSizeBytes(p);
    else {
      const s = await stat(p);
      total += s.size;
    }
  }
  return total;
}

async function main() {
  const startedAt = Date.now();
  console.log(`Lendo catalog: ${CATALOG_PATH}`);
  const catalogRaw = await readFile(CATALOG_PATH, "utf8");
  const catalog = JSON.parse(catalogRaw);

  // Coleta única por slug, preferindo a primeira ocorrência (geralmente da categoria mais "específica")
  const uniqueBySlug = new Map();
  for (const cat of catalog.categories || []) {
    for (const p of cat.products || []) {
      if (!p.slug || !p.url) continue;
      if (!uniqueBySlug.has(p.slug)) {
        uniqueBySlug.set(p.slug, { slug: p.slug, url: p.url, name: p.name });
      }
    }
  }
  const uniqueProducts = [...uniqueBySlug.values()];
  console.log(
    `Total slugs únicos: ${uniqueProducts.length} (de ${catalog.categories.reduce((a, c) => a + c.products.length, 0)} entradas no catalog)`,
  );

  await ensureDir(IMAGES_DIR);

  const browser = await chromium.launch({ headless: true });
  let resultsBySlug;
  try {
    resultsBySlug = await runBatched(uniqueProducts, browser);
  } finally {
    await browser.close().catch(() => {});
  }

  const ok = [];
  const failed = [];
  for (const r of resultsBySlug.values()) {
    if (r.ok) ok.push(r);
    else failed.push(r);
  }

  // Atualiza catalog com paths locais
  const newCatalog = JSON.parse(catalogRaw);
  for (const cat of newCatalog.categories || []) {
    for (const p of cat.products || []) {
      const r = resultsBySlug.get(p.slug);
      if (r && r.ok) {
        p.image_url = r.cover_local;
        if (r.gallery && r.gallery.length > 0) {
          p.gallery_urls = r.gallery.map((g) => g.local);
        }
      } else {
        p.image_url = "indisponível";
      }
    }
  }
  newCatalog.images_scraped_at = new Date().toISOString();
  newCatalog.images_summary = {
    unique_slugs: uniqueProducts.length,
    ok: ok.length,
    failed: failed.length,
  };

  await writeFile(CATALOG_OUT_PATH, JSON.stringify(newCatalog, null, 2), "utf8");
  await writeFile(
    REPORT_PATH,
    JSON.stringify(
      {
        started_at: new Date(startedAt).toISOString(),
        finished_at: new Date().toISOString(),
        unique_slugs: uniqueProducts.length,
        ok: ok.map((r) => ({
          slug: r.slug,
          cover_local: r.cover_local,
          cover_remote: r.cover_remote,
          gallery: r.gallery,
        })),
        failed: failed.map((r) => ({ slug: r.slug, url: r.url, error: r.error })),
      },
      null,
      2,
    ),
    "utf8",
  );

  let sizeMb = 0;
  try {
    sizeMb = (await dirSizeBytes(IMAGES_DIR)) / (1024 * 1024);
  } catch {
    sizeMb = 0;
  }

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log("\n=== RESUMO ===");
  console.log(`OK:     ${ok.length}`);
  console.log(`FAIL:   ${failed.length}`);
  console.log(`Pasta:  ${IMAGES_DIR}  (${sizeMb.toFixed(2)} MB)`);
  console.log(`Catalog: ${CATALOG_OUT_PATH}`);
  console.log(`Report:  ${REPORT_PATH}`);
  console.log(`Tempo:   ${elapsed}s`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
