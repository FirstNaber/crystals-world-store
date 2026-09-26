import { useState } from 'react'
import { Seo } from '../components/Seo'
import { TBC } from '../components/bits'

/** SAMPLE events. Replace with the shop’s real ones (date is an ISO string). */
const EVENTS = [
  { id: 'e1', title: 'Crystals 101: Your First Rock', date: '[DATE]', time: '[TIME]', where: 'In the shop', blurb: 'An easy, judgment-free intro to what’s what. Bring questions. Snacks: [TBC].' },
  { id: 'e2', title: 'Sparkle Night', date: '[DATE]', time: '[TIME]', where: 'In the shop', blurb: 'After-hours browsing, new arrivals first, neon on. [DETAILS]' },
  { id: 'e3', title: 'Local Makers & Rocks Pop-up', date: '[DATE]', time: '[TIME]', where: '[LOCATION]', blurb: 'Austin makers, jewelry and stones. [DETAILS]' },
]

export default function Events() {
  const [open, setOpen] = useState<string | null>(null)
  const [done, setDone] = useState<string[]>([])
  return (
    <div className="wrap py-12">
      <Seo title="Crystal Events & Workshops in Austin | Crystals World" description="Workshops, pop-ups and community nights at Crystals World, a crystal shop on Guadalupe Street in Austin, Texas." />
      <p className="eyebrow text-muted">Community</p>
      <h1 className="text-6xl sm:text-7xl">Events &amp; workshops</h1>
      <p className="mt-4 max-w-xl text-xl">Meet the neighbors, meet the rocks. <TBC>SAMPLE EVENTS — replace with the shop’s real schedule</TBC></p>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {EVENTS.map((e, i) => (
          <li key={e.id} className={`card flex flex-col p-5 ${['bg-cyan', 'bg-pink', 'bg-citrine'][i]}`}>
            <p className="font-mono text-sm font-medium">{e.date} · {e.time}</p><h2 className="mt-2 text-3xl">{e.title}</h2>
            <p className="mt-1 font-mono text-sm">{e.where}</p><p className="mt-3 flex-1 text-lg">{e.blurb}</p>
            {done.includes(e.id) ? <p className="mt-4 rounded-xl border-2 border-ink bg-paper p-3 font-bold">You’re on the list (demo). See you there.</p>
              : open === e.id ? (
                <form className="mt-4 space-y-2" onSubmit={(ev) => { ev.preventDefault(); setDone([...done, e.id]); setOpen(null) }}>
                  <label className="block text-sm font-medium">Name<input className="input mt-1" required /></label>
                  <label className="block text-sm font-medium">Email<input className="input mt-1" type="email" required /></label>
                  <button className="btn btn-ink w-full" type="submit">Save my spot</button></form>
              ) : <button className="btn btn-paper mt-4" onClick={() => setOpen(e.id)}>RSVP</button>}
          </li>))}
      </ul>
    </div>
  )
}
