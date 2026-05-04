import type { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { EmptyState } from '@/components/layout/empty-state'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Carrinho',
  description: 'Itens do seu carrinho na D Police.',
  robots: { index: false },
}

export default function CarrinhoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sua compra"
        title="Carrinho"
        description="Revise os itens, calcule o frete e finalize o pedido."
      />
      <section className="container-wide grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <div>
          <EmptyState
            icon={ShoppingBag}
            title="Seu carrinho está vazio"
            description="Adicione itens da loja e eles vão aparecer aqui pra você revisar antes de fechar a compra."
            cta={{ label: 'Continuar comprando', href: '/' }}
          />
        </div>

        <aside className="border-border bg-card h-fit space-y-3 rounded-lg border p-5 text-sm">
          <h2 className="text-base font-semibold">Resumo</h2>
          <div className="text-muted-foreground flex justify-between">
            <span>Subtotal</span>
            <span>R$ 0,00</span>
          </div>
          <div className="text-muted-foreground flex justify-between">
            <span>Frete</span>
            <span>—</span>
          </div>
          <div className="border-border flex justify-between border-t pt-3 text-base font-semibold">
            <span>Total</span>
            <span>R$ 0,00</span>
          </div>
          <p className="text-muted-foreground pt-2 text-xs">
            {siteConfig.payment.installmentsLabel} no cartão.{' '}
            {siteConfig.shipping.freeAboveLabel.toLowerCase()}.
          </p>
          <Link
            href="/"
            className="border-border hover:bg-secondary mt-2 inline-flex h-10 w-full items-center justify-center rounded-md border text-xs font-semibold uppercase tracking-wide transition-colors"
          >
            Continuar comprando
          </Link>
        </aside>
      </section>
    </>
  )
}
