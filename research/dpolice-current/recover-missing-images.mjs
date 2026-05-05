// Recupera imagens dos 5 produtos que falharam no scrape original.
// Estratégia principal: navega na PLP e CAPTURA o buffer da resposta da imagem
// no próprio Playwright (page.on('response')) — isso evita os 403 do CDN
// quando se tenta baixar fora do contexto do browser.
//
// Saída:
//   - Imagens em /Users/gabrielgomide/Documents/D police/web/public/products/{slug}.{ext}
//   - JSON em /Users/gabrielgomide/Documents/D police/research/dpolice-current/recovered-images.json

const { chromium } = await import(
  '/Users/gabrielgomide/Documents/D police/web/node_modules/playwright/index.mjs'
)
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = '/Users/gabrielgomide/Documents/D police/web/public/products'
const OUT_JSON = join(__dirname, 'recovered-images.json')

const PRODUCT_PATH_MARKER = '/sistema/upload/523/produtos/'
const PAGE_TIMEOUT_MS = 60_000

const TARGETS = [
  {
    slug: 'camisa-c1-pmmg',
    pdp: 'https://www.dpolice.com.br/comprar/camisa-c1-pmmg/bege-2/1673',
    categories: [
      'https://www.dpolice.com.br/uniformes/policia-militar',
      'https://www.dpolice.com.br/uniformes',
    ],
  },
  {
    slug: 'conjunto-b1-pmmg',
    pdp: 'https://www.dpolice.com.br/comprar/conjunto-b1-pmmg/voce-esta-comprando-um-produto-de-uso-exclusivo-de-uma-corporacao-1-40/2012',
    categories: [
      'https://www.dpolice.com.br/uniformes/policia-militar',
      'https://www.dpolice.com.br/uniformes',
    ],
  },
  {
    slug: 'calca-camuflada-masculina',
    pdp: 'https://www.dpolice.com.br/comprar/calca-camuflada-masculina/digitalizada-46/1785',
    categories: [
      'https://www.dpolice.com.br/artigos-militares/roupas',
      'https://www.dpolice.com.br/artigos-militares',
    ],
  },
  {
    slug: 'conjunto-camuflado-masculino',
    pdp: 'https://www.dpolice.com.br/comprar/conjunto-camuflado-masculino/38-50/1737',
    categories: [
      'https://www.dpolice.com.br/artigos-militares/roupas',
      'https://www.dpolice.com.br/artigos-militares',
    ],
  },
  {
    slug: 'gandola-camuflada',
    pdp: 'https://www.dpolice.com.br/comprar/gandola-camuflada/digitalizada-54/1791',
    categories: [
      'https://www.dpolice.com.br/artigos-militares/roupas',
      'https://www.dpolice.com.br/artigos-militares',
    ],
  },
]

