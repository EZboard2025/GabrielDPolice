import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CtaLink = { label: string; href: string }
type CtaAction = { label: string; onClick: () => void }
type Cta = CtaLink | CtaAction

type Props = {
  icon: LucideIcon
  title: string
  description?: string
  cta?: Cta
  className?: string
}

const ctaClasses =
  'bg-brand text-brand-foreground hover:bg-brand/90 mt-2 inline-flex h-10 items-center rounded-md px-4 text-xs font-semibold uppercase tracking-wide transition-colors'

export function EmptyState({ icon: Icon, title, description, cta, className }: Props) {
  return (
    <div
      className={cn(
        'border-border bg-card flex flex-col items-center justify-center gap-3 rounded-lg border p-10 text-center',
        className,
      )}
    >
      <div className="bg-muted text-muted-foreground inline-flex size-12 items-center justify-center rounded-full">
        <Icon className="size-5" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">{description}</p>
      )}
      {cta && ('href' in cta ? (
        <Link href={cta.href} className={ctaClasses}>
          {cta.label}
        </Link>
      ) : (
        <button type="button" onClick={cta.onClick} className={ctaClasses}>
          {cta.label}
        </button>
      ))}
    </div>
  )
}
