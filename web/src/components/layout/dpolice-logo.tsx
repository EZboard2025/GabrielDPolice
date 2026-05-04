import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  priority?: boolean
  /**
   * - `default`: texto preto (fundo claro)
   * - `inverse`: texto branco (fundo escuro)
   */
  variant?: 'default' | 'inverse'
}

const sources = {
  default: { src: '/logo.png', width: 2500, height: 2500 },
  inverse: { src: '/logo-inverse.png', width: 320, height: 192 },
}

export function DPoliceLogo({ className, priority, variant = 'default' }: Props) {
  const { src, width, height } = sources[variant]
  return (
    <Image
      src={src}
      alt="D'Police"
      width={width}
      height={height}
      priority={priority}
      className={cn('h-12 w-auto', className)}
    />
  )
}
