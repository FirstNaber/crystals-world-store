import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PRODUCTS, bySlug } from '../data/products'
import { Seo } from '../components/Seo'
import { FieldCard, img, money, ProductCard, shine, StockBadge, TBC } from '../components/bits'
import { useCart } from '../state/cart'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const p = bySlug(slug ?? '')
  const { addProduct } = useCart()
  const [active, setActive] = useState(0)

  // "You might also like": same mineral first, then shared intention, in-stock preferred
  const related = useMemo(() => {
    if (!p) return []
    const score = (o: typeof p) => (o.mineral === p.mineral ? 3 : 0) + o.intentions.filter((i) => p.intentions.includes(i)).length + (o.sold ? -5 : 0)
    return PRODUCTS.filter((o) => o.slug !== p.slug).sort((a, b) => score(b) - score(a)).slice(0, 3)
  }, [p])

  if (!p) return <NotFound />
  const gone = p.sold || p.stock < 1

  // Product structured data (price/availability are SAMPLE values in this demo)
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: `${p.fun} ${p.facts[0]}`,
    image: [new URL(img(p.images[0]), location.href).href], material: p.mineral, brand: { '@type': 'Brand', name: 'Crystals World' },
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: p.price, availability: gone ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition' },
  }

  return (
    <div className="wrap py-8">
      <Seo title={`${p.name} | Crystal Shop Austin TX | Crystals World`} description={`${p.name}: ${p.fun} ${p.facts[0]} Available from Crystals World in Austin, TX.`} jsonLd={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-sm"><Link className="underline" to="/shop">Shop</Link> / {p.name}</nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* gallery */}
        <div>
          <div className={`shine card overflow-hidden bg-cream ${p.lowRes ? 'mx-auto max-w-[400px]' : ''}`} onPointerMove={shine}>
            <img src={img(p.images[active])} alt={p.imageAlt} className={`aspect-[4/5] w-full object-cover ${gone ? 'grayscale-[.5]' : ''}`} />
          </div>
          {p.images.length > 1 && (
            <ul className="mt-4 flex gap-3">{p.images.map((src, i) => (
              <li key={src}><button onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} aria-pressed={i === active}
                className={`h-20 w-20 overflow-hidden rounded-xl border-2 ${i === active ? 'border-sign ring-2 ring-sign' : 'border-ink'}`}><img src={img(src)} alt="" className="h-full w-full object-cover" /></button></li>))}</ul>)}
          <p className="mt-3 font-mono text-xs text-muted">Photo is of the actual piece. <TBC>[HIGHER-RES + MORE PHOTOS — different angles, hand for scale]</TBC></p>
        </div>

        {/* details */}
        <div>
          <div className="flex flex-wrap gap-2"><StockBadge p={p} />{p.isNew && !gone && <span className="chip bg-pink">New</span>}<span className="chip bg-cream">{p.kind}</span></div>
          <h1 className="mt-4 text-5xl sm:text-6xl">{p.name}</h1>
          <p className="mt-3 text-2xl font-medium">{p.fun}</p>
          <p className="mt-5 font-display text-4xl font-extrabold">{money(p.price)} <span className="font-mono text-xs font-normal text-muted">sample price</span></p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn btn-lime" disabled={gone} onClick={() => addProduct(p.slug)}>{gone ? 'Sold — someone got lucky' : 'Add to cart'}</button>
            <a className="btn btn-paper" href="tel:+17373208079">Ask about it</a>
          </div>
          <p className="mt-3 text-sm text-muted">{gone ? 'Sold pieces stay up for collectors. New arrivals land often — check back or ask us.' : p.oneOfAKind ? 'One of a kind. Once it’s sold, it’s gone.' : 'More may be available in store.'} Free pickup in Austin. Packed with real care.</p>

          {/* the field card */}
          <section aria-labelledby="fc" className="card mt-8 bg-cream p-5">
            <h2 id="fc" className="mb-3 text-2xl">Field card</h2>
            <FieldCard p={p} full />
          </section>

          {/* facts vs. belief, kept apart on purpose */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card bg-cyan p-5"><h2 className="text-xl">The science</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-[15px]">{p.facts.map((f) => <li key={f}>{f}</li>)}</ul></div>
            <div className="card bg-lime p-5"><h2 className="text-xl">Tradition &amp; belief</h2><p className="mt-2 text-[15px]">{p.tradition}</p>
              {p.chakra !== '[TBC]' && <p className="mt-2 font-mono text-xs">Chakra: {p.chakra}{p.zodiac.length ? ` · Zodiac: ${p.zodiac.join(', ')}` : ''}</p>}</div>
          </section>
          <p className="mt-3 text-xs text-muted">We share folklore because it’s part of the fun. It’s not medical advice, and crystals don’t treat, cure or prevent anything.</p>

          <details className="card mt-8 p-4"><summary className="cursor-pointer font-display text-xl font-extrabold">Shipping, care &amp; returns</summary>
            <p className="mt-3 text-[15px]">Fragile pieces ship double-boxed with padding. Rates and return terms are on the <Link to="/policies" className="underline">policies page</Link>. Add a gift note and wrapping in checkout.</p></details>
        </div>
      </div>

      <section className="mt-20" aria-labelledby="also"><h2 id="also" className="mb-6 text-4xl">You might also like</h2>
        <div className="grid gap-6 sm:grid-cols-3">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section>
    </div>
  )
}
