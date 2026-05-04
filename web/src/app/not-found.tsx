import Link from 'next/link'
import { ArrowLeft, Compass, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export default function NotFound() {
  return (
    <section className="container-wide flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-tactical-tan text-xs font-semibold uppercase tracking-[0.3em]">
        Erro 404
      </p>
      <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
        Essa página saiu de patrulha
      </h1>
      <p className="text-muted-foreground mt-3 max-w-md text-sm md:text-base">
        O endereço que você acessou não existe, foi movido ou está fora do ar. Mas a operação
        continua — escolha um caminho:
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="bg-brand text-brand-foreground hover:bg-brand/90 inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm font-semibold uppercase tracking-wide transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar pra home
        </Link>
        <Link
          href="/buscar"
          className="border-border hover:bg-secondary inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm font-semibold uppercase tracking-wide transition-colors"
        >
          <Compass className="size-4" />
          Buscar produto
        </Link>
        <a
          href={siteConfig.store.whatsappLink}
          target="_blank"
          rel="noopener"
          className="border-border hover:bg-secondary inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm font-semibold uppercase tracking-wide transition-colors"
        >
          <MessageCircle className="size-4" />
          Falar no WhatsApp
        </a>
      </div>
    </section>
  )
}
