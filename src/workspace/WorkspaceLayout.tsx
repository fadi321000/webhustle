import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { ArrowLeft, Archive, BriefcaseBusiness, ChevronDown, ClipboardList, Copy, ExternalLink, LayoutDashboard, Menu, Settings2, X } from 'lucide-react'
import { Brand } from '../components/Brand'
import { AmbientEffects } from '../components/AmbientEffects'
import { readBriefs, readBranding } from './workspaceData'

const sections = [
  { label: 'Overview', to: '/workspace', icon: LayoutDashboard, end: true },
  { label: 'All briefs', to: '/workspace/projects', icon: ClipboardList },
  { label: 'Archive', to: '/workspace/archive', icon: Archive },
]

export function WorkspaceLayout() {
  const [open, setOpen] = useState(false)
  const [briefs, setBriefs] = useState(readBriefs)
  const [branding, setBranding] = useState(readBranding)
  const [notice, setNotice] = useState('')
  const [modal, setModal] = useState(false)
  useEffect(() => { const openDialog = () => setModal(true); const refreshBriefs=()=>setBriefs(readBriefs()); const refreshBranding=()=>setBranding(readBranding()); const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape')setModal(false)}; window.addEventListener('webhustle:open-embed', openDialog); window.addEventListener('webhustle:briefs-updated',refreshBriefs); window.addEventListener('webhustle:branding-updated',refreshBranding); window.addEventListener('keydown',onKeyDown); return () => {window.removeEventListener('webhustle:open-embed', openDialog);window.removeEventListener('webhustle:briefs-updated',refreshBriefs);window.removeEventListener('webhustle:branding-updated',refreshBranding);window.removeEventListener('keydown',onKeyDown)} }, [])
  const intakeUrl = typeof window === 'undefined' ? '/request' : `${window.location.origin}/request`
  async function copyLink() {
    try { await navigator.clipboard.writeText(intakeUrl); setNotice('Intake link copied') }
    catch { setNotice(`Intake link: ${intakeUrl}`) }
    window.setTimeout(() => setNotice(''), 3500)
  }
  return <div className="workspace-app">
    <AmbientEffects />
    <a className="skip-link" href="#workspace-main">Skip to workspace content</a>
    <aside className={`workspace-sidebar${open ? ' is-open' : ''}`}>
      <div className="workspace-brand"><Brand /><button type="button" className="workspace-close" aria-label="Close workspace menu" onClick={() => setOpen(false)}><X size={18} /></button></div>
      <div className="workspace-switch"><span className="workspace-avatar">W</span><span><strong>{branding.studioName}</strong><small>{branding.tagline}</small></span><ChevronDown size={14} /></div>
      <p className="workspace-nav-caption">WORKSPACE</p>
      <nav className="workspace-nav" aria-label="Workspace navigation">{sections.map(({ label, to, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}><Icon size={17} />{label}<span className="workspace-nav-count">{label === 'All briefs' ? String(briefs.filter(b=>b.status!=='Archived').length).padStart(2,'0') : label === 'Archive' ? String(briefs.filter(b=>b.status==='Archived').length).padStart(2,'0') : ''}</span></NavLink>)}</nav>
      <p className="workspace-nav-caption settings-caption">STUDIO</p>
      <nav className="workspace-nav" aria-label="Studio settings"><NavLink to="/workspace/settings/branding" onClick={() => setOpen(false)}><Settings2 size={17} />Studio branding</NavLink><NavLink to="/workspace/settings/pricing" onClick={() => setOpen(false)}><BriefcaseBusiness size={17} />Pricing &amp; rates</NavLink></nav>
      <div className="workspace-sidebar-bottom"><span className="workspace-status-dot" />Workspace demo data only</div>
    </aside>
    {open && <button type="button" className="workspace-scrim" aria-label="Close navigation menu" onClick={() => setOpen(false)} />}
    <div className="workspace-main-column">
      <header className="workspace-topbar"><button className="workspace-menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open workspace menu" aria-expanded={open}><Menu size={19} /></button><div className="workspace-breadcrumb">Studio <span>/</span> Workspace</div><div className="workspace-top-actions"><span className="workspace-demo-pill">DEMO WORKSPACE</span><Link to="/" className="workspace-back-link"><ArrowLeft size={14} />Back to website</Link></div></header>
      <main id="workspace-main" className="workspace-content"><Outlet /></main>
      <footer className="workspace-footer"><span>© {new Date().getFullYear()} WebHustle Studio</span><span>Fictional demonstration data · stored in this browser only</span></footer>
    </div>
    {notice && <div className="workspace-toast" role="status"><Copy size={15} />{notice}</div>}
    {modal && <div className="workspace-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(false) }}><section className="workspace-modal" role="dialog" aria-modal="true" aria-labelledby="embed-title"><button type="button" className="workspace-modal-close" aria-label="Close embed instructions" onClick={() => setModal(false)}><X size={17} /></button><span className="workspace-kicker">INTAKE LINK</span><h2 id="embed-title">Invite a new brief.</h2><p>Share the public Request a Website page with a prospective client. Their answers stay in their current browser until they choose to send the brief through email or WhatsApp.</p><div className="embed-code"><code>{`<iframe src="${intakeUrl}" title="Request a website" width="100%" height="900"></iframe>`}</code></div><div className="workspace-modal-actions"><button className="button button-gold" type="button" onClick={() => void copyLink()}>Copy intake link</button><Link to="/request" className="button button-quiet" onClick={() => setModal(false)}><ExternalLink size={14} />Open form</Link></div><small>Embed this snippet on a site you control. The form is a demonstration and has no connected backend.</small></section></div>}
  </div>
}

export function openEmbedDialog() { window.dispatchEvent(new Event('webhustle:open-embed')) }
