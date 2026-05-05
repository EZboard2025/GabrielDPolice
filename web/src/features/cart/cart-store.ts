'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  slug: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (slug: string) => void
  setQuantity: (slug: string, qty: number) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === item.slug)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === item.slug ? { ...i, quantity: i.quantity + qty } : i,
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: qty }] }
        }),
      removeItem: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),
      setQuantity: (slug, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.slug !== slug)
              : state.items.map((i) => (i.slug === slug ? { ...i, quantity: qty } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'dpolice-cart',
      version: 1,
    },
  ),
)

export const selectCartCount = (s: CartState) =>
  s.items.reduce((acc, i) => acc + i.quantity, 0)

export const selectCartSubtotal = (s: CartState) =>
  s.items.reduce((acc, i) => acc + i.quantity * i.price, 0)
