import catalogJson from '@/data/catalog.json'
import type { AcceptedDocType, Product, ProductBadge } from '@/types'

type RawProduct = {
  name: string
  slug: string
  url: string
  price: number
  /** Path local em /products/... ou "indisponível" enquanto o scrape de imagens não rodou. */
  image_url: string
  /** URLs locais adicionais da galeria (opcional). */
  gallery_urls?: string[]
  likely_restricted: boolean
}

type RawCategory = {
  name: string
  slug: string
  url: string
  declared_total?: number
  products: RawProduct[]
}

type RawCatalog = { categories: RawCategory[] }

const PLACEHOLDER = '/placeholder-product.svg'

function cleanName(name: string): string {
  // Remove variant suffix " - X" quando X é curto (1-3 palavras), tipo "Foo - Feminino" → "Foo".
  const idx = name.lastIndexOf(' - ')
  if (idx > 0) {
    const suffix = name.slice(idx + 3).trim()
    const wordCount = suffix.split(/\s+/).length
    if (wordCount <= 3) return name.slice(0, idx).trim()
  }
  return name
}

function pickPrimary(categories: { slug: string; name: string }[]) {
  // categoria mais específica = slug mais longo (mais barras)
  return [...categories].sort((a, b) => b.slug.length - a.slug.length)[0]
}

// Marca "restrito" por produto está desativada por enquanto.
// O catálogo tem `likely_restricted` (heurística do scraper) mas a regra real
// vai ser definida com cliente + advogado depois. Vou re-ativar em
// detectBadges/detectRestrictions quando isso acontecer.
function detectBadges(_raw: RawProduct, primarySlug: string): ProductBadge[] {
  const badges: ProductBadge[] = []
  if (primarySlug === 'cfsd-2025-pmmg') badges.push('lancamento')
  return badges
}

function detectRestrictions(
  _raw: RawProduct,
  _primarySlug: string,
): Product['restrictions'] | undefined {
  return undefined
}

const raw = catalogJson as RawCatalog

type Aggregated = {
  raw: RawProduct
  categories: { slug: string; name: string }[]
}

const productsBySlug = new Map<string, Aggregated>()

for (const cat of raw.categories) {
  for (const p of cat.products) {
    const existing = productsBySlug.get(p.slug)
    if (!existing) {
      productsBySlug.set(p.slug, {
        raw: p,
        categories: [{ slug: cat.slug, name: cat.name }],
      })
    } else if (!existing.categories.find((c) => c.slug === cat.slug)) {
      existing.categories.push({ slug: cat.slug, name: cat.name })
    }
  }
}

function resolveImage(rawUrl: string | undefined, name: string) {
  if (rawUrl && rawUrl.startsWith('/')) return { url: rawUrl, alt: name }
  return { url: PLACEHOLDER, alt: name }
}

function toProduct(entry: Aggregated): Product {
  const primary = pickPrimary(entry.categories)
  const name = cleanName(entry.raw.name)
  const cover = resolveImage(entry.raw.image_url, name)
  const gallery = (entry.raw.gallery_urls ?? [])
    .filter((u) => u.startsWith('/'))
    .map((u) => ({ url: u, alt: name }))
  return {
    id: entry.raw.slug,
    slug: entry.raw.slug,
    name,
    price: entry.raw.price,
    images: [cover, ...gallery],
    category: primary,
    badges: detectBadges(entry.raw, primary.slug),
    restrictions: detectRestrictions(entry.raw, primary.slug),
  }
}

export const allProducts: Product[] = Array.from(productsBySlug.values())
  .map(toProduct)
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))

export function getProductsByCategory(slug: string): Product[] {
  return Array.from(productsBySlug.values())
    .filter((entry) =>
      entry.categories.some((c) => c.slug === slug || c.slug.startsWith(`${slug}/`)),
    )
    .map(toProduct)
}

export function getProductBySlug(slug: string): Product | undefined {
  const entry = productsBySlug.get(slug)
  return entry ? toProduct(entry) : undefined
}

export function getFeaturedProducts(limit = 5): Product[] {
  // pega 1 produto de cada categoria-chave pra dar variedade no shelf de "mais vendidos"
  const featuredCategorySlugs = [
    'cfsd-2025-pmmg',
    'colegio-tiradentes',
    'calcados/coturnos',
    'coldres/coldre-velado',
    'artigos-militares/mochilas',
    'uniformes/policia-militar',
    'artigos-militares/cintos-e-fivelas',
  ]
  const seen = new Set<string>()
  const picked: Product[] = []
  for (const slug of featuredCategorySlugs) {
    const candidate = getProductsByCategory(slug).find((p) => !seen.has(p.slug))
    if (candidate) {
      picked.push(candidate)
      seen.add(candidate.slug)
    }
    if (picked.length >= limit) break
  }
  // completa com primeiros restantes se faltou
  if (picked.length < limit) {
    for (const p of allProducts) {
      if (seen.has(p.slug)) continue
      picked.push(p)
      seen.add(p.slug)
      if (picked.length >= limit) break
    }
  }
  return picked
}

export const productCount = productsBySlug.size
export const categoryCount = raw.categories.length

/** Retorna a primeira imagem real (não placeholder) de qualquer produto da categoria. */
export function getCategoryCoverImage(categorySlug: string): string | null {
  const products = getProductsByCategory(categorySlug)
  for (const p of products) {
    const first = p.images[0]?.url
    if (first && first.startsWith('/products/')) return first
  }
  return null
}

/** Busca produtos por nome (case/diacritic-insensitive). */
export function searchProducts(query: string): Product[] {
  const q = query
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
  if (!q) return []
  return allProducts.filter((p) => {
    const haystack = `${p.name} ${p.category.name}`
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
    return haystack.includes(q)
  })
}

/** Produtos relacionados na mesma categoria primária (excluindo o atual). */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug)
  if (!product) return []
  return getProductsByCategory(product.category.slug)
    .filter((p) => p.slug !== slug)
    .slice(0, limit)
}
