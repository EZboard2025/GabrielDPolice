import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CatalogView } from '@/components/catalog/catalog-view'
import { PageHeader } from '@/components/layout/page-header'
import { buildCategoryGroups } from '@/lib/catalog-groups'
import { findCategoryBySlug, getCategoryAncestry } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import { siteConfig } from '@/lib/site-config'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fullSlug = slug.join('/')
  const cat = findCategoryBySlug(fullSlug)
  if (!cat) return { title: 'Categoria não encontrada' }
  return {
    title: cat.name,
    description: cat.description ?? `Produtos da categoria ${cat.name} na ${siteConfig.name}.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const fullSlug = slug.join('/')
  const category = findCategoryBySlug(fullSlug)
  if (!category) notFound()

  const ancestry = getCategoryAncestry(fullSlug)
  const products = getProductsByCategory(fullSlug)
  const groups = buildCategoryGroups(fullSlug)
  const showCategoryFilter = groups.length > 0

  return (
    <>
      <PageHeader
        eyebrow="Categoria"
        title={category.name}
        description={category.description}
        breadcrumbs={ancestry.map((c, i, arr) => ({
          label: c.name,
          href: i < arr.length - 1 ? `/categoria/${c.slug}` : undefined,
        }))}
      />
      <CatalogView
        products={products}
        groups={groups}
        showCategoryFilter={showCategoryFilter}
      />
    </>
  )
}
