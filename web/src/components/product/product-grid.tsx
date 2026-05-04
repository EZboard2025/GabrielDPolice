import type { Product } from '@/types'
import { ProductCard } from './product-card'
import { cn } from '@/lib/utils'

type Props = {
  products: Product[]
  className?: string
  priorityCount?: number
}

export function ProductGrid({ products, className, priorityCount = 0 }: Props) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5',
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  )
}
