import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { SITE } from '../data/site'
import { useCart, shippingFor } from '../state/cart'
import { img, money, OpenBadge, TBC } from './bits'
import { PRODUCTS } from '../data/products'

/** Wordmark: the storefront sign, translated to type. */
function Logo() {
  return (
    <span className="flex items-center gap-2" aria-label="Crystals World">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden>
        <path d="M32 6 52 26 32 58 12 26Z" fill="#7c3aed" stroke="#14101f" strokeWidth="4" strokeLinejoin="round" />
        <path d="M12 26h40M32 6l-8 20 8 32 8-32Z" fill="none" stroke="#c6ff3d" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight [text-shadow:2px_2px_0_var(--color-lime)]">Crystals World</span>
    </span>
  )
}

const NAV = [
  { to: '/shop', label: 'Shop' },
  { to: '/start-here', label: 'Start here' },
  { to: '/quiz', label: 'Mood quiz' },
  { to: '/events', label: 'Events' },
  { to: '/visit', label: 'Visit' },
]

function CartDrawer() {
  const { open, setOpen, lines, remove, setQty, subtotal, price, title, count } = useCart()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey); ref.current?.focus()
    return () => removeEventListener('keydown', onKey)
  }, [open, setOpen])
  const ship = shippingFor(subtotal, 'ship', lines.some((l) => !l.giftCard))
  return (
    <div className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-ink/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-paper transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b-2 border-ink p-4">
          <h2 className="text-3xl">Your cart <span className="font-mono text-base">({count})</span></h2>
          <button className="chip bg-paper hover:bg-lime" onClick={() => setOpen(false)} aria-label="Close cart">Close ✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div><p className="font-display text-3xl font-extrabold">Nothing here yet.</p>
                <p className="mt-2 text-muted">The rocks are waiting. They are very patient.</p>
                <Link to="/shop" onClick={() => setOpen(false)} className="btn btn-lime mt-6">Go find a rock</Link></div>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((l) => {
                const p = PRODUCTS.find((x) => x.slug === l.slug)
                return (
                  <li key={l.key} className="card flex gap-3 p-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-ink bg-cream">
                      {p ? <img src={img(p.images[0])} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-2xl">🎁</div>}
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-lg font-extrabold leading-tight">{title(l)}</p>
                      <p className="font-mono text-sm">{money(price(l))}</p>
                      <div className="mt-2 flex items-center gap-3">
                        {p?.oneOfAKind ? <span className="chip bg-lime text-[12px]">One of a kind</span> : (
                          <div className="flex items-center gap-2" role="group" aria-label={`Quantity for ${title(l)}`}>
                            <button className="chip bg-paper" onClick={() => setQty(l.key, l.qty - 1)} aria-label="Fewer">−</button>
                            <span className="font-mono">{l.qty}</span>
                            <button className="chip bg-paper" onClick={() => setQty(l.key, l.qty + 1)} aria-label="More">+</button>
                          </div>)}
                        <button className="ml-auto text-sm underline" onClick={() => remove(l.key)}>Remove</button>
                      </div>
                    </div>
                  </li>)
              })}
            </ul>)}
        </div>
        {lines.length > 0 && (
          <div className="space-y-2 border-t-2 border-ink p-4">
            <div className="flex justify-between font-display text-2xl font-extrabold"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <p className="text-sm text-muted">Shipping {ship === 0 ? 'free on this order (demo threshold)' : `estimated ${money(ship)}`} · or free pickup in Austin</p>
            <Link to="/checkout" onClick={() => setOpen(false)} className="btn btn-lime w-full">Checkout (demo)</Link>
          </div>)}
      </div>
    </div>
  )
}

