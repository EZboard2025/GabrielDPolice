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
              className="group bg-tactical-charcoal text-background hover:border-brand/60 relative block aspect-[4/5] overflow-hidden rounded-lg border border-white/10 transition-all"
            >
              {logo ? (
                <Image
                  src={logo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="text-background/30 absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <ShieldCheck className="size-12" />
                  <span className="text-3xl font-black tracking-wider">{corp.short}</span>
                </div>
              )}

              {/* Gradiente discreto: só escurece um pouco o topo e o rodapé pro texto ler */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35"
              />

              <div className="relative flex h-full flex-col justify-between p-5">
                <p className="text-tactical-tan text-[10px] font-semibold uppercase tracking-[0.3em]">
                  {corp.short}
                </p>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                    {corp.name}
                  </h3>
                  <p className="text-background/85 text-xs">Ver todos os itens →</p>
                </div>
              </div>

              <ArrowUpRight className="text-background absolute right-4 top-4 size-4 opacity-70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
