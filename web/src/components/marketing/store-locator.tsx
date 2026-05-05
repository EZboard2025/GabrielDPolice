import Link from 'next/link'
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function StoreLocator() {
  return (
    <section className="container-wide py-14">
      <div className="bg-card border-border grid overflow-hidden rounded-xl border md:grid-cols-2">
        <div className="space-y-5 p-8 md:p-12">
          <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">
            Loja física
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Visite a gente em Belo Horizonte
          </h2>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            Atendimento presencial, prova de uniformes, retirada de pedidos online e avaliação de
            produtos restritos com nossa equipe.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-brand mt-0.5 size-4 shrink-0" />
              <span>{siteConfig.store.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-brand size-4 shrink-0" />
              <a
                href={`tel:${siteConfig.store.phone.replace(/\D/g, '')}`}
                className="hover:underline"
              >
                {siteConfig.store.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="text-brand size-4 shrink-0" />
              <a
                href={siteConfig.store.whatsappLink}
                target="_blank"
                rel="noopener"
                className="hover:underline"
              >
                {siteConfig.store.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="text-brand size-4 shrink-0" />
              {siteConfig.store.hours}
            </li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                siteConfig.store.mapsQuery,
              )}`}
              target="_blank"
              rel="noopener"
              className="bg-brand text-brand-foreground hover:bg-brand/90 inline-flex h-11 items-center rounded-md px-5 text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              Como chegar
            </a>
            <Link
              href="/loja-fisica"
              className="border-border hover:bg-muted inline-flex h-11 items-center rounded-md border px-5 text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              Mais detalhes
            </Link>
          </div>
        </div>

        <div className="bg-tactical-charcoal relative min-h-[320px] md:min-h-full">
          <iframe
            title={`Mapa — ${siteConfig.name} no Prado, BH`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              siteConfig.store.mapsQuery,
            )}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[20%] contrast-110"
            style={{ border: 0 }}
            allowFullScreen
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              siteConfig.store.mapsQuery,
            )}`}
            target="_blank"
            rel="noopener"
            className="bg-tactical-charcoal/90 text-background hover:bg-tactical-charcoal absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide backdrop-blur transition-colors"
          >
            <MapPin className="size-3.5" />
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
