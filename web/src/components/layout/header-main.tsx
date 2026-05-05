import Link from 'next/link'
import { Heart, User } from 'lucide-react'
import { DPoliceLogo } from './dpolice-logo'
import { HeaderCartIcon } from './header-cart-icon'
import { HeaderSearch } from './header-search'

export function HeaderMain() {
  return (
    <div className="bg-background">
      <div className="container-wide flex h-24 items-center gap-6">
        <Link href="/" aria-label="D Police — Página inicial" className="shrink-0">
          <DPoliceLogo className="h-20 w-auto md:h-24" priority />
        </Link>

        <div className="hidden flex-1 md:block">
          <HeaderSearch />
        </div>

        <nav className="ml-auto flex items-center gap-1">
          <Link
            href="/conta"
            className="hover:bg-muted hover:text-foreground text-muted-foreground flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors"
          >
            <User className="size-5" />
            <span className="hidden flex-col leading-tight lg:flex">
              <span className="text-[10px] uppercase tracking-wider opacity-70">Olá!</span>
              <span className="text-sm font-medium">Entrar</span>
            </span>
          </Link>
          <Link
            href="/conta/desejos"
            aria-label="Lista de desejos"
            className="hover:bg-muted text-muted-foreground hover:text-foreground inline-flex size-11 items-center justify-center rounded-md transition-colors"
          >
            <Heart className="size-5" />
          </Link>
          <HeaderCartIcon />
        </nav>
      </div>

      <div className="container-wide pb-3 md:hidden">
        <HeaderSearch />
      </div>
    </div>
  )
}
