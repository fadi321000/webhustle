import { useMemo, useState } from 'react'
import { Archive, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { readBriefs, saveBriefStatus } from './workspaceData'
import { SectionEyebrow } from '../components/SectionEyebrow'
import { formatINR } from '../data/pricing'
export function WorkspaceArchive() {
  const [briefs,setBriefs]=useState(readBriefs),[query,setQuery]=useState('')
  const archived=useMemo(()=>briefs.filter(b=>b.status==='Archived').filter(b=>!query||`${b.project} ${b.name}`.toLowerCase().includes(query.toLowerCase())),[briefs,query])
  function restore(id:string){saveBriefStatus(id,'Complete');setBriefs(readBriefs())}
  return <div className="workspace-section-page"><div className="workspace-page-heading"><div><SectionEyebrow>PAST PROJECTS</SectionEyebrow><h1>The <span>archive.</span></h1><p>Completed and retired work, kept close at hand.</p></div><span className="workspace-page-count">{archived.length} archived</span></div><label className="brief-search archive-search"><Search size={16}/><span className="sr-only">Search archive</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search archived projects"/></label><div className="archive-grid">{archived.map(brief=><article className="archive-card" key={brief.id}><span className="archive-card-icon"><Archive size={17}/></span><span className="workspace-kicker">{brief.updated}</span><h2>{brief.project}</h2><p>{brief.name} · {brief.type}</p><div><span>Original estimate</span><strong>{formatINR(brief.budget)}</strong></div><button type="button" className="archive-restore" onClick={()=>restore(brief.id)}>Restore to active briefs</button><Link to={`/workspace/projects/${brief.id}`} className="archive-open">View details</Link></article>)}</div>{!archived.length&&<div className="workspace-empty archive-empty"><Archive size={22}/><h2>Your archive is clear</h2><p>Archived projects will appear here.</p></div>}<p className="workspace-data-caption">Demo records only · archive changes are stored in this browser.</p></div>
}
