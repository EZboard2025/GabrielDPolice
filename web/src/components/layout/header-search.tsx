'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Props = { className?: string }

export function HeaderSearch({ className }: Props) {
  const [query, setQuery] = useState('')

  return (
    <form
      role="search"
      action="/buscar"
      className={cn('group relative flex w-full items-center', className)}
    >
      <Search className="text-muted-foreground pointer-events-none absolute left-3 size-4" />
      <Input
        name="q"
        placeholder="Busque por coturno, gandola, coldre…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-card/95 focus-visible:ring-brand/30 h-11 pl-9 pr-24 text-sm shadow-sm"
        aria-label="Buscar produtos"
      />
      <button
        type="submit"
        className="bg-brand text-brand-foreground hover:bg-brand/90 absolute right-1 top-1 inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold uppercase tracking-wide transition-colors"
      >
        Buscar
      </button>
    </form>
  )
}
