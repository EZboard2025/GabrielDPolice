'use client'

import { Check, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useCart } from '@/features/cart/cart-store'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

type Props = {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className }: Props) {
  const addItem = useCart((s) => s.addItem)
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url ?? '/placeholder-product.svg',
      category: product.category.name,
    })
    toast.success(`${product.name} adicionado ao carrinho`, {
      action: {
        label: 'Ver carrinho',
        onClick: () => {
          window.location.href = '/carrinho'
        },
      },
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={cn(
        'inline-flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold uppercase tracking-wide transition-all',
        justAdded
          ? 'bg-success text-white'
          : 'bg-brand text-brand-foreground hover:bg-brand/90',
        className,
      )}
    >
      {justAdded ? (
        <>
          <Check className="size-5" />
          Adicionado
        </>
      ) : (
        <>
          <ShoppingBag className="size-5" />
          Adicionar ao carrinho
        </>
      )}
    </button>
  )
}