function Header() {
  const { setOpen, count } = useCart()
  const [menu, setMenu] = useState(false)
  const loc = useLocation()
  useEffect(() => setMenu(false), [loc.pathname])
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <Link to="/" aria-label="Crystals World home"><Logo /></Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `rounded-full px-4 py-2 font-display text-lg font-bold hover:bg-lime ${isActive ? 'bg-ink text-paper hover:bg-ink' : ''}`}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="btn btn-lime !min-h-11 !px-4" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
            Cart <span className="rounded-full bg-ink px-2 font-mono text-sm text-lime">{count}</span>
          </button>
          <button className="chip !min-h-11 bg-paper lg:hidden" aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu((m) => !m)}>{menu ? 'Close' : 'Menu'}</button>
        </div>
      </div>
      {menu && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t-2 border-ink bg-paper lg:hidden">
          <ul className="wrap grid grid-cols-2 gap-3 py-4">
            {NAV.map((n) => <li key={n.to}><NavLink to={n.to} className="card block p-4 font-display text-2xl font-extrabold">{n.label}</NavLink></li>)}
            <li><NavLink to="/gift-cards" className="card block bg-lime p-4 font-display text-2xl font-extrabold">Gift cards</NavLink></li>
          </ul>
        </nav>)}
    </header>
  )
}

/** Address, open/closed, call and directions, visible on every page and on the first mobile screen. */
function InfoBar() {
  return (
    <div className="border-b-2 border-ink bg-ink text-paper">
      <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-1 py-2 text-sm">
        <OpenBadge />
        <span className="hidden sm:inline">{SITE.street}, {SITE.city}</span>
        <span className="ml-auto flex gap-4 font-bold">
          <a className="underline decoration-lime underline-offset-4" href={SITE.tel}>Call {SITE.phone}</a>
          <a className="underline decoration-lime underline-offset-4" href={SITE.directions} target="_blank" rel="noopener noreferrer">Directions</a>
        </span>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-paper">
      <div className="wrap grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl font-extrabold uppercase leading-none text-lime">Crystals World</p>
          <p className="mt-4 max-w-sm text-paper/80">Rocks, minerals and jewelry on Guadalupe Street in Austin, Texas. Come touch the stuff (gently).</p>
          <p className="mt-4 text-sm text-paper/70">Wholesale inquiries? Message us on Instagram.</p>
        </div>
        <div>
          <p className="eyebrow mb-3 text-lime">Shop</p>
          <ul className="space-y-2">
            {[['/shop', 'All crystals'], ['/gift-cards', 'Gift cards'], ['/start-here', 'Start here'], ['/quiz', 'Mood quiz'], ['/policies', 'Shipping & returns']].map(([to, l]) => <li key={to}><Link className="hover:text-lime" to={to}>{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3 text-lime">Find us</p>
          <address className="not-italic text-paper/85">{SITE.street}<br />{SITE.city}<br /><a className="underline" href={SITE.tel}>{SITE.phone}</a></address>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {[['Instagram', SITE.instagram], ['TikTok', SITE.tiktok], ['Facebook', SITE.facebook], ['Yelp', SITE.yelp], ['Google Maps', SITE.googleProfile]].map(([l, u]) => (
              <li key={l}><a className="underline hover:text-lime" href={u} target="_blank" rel="noopener noreferrer">{l}</a></li>))}
          </ul>
        </div>
      </div>
      <div className="wrap border-t border-paper/20 py-5 text-xs text-paper/60">
        Concept build. Prices, stock and event details are samples — items marked <TBC>[TBC]</TBC> need real info from the shop. Not medical advice: crystals are for enjoying, not treating.
      </div>
    </footer>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const { setOpen } = useCart()
  // new page: scroll to top and make sure the cart drawer isn't left open (back button, direct links)
  useEffect(() => { window.scrollTo(0, 0); setOpen(false) }, [pathname, setOpen])
  return (
    <>
      <a href="#main" className="absolute -top-20 left-2 z-[100] rounded bg-lime px-4 py-2 font-bold focus:top-2">Skip to content</a>
      <InfoBar />
      <Header />
      <main id="main" tabIndex={-1}><Outlet /></main>
      <Footer />
      <CartDrawer />
    </>
  )
}
