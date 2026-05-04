import Image from 'next/image'
import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'
import type { Product, ProductBadge } from '@/types'
import { discountPercent, formatBRL, installments } from '@/lib/format'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const badgeStyles: Record<ProductBadge, string> = {
  lancamento: 'bg-tactical-olive text-white',
  'mais-vendido': 'bg-brand text-brand-foreground',
  oferta: 'bg-destructive/90 text-white',
  restrito: 'bg-tactical-charcoal text-tactical-tan',
}

const badgeLabel: Record<ProductBadge, string> = {
  lancamento: 'Lançamento',
  'mais-vendido': 'Mais vendido',
  oferta: 'Oferta',
  restrito: 'Restrito',
}

type Props = {
  product: Product
  priority?: boolean
  className?: string
}

export function ProductCard({ product, priority, className }: Props) {
  const off = product.comparePrice ? discountPercent(product.price, product.comparePrice) : 0
  const cover = product.images[0]

  return (
    <Link
      href={`/produto/${product.slug}`}
      className={cn(
        'group bg-card border-border relative flex flex-col overflow-hidden rounded-lg border transition-all',
        'hover:border-brand/40 hover:shadow-lg hover:shadow-black/5',
        className,
      )}
    >
      <div className="bg-muted/50 relative aspect-square overflow-hidden">
        <Image
          src={cover.url}
          alt={cover.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges?.map((b) => (
            <span
              key={b}
              className={cn(
                'inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                badgeStyles[b],
              )}
            >
              {b === 'restrito' && <ShieldAlert className="size-3" />}
              {badgeLabel[b]}
            </span>
          ))}
        </div>

        {off > 0 && (
          <div className="bg-destructive absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white shadow">
            -{off}%
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-muted-foreground text-[11px] uppercase tracking-wider">
          {product.category.name}
        </p>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight">
          {product.name}
        </h3>

        <div className="mt-auto space-y-0.5 pt-2">
          {product.comparePrice && product.comparePrice > product.price && (
            <p className="text-muted-foreground text-xs line-through">
              {formatBRL(product.comparePrice)}
            </p>
          )}
          <p className="text-foreground text-base font-bold">{formatBRL(product.price)}</p>
          <p className="text-muted-foreground text-[11px]">
            {installments(product.price, siteConfig.payment.installments)}
          </p>
        </div>
      </div>
    </Link>
  )
}
