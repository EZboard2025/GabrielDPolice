import { mockProducts } from '@/lib/products-mock'
import { ProductGrid } from '@/components/product/product-grid'
import { SectionHeading } from './section-heading'

export function BestSellers() {
  const featured = mockProducts
    .filter((p) => p.badges?.includes('mais-vendido') || p.badges?.includes('lancamento'))
    .slice(0, 5)

  return (
    <section className="container-wide py-12">
      <SectionHeading
        eyebrow="Mais vendidos"
        title="O que está saindo da loja agora"
        description="Itens validados pela nossa equipe operacional e já testados em campo."
        ctaHref="/mais-vendidos"
      />
      <div className="mt-8">
        <ProductGrid products={featured} priorityCount={5} />
      </div>
    </section>
  )
}
