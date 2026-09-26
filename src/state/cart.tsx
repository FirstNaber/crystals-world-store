import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { PRODUCTS } from '../data/products'
import { SITE } from '../data/site'

/** A cart line is either a catalog piece or a gift card of a chosen amount. */
export type Line = { key: string; slug?: string; giftCard?: number; qty: number }

interface CartCtx {
  lines: Line[]
  open: boolean
  setOpen: (o: boolean) => void
  addProduct: (slug: string) => void
  addGiftCard: (amount: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  count: number
  subtotal: number
  price: (l: Line) => number
  title: (l: Line) => string
}

const Ctx = createContext<CartCtx | null>(null)
const KEY = 'cw-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
  })
  const [open, setOpen] = useState(false)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch { /* private mode */ } }, [lines])

  const api = useMemo<CartCtx>(() => {
    const product = (slug?: string) => PRODUCTS.find((p) => p.slug === slug)
    const price = (l: Line) => (l.giftCard ?? product(l.slug)?.price ?? 0)
    return {
      lines, open, setOpen,
      addProduct: (slug) => {
        const p = product(slug); if (!p || p.sold || p.stock < 1) return
        setLines((ls) => {
          const cur = ls.find((l) => l.key === slug)
          // never let a cart hold more than we have (one-of-a-kind pieces cap at 1)
          const next = Math.min((cur?.qty ?? 0) + 1, p.stock, p.oneOfAKind ? 1 : 99)
          return cur ? ls.map((l) => (l.key === slug ? { ...l, qty: next } : l)) : [...ls, { key: slug, slug, qty: 1 }]
        })
        setOpen(true)
      },
      addGiftCard: (amount) => {
        setLines((ls) => {
          const key = `gift-${amount}`
          const cur = ls.find((l) => l.key === key)
          return cur ? ls.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { key, giftCard: amount, qty: 1 }]
        })
        setOpen(true)
      },
      setQty: (key, qty) => setLines((ls) => ls.map((l) => {
        if (l.key !== key) return l
        const p = product(l.slug)
        return { ...l, qty: Math.max(1, Math.min(qty, p ? Math.min(p.stock, p.oneOfAKind ? 1 : 99) : 99)) }
      })),
      remove: (key) => setLines((ls) => ls.filter((l) => l.key !== key)),
      clear: () => setLines([]),
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + price(l) * l.qty, 0),
      price,
      title: (l) => (l.giftCard ? `Gift card — $${l.giftCard}` : product(l.slug)?.name ?? 'Mystery rock'),
    }
  }, [lines, open])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export const useCart = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used inside <CartProvider>')
  return c
}

/** Shipping estimate for the demo. Real rates come from the store platform. */
export const shippingFor = (subtotal: number, mode: 'ship' | 'pickup', hasPhysical: boolean) =>
  mode === 'pickup' || !hasPhysical || subtotal >= SITE.demo.freeShippingOver ? 0 : SITE.demo.shipping
