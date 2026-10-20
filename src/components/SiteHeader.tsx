import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'
import { navigation } from '../data/navigation'
import { Brand } from './Brand'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 8)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner container">
        <Brand />
        <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`main-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          {navigation.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{label}</NavLink>
          ))}
          <Link className="button button-gold nav-cta magnetic-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e1c68e]" to="/request" onClick={() => setOpen(false)}>Start Your Project <ArrowUpRight size={15} /></Link>
        </nav>
      </div>
    </header>
  )
}
