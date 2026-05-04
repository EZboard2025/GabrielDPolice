import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PackageOpen } from 'lucide-react'
import { EmptyState } from '@/components/layout/empty-state'
import { PageHeader } from '@/components/layout/page-header'
import { ProductGrid } from '@/components/product/product-grid'
import { findCategoryBySlug, getCategoryAncestry } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

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
  const subcategories = category.children ?? []

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
      >
        <p className="text-muted-foreground text-sm">
          <span className="text-foreground font-bold">{products.length}</span>{' '}
          {products.length === 1 ? 'produto' : 'produtos'}
        </p>
      </PageHeader>

      <section className="container-wide py-10">
        {subcategories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/categoria/${sub.slug}`}
                className={cn(
                  'border-border bg-card hover:border-brand/50 hover:bg-secondary inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
                )}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {products.length > 0 ? (
          <ProductGrid products={products} priorityCount={4} />
        ) : (
          <EmptyState
            icon={PackageOpen}
            title="Sem produtos por aqui ainda"
            description="Estamos atualizando o estoque desta categoria. Volte em breve ou fale com a gente pelo WhatsApp."
            cta={{ label: 'Voltar pra home', href: '/' }}
          />
        )}
      </section>
    </>
  )
}
