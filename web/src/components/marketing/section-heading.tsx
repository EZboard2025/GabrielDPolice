import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  ctaHref?: string
  ctaLabel?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel = 'Ver todos',
  className,
  align = 'left',
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className="space-y-1">
        {eyebrow && (
          <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        {description && (
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">{description}</p>
        )}
      </div>
      {ctaHref && (
        <Link
          href={ctaHref}
          className="text-brand whitespace-nowrap text-xs font-semibold uppercase tracking-wider hover:underline"
        >
          {ctaLabel} →
        </Link>
      )}
    </div>
  )
}
