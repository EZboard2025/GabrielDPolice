import type { Metadata } from 'next'
import { CatalogView } from '@/components/catalog/catalog-view'
import { PageHeader } from '@/components/layout/page-header'
import { buildCategoryGroups } from '@/lib/catalog-groups'
import { getFeaturedProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Mais vendidos',
  description: 'Os produtos mais procurados na D Police.',
}

export default function MaisVendidosPage() {
  const products = getFeaturedProducts(40)
  const groups = buildCategoryGroups()
  return (
    <>
      <PageHeader
        eyebrow="Top da loja"
        title="Mais vendidos"
        description="Selecionados pela equipe operacional e validados em campo. Frete grátis acima de R$ 300."
      />
      <CatalogView products={products} groups={groups} />
    </>
  )
}
