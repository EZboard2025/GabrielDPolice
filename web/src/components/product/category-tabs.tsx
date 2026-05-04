'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductGrid } from './product-grid'
import { getProductsByCategory } from '@/lib/products'

const tabs = [
  { slug: 'cfsd-2025-pmmg', label: 'CFSD 2025 PMMG' },
  { slug: 'colegio-tiradentes', label: 'Colégio Tiradentes' },
  { slug: 'calcados', label: 'Calçados' },
  { slug: 'coldres', label: 'Coldres' },
  { slug: 'artigos-militares', label: 'Artigos Militares' },
  { slug: 'uniformes', label: 'Uniformes' },
] as const

export function CategoryTabs() {
  const [active, setActive] = useState<string>(tabs[0].slug)

  return (
    <Tabs value={active} onValueChange={setActive} className="w-full">
      <div className="border-border mb-6 flex items-end justify-between gap-4 border-b">
        <TabsList className="bg-transparent p-0 overflow-x-auto">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.slug}
              value={t.slug}
              className="data-[state=active]:border-brand data-[state=active]:text-foreground text-muted-foreground hover:text-foreground -mb-px rounded-none border-b-2 border-transparent bg-transparent px-3 py-3 text-sm font-medium uppercase tracking-wide transition-colors whitespace-nowrap"
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
        const items = getProductsByCategory(t.slug).slice(0, 5)
        return (
          <TabsContent key={t.slug} value={t.slug} className="mt-0">
            {items.length > 0 ? (
              <ProductGrid products={items} />
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
