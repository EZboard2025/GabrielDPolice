import Link from 'next/link'
import { ArrowRight, ShieldAlert } from 'lucide-react'

export function RestrictedInfo() {
  return (
    <section className="container-wide py-12">
      <div className="bg-tactical-charcoal text-background relative overflow-hidden rounded-xl">
        <svg
          aria-hidden
          viewBox="0 0 800 200"
          className="absolute inset-0 h-full w-full opacity-10"
        >
          <defs>
            <pattern id="rinfo" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0 L0 0 0 32" fill="none" stroke="white" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rinfo)" />
        </svg>
        <div className="relative flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:gap-10 md:p-10">
          <div className="bg-tactical-tan/15 text-tactical-tan inline-flex size-14 shrink-0 items-center justify-center rounded-full">
            <ShieldAlert className="size-7" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-tactical-tan text-xs font-semibold uppercase tracking-[0.25em]">
              Produtos restritos
            </p>
            <h2 className="text-xl font-bold md:text-2xl">
              Validamos seu documento de forma segura, no próprio checkout.
            </h2>
            <p className="text-background/75 max-w-2xl text-sm leading-relaxed">
              Itens com restrição legal — algemas, coldres, distintivos e uniformes oficiais — só
              são liberados após verificação. Envie seu CAC, identidade funcional ou matrícula no
              checkout: nossa IA confere em segundos e nossa equipe revisa antes do envio. Tudo de
              acordo com a LGPD.
            </p>
          </div>
          <Link
            href="/produtos-restritos"
            className="text-tactical-tan hover:text-background inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors"
          >
            Como funciona
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
