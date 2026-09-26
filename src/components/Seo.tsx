import { useEffect } from 'react'

/** Sets <title>, meta description and (optionally) a JSON-LD block for the current page. */
export function Seo({ title, description, jsonLd }: { title: string; description: string; jsonLd?: object }) {
  useEffect(() => {
    document.title = title
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m) }
    m.setAttribute('content', description)
    let s: HTMLScriptElement | null = null
    if (jsonLd) {
      s = document.createElement('script'); s.type = 'application/ld+json'; s.dataset.page = '1'
      s.textContent = JSON.stringify(jsonLd); document.head.appendChild(s)
    }
    return () => { s?.remove() }
  }, [title, description, jsonLd])
  return null
}
