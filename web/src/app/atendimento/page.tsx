import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Atendimento',
  description: 'Fale com a D Police por WhatsApp, telefone, e-mail ou na loja física no Prado.',
}

const channels = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Tire dúvidas e faça pedidos.',
    cta: { label: siteConfig.store.whatsapp, href: siteConfig.store.whatsappLink, external: true },
    accent: 'bg-[#25D366]/15 text-[#25D366]',
  },
  {
    icon: Phone,
    title: 'Telefone',
    description: 'Ligue direto para a loja.',
    cta: {
      label: siteConfig.store.phone,
      href: `tel:${siteConfig.store.phone.replace(/\D/g, '')}`,
    },
    accent: 'bg-brand/15 text-brand',
  },
  {
    icon: Mail,
    title: 'E-mail',
    description: 'Envie sua mensagem por e-mail.',
    cta: {
      label: siteConfig.store.email,
      href: `mailto:${siteConfig.store.email}`,
    },
    accent: 'bg-tactical-olive/15 text-tactical-olive',
  },
  {
    icon: MapPin,
    title: 'Loja física',
    description: 'Atendimento presencial e retirada.',
    cta: { label: 'Ver endereço e mapa', href: '/loja-fisica' },
    accent: 'bg-tactical-tan/20 text-tactical-tan',
  },
]

const faqs = [
  {
    q: 'Como faço meu pedido?',
    a: 'Você pode comprar diretamente pelo site ou nos chamar pelo WhatsApp. Para retirada na loja física, basta passar no Prado em horário comercial.',
  },
  {
    q: 'Quais formas de pagamento?',
    a: `Aceitamos cartão de crédito (Rede), com parcelamento ${siteConfig.payment.installmentsLabel.toLowerCase()}.`,
  },
  {
    q: 'Posso trocar se o tamanho não servir?',
    a: `Pode. A política de troca é de até ${siteConfig.exchange.exchangeDays} dias após o recebimento, por defeito de fabricação ou problema de tamanho. O produto deve estar sem indícios de uso, com etiqueta, NF e embalagem original. Para trocas, fale conosco no WhatsApp ${siteConfig.store.whatsappTrocas}.`,
  },
  {
    q: 'E se eu desistir da compra?',
    a: `Você tem ${siteConfig.exchange.returnDays} dias úteis para arrependimento, conforme o Código de Defesa do Consumidor. O produto deve voltar intacto, com etiquetas, embalagem original e NF.`,
  },
  {
    q: 'Qual o prazo de entrega?',
    a: 'O prazo varia conforme o CEP, o tipo de envio e a disponibilidade do produto. Antes de fechar a compra, fale conosco pelo WhatsApp para confirmar o prazo do seu endereço.',
  },
  {
    q: 'Como funciona a entrega? O que verificar no recebimento?',
    a: 'Recuse o pedido se a embalagem estiver aberta ou avariada, se o produto estiver danificado, se não for o que você comprou, ou se faltar algum acessório. Em qualquer dessas situações, entre em contato conosco.',
  },
]

export default function AtendimentoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Estamos aqui"
        title="Central de atendimento"
        description={`${siteConfig.store.hours}.`}
      />

      <section className="container-wide py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => {
            const cta = c.cta
            const isExternal = 'external' in cta && cta.external
            return (
              <div key={c.title} className="border-border bg-card rounded-lg border p-6">
                <div
                  className={`inline-flex size-11 items-center justify-center rounded-full ${c.accent}`}
                >
                  <c.icon className="size-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold">{c.title}</h2>
                <p className="text-muted-foreground mt-1 text-sm">{c.description}</p>
                {isExternal ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener"
                    className="text-brand mt-4 inline-flex items-center text-sm font-semibold hover:underline"
                  >
                    {cta.label} →
                  </a>
                ) : (
                  <Link
                    href={cta.href}
                    className="text-brand mt-4 inline-flex items-center text-sm font-semibold hover:underline"
                  >
                    {cta.label} →
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12">
          <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">FAQ</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Perguntas frequentes</h2>
          <div className="border-border bg-card divide-border mt-6 divide-y rounded-lg border">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="hover:bg-secondary/50 flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-semibold transition-colors">
                  {f.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="bg-tactical-charcoal text-background mt-12 flex flex-col gap-4 rounded-xl p-6 text-sm md:flex-row md:items-center md:justify-between">
          <div className="inline-flex items-center gap-3">
            <Clock className="text-tactical-tan size-5" />
            <span>{siteConfig.store.hours}</span>
          </div>
          <a
            href={siteConfig.store.whatsappLink}
            target="_blank"
            rel="noopener"
            className="bg-tactical-tan text-tactical-charcoal hover:bg-tactical-tan/90 inline-flex h-10 items-center rounded-md px-4 text-xs font-semibold uppercase tracking-wide transition-colors"
          >
            Falar agora no WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
