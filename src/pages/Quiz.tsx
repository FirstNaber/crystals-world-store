import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, type Intention } from '../data/products'
import { Seo } from '../components/Seo'
import { FieldCard, img, money, shine } from '../components/bits'
import { useCart } from '../state/cart'

/** Each answer nudges a few intentions. The result is the in-stock piece whose intentions score highest. */
const QUESTIONS: { q: string; a: { t: string; w: Intention[] }[] }[] = [
  { q: 'Today’s mood, honestly?', a: [{ t: 'Frazzled. Too many tabs open.', w: ['calm', 'focus'] }, { t: 'Main character energy.', w: ['confidence'] }, { t: 'Soft and sentimental.', w: ['love', 'calm'] }, { t: 'I need my feet on the ground.', w: ['grounding', 'protection'] }] },
  { q: 'Where will this rock live?', a: [{ t: 'On my desk, next to the mug.', w: ['focus', 'calm'] }, { t: 'By my bed.', w: ['calm', 'love'] }, { t: 'Front and center in the living room.', w: ['confidence', 'grounding'] }, { t: 'It’s a gift, so… TBD.', w: ['love'] }] },
  { q: 'Pick a color that grabs you.', a: [{ t: 'Deep blue', w: ['focus', 'confidence'] }, { t: 'Purple', w: ['calm', 'love'] }, { t: 'Sunset orange', w: ['confidence', 'love'] }, { t: 'Earthy neutrals', w: ['grounding'] }] },
  { q: 'Pick a superpower.', a: [{ t: 'Total concentration', w: ['focus'] }, { t: 'Unbothered-ness', w: ['calm', 'protection'] }, { t: 'Walking in and everyone notices', w: ['confidence'] }, { t: 'Making everyone feel loved', w: ['love'] }] },
]

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState<Record<string, number>>({})
  const { addProduct } = useCart()
  const done = step >= QUESTIONS.length

  const answer = (w: Intention[]) => { const s = { ...score }; w.forEach((i) => (s[i] = (s[i] ?? 0) + 1)); setScore(s); setStep(step + 1) }
  const ranked = [...PRODUCTS].filter((p) => !p.sold && p.stock > 0)
    .map((p) => ({ p, s: p.intentions.reduce((n, i) => n + (score[i] ?? 0), 0) })).sort((a, b) => b.s - a.s)
  const top = ranked[0]?.p
  const runners = ranked.slice(1, 3).map((r) => r.p)

  return (
    <div className="wrap py-12">
      <Seo title="Which Crystal Should I Get? Mood Quiz | Crystals World Austin" description="Not sure which crystal to get? Take the 30-second Crystals World mood quiz and meet your match." />
      <p className="eyebrow text-muted">Not sure what to get?</p>
      <h1 className="text-6xl sm:text-7xl">Pick a crystal for my mood</h1>
      {!done ? (
        <div className="card mt-8 max-w-2xl bg-cyan p-6 sm:p-8" style={{ boxShadow: '8px 8px 0 var(--color-ink)' }}>
          <p className="font-mono text-sm" aria-live="polite">Question {step + 1} of {QUESTIONS.length}</p>
          <div className="my-3 h-3 overflow-hidden rounded-full border-2 border-ink bg-paper"><div className="h-full bg-ink transition-all" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} /></div>
          <h2 className="text-4xl">{QUESTIONS[step].q}</h2>
          <ul className="mt-6 grid gap-3">{QUESTIONS[step].a.map((a) => (
            <li key={a.t}><button className="btn btn-paper w-full !justify-start !rounded-2xl text-left text-lg" onClick={() => answer(a.w)}>{a.t}</button></li>))}</ul>
          {step > 0 && <button className="mt-4 underline" onClick={() => { setStep(0); setScore({}) }}>Start over</button>}
        </div>
      ) : top && (
        <div className="mt-8">
          <p className="font-display text-3xl font-extrabold">Your match:</p>
          <div className="card mt-4 grid overflow-hidden bg-lime md:grid-cols-2" style={{ boxShadow: '8px 8px 0 var(--color-ink)' }}>
            <div className="shine border-b-2 border-ink md:border-b-0 md:border-r-2" onPointerMove={shine}><img src={img(top.images[0])} alt={top.imageAlt} className="aspect-[4/5] w-full object-cover" /></div>
            <div className="space-y-4 p-6 sm:p-8"><h2 className="text-5xl">{top.name}</h2><p className="text-xl font-medium">{top.fun}</p>
              <div className="rounded-xl border-2 border-ink bg-paper p-4"><FieldCard p={top} /></div>
              <p className="font-display text-3xl font-extrabold">{money(top.price)}</p>
              <div className="flex flex-wrap gap-3"><button className="btn btn-ink" onClick={() => addProduct(top.slug)}>Add to cart</button><Link className="btn btn-paper" to={`/shop/${top.slug}`}>Full card</Link></div></div>
          </div>
          <p className="mt-3 text-sm text-muted">Just for fun. The quiz matches moods to stones by tradition, not by science or medicine.</p>
          {runners.length > 0 && (<><h2 className="mb-4 mt-10 text-3xl">Runners-up</h2><div className="grid gap-4 sm:grid-cols-2">{runners.map((r) => (
            <Link key={r.slug} to={`/shop/${r.slug}`} className="card flex gap-4 p-3 hover:bg-lime"><img src={img(r.images[0])} alt="" className="h-24 w-24 rounded-lg border-2 border-ink object-cover" /><div><p className="font-display text-xl font-extrabold">{r.name}</p><p className="text-sm text-muted">{r.fun}</p></div></Link>))}</div></>)}
          <button className="btn btn-paper mt-8" onClick={() => { setStep(0); setScore({}) }}>Take it again</button>
        </div>)}
    </div>
  )
}
