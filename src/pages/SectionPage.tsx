import { ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../data/navigation'
import { SectionEyebrow } from '../components/SectionEyebrow'

export function SectionPage() {
  const { pathname } = useLocation()
  const page = routes.find((item) => item.path === pathname) ?? routes[1]
  return <section className="section-placeholder container"><SectionEyebrow>WebHustle Studio</SectionEyebrow><h1>{page.title}<span>.</span></h1><p>This part of the studio is taking shape. Come back soon to explore what we’re making.</p><Link to="/request" className="button button-gold">Start a conversation <ArrowUpRight size={16} /></Link></section>
}
