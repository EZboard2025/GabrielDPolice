import { CreditCard, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'

const items = [
  {
    icon: Truck,
    title: 'Frete grátis',
    description: 'Em compras acima de R$ 300',
  },
  {
    icon: CreditCard,
    title: '6x sem juros',
    description: 'No cartão de crédito ou PIX',
  },
  {
    icon: ShieldCheck,
    title: 'Compra segura',
    description: 'SSL 256 bits + criptografia ponta a ponta',
  },
  {
    icon: ShoppingBag,
    title: 'Loja física em BH',
    description: 'Retirada no Prado em até 2h',
  },
]

export function PaymentShippingBar() {
  return (
    <section className="bg-secondary/40 border-border border-y">
      <div className="container-wide grid grid-cols-2 gap-6 py-7 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div className="bg-brand/10 text-brand inline-flex size-11 shrink-0 items-center justify-center rounded-full">
              <item.icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">{item.title}</p>
              <p className="text-muted-foreground text-xs leading-tight">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
