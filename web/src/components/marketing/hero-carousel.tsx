'use client'

import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Slide = {
  eyebrow?: string
  title: string
  description: string
  cta: { label: string; href: string }
  accent: 'brand' | 'olive' | 'tan' | 'destructive'
}

const slides: Slide[] = [
  {
    eyebrow: 'CFSD 2025 PMMG',
    title: 'Kit completo do Soldado',
    description:
      'Tudo que você precisa pra começar o curso: gandola, calça operacional, coturno, boina e brevês — em um só lugar.',
    cta: { label: 'Montar meu kit', href: '/categoria/cfsd-2025-pmmg' },
    accent: 'brand',
  },
  {
    eyebrow: 'Colégio Tiradentes',
    title: 'Volta às aulas pronta',
    description:
      'Uniforme oficial, ed. física e acessórios validados pela escola — entrega em BH no mesmo dia.',
    cta: { label: 'Comprar agora', href: '/categoria/colegio-tiradentes' },
    accent: 'olive',
  },
  {
    eyebrow: 'Linha Operacional',
    title: 'Coturnos táticos -20%',
    description:
      'Modelos selecionados de couro legítimo com solado anti-derrapante, em até 6x sem juros.',
    cta: { label: 'Ver ofertas', href: '/categoria/calcados/coturnos' },
    accent: 'destructive',
  },
]

const accentBg: Record<Slide['accent'], string> = {
  brand: 'from-tactical-charcoal via-brand/30 to-tactical-charcoal',
  olive: 'from-tactical-charcoal via-tactical-olive/30 to-tactical-charcoal',
  tan: 'from-tactical-charcoal via-tactical-tan/30 to-tactical-charcoal',
  destructive: 'from-tactical-charcoal via-destructive/30 to-tactical-charcoal',
}

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    const id = setInterval(() => emblaApi.scrollNext(), 6000)
    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(id)
    }
  }, [emblaApi])

  return (
    <section
      className="relative overflow-hidden border-y border-white/5"
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((s, i) => (
            <div
              key={i}
              className={cn(
                'relative min-w-0 flex-[0_0_100%] bg-gradient-to-br text-white',
                accentBg[s.accent],
              )}
            >
              <div className="container-wide flex min-h-[420px] items-center py-16 md:min-h-[460px]">
                <div className="max-w-2xl space-y-5">
                  {s.eyebrow && (
                    <p className="text-tactical-tan inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]">
                      <span className="bg-tactical-tan inline-block h-px w-8" />
                      {s.eyebrow}
                    </p>
                  )}
                  <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                    {s.title}
                  </h2>
                  <p className="max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                    {s.description}
                  </p>
                  <Link
                    href={s.cta.href}
                    className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-sm font-semibold uppercase tracking-wide text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {s.cta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                {/* tactical grid backdrop */}
                <svg
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 opacity-15 md:block"
                  viewBox="0 0 600 600"
                >
                  <defs>
                    <pattern id={`grid-${i}`} width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M40 0 L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                  <circle cx="450" cy="300" r="180" fill="none" stroke="white" strokeWidth="0.6" />
                  <circle cx="450" cy="300" r="120" fill="none" stroke="white" strokeWidth="0.6" />
                  <circle cx="450" cy="300" r="60" fill="none" stroke="white" strokeWidth="0.6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Slide anterior"
        className="bg-background/30 hover:bg-background/50 absolute left-4 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full text-white backdrop-blur md:inline-flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Próximo slide"
        className="bg-background/30 hover:bg-background/50 absolute right-4 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full text-white backdrop-blur md:inline-flex"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              i === selected ? 'bg-white w-8' : 'bg-white/40 w-1.5',
            )}
          />
        ))}
      </div>
    </section>
  )
}
