import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Atendimento',
  description: 'Fale com a D Police por WhatsApp, telefone ou na loja física.',
}

const channels = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Resposta na hora em horário comercial.',
    cta: { label: siteConfig.store.whatsapp, href: siteConfig.store.whatsappLink, external: true },
    accent: 'bg-[#25D366]/15 text-[#25D366]',
  },
  {
    icon: Phone,
    title: 'Telefone',
    description: 'Ligue pra falar direto com a loja.',
    cta: {
      label: siteConfig.store.phone,
      href: `tel:${siteConfig.store.phone.replace(/\D/g, '')}`,
    },
    accent: 'bg-brand/15 text-brand',
  },
  {
    icon: MapPin,
    title: 'Loja física',
    description: 'Atendimento presencial e retirada de pedidos.',
    cta: { label: 'Ver endereço e mapa', href: '/loja-fisica' },
    accent: 'bg-tactical-olive/15 text-tactical-olive',
  },
]

const faqs = [
  {
    q: 'Em quantos dias chega?',
    a: 'Depende do CEP, do tipo de envio e do estoque. SEDEX leva em média 2-4 dias úteis pro Sudeste, PAC 4-7. Em BH e região metropolitana fazemos entrega mais rápida via transportadora própria.',
  },
  {
    q: 'Tem como retirar na loja?',
    a: 'Sim. Após o pagamento aprovado, o pedido fica disponível pra retirada em até 2h em horário comercial. Você recebe um aviso por WhatsApp.',
  },
  {
    q: 'Posso trocar se não servir?',
    a: 'Pode. O prazo é de 7 dias para arrependimento (CDC) e 30 dias para defeito de fabricação. O item deve estar sem uso, com etiqueta e na embalagem original.',
  },
  {
    q: 'Quais formas de pagamento aceitam?',
    a: `${siteConfig.payment.methods.join(', ')}. ${siteConfig.payment.installmentsLabel} no cartão.`,
  },
  {
    q: 'Como funciona com produtos restritos?',
    a: 'Itens com restrição legal (uniformes oficiais, distintivos, algemas, etc.) exigem documentação válida no momento da entrega. Detalhes na página "Produtos restritos".',
  },
]

export default function AtendimentoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Estamos aqui"
        title="Central de atendimento"
        description={`Resposta rápida em horário comercial. ${siteConfig.store.hours}.`}
      />

      <section className="container-wide py-10">
        <div className="grid gap-4 md:grid-cols-3">
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
                    className="text-brand mt-4 inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:underline"
                  >
                    {cta.label} →
                  </a>
                ) : (
                  <Link
                    href={cta.href}
                    className="text-brand mt-4 inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:underline"
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
