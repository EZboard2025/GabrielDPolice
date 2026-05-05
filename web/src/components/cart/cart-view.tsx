'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { EmptyState } from '@/components/layout/empty-state'
import {
  selectCartCount,
  selectCartSubtotal,
  useCart,
  type CartItem,
} from '@/features/cart/cart-store'
import { useHasHydrated } from '@/features/cart/use-has-hydrated'
import { formatBRL, installments } from '@/lib/format'
import { siteConfig } from '@/lib/site-config'

export function CartView() {
  const items = useCart((s) => s.items)
  const count = useCart(selectCartCount)
  const subtotal = useCart(selectCartSubtotal)
  const setQuantity = useCart((s) => s.setQuantity)
  const removeItem = useCart((s) => s.removeItem)
  const clear = useCart((s) => s.clear)
  const hydrated = useHasHydrated()

  if (!hydrated) {
    return (
      <div className="container-wide py-10">
        <div className="border-border bg-card animate-pulse h-32 rounded-lg border" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <section className="container-wide py-10">
        <EmptyState
          icon={ShoppingBag}
          title="Seu carrinho está vazio"
          description="Adicione itens da loja e eles vão aparecer aqui pra você revisar antes de fechar a compra."
          cta={{ label: 'Continuar comprando', href: '/' }}
        />
      </section>
    )
  }

  return (
    <section className="container-wide grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        <div className="border-border bg-card divide-border divide-y rounded-lg border">
          {items.map((item) => (
            <Row
              key={item.slug}
              item={item}
              onInc={() => setQuantity(item.slug, item.quantity + 1)}
              onDec={() => setQuantity(item.slug, item.quantity - 1)}
              onRemove={() => {
                removeItem(item.slug)
                toast.success(`${item.name} removido do carrinho`)
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-xs uppercase tracking-wider transition-colors"
          >
            ← Continuar comprando
          </Link>
          <button
            type="button"
            onClick={() => {
              clear()
              toast.success('Carrinho esvaziado')
            }}
            className="text-muted-foreground hover:text-destructive inline-flex items-center gap-1.5 text-xs uppercase tracking-wider transition-colors"
          >
            <Trash2 className="size-3.5" />
            Esvaziar carrinho
          </button>
        </div>
      </div>

      <aside className="border-border bg-card h-fit space-y-3 rounded-lg border p-5 text-sm lg:sticky lg:top-44">
        <h2 className="text-base font-semibold">Resumo</h2>
        <div className="text-muted-foreground flex justify-between">
          <span>
            {count} {count === 1 ? 'item' : 'itens'}
          </span>
          <span>{formatBRL(subtotal)}</span>
        </div>
        <div className="text-muted-foreground flex justify-between">
          <span>Frete</span>
          <span>Calculado no checkout</span>
        </div>
        <div className="border-border flex justify-between border-t pt-3 text-base font-semibold">
          <span>Total</span>
          <span>{formatBRL(subtotal)}</span>
        </div>
        <p className="text-muted-foreground text-xs">
          ou {installments(subtotal, siteConfig.payment.installments)}
        </p>
        <button
          type="button"
          disabled
          className="bg-brand text-brand-foreground hover:bg-brand/90 mt-2 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-semibold uppercase tracking-wide transition-colors disabled:opacity-60"
        >
          Finalizar compra
        </button>
        <p className="text-muted-foreground text-center text-[11px]">
          Checkout será habilitado quando o backend estiver pronto.
        </p>
      </aside>
    </section>
  )
}

type RowProps = {
  item: CartItem
  onInc: () => void
  onDec: () => void
  onRemove: () => void
}

function Row({ item, onInc, onDec, onRemove }: RowProps) {
  return (
    <div className="flex gap-4 p-4">
      <Link
        href={`/produto/${item.slug}`}
        className="bg-muted/40 border-border relative size-20 shrink-0 overflow-hidden rounded-md border"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-contain p-2"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-muted-foreground text-[11px] uppercase tracking-wider">
          {item.category}
        </p>
        <Link
          href={`/produto/${item.slug}`}
          className="hover:text-brand line-clamp-2 text-sm font-medium leading-tight transition-colors"
        >
          {item.name}
        </Link>
        <p className="text-foreground mt-1 text-sm font-bold">{formatBRL(item.price)}</p>
      </div>

      <div className="flex flex-col items-end justify-between gap-2">
        <div className="border-border inline-flex items-center rounded-md border">
          <button
            type="button"
            onClick={onDec}
            aria-label="Diminuir quantidade"
            className="hover:bg-secondary inline-flex size-8 items-center justify-center transition-colors"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            type="button"
            onClick={onInc}
            aria-label="Aumentar quantidade"
            className="hover:bg-secondary inline-flex size-8 items-center justify-center transition-colors"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remover do carrinho"
          className="text-muted-foreground hover:text-destructive inline-flex items-center gap-1 text-xs transition-colors"
        >
          <Trash2 className="size-3.5" />
          Remover
        </button>
      </div>
    </div>
  )
}
