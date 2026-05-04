'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductGrid } from './product-grid'
import { mockProducts } from '@/lib/products-mock'
import type { Product } from '@/types'

type Tab = {
  slug: string
  label: string
  filter: (p: Product) => boolean
}

const tabs: Tab[] = [
  {
    slug: 'cfsd-2025-pmmg',
    label: 'CFSD 2025 PMMG',
    filter: (p) => p.category.slug === 'colegio-tiradentes' || p.category.slug.startsWith('uniformes/'),
  },
  {
    slug: 'colegio-tiradentes',
    label: 'Colégio Tiradentes',
    filter: (p) => p.category.slug === 'colegio-tiradentes',
  },
  {
    slug: 'calcados',
    label: 'Calçados',
    filter: (p) => p.category.slug.startsWith('calcados'),
  },
  {
    slug: 'coldres',
    label: 'Coldres',
    filter: (p) => p.category.slug.startsWith('coldres'),
  },
  {
    slug: 'artigos-militares',
    label: 'Artigos Militares',
    filter: (p) => p.category.slug.startsWith('artigos-militares'),
  },
]

export function CategoryTabs() {
  const [active, setActive] = useState(tabs[0].slug)

  return (
    <Tabs value={active} onValueChange={setActive} className="w-full">
      <div className="border-border mb-6 flex items-end justify-between gap-4 border-b">
        <TabsList className="bg-transparent p-0">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.slug}
              value={t.slug}
              className="data-[state=active]:border-brand data-[state=active]:text-foreground text-muted-foreground -mb-px rounded-none border-b-2 border-transparent bg-transparent px-3 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:text-foreground"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Link
          href={`/categoria/${active}`}
          className="text-brand hidden whitespace-nowrap text-xs font-semibold uppercase tracking-wider hover:underline md:inline"
        >
          Ver todos →
        </Link>
      </div>

      {tabs.map((t) => {
        const filtered = mockProducts.filter(t.filter).slice(0, 5)
        return (
          <TabsContent key={t.slug} value={t.slug} className="mt-0">
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} />
            ) : (
              <p className="text-muted-foreground py-12 text-center text-sm">
                Em breve novos produtos nesta categoria.
              </p>
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
