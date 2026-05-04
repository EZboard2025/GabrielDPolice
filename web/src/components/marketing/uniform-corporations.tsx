import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { corporationsHighlight } from '@/lib/categories'
import { SectionHeading } from './section-heading'

export function UniformCorporations() {
  return (
    <section className="container-wide py-12">
      <SectionHeading
        eyebrow="Por corporação"
        title="Uniformes oficiais"
        description="Itens validados conforme regulamento de cada corporação. Documentação verificada no checkout."
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {corporationsHighlight.map((corp) => (
          <Link
            key={corp.slug}
            href={`/categoria/${corp.slug}`}
            className="group bg-tactical-charcoal text-background hover:border-brand/50 relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-lg border border-white/10 p-5 transition-all"
          >
            <div className="opacity-90">
              <p className="text-tactical-tan text-[10px] font-semibold uppercase tracking-[0.3em]">
                {corp.short}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold leading-tight">{corp.name}</h3>
              <p className="text-background/70 text-xs">Ver todos os itens →</p>
            </div>

            <ArrowUpRight className="absolute right-4 top-4 size-4 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />

            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-0 h-full w-full opacity-10"
              viewBox="0 0 200 250"
            >
              <defs>
                <pattern
                  id={`p-${corp.slug}`}
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M20 0 L0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#p-${corp.slug})`} />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  )
}
