import type { Metadata } from 'next'
import { CatalogView } from '@/components/catalog/catalog-view'
import { PageHeader } from '@/components/layout/page-header'
import { buildCategoryGroups } from '@/lib/catalog-groups'
import { allProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Catálogo completo',
  description: 'Todos os produtos da D Police com filtros por categoria e faixa de preço.',
}

export default function CatalogoPage() {
  const groups = buildCategoryGroups()
  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Todos os produtos"
        description={`Explore os ${allProducts.length} itens da loja com filtros por categoria e faixa de preço.`}
      />
      <CatalogView products={allProducts} groups={groups} />
    </>
  )
}
