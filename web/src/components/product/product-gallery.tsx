'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types'

type Props = {
  images: ProductImage[]
  discount?: number
}

export function ProductGallery({ images, discount = 0 }: Props) {
  const [active, setActive] = useState(0)
  const safeIndex = Math.min(active, images.length - 1)
  const main = images[safeIndex]

  if (!main) return null

  return (
    <div className="space-y-3">
      <div className="bg-muted/40 border-border relative aspect-square overflow-hidden rounded-lg border">
        <Image
          key={main.url}
          src={main.url}
          alt={main.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="animate-in fade-in object-contain p-6 duration-200"
        />
        {discount > 0 && (
          <span className="bg-destructive pointer-events-none absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow">
            -{discount}%
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((img, i) => {
            const isActive = i === safeIndex
            return (
              <button
                key={`${img.url}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-label={`Ver imagem ${i + 1} de ${images.length}`}
                aria-pressed={isActive}
                className={cn(
                  'bg-muted/40 relative aspect-square overflow-hidden rounded-md border-2 transition-all',
                  isActive
                    ? 'border-brand ring-brand/20 ring-2'
                    : 'border-border hover:border-foreground/40',
                )}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="120px"
                  className="object-contain p-2"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
