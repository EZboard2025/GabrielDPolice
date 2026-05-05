import type { Metadata } from 'next'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Loja física',
  description: `Visite a ${siteConfig.name} no Prado, Belo Horizonte/MG.`,
}

export default function LojaFisicaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Atendimento presencial"
        title="Loja física no Prado, BH"
        description="Atendimento presencial, prova de uniformes, retirada de pedidos online e venda direta."
      />

      <section className="container-wide grid gap-8 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5 text-sm">
          <ul className="border-border divide-border bg-card divide-y rounded-lg border">
            <li className="flex items-start gap-3 p-4">
              <MapPin className="text-brand mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Endereço</p>
                <p className="font-medium leading-snug">{siteConfig.store.address}</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4">
              <Clock className="text-brand mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">
                  Funcionamento
                </p>
                <p className="font-medium leading-snug">{siteConfig.store.hours}</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4">
              <Phone className="text-brand mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Telefone</p>
                <a
                  href={`tel:${siteConfig.store.phone.replace(/\D/g, '')}`}
                  className="font-medium leading-snug hover:underline"
                >
                  {siteConfig.store.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4">
              <MessageCircle className="text-brand mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">WhatsApp</p>
                <a
                  href={siteConfig.store.whatsappLink}
                  target="_blank"
                  rel="noopener"
                  className="font-medium leading-snug hover:underline"
                >
                  {siteConfig.store.whatsapp}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4">
              <Mail className="text-brand mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">E-mail</p>
                <a
                  href={`mailto:${siteConfig.store.email}`}
                  className="font-medium leading-snug hover:underline"
                >
                  {siteConfig.store.email}
                </a>
              </div>
            </li>
          </ul>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.store.mapsQuery)}`}
            target="_blank"
            rel="noopener"
            className="bg-brand text-brand-foreground hover:bg-brand/90 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            Como chegar
          </a>
        </div>

        <div className="bg-tactical-charcoal min-h-[420px] overflow-hidden rounded-lg">
          <iframe
            title={`Mapa — ${siteConfig.name}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.store.mapsQuery)}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[420px] w-full grayscale-[10%] contrast-110"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      </section>
    </>
  )
}
