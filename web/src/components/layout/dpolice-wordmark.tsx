import { cn } from '@/lib/utils'

type Props = {
  className?: string
  variant?: 'default' | 'mono' | 'inverse'
}

export function DPoliceWordmark({ className, variant = 'default' }: Props) {
  const colors = {
    default: { d: 'fill-brand', police: 'fill-foreground' },
    mono: { d: 'fill-foreground', police: 'fill-foreground' },
    inverse: { d: 'fill-background', police: 'fill-background' },
  }[variant]

  return (
    <svg
      viewBox="0 0 220 44"
      className={cn('h-8 w-auto', className)}
      role="img"
      aria-label="D Police"
    >
      <g>
        <path
          className={colors.d}
          d="M0 4h18.5c11.7 0 19.5 8 19.5 18s-7.8 18-19.5 18H0V4zm10 8v20h7.5c6.4 0 10.5-4 10.5-10s-4.1-10-10.5-10H10z"
        />
        <text
          x="46"
          y="32"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="26"
          letterSpacing="2"
          className={colors.police}
        >
          POLICE
        </text>
        <rect x="46" y="36" width="8" height="2" className={colors.d} />
      </g>
    </svg>
  )
}
