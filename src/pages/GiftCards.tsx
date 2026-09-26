import { useState } from 'react'
import { Seo } from '../components/Seo'
import { money } from '../components/bits'
import { useCart } from '../state/cart'

export default function GiftCards() {
  const { addGiftCard } = useCart()
  const [amt, setAmt] = useState(50)
  return (
    <div className="wrap py-12">
      <Seo title="Gift Cards | Crystals World, Austin TX" description="Give the gift of choosing. Crystals World gift cards, delivered by email." />
      <p className="eyebrow text-muted">Gifts</p>
      <h1 className="text-6xl sm:text-7xl">Give someone the power of choice.</h1>
      <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
        <div className="card rotate-[-2deg] bg-sign p-8 text-paper" style={{ boxShadow: '8px 8px 0 var(--color-lime)' }}>
          <p className="font-display text-4xl font-extrabold uppercase text-lime">Crystals World</p>
          <p className="mt-16 font-display text-7xl font-extrabold">{money(amt)}</p>
          <p className="mt-2 font-mono text-sm">Good for one (1) rock of your choosing.</p>
        </div>
        <div>
          <fieldset><legend className="font-display text-3xl font-extrabold">Pick an amount</legend>
            <div className="mt-4 flex flex-wrap gap-3">{[25, 50, 100, 200].map((a) => (
              <button key={a} aria-pressed={amt === a} className={`btn !min-w-24 ${amt === a ? 'btn-ink' : 'btn-paper'}`} onClick={() => setAmt(a)}>{money(a)}</button>))}</div></fieldset>
          <button className="btn btn-lime mt-6" onClick={() => addGiftCard(amt)}>Add {money(amt)} gift card</button>
          <p className="mt-4 text-sm text-muted">Delivered by email, redeemable in the shop or online. Gift-card terms: <span className="placeholder-tag">[GIFT CARD TERMS]</span>. In the live store, gift cards are a built-in Shopify feature.</p>
        </div>
      </div>
    </div>
  )
}
