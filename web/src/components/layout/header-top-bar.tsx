import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function HeaderTopBar() {
  return (
    <div className="bg-tactical-charcoal text-background/90 hidden border-b border-white/5 text-xs md:block">
      <div className="container-wide flex h-9 items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5 opacity-80">
            <MapPin className="size-3.5" />
            Loja física no Prado, BH
          </span>
          <span className="hidden items-center gap-1.5 opacity-80 lg:inline-flex">
            <Clock className="size-3.5" />
            {siteConfig.store.hours}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.store.whatsappLink}
            target="_blank"
            rel="noopener"
            className="hover:text-background inline-flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle className="size-3.5" />
            {siteConfig.store.whatsapp}
          </a>
          <a
            href={`tel:${siteConfig.store.phone.replace(/\D/g, '')}`}
            className="hover:text-background inline-flex items-center gap-1.5 transition-colors"
          >
            <Phone className="size-3.5" />
            {siteConfig.store.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
