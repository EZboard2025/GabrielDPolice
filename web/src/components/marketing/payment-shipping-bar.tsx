import { CreditCard, MapPin, MessageCircle, RefreshCcw, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const items = [
  {
    icon: CreditCard,
    title: siteConfig.payment.installmentsLabel,
    description: 'No cartão de crédito',
  },
  {
    icon: RefreshCcw,
    title: `Troca em ${siteConfig.exchange.exchangeDays} dias`,
    description: 'Por defeito ou problema de tamanho',
  },
  {
    icon: ShieldCheck,
    title: 'Compra segura',
    description: 'SSL 256 bits + criptografia',
  },
  {
    icon: MapPin,
    title: 'Loja física em BH',
    description: siteConfig.store.address.split(',').slice(0, 2).join(',').trim(),
  },
  {
    icon: MessageCircle,
    title: 'Atendimento WhatsApp',
    description: siteConfig.store.whatsapp,
  },
]

function Item({ item }: { item: (typeof items)[number] }) {
  const Icon = item.icon
  return (
    <div className="flex shrink-0 items-center gap-3 px-6">
      <div className="bg-brand/10 text-brand inline-flex size-11 shrink-0 items-center justify-center rounded-full">
        <Icon className="size-5" />
      </div>
      <div className="whitespace-nowrap">
        <p className="text-sm font-semibold leading-tight">{item.title}</p>
        <p className="text-muted-foreground text-xs leading-tight">{item.description}</p>
      </div>
    </div>
  )
}

export function PaymentShippingBar() {
  return (
    <section
      aria-label="Vantagens da loja"
      className="bg-secondary/40 border-border border-y overflow-hidden"
    >
      <div className="marquee-mask group relative">
        <div className="animate-marquee group-hover:[animation-play-state:paused] flex w-max py-7">
          {items.map((item) => (
            <Item key={item.title} item={item} />
          ))}
          {items.map((item) => (
            <Item key={`dup-${item.title}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
