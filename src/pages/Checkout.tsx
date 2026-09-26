import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { money, TBC } from '../components/bits'
import { shippingFor, useCart } from '../state/cart'
import { SITE } from '../data/site'

/**
 * DEMO CHECKOUT. It collects nothing and charges nothing: no data leaves the browser.
 * In production, replace this page with the platform's hosted checkout (Shopify / Stripe).
 */
export default function Checkout() {
  const { lines, subtotal, price, title, clear } = useCart()
  const [mode, setMode] = useState<'ship' | 'pickup'>('ship')
  const [wrap, setWrap] = useState(false)
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)
  const physical = lines.some((l) => !l.giftCard)
  const ship = shippingFor(subtotal, mode, physical)
  const wrapFee = wrap ? SITE.demo.giftWrap : 0
  const total = subtotal + ship + wrapFee

  if (done) return (
    <div className="wrap grid min-h-[60vh] place-items-center py-16 text-center">
      <div><p className="text-7xl" aria-hidden>🎉</p>
        <h1 className="mt-4 text-6xl">Rock secured.</h1>
        <p className="mx-auto mt-4 max-w-md text-xl">This was a demo, so no money moved and nothing is really on its way. In the live shop this is where we’d say your order is being wrapped like a tiny museum piece.</p>
        <Link to="/shop" className="btn btn-lime mt-8">Keep browsing</Link></div>
    </div>)

  if (lines.length === 0) return (
    <div className="wrap grid min-h-[50vh] place-items-center py-16 text-center"><div><h1 className="text-6xl">Your cart is empty.</h1><p className="mt-3 text-muted">Even a pebble would be a start.</p><Link to="/shop" className="btn btn-lime mt-6">Go find a rock</Link></div></div>)

  return (
    <div className="wrap py-10">
      <Seo title="Checkout | Crystals World" description="Checkout for Crystals World, Austin TX." />
      <h1 className="text-6xl">Checkout</h1>
      <p className="mt-3 rounded-xl border-2 border-dashed border-sign bg-lime/40 p-3 font-mono text-sm" role="note">DEMO MODE: no payment is taken and nothing you type is sent anywhere.</p>
      <form className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]" onSubmit={(e) => { e.preventDefault(); clear(); setDone(true) }}>
        <div className="space-y-8">
          <fieldset className="card space-y-3 p-5"><legend className="sr-only">Contact</legend><h2 className="text-3xl">1 · Who are you?</h2>
            <label className="block font-medium">Email<input className="input mt-1" type="email" required autoComplete="email" /></label>
            <label className="block font-medium">Name<input className="input mt-1" required autoComplete="name" /></label></fieldset>

          <fieldset className="card space-y-3 p-5"><legend className="sr-only">Delivery</legend><h2 className="text-3xl">2 · How should it get to you?</h2>
            {[['ship', 'Ship it', physical ? `Careful, padded shipping. ${ship === 0 ? 'Free on this order.' : `Estimated ${money(ship)}.`}` : 'Gift cards are delivered by email.'], ['pickup', 'Pick up in Austin', `Free. ${SITE.street}. We’ll message you when it’s ready.`]].map(([v, l, d]) => (
              <label key={v} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 border-ink p-4 ${mode === v ? 'bg-lime' : ''}`}>
                <input type="radio" name="mode" className="mt-1 h-5 w-5 accent-ink" checked={mode === v} onChange={() => setMode(v as 'ship' | 'pickup')} />
                <span><b className="font-display text-xl">{l}</b><br /><span className="text-[15px]">{d}</span></span></label>))}
            {mode === 'ship' && physical && (<div className="grid gap-3 sm:grid-cols-2"><label className="font-medium sm:col-span-2">Address<input className="input mt-1" autoComplete="street-address" /></label><label className="font-medium">City<input className="input mt-1" /></label><label className="font-medium">ZIP<input className="input mt-1" inputMode="numeric" /></label></div>)}
            <p className="text-sm text-muted">Live rates: <TBC>[SHIPPING RATES]</TBC>. The numbers above are demo estimates.</p></fieldset>

          <fieldset className="card space-y-3 p-5"><legend className="sr-only">Gift options</legend><h2 className="text-3xl">3 · Is it a gift?</h2>
            <label className="flex items-center gap-3 font-medium"><input type="checkbox" className="h-5 w-5 accent-ink" checked={wrap} onChange={(e) => setWrap(e.target.checked)} />Gift wrap it (+{money(SITE.demo.giftWrap)})</label>
            <label className="block font-medium">Gift note <span className="font-normal text-muted">({200 - note.length} characters left)</span>
              <textarea className="input mt-1" rows={3} maxLength={200} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Happy birthday. Please don’t lick the amethyst." /></label></fieldset>
        </div>

        <aside className="card h-fit space-y-3 p-5 lg:sticky lg:top-28" aria-label="Order summary"><h2 className="text-3xl">Your order</h2>
          <ul className="space-y-2 border-b-2 border-ink pb-3">{lines.map((l) => <li key={l.key} className="flex justify-between gap-3"><span>{title(l)} ×{l.qty}</span><span className="font-mono">{money(price(l) * l.qty)}</span></li>)}</ul>
          <dl className="space-y-1 font-mono text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>{mode === 'pickup' ? 'Pickup' : 'Shipping (est.)'}</dt><dd>{ship === 0 ? 'Free' : money(ship)}</dd></div>
            {wrap && <div className="flex justify-between"><dt>Gift wrap</dt><dd>{money(wrapFee)}</dd></div>}
            <div className="flex justify-between text-muted"><dt>Sales tax</dt><dd>calculated live</dd></div>
          </dl>
          <div className="flex justify-between border-t-2 border-ink pt-3 font-display text-3xl font-extrabold"><span>Total</span><span>{money(total)}</span></div>
          <button className="btn btn-lime w-full" type="submit">Place demo order</button>
        </aside>
      </form>
    </div>
  )
}
