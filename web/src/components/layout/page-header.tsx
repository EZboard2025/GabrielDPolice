import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

type Crumb = { label: string; href?: string }

type Props = {
  title: string
  description?: string
  eyebrow?: string
  breadcrumbs?: Crumb[]
  className?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  eyebrow,
  breadcrumbs,
  className,
  children,
}: Props) {
  return (
    <section className={cn('bg-secondary/30 border-border border-b', className)}>
      <div className="container-wide py-8 md:py-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="text-muted-foreground flex flex-wrap items-center gap-1 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
                >
                  <Home className="size-3.5" />
                  <span className="sr-only">Início</span>
                </Link>
              </li>
              {breadcrumbs.map((c, i) => (
                <li key={i} className="inline-flex items-center gap-1">
                  <ChevronRight className="size-3.5 opacity-50" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-foreground transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-foreground/90">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            {eyebrow && (
              <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">
                {eyebrow}
              </p>
            )}
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            {description && (
              <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base">
                {description}
              </p>
            )}
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </div>
    </section>
  )
}
