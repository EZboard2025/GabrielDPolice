import type { Product } from '@/types'

/**
 * Mock provisório — substituído quando o scraper terminar de popular
 * /research/dpolice-current/catalog.json e a Fase 2 importar pro Supabase.
 */
export const mockProducts: Product[] = [
  {
    id: 'p-coturno-bravo',
    slug: 'coturno-tatico-bravo-preto',
    name: 'Coturno Tático Bravo Preto',
    price: 489.9,
    comparePrice: 599.9,
    images: [{ url: '/placeholder-product.svg', alt: 'Coturno Tático Bravo Preto' }],
    category: { slug: 'calcados/coturnos', name: 'Coturnos' },
    badges: ['mais-vendido'],
    isNew: false,
  },
  {
    id: 'p-gandola-pmmg',
    slug: 'gandola-operacional-pmmg',
    name: 'Gandola Operacional PMMG',
    price: 329.9,
    images: [{ url: '/placeholder-product.svg', alt: 'Gandola Operacional PMMG' }],
    category: { slug: 'uniformes/policia-militar', name: 'Polícia Militar' },
    badges: ['restrito'],
    restrictions: {
      required: true,
      acceptedDocs: ['identidade-funcional-pm', 'matricula-colegio-tiradentes'],
    },
  },
  {
    id: 'p-cinto-tatico',
    slug: 'cinto-tatico-velcro-multicam',
    name: 'Cinto Tático Velcro Multicam',
    price: 159.9,
    images: [{ url: '/placeholder-product.svg', alt: 'Cinto Tático Velcro Multicam' }],
    category: { slug: 'artigos-militares/cintos-e-fivelas', name: 'Cintos e Fivelas' },
    badges: ['lancamento'],
    isNew: true,
  },
  {
    id: 'p-coldre-velado',
    slug: 'coldre-velado-glock',
    name: 'Coldre Velado Para Glock',
    price: 219.0,
    images: [{ url: '/placeholder-product.svg', alt: 'Coldre Velado Para Glock' }],
    category: { slug: 'coldres/coldre-velado', name: 'Velado' },
    badges: ['restrito'],
    restrictions: {
      required: true,
      acceptedDocs: ['cac', 'porte-arma', 'identidade-funcional-pm'],
    },
  },
  {
    id: 'p-mochila-tatica',
    slug: 'mochila-tatica-50l',
    name: 'Mochila Tática 50L',
    price: 379.0,
    comparePrice: 459.0,
    images: [{ url: '/placeholder-product.svg', alt: 'Mochila Tática 50L' }],
    category: { slug: 'artigos-militares/mochilas', name: 'Mochilas' },
    badges: ['oferta'],
  },
  {
    id: 'p-camisa-ed-fis-ct',
    slug: 'camisa-educacao-fisica-colegio-tiradentes',
    name: 'Camisa de Educação Física — Colégio Tiradentes',
    price: 89.9,
    images: [{ url: '/placeholder-product.svg', alt: 'Camisa Ed. Física CT' }],
    category: { slug: 'colegio-tiradentes', name: 'Colégio Tiradentes' },
    badges: ['mais-vendido'],
  },
  {
    id: 'p-boina-pmmg',
    slug: 'boina-pmmg-tropa-elite',
    name: 'Boina PMMG Tropa Elite',
    price: 129.9,
    images: [{ url: '/placeholder-product.svg', alt: 'Boina PMMG' }],
    category: { slug: 'artigos-militares/boinas-e-coberturas', name: 'Boinas e Coberturas' },
    badges: ['restrito'],
    restrictions: { required: true, acceptedDocs: ['identidade-funcional-pm'] },
  },
  {
    id: 'p-algema',
    slug: 'algema-niquelada',
    name: 'Algema Niquelada Profissional',
    price: 199.9,
    images: [{ url: '/placeholder-product.svg', alt: 'Algema Niquelada' }],
    category: { slug: 'artigos-militares/algemas', name: 'Algemas' },
    badges: ['restrito'],
    restrictions: {
      required: true,
      acceptedDocs: [
        'identidade-funcional-pm',
        'identidade-funcional-policia-civil',
        'identidade-funcional-policia-penal',
        'identidade-funcional-guarda-municipal',
      ],
    },
  },
]

export function productsByCategory(slug: string): Product[] {
  return mockProducts.filter(
    (p) => p.category.slug === slug || p.category.slug.startsWith(`${slug}/`),
  )
}
