import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { TBC } from '../components/bits'

const STEPS = [
  ['Pick one that makes you happy', 'Seriously. Start with what you like looking at. Color, shape, sparkle — your eyes know what they’re doing.'],
  ['Know what you’re holding', 'Every piece has a field card: what it’s made of, how hard it is, and where it comes from. Geology first, folklore second.'],
  ['Read the folklore for fun', 'People have attached meanings to stones for thousands of years. We share them as tradition. We don’t make medical claims.'],
  ['Give it a home', 'A stand, a shelf, a desk, a windowsill. Keep softer stones (like lapis) away from water and sandy hands.'],
  ['Come back and show us', 'Bring it in, ask us anything, or tell us what you’re hunting for next.'],
]

export default function StartHere() {
  return (
    <div className="wrap py-12">
      <Seo title="New to Crystals? Start Here | Crystals World, Austin TX" description="A friendly beginner’s guide to buying your first crystal, from the crystal shop on Guadalupe Street in Austin, Texas." />
      <p className="eyebrow text-muted">Welcome, curious human</p>
      <h1 className="text-6xl sm:text-7xl">Start here.</h1>
      <p className="mt-4 max-w-xl text-xl">No experience, no jargon, no pressure. Here’s the five-step way to get your first crystal.</p>
      <ol className="mt-10 grid gap-5 md:grid-cols-2">
        {STEPS.map(([t, d], i) => (
          <li key={t} className={`card flex gap-4 p-5 ${['bg-lime', 'bg-cyan', 'bg-citrine', 'bg-pink', 'bg-paper'][i]} ${i === 4 ? 'md:col-span-2' : ''}`}>
            <span className="font-display text-6xl font-extrabold leading-none">{i + 1}</span>
            <div><h2 className="text-3xl">{t}</h2><p className="mt-2 text-lg">{d}</p></div></li>))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-3"><Link className="btn btn-lime" to="/quiz">Take the mood quiz</Link><Link className="btn btn-paper" to="/shop">Browse the shop</Link></div>

      <h2 className="mb-2 mt-20 text-5xl">Starter bundles</h2>
      <p className="mb-6 max-w-2xl text-muted">Low-pressure sets for first-timers and gift-givers. <TBC>[BUNDLE CONTENTS + PRICES — owner to define]</TBC></p>
      <div className="grid gap-5 md:grid-cols-3">
        {['The Desk Buddy', 'The Gift Trio', 'The Curious Collector'].map((n) => (
          <div key={n} className="card p-4">
            <div className="grid aspect-[4/3] place-items-center rounded-xl border-2 border-dashed border-sign bg-lime/30 p-4 text-center font-mono text-sm">IMAGE SLOT<br />Photo of the {n.toLowerCase()} set</div>
            <h3 className="mt-4 text-3xl">{n}</h3><p className="mt-1 text-muted">[DESCRIPTION — what’s inside and who it’s for]</p><p className="mt-2 font-display text-2xl font-extrabold">[PRICE]</p></div>))}
      </div>
    </div>
  )
}
