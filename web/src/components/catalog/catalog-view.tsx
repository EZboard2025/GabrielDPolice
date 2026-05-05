'use client'

import { useMemo, useState } from 'react'
import { FilterX, PackageOpen, SlidersHorizontal, X } from 'lucide-react'
import { EmptyState } from '@/components/layout/empty-state'
import { ProductGrid } from '@/components/product/product-grid'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

type SortKey = 'name-asc' | 'price-asc' | 'price-desc'

const sortLabels: Record<SortKey, string> = {
  'name-asc': 'A-Z',
  'price-asc': 'Menor preço',
  'price-desc': 'Maior preço',
}

const priceBuckets = [
  { label: 'Até R$ 100', min: 0, max: 100 },
  { label: 'R$ 100 a R$ 250', min: 100, max: 250 },
  { label: 'R$ 250 a R$ 500', min: 250, max: 500 },
  { label: 'Acima de R$ 500', min: 500, max: Infinity },
] as const

export type CategoryGroup = {
  slug: string
  name: string
  count: number
  children?: { slug: string; name: string; count: number }[]
}

type Props = {
  products: Product[]
  groups: CategoryGroup[]
  showCategoryFilter?: boolean
}

export function CatalogView({ products, groups, showCategoryFilter = true }: Props) {
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set())
  const [bucketIdx, setBucketIdx] = useState<number | null>(null)
  const [sort, setSort] = useState<SortKey>('name-asc')
  const [mobileOpen, setMobileOpen] = useState(false)

  const filtered = useMemo(() => {
    let res = products
    if (selectedCats.size > 0) {
      res = res.filter((p) => {
        for (const sel of selectedCats) {
          for (const cat of p.categorySlugs) {
            if (cat === sel || cat.startsWith(`${sel}/`)) return true
          }
        }
        return false
      })
    }
    if (bucketIdx !== null) {
      const b = priceBuckets[bucketIdx]
      res = res.filter((p) => p.price >= b.min && p.price <= b.max)
    }
    if (sort === 'price-asc') res = [...res].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') res = [...res].sort((a, b) => b.price - a.price)
    else res = [...res].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    return res
  }, [products, selectedCats, bucketIdx, sort])

  const toggleCat = (slug: string) => {
    setSelectedCats((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const clearAll = () => {
    setSelectedCats(new Set())
    setBucketIdx(null)
  }

  const hasFilters = selectedCats.size > 0 || bucketIdx !== null

  const allCatsByName = useMemo(() => {
    const map = new Map<string, string>()
    for (const g of groups) {
      map.set(g.slug, g.name)
      for (const c of g.children ?? []) map.set(c.slug, c.name)
    }
    return map
  }, [groups])

  return (
    <div className="container-wide grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
      {/* Sidebar desktop */}
      <aside className="border-border bg-card hidden h-fit max-h-[calc(100vh-12rem)] overflow-y-auto rounded-lg border p-5 lg:sticky lg:top-44 lg:block">
        <FiltersInner
          showCategoryFilter={showCategoryFilter}
          groups={groups}
          selectedCats={selectedCats}
          bucketIdx={bucketIdx}
          toggleCat={toggleCat}
          setBucketIdx={setBucketIdx}
          clearAll={clearAll}
          hasFilters={hasFilters}
        />
      </aside>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="bg-background/80 absolute inset-0 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="bg-background animate-in slide-in-from-right absolute inset-y-0 right-0 w-80 max-w-[90vw] overflow-y-auto p-6 shadow-2xl duration-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold">Filtros</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="hover:bg-secondary inline-flex size-8 items-center justify-center rounded-md transition-colors"
                aria-label="Fechar filtros"
              >
                <X className="size-4" />
              </button>
            </div>
            <FiltersInner
              showCategoryFilter={showCategoryFilter}
              groups={groups}
              selectedCats={selectedCats}
              bucketIdx={bucketIdx}
              toggleCat={toggleCat}
              setBucketIdx={setBucketIdx}
              clearAll={clearAll}
              hasFilters={hasFilters}
            />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="bg-brand text-brand-foreground hover:bg-brand/90 mt-6 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              Ver {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}
            </button>
          </div>
        </div>
      )}

      {/* Main */}
      <div>
        <div className="border-border mb-6 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <p className="text-sm">
            <span className="text-foreground font-bold">{filtered.length}</span>{' '}
            <span className="text-muted-foreground">
              {filtered.length === 1 ? 'produto' : 'produtos'}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="border-border hover:bg-secondary inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-semibold uppercase tracking-wide transition-colors lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              Filtros
              {hasFilters && (
                <span className="bg-brand text-brand-foreground inline-flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
                  {selectedCats.size + (bucketIdx !== null ? 1 : 0)}
                </span>
              )}
            </button>
            <label className="text-muted-foreground text-xs" htmlFor="sort">
              Ordenar:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border-border bg-card focus:border-brand h-9 rounded-md border px-2 pr-7 text-xs font-medium focus:outline-none"
            >
              {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {sortLabels[key]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasFilters && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {[...selectedCats].map((slug) => (
              <Chip
                key={slug}
                label={allCatsByName.get(slug) ?? slug}
                onRemove={() => toggleCat(slug)}
              />
            ))}
            {bucketIdx !== null && (
              <Chip
                label={priceBuckets[bucketIdx].label}
                onRemove={() => setBucketIdx(null)}
              />
            )}
            <button
              type="button"
              onClick={clearAll}
              className="text-brand inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide hover:underline"
            >
              <FilterX className="size-3.5" />
              Limpar tudo
            </button>
          </div>
        )}

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} priorityCount={4} />
        ) : (
          <EmptyState
            icon={PackageOpen}
            title="Nenhum produto bate com esses filtros"
            description="Tente remover algum filtro ou redefinir a faixa de preço."
            cta={{ label: 'Limpar filtros', onClick: clearAll }}
          />
        )}
      </div>
    </div>
  )
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="border-border bg-secondary hover:bg-secondary/70 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors"
    >
      {label}
      <X className="size-3 opacity-60" />
    </button>
  )
}

