// Dedup de imagens visualmente iguais dentro do gallery de cada produto.
// Usa perceptual hash (pHash 8x8) via sharp.
// - Lê catalog-with-images.json
// - Pra cada produto: compara cover + cada gallery_url
// - Remove gallery_urls que são visualmente quase iguais (Hamming dist < 8)
// - Atualiza o catalog e remove arquivos duplicados de web/public/products/

const sharpMod = await import(
  '/Users/gabrielgomide/Documents/D police/web/node_modules/sharp/lib/index.js'
)
const sharp = sharpMod.default

import { readFile, writeFile, unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CATALOG_PATH = join(__dirname, 'catalog-with-images.json')
const PUBLIC_DIR = '/Users/gabrielgomide/Documents/D police/web/public'

const HAMMING_THRESHOLD = 8

async function pHash(webPath) {
  const fsPath = join(PUBLIC_DIR, webPath)
  if (!existsSync(fsPath)) return null
  try {
    const buf = await sharp(fsPath)
      .resize(8, 8, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer()
    let sum = 0
    for (const b of buf) sum += b
    const avg = sum / buf.length
    let hash = 0n
    for (let i = 0; i < buf.length; i++) {
      if (buf[i] >= avg) hash |= 1n << BigInt(i)
    }
    return hash
  } catch (e) {
    return null
  }
}

function hamming(a, b) {
  if (a === null || b === null) return 99
  let xor = a ^ b
  let count = 0
  while (xor) {
    if (xor & 1n) count++
    xor >>= 1n
  }
  return count
}

async function main() {
  const data = JSON.parse(await readFile(CATALOG_PATH, 'utf8'))

  const seenSlugs = new Set()
  let removedCount = 0
  const toDelete = []

  for (const cat of data.categories) {
    for (const p of cat.products) {
      if (seenSlugs.has(p.slug)) continue
      seenSlugs.add(p.slug)

      const coverHash = await pHash(p.image_url)
      const keptHashes = [coverHash]
      const newGallery = []

      for (const gUrl of p.gallery_urls || []) {
        const h = await pHash(gUrl)
        const isDup = keptHashes.some((kh) => hamming(kh, h) < HAMMING_THRESHOLD)
        if (isDup) {
          toDelete.push(gUrl)
          removedCount++
        } else {
          keptHashes.push(h)
          newGallery.push(gUrl)
        }
      }
      p.gallery_urls = newGallery
    }
  }

  // Replicar gallery_urls atualizada em todas as categorias (mesmo slug)
  const slugToGallery = new Map()
  for (const cat of data.categories) {
    for (const p of cat.products) {
      if (!slugToGallery.has(p.slug)) slugToGallery.set(p.slug, p.gallery_urls)
      else p.gallery_urls = slugToGallery.get(p.slug)
    }
  }

  await writeFile(CATALOG_PATH, JSON.stringify(data, null, 2))

  // Apaga arquivos físicos duplicados
  let deleted = 0
  for (const url of toDelete) {
    const fsPath = join(PUBLIC_DIR, url)
    try {
      if (existsSync(fsPath)) {
        await unlink(fsPath)
        deleted++
      }
    } catch {}
  }

  console.log(`\n=== DEDUP ===`)
  console.log(`Galerias avaliadas: ${seenSlugs.size}`)
  console.log(`URLs marcadas como duplicata visual: ${removedCount}`)
  console.log(`Arquivos deletados: ${deleted}`)
}

main().catch((e) => {
  console.error('FATAL:', e)
  process.exit(1)
})
