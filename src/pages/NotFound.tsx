import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[60vh] place-items-center py-16 text-center">
      <Seo title="Page not found | Crystals World" description="That page has wandered off." />
      <div>
        <p className="font-display text-[clamp(6rem,22vw,14rem)] font-extrabold leading-none text-sign">4<span className="wobble inline-block">💎</span>4</p>
        <h1 className="text-5xl">This page got lost in the gem show.</h1>
        <p className="mx-auto mt-4 max-w-md text-xl text-muted">We looked under every geode. Nothing. Try the shop instead. It’s much better stocked.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/shop" className="btn btn-lime">Back to the rocks</Link><Link to="/" className="btn btn-paper">Home</Link></div>
      </div>
    </div>
  )
}
