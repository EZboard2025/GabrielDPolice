import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { corporationsHighlight } from '@/lib/categories'
import { findCorpLogo } from '@/lib/corp-logos'
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
        {corporationsHighlight.map((corp) => {
          const logo = findCorpLogo(corp.short)
          return (
            <Link
              key={corp.slug}
              href={`/categoria/${corp.slug}`}
              className="group bg-tactical-charcoal text-background hover:border-brand/60 relative flex aspect-[4/5] flex-col items-center justify-between overflow-hidden rounded-lg border border-white/10 p-5 transition-all"
            >
              {/* Sutil grid tático no fundo */}
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
                viewBox="0 0 200 250"
              >
                <defs>
                  <pattern
                    id={`p-${corp.slug.replace(/\//g, '-')}`}
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M20 0 L0 0 0 20" fill="none" stroke="white" strokeWidth="0.4" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#p-${corp.slug.replace(/\//g, '-')})`}
                />
              </svg>

              <p className="text-tactical-tan relative text-[10px] font-semibold uppercase tracking-[0.3em]">
                {corp.short}
              </p>

              {/* Logo / fallback */}
              <div className="relative flex flex-1 items-center justify-center py-2">
                {logo ? (
                  <Image
                    src={logo}
                    alt={`Logo ${corp.name}`}
                    width={400}
                    height={400}
                    className="max-h-[140px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-background/30 flex flex-col items-center gap-2">
                    <ShieldCheck className="size-12" />
                    <span className="text-3xl font-black tracking-wider">{corp.short}</span>
                  </div>
                )}
              </div>

              <div className="relative space-y-1 text-center">
                <h3 className="text-base font-bold leading-tight">{corp.name}</h3>
                <p className="text-background/65 text-xs">Ver todos os itens →</p>
              </div>

              <ArrowUpRight className="text-background absolute right-4 top-4 size-4 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
