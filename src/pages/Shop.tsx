import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { INTENTIONS, PRODUCTS, type Intention } from '../data/products'
import { Seo } from '../components/Seo'
import { ProductCard } from '../components/bits'

const uniq = <T,>(a: T[]) => [...new Set(a)]
const KINDS = uniq(PRODUCTS.map((p) => p.kind))
const COLORS = uniq(PRODUCTS.flatMap((p) => p.colors)).sort()
const SIZES = ['Small', 'Medium', 'Large']
const PRICES: [string, number, number][] = [['Under $100', 0, 99.99], ['$100 – $200', 100, 200], ['Over $200', 200.01, Infinity]]

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return <fieldset className="border-t-2 border-ink pt-3"><legend className="eyebrow float-left mb-2 w-full">{title}</legend><div className="clear-both flex flex-wrap gap-2">{children}</div></fieldset>
}
function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={on} onClick={onClick} className={`chip !min-h-10 ${on ? 'bg-ink text-paper' : 'bg-paper hover:bg-lime'}`}>{children}</button>
}

export default function Shop() {
  const [sp, setSp] = useSearchParams()
  const [q, setQ] = useState('')
  const [kind, setKind] = useState<string[]>([])
  const [color, setColor] = useState<string[]>([])
  const [size, setSize] = useState<string[]>([])
  const [price, setPrice] = useState<number | null>(null)
  const [intent, setIntent] = useState<Intention | ''>((sp.get('intention') as Intention) || '')
  const [uniqueOnly, setUniqueOnly] = useState<'all' | 'one' | 'multi'>('all')
  const [showSold, setShowSold] = useState(true)
  const [sort, setSort] = useState(sp.get('sort') || 'featured')
  const [open, setOpen] = useState(false)

  const toggle = (arr: string[], set: (a: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    let r = PRODUCTS.filter((p) =>
      (!s || [p.name, p.mineral, p.kind, p.fun, ...p.colors, ...p.intentions].join(' ').toLowerCase().includes(s)) &&
      (!kind.length || kind.includes(p.kind)) &&
      (!color.length || p.colors.some((c) => color.includes(c))) &&
      (!size.length || size.includes(p.size)) &&
      (price === null || (p.price >= PRICES[price][1] && p.price <= PRICES[price][2])) &&
      (!intent || p.intentions.includes(intent)) &&
      (uniqueOnly === 'all' || (uniqueOnly === 'one') === p.oneOfAKind) &&
      (showSold || !p.sold))
    const sorters: Record<string, (a: typeof r[0], b: typeof r[0]) => number> = {
      featured: () => 0,
      new: (a, b) => b.added.localeCompare(a.added),
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      az: (a, b) => a.name.localeCompare(b.name),
    }
    r = [...r].sort(sorters[sort] ?? sorters.featured)
    return r.sort((a, b) => Number(!!a.sold) - Number(!!b.sold)) // sold pieces stay visible, at the end
  }, [q, kind, color, size, price, intent, uniqueOnly, showSold, sort])

  const active = kind.length + color.length + size.length + (price !== null ? 1 : 0) + (intent ? 1 : 0) + (uniqueOnly !== 'all' ? 1 : 0)
  const reset = () => { setKind([]); setColor([]); setSize([]); setPrice(null); setIntent(''); setUniqueOnly('all'); setQ(''); setSp({}) }

  const filters = (
    <div className="space-y-4">
      <Group title="Type">{KINDS.map((k) => <Pill key={k} on={kind.includes(k)} onClick={() => toggle(kind, setKind, k)}>{k}</Pill>)}</Group>
      <Group title="Color">{COLORS.map((c) => <Pill key={c} on={color.includes(c)} onClick={() => toggle(color, setColor, c)}>{c}</Pill>)}</Group>
      <Group title="Size">{SIZES.map((s) => <Pill key={s} on={size.includes(s)} onClick={() => toggle(size, setSize, s)}>{s}</Pill>)}</Group>
      <Group title="Price">{PRICES.map((p, i) => <Pill key={p[0]} on={price === i} onClick={() => setPrice(price === i ? null : i)}>{p[0]}</Pill>)}</Group>
      <Group title="Intention">{INTENTIONS.map((i) => <Pill key={i.id} on={intent === i.id} onClick={() => setIntent(intent === i.id ? '' : i.id)}>{i.label}</Pill>)}</Group>
      <Group title="Rarity">
        <Pill on={uniqueOnly === 'one'} onClick={() => setUniqueOnly(uniqueOnly === 'one' ? 'all' : 'one')}>One of a kind</Pill>
        <Pill on={uniqueOnly === 'multi'} onClick={() => setUniqueOnly(uniqueOnly === 'multi' ? 'all' : 'multi')}>Multiples</Pill>
      </Group>
      <label className="flex items-center gap-3 border-t-2 border-ink pt-3 font-medium"><input type="checkbox" className="h-5 w-5 accent-ink" checked={showSold} onChange={(e) => setShowSold(e.target.checked)} />Show sold pieces (collectors, hi)</label>
      {(active > 0 || q) && <button className="underline" onClick={reset}>Clear all filters</button>}
    </div>
  )

  return (
    <div className="wrap py-10">
      <Seo title="Shop Crystals & Minerals Online | Crystals World, Austin TX" description="Browse amethyst, lapis lazuli, citrine, jewelry and one-of-a-kind mineral specimens from Crystals World in Austin, Texas. Ship anywhere or pick up in store." />
      <p className="eyebrow text-muted">Shop</p>
      <h1 className="text-6xl sm:text-7xl">All the rocks.</h1>
      <p className="mt-3 max-w-xl text-muted">Big pieces are one of a kind, so when it’s gone, it’s gone. Sold pieces stay up so collectors can see what passed through.</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="min-w-[220px] flex-1"><span className="sr-only">Search the shop</span>
          <input className="input" type="search" placeholder="Search: amethyst, heart, blue…" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <label className="flex items-center gap-2 font-medium">Sort
          <select className="input !w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option><option value="new">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name A–Z</option>
          </select></label>
        <button className="btn btn-paper lg:hidden" aria-expanded={open} onClick={() => setOpen((o) => !o)}>Filters{active ? ` (${active})` : ''}</button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Filters" className={`${open ? 'block' : 'hidden'} lg:block`}>{filters}</aside>
        <section aria-live="polite">
          <p className="mb-4 font-mono text-sm">{list.length} {list.length === 1 ? 'piece' : 'pieces'}</p>
          {list.length === 0 ? (
            <div className="card p-10 text-center"><p className="font-display text-4xl font-extrabold">No rocks match that.</p><p className="mt-2 text-muted">Maybe the rock is shy. Try fewer filters.</p><button className="btn btn-lime mt-6" onClick={reset}>Reset filters</button></div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>)}
        </section>
      </div>
    </div>
  )
}
