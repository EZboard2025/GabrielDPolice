import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, MessageCircle, RefreshCcw, Truck, XCircle } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Trocas e devoluções',
  description: `Como funcionam trocas e devoluções na ${siteConfig.name}.`,
}

const ok = [
  'Item sem uso, com etiqueta original',
  'Embalagem do fabricante preservada',
  'Solicitação dentro do prazo (7 ou 30 dias)',
  'Comprovante de compra (pedido ou nota)',
]

const not = [
  'Itens íntimos (cuecas, meias) por questões sanitárias',
  'Produtos personalizados (bordados, gravações)',
  'Distintivos e insígnias após uso',
  'Itens danificados por uso inadequado',
]

const steps = [
  {
    title: 'Abra o chamado',
    body: `Fale com a gente pelo WhatsApp ${siteConfig.store.whatsapp} ou e-mail (em breve), informando o número do pedido.`,
  },
  {
    title: 'Receba a etiqueta de retorno',
    body: 'Te enviamos a etiqueta paga via Melhor Envio. Postagem em qualquer agência dos Correios.',
  },
  {
    title: 'Inspeção',
    body: 'Em até 5 dias úteis após o recebimento, conferimos o item e te avisamos.',
  },
  {
    title: 'Reembolso ou troca',
    body: 'Reembolso na mesma forma de pagamento em até 10 dias úteis. Troca: enviamos o item novo com frete por nossa conta.',
  },
]

export default function TrocasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pós-venda"
        title="Política de trocas e devoluções"
        description="A gente faz questão que você fique satisfeito. Confira como pedir troca ou devolução."
      />

      <section className="container-wide max-w-4xl py-12">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-border bg-card rounded-lg border p-6">
            <RefreshCcw className="text-brand mb-3 size-5" />
            <h2 className="text-lg font-semibold">Arrependimento</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Você tem <span className="text-foreground font-bold">7 dias corridos</span> a partir
              do recebimento pra desistir da compra (Art. 49 do CDC), sem precisar justificar.
            </p>
          </div>
          <div className="border-border bg-card rounded-lg border p-6">
            <Truck className="text-brand mb-3 size-5" />
            <h2 className="text-lg font-semibold">Defeito de fabricação</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Prazo de <span className="text-foreground font-bold">30 dias</span> pra produtos
              não-duráveis e <span className="text-foreground font-bold">90 dias</span> pra
              duráveis (Art. 26 do CDC), contados da entrega.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold">O que aceitamos</h3>
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
            <h3 className="text-base font-semibold">O que não dá pra trocar</h3>
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

        <div className="mt-12">
          <h3 className="text-xl font-bold tracking-tight">Como solicitar</h3>
          <ol className="border-border bg-card divide-border mt-4 divide-y rounded-lg border">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 p-5">
                <span className="bg-brand text-brand-foreground inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-tactical-charcoal text-background mt-10 flex flex-col gap-4 rounded-xl p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">Precisa de ajuda agora?</p>
            <p className="text-background/70 text-sm">
              Nossa equipe responde em horário comercial pelo WhatsApp.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={siteConfig.store.whatsappLink}
              target="_blank"
              rel="noopener"
              className="bg-tactical-tan text-tactical-charcoal hover:bg-tactical-tan/90 inline-flex h-10 items-center gap-1.5 rounded-md px-4 text-xs font-semibold uppercase tracking-wide transition-colors"
            >
              <MessageCircle className="size-4" />
              WhatsApp
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
