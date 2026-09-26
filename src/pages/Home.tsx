import { useState } from 'react'
import { Link } from 'react-router-dom'
import { INTENTIONS, PRODUCTS } from '../data/products'
import { SITE } from '../data/site'
import { Seo } from '../components/Seo'
import { crystalOfTheDay, img, money, OpenBadge, ProductCard, shine, StockBadge, FieldCard } from '../components/bits'
import { useCart } from '../state/cart'

/** Rotating sticker-style strip of one-liners. Pure CSS animation, paused for reduced motion. */
function Ticker() {
  const items = ['Keep Austin weird', 'Touch the rocks (gently)', 'One-of-a-kind, literally', 'Guadalupe Street', 'Not medical advice, very good vibes', 'Pickup in Austin']
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-lime py-3" aria-hidden>
      <div className="flex w-max gap-10 whitespace-nowrap font-display text-xl font-extrabold uppercase" style={{ animation: 'marquee 28s linear infinite' }}>
        {[...items, ...items, ...items, ...items].map((t, i) => <span key={i}>{t} ✦</span>)}
      </div>
    </div>
  )
}

function CrystalOfTheDay() {
  const today = crystalOfTheDay()
  const [surprise, setSurprise] = useState<typeof today | null>(null)
  const { addProduct } = useCart()
  const p = surprise ?? today
  const pick = () => {
    const pool = PRODUCTS.filter((x) => !x.sold && x.stock > 0 && x.slug !== p.slug)
    setSurprise(pool[Math.floor(Math.random() * pool.length)])
  }
  return (
    <section className="wrap mt-20" aria-labelledby="cotd">
      <div className="card grid overflow-hidden bg-cyan md:grid-cols-2" style={{ boxShadow: '8px 8px 0 var(--color-ink)' }}>
        <div className="shine aspect-[4/5] border-b-2 border-ink md:aspect-auto md:border-b-0 md:border-r-2" onPointerMove={shine}>
          <img src={img(p.images[0])} alt={p.imageAlt} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
          <p className="eyebrow">{surprise ? 'Surprise!' : 'Crystal of the day'}</p>
          <h2 id="cotd" className="text-5xl sm:text-6xl">{p.name}</h2>
          <p className="text-xl font-medium">{p.fun}</p>
          <div className="rounded-xl border-2 border-ink bg-paper p-4"><FieldCard p={p} /></div>
          <div className="flex flex-wrap items-center gap-3"><StockBadge p={p} /><span className="font-display text-2xl font-extrabold">{money(p.price)}</span></div>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-ink" onClick={() => addProduct(p.slug)}>Add to cart</button>
            <Link to={`/shop/${p.slug}`} className="btn btn-paper">See the full card</Link>
            <button className="btn btn-lime" onClick={pick}>Surprise me</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const fresh = PRODUCTS.filter((p) => p.isNew && !p.sold).slice(0, 4)
  return (
    <>
      <Seo title="Crystals World — Crystal Shop in Austin, TX | Crystals, Minerals & Jewelry"
        description="Crystals World, a crystal shop at 3202 Guadalupe St in Austin, TX. Shop amethyst, lapis, citrine, jewelry and one-of-a-kind specimens online or pick up in store." />

      {/* HERO: purple flat block; sign photo; info is repeated right here for phone users */}
      <section className="relative overflow-hidden bg-sign text-paper">
        <div className="wrap grid items-center gap-10 py-12 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <p className="eyebrow mb-4 text-lime">Crystal shop · Austin, Texas</p>
            <h1 className="text-[clamp(3.2rem,9vw,7.5rem)]">
              Rocks with <span className="mt-2 block w-fit -rotate-2 rounded-xl bg-lime px-3 pb-1 text-ink">personality.</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-paper/90">Amethyst hearts, lapis slabs, citrine clusters and a few things we can’t explain. Every big piece is one of a kind. Come say hi on Guadalupe.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-lime">Shop crystals</Link>
              <Link to="/quiz" className="btn btn-paper">Pick one for my mood</Link>
            </div>
            <div className="mt-8 grid gap-2 rounded-2xl border-2 border-ink bg-paper p-4 text-ink sm:max-w-md" style={{ boxShadow: '4px 4px 0 var(--color-ink)' }}>
              <OpenBadge className="text-lg" />
              <p>{SITE.street}<br />{SITE.city}</p>
              <div className="flex flex-wrap gap-2">
                <a className="btn btn-lime !min-h-11 !py-2" href={SITE.tel}>Call</a>
                <a className="btn btn-paper !min-h-11 !py-2" href={SITE.directions} target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="wobble card overflow-hidden bg-paper" style={{ boxShadow: '8px 8px 0 var(--color-lime)' }}>
              <img src={img('images/storefront-night.jpg')} alt="The Crystals World storefront at night with a glowing purple neon sign" className="aspect-square w-full object-cover" />
              <p className="border-t-2 border-ink p-3 font-mono text-sm text-ink">📍 3202 Guadalupe St, Ste C</p>
            </div>
            <div className="absolute -left-4 -top-5 hidden rotate-[-6deg] rounded-xl border-2 border-ink bg-pink px-4 py-2 font-display text-lg font-extrabold text-ink sm:block">Yes, it’s that purple.</div>
          </div>
        </div>
      </section>
      <Ticker />

      {/* NEW ARRIVALS */}
      <section className="wrap mt-20" aria-labelledby="new">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow text-muted">Just landed</p><h2 id="new" className="text-5xl sm:text-6xl">New arrivals</h2></div>
          <Link to="/shop?sort=new" className="btn btn-paper">See everything new</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{fresh.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <CrystalOfTheDay />

      {/* SHOP BY INTENTION */}
      <section className="wrap mt-20" aria-labelledby="intent">
        <p className="eyebrow text-muted">Not sure what you’re after?</p>
        <h2 id="intent" className="mb-8 text-5xl sm:text-6xl">Shop by intention</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {INTENTIONS.map((i, k) => (
            <li key={i.id}>
              <Link to={`/shop?intention=${i.id}`} className={`card block h-full p-5 transition-transform hover:-translate-y-1 ${['bg-lime', 'bg-cyan', 'bg-citrine', 'bg-pink', 'bg-amethyst text-paper', 'bg-paper'][k]}`}>
                <p className="font-display text-3xl font-extrabold">{i.label}</p>
                <p className="mt-1 text-[15px]">{i.blurb}</p>
              </Link>
            </li>))}
        </ul>
        <p className="mt-4 text-sm text-muted">Intentions are a fun, traditional way to browse, not a medical claim.</p>
      </section>

      {/* THE SHOP */}
      <section className="wrap mt-20 grid items-center gap-8 md:grid-cols-2" aria-labelledby="shop">
        <div className="grid grid-cols-3 gap-3">
          {['shop-shelves', 'shop-case-clusters', 'shop-interior'].map((n, i) => (
            <img key={n} src={img(`images/${n}.jpg`)} alt={['A tall white shelf packed with crystals and minerals', 'A glass display case full of mineral clusters', 'The shop floor with display cases and jewelry busts'][i]}
              loading="lazy" className={`card aspect-[3/5] w-full object-cover ${i === 1 ? 'mt-8' : ''}`} />))}
        </div>
        <div>
          <p className="eyebrow text-muted">The actual, physical shop</p>
          <h2 id="shop" className="mt-2 text-5xl sm:text-6xl">Come touch some rocks.</h2>
          <p className="mt-5 text-lg text-muted">Photos are great. Holding a heavy amethyst heart in your hands is better. Wander the shelves, ask us anything, take your time.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link to="/visit" className="btn btn-lime">Plan a visit</Link><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-paper">Follow on Instagram</a></div>
        </div>
      </section>
    </>
  )
}
