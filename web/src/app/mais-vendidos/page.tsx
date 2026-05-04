import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { ProductGrid } from '@/components/product/product-grid'
import { getFeaturedProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Mais vendidos',
  description: 'Os produtos mais procurados na D Police.',
}

export default function MaisVendidosPage() {
  const products = getFeaturedProducts(20)
  return (
    <>
      <PageHeader
        eyebrow="Top da loja"
        title="Mais vendidos"
        description="Selecionados pela equipe operacional e validados em campo. Frete grátis acima de R$ 300."
      />
      <section className="container-wide py-10">
        <ProductGrid products={products} priorityCount={5} />
      </section>
    </>
  )
}
