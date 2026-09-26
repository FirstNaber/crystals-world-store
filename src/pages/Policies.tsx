import { Seo } from '../components/Seo'
import { TBC } from '../components/bits'
import { SITE } from '../data/site'

export default function Policies() {
  return (
    <div className="wrap max-w-3xl py-12">
      <Seo title="Shipping, Returns & Care | Crystals World" description="How Crystals World packs fragile stones, shipping rates, returns and crystal care." />
      <p className="eyebrow text-muted">The fine print, but friendly</p>
      <h1 className="text-6xl sm:text-7xl">Shipping &amp; returns</h1>
      <section className="mt-10"><h2 className="text-4xl">Packing fragile stones</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-lg"><li>Every piece is wrapped individually, then double-boxed with padding on all sides.</li><li>Points, druzy and thin edges get extra protection.</li><li>Keep the box until you’ve checked your piece. Photograph any damage before you unpack further.</li><li><TBC>[CARRIER + INSURANCE POLICY — confirm with owner]</TBC></li></ul></section>
      <section className="mt-10"><h2 className="text-4xl">Shipping rates &amp; timing</h2><p className="mt-3 text-lg"><TBC>{SITE.shippingRates}</TBC> <TBC>[HANDLING TIME]</TBC></p><p className="mt-2 text-muted">Local pickup in Austin is always free.</p></section>
      <section className="mt-10"><h2 className="text-4xl">Returns</h2><p className="mt-3 text-lg"><TBC>[RETURN WINDOW + CONDITIONS — e.g. unused items within X days; one-of-a-kind pieces final sale?]</TBC></p></section>
      <section className="mt-10"><h2 className="text-4xl">Looking after your stone</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-lg"><li>Softer stones (lapis, calcite and similar) dislike water and scratching. Wipe with a dry, soft cloth.</li><li>Some minerals fade in strong sunlight over years. A bright shelf is fine; a hot dashboard isn’t.</li><li>Hardness is on every field card. Quartz (7) will scratch softer stones.</li></ul></section>
      <p className="mt-10 rounded-xl border-2 border-ink bg-cream p-4 text-sm">Crystals are decorative and collectible. Nothing on this site is medical advice, and no stone is sold to diagnose, treat, cure or prevent any condition.</p>
    </div>
  )
}