const UAS = {
  desktop:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  iosSafari:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function extOf(url) {
  const m = url.split('?')[0].match(/\.([a-zA-Z0-9]{2,5})$/)
  if (!m) return 'jpg'
  const e = m[1].toLowerCase()
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(e) ? e : 'jpg'
}

// Coleta imagens de cards numa PLP cujos hrefs batam com os slugs-alvo,
// SALVANDO o buffer das respostas de imagem em tempo real.
async function harvestFromCategory(context, categoryUrl, slugSet, foundCdnBySlug, savedBuffers) {
  const out = new Map() // slug -> { src, sourceCategoryUrl }
  const page = await context.newPage()

  // listener: salva qualquer resposta do CDN de produtos
  page.on('response', async (resp) => {
    const url = resp.url()
    if (!url.includes(PRODUCT_PATH_MARKER)) return
    if (!resp.ok()) return
    if (savedBuffers.has(url)) return
    try {
      const buf = await resp.body()
      if (buf && buf.length > 500) {
        savedBuffers.set(url, buf)
      }
    } catch {}
  })

  try {
    // navega na home antes pra acumular cookies / passar JS challenge
    try {
      await page.goto('https://www.dpolice.com.br/', {
        waitUntil: 'domcontentloaded',
        timeout: PAGE_TIMEOUT_MS,
      })
      await sleep(1500)
    } catch {}

    for (let pageNum = 1; pageNum <= 6 && out.size < slugSet.size; pageNum++) {
      const url =
        pageNum === 1 ? categoryUrl : `${categoryUrl.replace(/\/$/, '')}/por-nome/${pageNum}/`
      try {
        const resp = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: PAGE_TIMEOUT_MS,
        })
        if (!resp || !resp.ok()) {
          console.log(`  PLP page ${pageNum} -> HTTP ${resp ? resp.status() : '?'}`)
          continue
        }
        try {
          await page.waitForSelector(`img[src*="${PRODUCT_PATH_MARKER}"]`, {
            timeout: 15_000,
          })
        } catch {}
        // scroll pra disparar lazy load de todos os cards
        await page.evaluate(async () => {
          const distance = 600
          const delay = 200
          let total = 0
          const max = document.body.scrollHeight
          while (total < max) {
            window.scrollBy(0, distance)
            total += distance
            await new Promise((r) => setTimeout(r, delay))
          }
        })
        await sleep(1500)

        const cards = await page.$$eval('a[href*="/comprar/"]', (links) =>
          links
            .map((a) => {
              let img = a.querySelector('img')
              if (!img) {
                let cur = a.parentElement
                for (let i = 0; i < 4 && cur; i++) {
                  img = cur.querySelector('img')
                  if (img) break
                  cur = cur.parentElement
                }
              }
              return {
                href: a.getAttribute('href'),
                src: img ? img.getAttribute('src') || img.getAttribute('data-src') : null,
              }
            })
            .filter((c) => c.href && c.src),
        )

        for (const c of cards) {
          const m = c.href.match(/\/comprar\/([^/?#]+)/)
          if (!m) continue
          const slug = m[1]
          if (!slugSet.has(slug)) continue
          if (!c.src.includes(PRODUCT_PATH_MARKER)) continue
          if (!out.has(slug)) {
            // resolve URL absoluta se for relativa
            let absSrc = c.src
            if (absSrc.startsWith('//')) absSrc = 'https:' + absSrc
            else if (absSrc.startsWith('/')) absSrc = 'https://www.dpolice.com.br' + absSrc
            out.set(slug, { src: absSrc, sourceCategoryUrl: url })
            foundCdnBySlug.set(slug, absSrc)
            console.log(`  ✓ achou ${slug}: ${absSrc}`)
          }
        }

        if (out.size >= slugSet.size) break
      } catch (e) {
        console.log(`  PLP page ${pageNum} erro: ${e.message}`)
      }
    }
    // dá um tempo extra pras imagens terminarem de baixar
    await sleep(2000)
  } finally {
    await page.close().catch(() => {})
  }
  return out
}

// Fallback: tenta abrir PDP com sessão já aquecida
async function harvestFromPDP(context, target, foundCdnBySlug, savedBuffers) {
  const page = await context.newPage()

  page.on('response', async (resp) => {
    const url = resp.url()
    if (!url.includes(PRODUCT_PATH_MARKER)) return
    if (!resp.ok()) return
    if (savedBuffers.has(url)) return
    try {
      const buf = await resp.body()
      if (buf && buf.length > 500) savedBuffers.set(url, buf)
    } catch {}
  })

  try {
    for (const cat of target.categories) {
      try {
        await page.goto(cat, { waitUntil: 'domcontentloaded', timeout: PAGE_TIMEOUT_MS })
        await sleep(1200)
      } catch {}
    }
    const resp = await page.goto(target.pdp, {
      waitUntil: 'domcontentloaded',
      timeout: PAGE_TIMEOUT_MS,
      referer: target.categories[0],
    })
    if (!resp || !resp.ok()) {
      throw new Error(`PDP HTTP ${resp ? resp.status() : '?'}`)
    }
    try {
      await page.waitForSelector(`img[src*="${PRODUCT_PATH_MARKER}"]`, {
        timeout: 25_000,
      })
    } catch {}
    await sleep(3000)
    const urls = await page.$$eval(`img[src*="${PRODUCT_PATH_MARKER}"]`, (imgs) =>
      imgs.map((i) => i.getAttribute('src')).filter(Boolean),
    )
    if (urls.length > 0) {
      let absSrc = urls[0]
      if (absSrc.startsWith('//')) absSrc = 'https:' + absSrc
      else if (absSrc.startsWith('/')) absSrc = 'https://www.dpolice.com.br' + absSrc
      foundCdnBySlug.set(target.slug, absSrc)
      return { src: absSrc, sourceCategoryUrl: target.pdp }
    }
    throw new Error('PDP sem img')
  } finally {
    await page.close().catch(() => {})
  }
}

async function main() {
  console.log('Iniciando recuperação de 5 imagens faltantes…')
  await mkdir(IMAGES_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })

  const recovered = []
  const stillFailed = []
  const reasonsBySlug = new Map(TARGETS.map((t) => [t.slug, []]))

  // savedBuffers: map url -> Buffer (capturado em tempo real do browser)
  const savedBuffers = new Map()
  const foundCdnBySlug = new Map()

  // Agrupa por categoria primária
  const groups = new Map()
  for (const t of TARGETS) {
    const cat = t.categories[0]
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat).push(t)
  }

  const ctxDesktop = await browser.newContext({
    userAgent: UAS.desktop,
    viewport: { width: 1366, height: 900 },
    locale: 'pt-BR',
    extraHTTPHeaders: {
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
    },
  })

  const harvested = new Map()

  for (const [catUrl, targets] of groups) {
    const slugs = new Set(targets.map((t) => t.slug))
    console.log(`\n>>> Categoria ${catUrl} buscando slugs: ${[...slugs].join(', ')}`)
    try {
      const found = await harvestFromCategory(
        ctxDesktop,
        catUrl,
        slugs,
        foundCdnBySlug,
        savedBuffers,
      )
      for (const [slug, info] of found) harvested.set(slug, info)
    } catch (e) {
      console.log(`  erro categoria: ${e.message}`)
      for (const t of targets) reasonsBySlug.get(t.slug).push(`PLP ${catUrl}: ${e.message}`)
    }
  }

  // categoria secundária se faltou algum
  for (const t of TARGETS) {
    if (harvested.has(t.slug)) continue
    for (const cat of t.categories.slice(1)) {
      console.log(`\n>>> Fallback PLP ${cat} para ${t.slug}`)
      try {
        const found = await harvestFromCategory(
          ctxDesktop,
          cat,
          new Set([t.slug]),
          foundCdnBySlug,
          savedBuffers,
        )
        if (found.has(t.slug)) {
          harvested.set(t.slug, found.get(t.slug))
          break
        } else {
          reasonsBySlug.get(t.slug).push(`PLP ${cat}: slug não apareceu`)
        }
      } catch (e) {
        reasonsBySlug.get(t.slug).push(`PLP ${cat}: ${e.message}`)
      }
    }
  }

  // === Estratégia B: PDP iOS Safari pra slugs ainda sem buffer salvo ===
  for (const t of TARGETS) {
    const cdn = foundCdnBySlug.get(t.slug)
    if (cdn && savedBuffers.has(cdn)) continue
    console.log(`\n>>> Fallback PDP iOS Safari para ${t.slug}`)
    const ctxMobile = await browser.newContext({
      userAgent: UAS.iosSafari,
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      locale: 'pt-BR',
      extraHTTPHeaders: {
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      },
    })
    try {
      const info = await harvestFromPDP(ctxMobile, t, foundCdnBySlug, savedBuffers)
      if (!harvested.has(t.slug)) harvested.set(t.slug, info)
    } catch (e) {
      reasonsBySlug.get(t.slug).push(`PDP iOS: ${e.message}`)
      console.log(`  ✗ ${e.message}`)
    } finally {
      await ctxMobile.close().catch(() => {})
    }
  }

  await ctxDesktop.close().catch(() => {})
  await browser.close().catch(() => {})

  console.log(
    `\nBuffers capturados em tempo real: ${savedBuffers.size}; URLs alvo achadas: ${foundCdnBySlug.size}`,
  )

  // === Salva imagens no disco ===
  for (const t of TARGETS) {
    const info = harvested.get(t.slug)
    const cdn = foundCdnBySlug.get(t.slug) || (info && info.src)
    if (!cdn) {
      stillFailed.push({ slug: t.slug, reasons: reasonsBySlug.get(t.slug).concat('sem CDN URL') })
      continue
    }
    const buf = savedBuffers.get(cdn)
    if (!buf) {
      stillFailed.push({
        slug: t.slug,
        reasons: reasonsBySlug.get(t.slug).concat(`buffer não capturado para ${cdn}`),
      })
      continue
    }
    try {
      const ext = extOf(cdn)
      const local = `/products/${t.slug}.${ext}`
      const dest = join(IMAGES_DIR, `${t.slug}.${ext}`)
      await writeFile(dest, buf)
      const method =
        info && info.sourceCategoryUrl.includes('/comprar/') ? 'pdp_warmed' : 'category_listing'
      recovered.push({
        slug: t.slug,
        image_url: local,
        method,
        source_url: info ? info.sourceCategoryUrl : null,
        cdn_url: cdn,
        bytes: buf.length,
      })
      console.log(`  ✓ ${t.slug} -> ${local} (${buf.length}b) via ${method}`)
    } catch (e) {
      stillFailed.push({
        slug: t.slug,
        reasons: reasonsBySlug.get(t.slug).concat(`write: ${e.message}`),
      })
    }
  }

  await writeFile(
    OUT_JSON,
    JSON.stringify(
      { generated_at: new Date().toISOString(), recovered, still_failed: stillFailed },
      null,
      2,
    ),
  )

  console.log('\n=== RESUMO ===')
  console.log(`Recuperados: ${recovered.length}/${TARGETS.length}`)
  recovered.forEach((r) => console.log(`  ✓ ${r.slug} via ${r.method}`))
  stillFailed.forEach((f) => console.log(`  ✗ ${f.slug}: ${f.reasons.join(' | ')}`))
  console.log(`\nJSON: ${OUT_JSON}`)
}

main().catch((e) => {
  console.error('FATAL:', e)
  process.exit(1)
})
