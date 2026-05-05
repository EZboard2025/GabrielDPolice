import type { CategoryGroup } from '@/components/catalog/catalog-view'
import { categories, findCategoryBySlug } from './categories'
import { getProductsByCategory } from './products'

/**
 * Monta os grupos de filtro de categoria.
 *
 * - Sem `scopeSlug`: retorna a árvore completa (top-level + children).
 * - Com `scopeSlug` em categoria-pai (ex: "uniformes"): retorna só as subcategorias dessa pai
 *   como uma lista plana — assim o usuário sub-filtra entre PM, PP, BM, etc.
 * - Com `scopeSlug` em folha (ex: "uniformes/policia-militar"): retorna [] — o filtro de
 *   categoria é escondido porque a página já está no nível mais específico.
 */
export function buildCategoryGroups(scopeSlug?: string): CategoryGroup[] {
  if (!scopeSlug) {
    return categories
      .map<CategoryGroup>((cat) => ({
        slug: cat.slug,
        name: cat.name,
        count: getProductsByCategory(cat.slug).length,
        children: (cat.children ?? [])
          .map((c) => ({
            slug: c.slug,
            name: c.name,
            count: getProductsByCategory(c.slug).length,
          }))
          .filter((c) => c.count > 0),
      }))
      .filter((g) => g.count > 0)
  }

  const scope = findCategoryBySlug(scopeSlug)
  if (!scope) return []

  if (scope.children && scope.children.length > 0) {
    return scope.children
      .map<CategoryGroup>((c) => ({
        slug: c.slug,
        name: c.name,
        count: getProductsByCategory(c.slug).length,
      }))
      .filter((g) => g.count > 0)
  }

  return []
}
