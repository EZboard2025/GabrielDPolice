import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, MessageCircle, RefreshCcw, Undo2, XCircle } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Trocas e devoluções',
  description: `Política de trocas e devoluções da ${siteConfig.name}.`,
}

const ok = [
  'Produto sem indícios de uso',
  'Etiquetas e tags originais',
  'Embalagem original preservada',
  'Nota Fiscal',
]

const not = [
  'Itens com sinais de uso',
  'Produtos sem etiqueta ou embalagem original',
  'Itens fora do prazo (30 dias troca / 7 dias úteis devolução)',
]

export default function TrocasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pós-venda"
        title="Trocas e devoluções"
        description="Confira abaixo as condições e prazos para trocar ou devolver um produto."
      />

      <section className="container-wide max-w-4xl py-12">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-border bg-card rounded-lg border p-6">
            <RefreshCcw className="text-brand mb-3 size-5" />
            <h2 className="text-lg font-semibold">Troca</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Prazo de{' '}
              <span className="text-foreground font-bold">
                {siteConfig.exchange.exchangeDays} dias corridos
              </span>{' '}
              após o recebimento, por <span className="text-foreground">defeito de fabricação</span>{' '}
              comprovado ou <span className="text-foreground">problema de tamanho</span>.
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Você pode optar por: produto idêntico, produto de mesmo valor, produto de valor
              superior (paga a diferença) ou voucher de desconto se o item estiver indisponível.
            </p>
          </div>
          <div className="border-border bg-card rounded-lg border p-6">
            <Undo2 className="text-brand mb-3 size-5" />
            <h2 className="text-lg font-semibold">Devolução</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Prazo de{' '}
              <span className="text-foreground font-bold">
                {siteConfig.exchange.returnDays} dias úteis
              </span>{' '}
              após o recebimento, conforme o Código de Defesa do Consumidor (direito de
              arrependimento).
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Aceito por arrependimento ou defeito de fabricação.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold">Condições aceitas</h3>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
              {ok.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold">Não aceitamos</h3>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
              {not.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="text-destructive mt-0.5 size-4 shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-tactical-charcoal text-background mt-10 flex flex-col gap-4 rounded-xl p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">Como solicitar</p>
            <p className="text-background/70 text-sm">
              Fale com a gente pelo WhatsApp dedicado a trocas: {siteConfig.store.whatsappTrocas}.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={siteConfig.store.whatsappTrocasLink}
              target="_blank"
              rel="noopener"
              className="bg-tactical-tan text-tactical-charcoal hover:bg-tactical-tan/90 inline-flex h-10 items-center gap-1.5 rounded-md px-4 text-xs font-semibold uppercase tracking-wide transition-colors"
            >
              <MessageCircle className="size-4" />
              WhatsApp Trocas
            </a>
            <Link
              href="/atendimento"
              className="border-background/30 hover:bg-background/10 inline-flex h-10 items-center rounded-md border px-4 text-xs font-semibold uppercase tracking-wide transition-colors"
            >
              Atendimento
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
