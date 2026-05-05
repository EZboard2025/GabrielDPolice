'use client'

import { useEffect, useState } from 'react'
import { useCart } from './cart-store'

/**
 * Evita hydration mismatch do Zustand persist com SSR.
 * Retorna true só depois que o store leu o localStorage no client.
 */
export function useHasHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    if (useCart.persist.hasHydrated()) {
      setHydrated(true)
      return
    }
    const unsub = useCart.persist.onFinishHydration(() => setHydrated(true))
    return unsub
  }, [])
  return hydrated
}
