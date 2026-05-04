// Última tentativa: simula navegação humana (home → categoria → PDP)
// pra ganhar cookies e contornar o 403 anti-bot.

const { chromium } = await import(
  '/Users/gabrielgomide/Documents/D police/web/node_modules/playwright/index.mjs'
)
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const ORIG_CATALOG_PATH = join(__dirname, 'catalog.json')
const CATALOG_OUT_PATH = join(__dirname, 'catalog-with-images.json')
const REPORT_PATH = join(__dirname, 'scrape-images-report.json')
const IMAGES_DIR = '/Users/gabrielgomide/Documents/D police/web/public/products'

const PRODUCT_PATH_MARKER = '/sistema/upload/523/produtos/'
const PAGE_TIMEOUT_MS = 60_000
const DOWNLOAD_TIMEOUT_MS = 20_000
const HUMAN_DELAY_MIN = 1500
const HUMAN_DELAY_MAX = 3500

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const humanWait = () =>
  sleep(HUMAN_DELAY_MIN + Math.random() * (HUMAN_DELAY_MAX - HUMAN_DELAY_MIN))

function extOf(url) {
  const m = url.split('?')[0].match(/\.([a-zA-Z0-9]{2,5})$/)
  if (!m) return 'jpg'
  const e = m[1].toLowerCase()
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(e) ? e : 'jpg'
}

async function downloadImage(url, destPath, cookieHeader) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), DOWNLOAD_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        Referer: 'https://www.dpolice.com.br/',
        Cookie: cookieHeader || '',
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

async function main() {
  const report = JSON.parse(await readFile(REPORT_PATH, 'utf8'))
  // pega slugs que ainda falham (após o retry anterior)
  const remaining = (report.failed || []).map((f) => f.slug)
  console.log(`Slugs ainda faltando: ${remaining.length}`)

  // monta map de slug -> URLs (pode ter várias do mesmo slug em categorias diferentes)
  const orig = JSON.parse(await readFile(ORIG_CATALOG_PATH, 'utf8'))
  const slugInfo = new Map()
  for (const cat of orig.categories) {
    for (const p of cat.products) {
      if (!slugInfo.has(p.slug))
        slugInfo.set(p.slug, { urls: new Set(), categoryUrls: new Set() })
      slugInfo.get(p.slug).urls.add(p.url)
      slugInfo.get(p.slug).categoryUrls.add(cat.url)
    }
  }

  await mkdir(IMAGES_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    userAgent: UA,
    viewport: { width: 1440, height: 900 },
    locale: 'pt-BR',
    extraHTTPHeaders: {
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
    },
  })
  const page = await ctx.newPage()

  // 1. visita a home pra ganhar cookies
  console.log('Visitando home pra ganhar cookies de sessão…')
  try {
    await page.goto('https://www.dpolice.com.br/', {
      waitUntil: 'domcontentloaded',
      timeout: PAGE_TIMEOUT_MS,
    })
    await humanWait()
  } catch (e) {
    console.log('Home falhou:', e.message)
  }

  const recovered = []
  const stillFailed = []

  for (let i = 0; i < remaining.length; i++) {
    const slug = remaining[i]
    const info = slugInfo.get(slug)
    if (!info) {
      stillFailed.push({ slug, reason: 'sem URL no catalog' })
      console.log(`[${i + 1}/${remaining.length}] ${slug} ✗ sem URL`)
      continue
    }

    const urls = Array.from(info.urls)
    const categoryUrls = Array.from(info.categoryUrls)

    let success = null
    let lastErr = null

    // tenta cada URL do produto, antes navegando até a categoria pai (mais natural)
    for (const productUrl of urls) {
      try {
        // navega categoria primeiro (vira referer válido)
        const catUrl = categoryUrls[0]
        if (catUrl) {
          try {
            await page.goto(catUrl, {
              waitUntil: 'domcontentloaded',
              timeout: PAGE_TIMEOUT_MS,
            })
            await humanWait()
          } catch {}
        }

        const resp = await page.goto(productUrl, {
          waitUntil: 'domcontentloaded',
          timeout: PAGE_TIMEOUT_MS,
        })
        if (resp && !resp.ok()) {
          lastErr = `HTTP ${resp.status()}`
          continue
        }

        await page.waitForSelector(`img[src*="${PRODUCT_PATH_MARKER}"]`, {
          timeout: PAGE_TIMEOUT_MS,
        })
        await sleep(1200)

        const imgs = await page.$$eval(
          `img[src*="${PRODUCT_PATH_MARKER}"]`,
          (nodes) => nodes.map((i) => i.getAttribute('src')).filter(Boolean),
        )
        const unique = Array.from(new Set(imgs))
        if (unique.length === 0) {
          lastErr = 'sem imagem na página'
          continue
        }

        const cookies = await ctx.cookies()
        const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join('; ')

        // baixa cover
        const coverUrl = unique[0]
        const ext = extOf(coverUrl)
        const coverPath = join(IMAGES_DIR, `${slug}.${ext}`)
        await downloadImage(coverUrl, coverPath, cookieHeader)

        // baixa galeria
        const gallery = []
        for (let g = 1; g <= Math.min(3, unique.length - 1); g++) {
          const gUrl = unique[g]
          const gExt = extOf(gUrl)
          const gPath = join(IMAGES_DIR, `${slug}-${g + 1}.${gExt}`)
          try {
            await downloadImage(gUrl, gPath, cookieHeader)
            gallery.push(`/products/${slug}-${g + 1}.${gExt}`)
          } catch {}
        }

        success = { image_url: `/products/${slug}.${ext}`, gallery_urls: gallery }
        break
      } catch (e) {
        lastErr = e.message?.slice(0, 100)
      }
      await humanWait()
    }

    if (success) {
      recovered.push({ slug, ...success })
      console.log(`[${i + 1}/${remaining.length}] ${slug} ✓ ${success.image_url}`)
    } else {
      stillFailed.push({ slug, reason: lastErr || 'unknown' })
      console.log(`[${i + 1}/${remaining.length}] ${slug} ✗ ${lastErr}`)
    }
    await humanWait()
  }

  await browser.close()

  // atualiza catalog
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

  report.failed = stillFailed
  report.final_retry = {
    recovered: recovered.map((r) => r.slug),
    still_failed: stillFailed,
  }
  await writeFile(REPORT_PATH, JSON.stringify(report, null, 2))

  console.log('\n=== RESUMO FINAL ===')
  console.log(`Recuperados nesta tentativa: ${recovered.length}/${remaining.length}`)
  console.log(`Ainda falhando: ${stillFailed.length}`)
}

main().catch((e) => {
  console.error('FATAL:', e)
  process.exit(1)
})
