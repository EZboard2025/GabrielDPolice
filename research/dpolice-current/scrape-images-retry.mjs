// Retry dos slugs que falharam no scrape-images.mjs.
// - Sequencial (não paralelo) pra não estressar o servidor que devolve 403
// - Timeout 45s
// - Delays maiores entre requests (3s)
// - Tenta URLs alternativas do catálogo pro mesmo slug (cross-listing)
// - User-agent rotativo
// - Atualiza catalog-with-images.json e scrape-images-report.json

const { chromium } = await import(
  '/Users/gabrielgomide/Documents/D police/web/node_modules/playwright/index.mjs'
)
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const CATALOG_OUT_PATH = join(__dirname, 'catalog-with-images.json')
const ORIG_CATALOG_PATH = join(__dirname, 'catalog.json')
const REPORT_PATH = join(__dirname, 'scrape-images-report.json')
const IMAGES_DIR = '/Users/gabrielgomide/Documents/D police/web/public/products'

const PAGE_TIMEOUT_MS = 45_000
const DOWNLOAD_TIMEOUT_MS = 20_000
const DELAY_BETWEEN_MS = 3_000
const MAX_GALLERY = 3
const PRODUCT_PATH_MARKER = '/sistema/upload/523/produtos/'

const UAS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0',
]

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function extOf(url) {
  const m = url.split('?')[0].match(/\.([a-zA-Z0-9]{2,5})$/)
  if (!m) return 'jpg'
  const e = m[1].toLowerCase()
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(e) ? e : 'jpg'
}

async function downloadImage(url, destPath) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), DOWNLOAD_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UAS[0],
        Referer: 'https://www.dpolice.com.br/',
      },
      signal: ctrl.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(destPath, buf)
    return buf.length
  } finally {
    clearTimeout(t)
  }
}

async function tryFetchPDP(browser, url, ua) {
  const ctx = await browser.newContext({
    userAgent: ua,
    viewport: { width: 1280, height: 800 },
    locale: 'pt-BR',
    extraHTTPHeaders: {
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      Referer: 'https://www.dpolice.com.br/',
    },
  })
  const page = await ctx.newPage()
  try {
    const resp = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: PAGE_TIMEOUT_MS,
    })
    if (resp && !resp.ok()) {
      throw new Error(`HTTP ${resp.status()}`)
    }
    // espera a imagem real entrar
    await page.waitForSelector(`img[src*="${PRODUCT_PATH_MARKER}"]`, {
      timeout: PAGE_TIMEOUT_MS,
    })
    // pequena pausa pra galeria carregar também
    await sleep(800)
    const urls = await page.$$eval(`img[src*="${PRODUCT_PATH_MARKER}"]`, (imgs) =>
      imgs.map((i) => i.getAttribute('src')).filter(Boolean),
    )
    return Array.from(new Set(urls))
  } finally {
    await page.close().catch(() => {})
    await ctx.close().catch(() => {})
  }
}

async function main() {
  console.log('Lendo report e catalog atual…')
  const report = JSON.parse(await readFile(REPORT_PATH, 'utf8'))
  const failedSlugs = (report.failed || []).map((f) => f.slug)
  console.log(`Falhas anteriores: ${failedSlugs.length}`)

  // pega URLs alternativas pro mesmo slug do catalog ORIGINAL (tem cross-listing)
  const orig = JSON.parse(await readFile(ORIG_CATALOG_PATH, 'utf8'))
  const allUrlsBySlug = new Map()
  for (const cat of orig.categories) {
    for (const p of cat.products) {
      if (!allUrlsBySlug.has(p.slug)) allUrlsBySlug.set(p.slug, new Set())
      allUrlsBySlug.get(p.slug).add(p.url)
    }
  }

  await mkdir(IMAGES_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const recovered = []
  const stillFailed = []

  for (let i = 0; i < failedSlugs.length; i++) {
    const slug = failedSlugs[i]
    const urls = Array.from(allUrlsBySlug.get(slug) || [])
    if (urls.length === 0) {
      stillFailed.push({ slug, reason: 'sem URL no catalog' })
      console.log(`[${i + 1}/${failedSlugs.length}] ${slug} ✗ sem URL`)
      continue
    }

    let success = null
    let lastErr = null
    for (let uaIdx = 0; uaIdx < UAS.length && !success; uaIdx++) {
      for (const url of urls) {
        try {
          const imgs = await tryFetchPDP(browser, url, UAS[uaIdx])
          if (imgs.length > 0) {
            // baixa cover
            const coverUrl = imgs[0]
            const ext = extOf(coverUrl)
            const coverPath = join(IMAGES_DIR, `${slug}.${ext}`)
            await downloadImage(coverUrl, coverPath)

            // baixa galeria
            const gallery = []
            for (let g = 1; g <= Math.min(MAX_GALLERY, imgs.length - 1); g++) {
              const gUrl = imgs[g]
              const gExt = extOf(gUrl)
              const gPath = join(IMAGES_DIR, `${slug}-${g + 1}.${gExt}`)
              try {
                await downloadImage(gUrl, gPath)
                gallery.push(`/products/${slug}-${g + 1}.${gExt}`)
              } catch {}
            }

            success = {
              image_url: `/products/${slug}.${ext}`,
              gallery_urls: gallery,
              recovered_url: url,
              recovered_ua: UAS[uaIdx],
            }
            break
          }
        } catch (e) {
          lastErr = e.message
        }
        await sleep(DELAY_BETWEEN_MS)
      }
    }

    if (success) {
      recovered.push({ slug, ...success })
      console.log(`[${i + 1}/${failedSlugs.length}] ${slug} ✓ ${success.image_url}`)
    } else {
      stillFailed.push({ slug, reason: lastErr || 'unknown' })
      console.log(`[${i + 1}/${failedSlugs.length}] ${slug} ✗ ${lastErr}`)
    }
    await sleep(DELAY_BETWEEN_MS)
  }

  await browser.close()

  // atualiza catalog-with-images.json
  console.log('\nAtualizando catalog-with-images.json…')
  const catalog = JSON.parse(await readFile(CATALOG_OUT_PATH, 'utf8'))
  const recMap = new Map(recovered.map((r) => [r.slug, r]))
  for (const cat of catalog.categories) {
    for (const p of cat.products) {
      const r = recMap.get(p.slug)
      if (r) {
        p.image_url = r.image_url
        p.gallery_urls = r.gallery_urls
      }
    }
  }
  await writeFile(CATALOG_OUT_PATH, JSON.stringify(catalog, null, 2))

  // atualiza report
  report.failed = stillFailed
  report.retry = { recovered: recovered.map((r) => r.slug), still_failed: stillFailed }
  await writeFile(REPORT_PATH, JSON.stringify(report, null, 2))

  console.log('\n=== RESUMO RETRY ===')
  console.log(`Recuperados: ${recovered.length}/${failedSlugs.length}`)
  console.log(`Ainda falhando: ${stillFailed.length}`)
  if (stillFailed.length) {
    console.log('Slugs que ainda falharam:')
    stillFailed.forEach((s) => console.log(`  - ${s.slug}: ${s.reason}`))
  }
}

main().catch((e) => {
  console.error('FATAL:', e)
  process.exit(1)
})
