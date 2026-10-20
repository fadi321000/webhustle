import { ArrowRight, ArrowUpRight, BadgeCheck, BriefcaseBusiness, CircleDollarSign, Clock3, Copy, Plus, Sparkles, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { readBriefs, type StudioBrief } from './workspaceData'
import { openEmbedDialog } from './WorkspaceLayout'
import { SectionEyebrow } from '../components/SectionEyebrow'

const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
const statusClass = (status: StudioBrief['status']) => `brief-status status-${status.toLowerCase().replaceAll(' ', '-')}`

export function WorkspaceDashboard() {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()).toUpperCase()
  const [briefs] = useState(readBriefs)
  const active = useMemo(() => briefs.filter((brief) => brief.status !== 'Archived'), [briefs])
  const signed = active.filter((brief) => brief.status === 'Signed').length
  const inProgress = active.filter((brief) => brief.status === 'In Progress').length
  const pipeline = active.filter((brief) => brief.status !== 'Complete').reduce((sum, brief) => sum + brief.budget, 0)
  const featured = active.find((brief) => brief.featured) ?? active[0]
  const [copyState, setCopyState] = useState(false)
  async function copyIntakeLink() { try { await navigator.clipboard.writeText(`${window.location.origin}/request`) } catch { /* Modal contains the usable route if clipboard permission is unavailable. */ } setCopyState(true); window.setTimeout(() => setCopyState(false), 2200) }
  return <div className="workspace-dashboard">
    <div className="workspace-page-heading"><div><SectionEyebrow>{today}</SectionEyebrow><h1>Good evening, <span>WebHustle.</span></h1><p>A clear view of the work in motion and what comes next.</p></div><button className="button button-gold" type="button" onClick={openEmbedDialog}><Plus size={16} /> Invite a brief</button></div>
    <div className="demo-data-note"><Sparkles size={16} /><span><strong>A private studio view, by design.</strong> The names and projects below are fictional examples, saved only in this browser. This demo has no sign-in or shared client database.</span></div>
    {featured && <section className="workspace-featured"><div className="featured-copy"><span className="workspace-kicker"><Sparkles size={13} /> FEATURED PROJECT</span><h2>{featured.project}</h2><p>{featured.type} <span>·</span> A considered digital experience, moving from brief to build.</p><div className="featured-tags"><span className={statusClass(featured.status)}><i />{featured.status}</span><span>{money(featured.budget)} planning budget</span><span>Updated {featured.updated.toLowerCase()}</span></div><Link className="button button-quiet" to={`/workspace/projects/${featured.id}`}>View project <ArrowRight size={14} /></Link></div><div className="featured-art" aria-hidden="true"><div className="featured-ambient" /><div className="featured-orbit orbit-one" /><div className="featured-orbit orbit-two" /><div className="featured-mark">WH<span>—</span>STUDIO</div><div className="featured-bottom-mark">DIGITAL EXPERIENCES <span>2026</span></div></div></section>}
    <section className="workspace-metric-grid" aria-label="Studio summary"><article className="workspace-metric"><div><span>Total active briefs</span><ClipboardListIcon /></div><strong>{String(active.length).padStart(2, '0')}</strong><small>Across every stage</small></article><article className="workspace-metric"><div><span>Signed projects</span><BadgeCheck size={16} /></div><strong>{String(signed).padStart(2, '0')}</strong><small>Confirmed collaborations</small></article><article className="workspace-metric"><div><span>In progress</span><BriefcaseBusiness size={16} /></div><strong>{String(inProgress).padStart(2, '0')}</strong><small>Currently in production</small></article><article className="workspace-metric"><div><span>Pipeline estimate</span><CircleDollarSign size={16} /></div><strong>{money(pipeline)}</strong><small>Open project estimates</small></article></section>
    <section className="workspace-lower-grid"><div className="workspace-panel recent-panel"><div className="workspace-panel-heading"><div><span className="workspace-kicker">RECENT ACTIVITY</span><h2>Recent briefs</h2></div><Link to="/workspace/projects">View all <ArrowUpRight size={13} /></Link></div><div className="recent-list">{active.slice().sort((a,b) => (a.updated === 'Today' ? -1 : b.updated === 'Today' ? 1 : 0)).slice(0,4).map((brief) => <Link to={`/workspace/projects/${brief.id}`} className="recent-brief" key={brief.id}><span className="brief-monogram">{brief.project.split(' ').map((v) => v[0]).slice(0,2).join('')}</span><span className="recent-brief-copy"><strong>{brief.project}</strong><small>{brief.name} <span>·</span> {brief.type}</small></span><span className={statusClass(brief.status)}><i />{brief.status}</span><span className="recent-date">{brief.updated}</span><ArrowRight className="recent-arrow" size={15} /></Link>)}</div></div>
      <aside className="workspace-panel intake-panel"><span className="workspace-kicker">YOUR INTAKE LINK</span><div className="intake-icon"><TrendingUp size={20} /></div><h2>Good work starts with a good brief.</h2><p>Share your project form with a new client and keep the next step simple.</p><div className="intake-link-preview"><span>webhustle.studio/request</span><button type="button" onClick={copyIntakeLink} aria-label="Copy intake link">{copyState ? <BadgeCheck size={15} /> : <Copy size={15} />}</button></div><button className="button button-gold intake-share" type="button" onClick={openEmbedDialog}>Share intake link <ArrowUpRight size={14} /></button><span className="intake-subtle"><Clock3 size={13} /> Opens the public project inquiry</span></aside></section>
    <p className="workspace-dashboard-note">Planning figures are fictional examples and are not payment records or client commitments.</p>
  </div>
}
function ClipboardListIcon() { return <BriefcaseBusiness size={16} /> }
