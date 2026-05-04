import Link from 'next/link'
import { Flame } from 'lucide-react'
import { categories } from '@/lib/categories'
import { cn } from '@/lib/utils'

const featuredOrder = [
  'cfsd-2025-pmmg',
  'colegio-tiradentes',
  'uniformes',
  'artigos-militares',
  'calcados',
  'coldres',
]

export function HeaderNav() {
  const ordered = [...categories].sort(
    (a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug),
  )

  return (
    <nav className="bg-tactical-charcoal text-background/90 hidden border-y border-white/5 md:block">
      <div className="container-wide">
        <ul className="flex items-stretch gap-1">
          {ordered.map((cat) => {
            const isHot = cat.slug === 'cfsd-2025-pmmg'
            return (
              <li key={cat.slug} className="group relative">
                <Link
                  href={`/categoria/${cat.slug}`}
                  className={cn(
                    'flex h-11 items-center gap-2 px-4 text-[13px] font-medium uppercase tracking-wide transition-colors',
                    'hover:bg-white/5 hover:text-background',
                    isHot && 'text-warning',
                  )}
                >
                  {isHot && <Flame className="size-3.5" />}
                  {cat.name}
                </Link>
                {cat.children?.length ? (
                  <div
                    className={cn(
                      'invisible absolute left-0 top-full z-30 w-72 translate-y-1 opacity-0 transition-all duration-150',
                      'group-hover:visible group-hover:translate-y-0 group-hover:opacity-100',
                    )}
                  >
                    <div className="bg-card text-card-foreground border-border mt-0 rounded-md border p-2 shadow-xl">
                      <ul className="flex flex-col">
                        {cat.children.map((child) => (
                          <li key={child.slug}>
                            <Link
                              href={`/categoria/${child.slug}`}
                              className="hover:bg-muted block rounded-sm px-3 py-2 text-sm transition-colors"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                        <li className="border-border mt-1 border-t pt-1">
                          <Link
                            href={`/categoria/${cat.slug}`}
                            className="text-brand hover:bg-muted block rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors"
                          >
                            Ver todos em {cat.name} →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
