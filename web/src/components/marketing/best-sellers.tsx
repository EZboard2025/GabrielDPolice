import { ProductGrid } from '@/components/product/product-grid'
import { getFeaturedProducts } from '@/lib/products'
import { SectionHeading } from './section-heading'

export function BestSellers() {
  // 6 itens pra fechar pares no mobile (2 cols); o 6º fica oculto no desktop.
  const featured = getFeaturedProducts(6)

  return (
    <section className="container-wide py-12">
      <SectionHeading
        eyebrow="Mais vendidos"
        title="O que está saindo da loja agora"
        description="Itens validados pela nossa equipe operacional e já testados em campo."
        ctaHref="/mais-vendidos"
      />
      <div className="mt-8">
        <ProductGrid
          products={featured}
          priorityCount={5}
          className="md:[&>*:nth-child(6)]:hidden"
        />
      </div>
    </section>
  )
}
