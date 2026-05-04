import { HeaderMain } from './header-main'
import { HeaderNav } from './header-nav'
import { HeaderTopBar } from './header-top-bar'

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full">
      <HeaderTopBar />
      <HeaderMain />
      <HeaderNav />
    </header>
  )
}
