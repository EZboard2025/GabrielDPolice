import type { Metadata } from 'next'
import { CartView } from '@/components/cart/cart-view'
import { PageHeader } from '@/components/layout/page-header'

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
        description="Revise os itens, ajuste quantidades e siga para o pagamento."
      />
      <CartView />
    </>
  )
}
