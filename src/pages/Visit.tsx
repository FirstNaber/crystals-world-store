import { useState } from 'react'
import { Seo } from '../components/Seo'
import { img, OpenBadge, TBC, useOpenStatus } from '../components/bits'
import { HOURS, HOURS_ARE_SAMPLE, SITE } from '../data/site'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const fmt = (s: string) => { const h = parseInt(s.slice(0, 2)); return `${h % 12 || 12}${s.slice(3) === '00' ? '' : s.slice(2)} ${h >= 12 ? 'PM' : 'AM'}` }

export default function Visit() {
  const [sent, setSent] = useState(false)
  const st = useOpenStatus()
  return (
    <div className="wrap py-12">
      <Seo title="Visit Crystals World | Crystal Shop on Guadalupe St, Austin TX" description="Find Crystals World at 3202 Guadalupe St Ste C, Austin, TX 78705. Hours, directions, parking and contact." />
      <p className="eyebrow text-muted">Visit</p>
      <h1 className="text-6xl sm:text-7xl">Come say hi.</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card bg-lime p-6">
            <OpenBadge className="text-xl" />
            <address className="mt-4 text-2xl not-italic font-display font-extrabold">{SITE.street}<br />{SITE.city}</address>
            <div className="mt-5 flex flex-wrap gap-3"><a className="btn btn-ink" href={SITE.tel}>Call {SITE.phone}</a><a className="btn btn-paper" href={SITE.directions} target="_blank" rel="noopener noreferrer">Get directions</a></div>
          </div>
          <section className="card p-5" aria-labelledby="hrs"><h2 id="hrs" className="text-3xl">Hours</h2>
            <table className="mt-3 w-full font-mono text-sm"><tbody>{DAYS.map((d, i) => (
              <tr key={d} className={st.today && i === new Date().getDay() ? 'font-bold' : ''}><th scope="row" className="py-1 text-left font-normal">{d}</th><td className="text-right">{HOURS[i] ? `${fmt(HOURS[i]![0])} – ${fmt(HOURS[i]![1])}` : 'Closed'}</td></tr>))}</tbody></table>
            {HOURS_ARE_SAMPLE && <p className="mt-3"><TBC>[HOURS] sample values — confirm the real schedule</TBC></p>}
          </section>
          <section className="card p-5"><h2 className="text-3xl">Parking &amp; access</h2>
            <p className="mt-3"><b>Parking:</b> <TBC>{SITE.parking}</TBC></p><p className="mt-2"><b>Accessibility:</b> <TBC>{SITE.accessibility}</TBC></p></section>
          <section className="card p-5"><h2 className="text-3xl">Pickup orders</h2><p className="mt-2 text-lg">Order online, choose “Pick up in Austin” at checkout, and we’ll message you when it’s ready. It’s free. Wholesale inquiries? Message us on <a className="underline" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>.</p></section>
        </div>
        <div className="space-y-6">
          <div className="card overflow-hidden"><iframe title="Map to Crystals World, 3202 Guadalupe St, Austin" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-square w-full sm:aspect-[4/3]" /></div>
          <div className="grid grid-cols-3 gap-3">
            {[['shop-shelves', 'A tall white shelf of crystals and minerals'], ['shop-counter', 'The counter and glass cases inside the shop'], ['shop-case-clusters', 'A glass case of mineral clusters']].map(([n, a]) => (
              <img key={n} src={img(`images/${n}.jpg`)} alt={a} loading="lazy" className="card aspect-[3/5] w-full object-cover" />))}
          </div>
          <section className="card p-5" aria-labelledby="contact"><h2 id="contact" className="text-3xl">Say something</h2>
            {sent ? <p className="mt-3 text-xl font-medium">Message received (demo). In the live site this lands in the shop’s inbox.</p> : (
              <form className="mt-3 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <label className="block font-medium">Name<input className="input mt-1" required autoComplete="name" /></label>
                <label className="block font-medium">Email<input className="input mt-1" type="email" required autoComplete="email" /></label>
                <label className="block font-medium">Message<textarea className="input mt-1" rows={4} required /></label>
                <button className="btn btn-lime" type="submit">Send it</button>
                <p className="text-xs text-muted">Demo form. Connect it to your email with Formspree, Netlify Forms or Shopify’s contact form. Contact email: <TBC>{SITE.email}</TBC></p>
              </form>)}
          </section>
        </div>
      </div>
    </div>
  )
}