type FiltersInnerProps = {
  showCategoryFilter: boolean
  groups: CategoryGroup[]
  selectedCats: Set<string>
  bucketIdx: number | null
  toggleCat: (slug: string) => void
  setBucketIdx: (i: number | null) => void
  clearAll: () => void
  hasFilters: boolean
}

function FiltersInner({
  showCategoryFilter,
  groups,
  selectedCats,
  bucketIdx,
  toggleCat,
  setBucketIdx,
  clearAll,
  hasFilters,
}: FiltersInnerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold">Filtros</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-brand text-[11px] font-semibold uppercase tracking-wider hover:underline"
          >
            Limpar
          </button>
        )}
      </div>

      {showCategoryFilter && groups.length > 0 && (
        <Section title="Categoria">
          <ul className="space-y-1">
            {groups.map((g) => (
              <li key={g.slug}>
                <CatCheckbox
                  checked={selectedCats.has(g.slug)}
                  onChange={() => toggleCat(g.slug)}
                  label={g.name}
                  count={g.count}
                  bold
                />
                {g.children && g.children.length > 0 && (
                  <ul className="border-border mt-1 space-y-1 border-l pl-3">
                    {g.children.map((c) => (
                      <li key={c.slug}>
                        <CatCheckbox
                          checked={selectedCats.has(c.slug)}
                          onChange={() => toggleCat(c.slug)}
                          label={c.name}
                          count={c.count}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Faixa de preço">
        <ul className="space-y-1">
          {priceBuckets.map((b, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setBucketIdx(bucketIdx === i ? null : i)}
                className="hover:bg-secondary group flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors"
              >
                <span
                  className={cn(
                    'border-border inline-flex size-3.5 items-center justify-center rounded-full border-2 transition-colors',
                    bucketIdx === i && 'border-brand',
                  )}
                >
                  {bucketIdx === i && <span className="bg-brand block size-1.5 rounded-full" />}
                </span>
                <span className="flex-1">{b.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-muted-foreground mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
        {title}
      </h3>
      {children}
    </div>
  )
}

function CatCheckbox({
  checked,
  onChange,
  label,
  count,
  bold = false,
}: {
  checked: boolean
  onChange: () => void
  label: string
  count: number
  bold?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="hover:bg-secondary group flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors"
    >
      <span
        className={cn(
          'border-border inline-flex size-4 shrink-0 items-center justify-center rounded border-2 transition-colors',
          checked && 'border-brand bg-brand',
        )}
      >
        {checked && (
          <svg
            viewBox="0 0 12 12"
            className="text-background size-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2 6 5 9 10 3" />
          </svg>
        )}
      </span>
      <span className={cn('flex-1 leading-tight', bold && 'font-semibold')}>{label}</span>
      <span className="text-muted-foreground text-xs">{count}</span>
    </button>
  )
}
