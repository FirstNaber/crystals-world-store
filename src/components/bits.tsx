import { useEffect, useState, type ReactNode, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { HOURS, HOURS_ARE_SAMPLE } from '../data/site'
import { useCart } from '../state/cart'
import { PRODUCTS, type Product } from '../data/products'

export const img = (p: string) => `${import.meta.env.BASE_URL}${p}`
export const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0 })}`

/** Marks anything the owner still has to provide. */
export const TBC = ({ children }: { children: ReactNode }) => <span className="placeholder-tag">{children}</span>

/** "Open now / Closed" from the HOURS table, in Austin time so it is right no matter where the visitor is. */
export function useOpenStatus() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60_000); return () => clearInterval(t) }, [])
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const mins = (parseInt(get('hour')) % 24) * 60 + parseInt(get('minute'))
  const today = HOURS[day]
  const toMin = (s: string) => parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3))
  const fmt = (s: string) => { const h = parseInt(s.slice(0, 2)); return `${h % 12 || 12}${s.slice(3) === '00' ? '' : s.slice(2)} ${h >= 12 ? 'PM' : 'AM'}` }
  const isOpen = !!today && mins >= toMin(today[0]) && mins < toMin(today[1])
  return { isOpen, today, label: today ? `${fmt(today[0])} – ${fmt(today[1])}` : 'Closed today', closes: today ? fmt(today[1]) : '', sample: HOURS_ARE_SAMPLE }
}

export function OpenBadge({ className = '' }: { className?: string }) {
  const s = useOpenStatus()
  return (
    <span className={`inline-flex items-center gap-2 font-bold ${className}`}>
      <span aria-hidden className={`h-3 w-3 rounded-full border-2 border-ink ${s.isOpen ? 'bg-lime' : 'bg-pink'}`} />
      {s.isOpen ? `Open now · until ${s.closes}` : 'Closed right now'}
      {s.sample && <abbr title="Sample hours until the real schedule is added in src/data/site.ts" className="text-[11px] font-normal no-underline opacity-70">*</abbr>}
    </span>
  )
}

/** Pointer-following highlight for the "catches the light" hover. */
export const shine = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function StockBadge({ p }: { p: Product }) {
  if (p.sold || p.stock < 1) return <span className="chip bg-ink text-paper">Sold</span>
  if (p.oneOfAKind) return <span className="chip bg-lime">Only 1 in stock</span>
  return <span className="chip bg-cyan">{p.stock} in stock</span>
}

/** The collectible "field card": the small spec card that sits under each stone. */
export function FieldCard({ p, full = false }: { p: Product; full?: boolean }) {
  const tbc = (v: string) => (v.includes('[') || v.includes('TBC') ? <TBC>{v.startsWith('[') ? v : `${v} [TBC]`}</TBC> : v)
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[13px]">
      <dt className="text-muted">Mineral</dt><dd className="font-medium">{tbc(p.mineral)}</dd>
      <dt className="text-muted">Origin</dt><dd>{tbc(p.origin)}</dd>
      <dt className="text-muted">Hardness</dt><dd>{p.hardness === '[TBC]' ? <TBC>[TBC]</TBC> : `${p.hardness} Mohs`}</dd>
      {full && (<>
        <dt className="text-muted">Group</dt><dd>{tbc(p.group)}</dd>
        <dt className="text-muted">Made of</dt><dd>{tbc(p.composition)}</dd>
        <dt className="text-muted">Size</dt><dd>{tbc(p.dims)}</dd>
        <dt className="text-muted">Weight</dt><dd>{tbc(p.weight)}</dd>
      </>)}
    </dl>
  )
}

export function ProductCard({ p }: { p: Product }) {
  const { addProduct } = useCart()
  const gone = p.sold || p.stock < 1
  return (
    <article className="card group flex flex-col overflow-hidden">
      <Link to={`/shop/${p.slug}`} className="block" aria-label={`${p.name}${gone ? ' (sold)' : ''}`}>
        <div className="shine relative aspect-[4/5] overflow-hidden border-b-2 border-ink bg-cream" onPointerMove={shine}>
          <img src={img(p.images[0])} alt={p.imageAlt} loading="lazy" decoding="async"
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${gone ? 'grayscale-[.6]' : ''}`} />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2"><StockBadge p={p} />{p.isNew && !gone && <span className="chip bg-pink">New</span>}</div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl"><Link to={`/shop/${p.slug}`} className="hover:underline">{p.name}</Link></h3>
          <span className="font-display text-xl font-extrabold">{money(p.price)}</span>
        </div>
        <p className="text-[15px] text-muted">{p.fun}</p>
        <FieldCard p={p} />
        <button className="btn btn-lime mt-auto w-full" disabled={gone} onClick={() => addProduct(p.slug)}>
          {gone ? 'Gone to a good home' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

/** Deterministic "crystal of the day": same piece all day for everyone, new one tomorrow. */
export function crystalOfTheDay(): Product {
  const pool = PRODUCTS.filter((p) => !p.sold && p.stock > 0)
  const d = new Date(); const n = d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate()
  return pool[n % pool.length]
}
