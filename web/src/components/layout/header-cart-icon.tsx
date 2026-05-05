'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { selectCartCount, useCart } from '@/features/cart/cart-store'
import { useHasHydrated } from '@/features/cart/use-has-hydrated'

export function HeaderCartIcon() {
  const count = useCart(selectCartCount)
  const hydrated = useHasHydrated()
  const display = hydrated ? count : 0

  return (
    <Link
      href="/carrinho"
      aria-label={`Carrinho com ${display} ${display === 1 ? 'item' : 'itens'}`}
      className="hover:bg-muted text-foreground bg-secondary relative inline-flex size-11 items-center justify-center rounded-md transition-colors"
    >
      <ShoppingBag className="size-5" />
      <span
        suppressHydrationWarning
        className="bg-brand text-brand-foreground absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold"
      >
        {display}
      </span>
    </Link>
  )
}
