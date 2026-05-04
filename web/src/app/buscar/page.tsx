import type { Metadata } from 'next'
import { SearchX } from 'lucide-react'
import { EmptyState } from '@/components/layout/empty-state'
import { PageHeader } from '@/components/layout/page-header'
import { ProductGrid } from '@/components/product/product-grid'
import { searchProducts } from '@/lib/products'

type Props = { searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Buscando por "${q}"` : 'Buscar',
    robots: { index: false },
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  const results = query ? searchProducts(query) : []

  return (
    <>
      <PageHeader
        eyebrow="Busca"
        title={query ? `Resultados para "${query}"` : 'O que você procura hoje?'}
        description={
          query
            ? `${results.length} ${results.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`
            : 'Use a barra de busca no topo pra encontrar coturnos, gandolas, coldres e mais.'
        }
      />

      <section className="container-wide py-10">
        {!query ? (
          <EmptyState
            icon={SearchX}
            title="Comece pela busca"
            description="Digite o que está procurando na barra acima."
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Nada encontrado"
            description={`Não achamos nenhum produto para "${query}". Tente outro termo ou navegue pelas categorias.`}
            cta={{ label: 'Ver categorias', href: '/' }}
          />
        ) : (
          <ProductGrid products={results} priorityCount={4} />
        )}
      </section>
    </>
  )
}
