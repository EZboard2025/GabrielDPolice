import type { Category } from '@/types'

/**
 * Provisório — montado a partir do menu atual da dpolice.com.br.
 * O scraper completo refina isso em /research/dpolice-current/catalog.json.
 */
export const categories: Category[] = [
  {
    slug: 'colegio-tiradentes',
    name: 'Colégio Tiradentes',
    description: 'Uniformes e materiais para alunos do Colégio Tiradentes',
  },
  {
    slug: 'cfsd-2025-pmmg',
    name: 'CFSD 2025 PMMG',
    description: 'Kits e materiais para o Curso de Formação de Soldados PMMG',
  },
  {
    slug: 'uniformes',
    name: 'Uniformes',
    description: 'Uniformes oficiais e operacionais',
    children: [
      { slug: 'uniformes/policia-militar', name: 'Polícia Militar', parent: 'uniformes' },
      { slug: 'uniformes/policia-penal', name: 'Polícia Penal', parent: 'uniformes' },
      { slug: 'uniformes/bombeiro-militar', name: 'Bombeiro Militar', parent: 'uniformes' },
      {
        slug: 'uniformes/carteiras-distintivos',
        name: 'Carteiras e Distintivos',
        parent: 'uniformes',
      },
    ],
  },
  {
    slug: 'artigos-militares',
    name: 'Artigos Militares',
    description: 'Equipamentos táticos e operacionais',
    children: [
      {
        slug: 'artigos-militares/cintos-e-fivelas',
        name: 'Cintos e Fivelas',
        parent: 'artigos-militares',
      },
      { slug: 'artigos-militares/algemas', name: 'Algemas', parent: 'artigos-militares' },
      { slug: 'artigos-militares/mochilas', name: 'Mochilas', parent: 'artigos-militares' },
      { slug: 'artigos-militares/acessorios', name: 'Acessórios', parent: 'artigos-militares' },
      {
        slug: 'artigos-militares/boinas-e-coberturas',
        name: 'Boinas e Coberturas',
        parent: 'artigos-militares',
      },
      { slug: 'artigos-militares/modulares', name: 'Modulares', parent: 'artigos-militares' },
      { slug: 'artigos-militares/roupas', name: 'Roupas', parent: 'artigos-militares' },
    ],
  },
  {
    slug: 'calcados',
    name: 'Calçados',
    description: 'Coturnos e calçados táticos',
    children: [{ slug: 'calcados/coturnos', name: 'Coturnos', parent: 'calcados' }],
  },
  {
    slug: 'coldres',
    name: 'Coldres',
    description: 'Coldres velados e de cintura',
    children: [
      { slug: 'coldres/coldre-velado', name: 'Velado', parent: 'coldres' },
      { slug: 'coldres/coldre-cintura', name: 'Cintura', parent: 'coldres' },
    ],
  },
]

export const featuredCategorySlugs = [
  'cfsd-2025-pmmg',
  'colegio-tiradentes',
  'uniformes',
  'artigos-militares',
  'calcados',
  'coldres',
]

export const corporationsHighlight = [
  { slug: 'uniformes/policia-militar', name: 'Polícia Militar', short: 'PMMG' },
  { slug: 'uniformes/policia-penal', name: 'Polícia Penal', short: 'PPMG' },
  { slug: 'uniformes/bombeiro-militar', name: 'Bombeiro Militar', short: 'CBMMG' },
  { slug: 'colegio-tiradentes', name: 'Colégio Tiradentes', short: 'CT' },
  { slug: 'cfsd-2025-pmmg', name: 'CFSD 2025', short: 'CFSD' },
] as const

/**
 * Procura uma categoria pelo slug (incluindo subcategorias).
 * Aceita tanto o slug raiz ("uniformes") quanto encadeado ("uniformes/policia-militar").
 */
export function findCategoryBySlug(slug: string): Category | null {
  for (const cat of categories) {
    if (cat.slug === slug) return cat
    if (cat.children) {
      const child = cat.children.find((c) => c.slug === slug)
      if (child) return child
    }
  }
  return null
}

/** Devolve [pai?, atual] pra breadcrumb. */
export function getCategoryAncestry(slug: string): Category[] {
  const trail: Category[] = []
  for (const cat of categories) {
    if (cat.slug === slug) {
      trail.push(cat)
      return trail
    }
    if (cat.children) {
      const child = cat.children.find((c) => c.slug === slug)
      if (child) {
        trail.push(cat, child)
        return trail
      }
    }
  }
  return trail
}
