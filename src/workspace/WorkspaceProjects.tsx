import { useMemo, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { readBriefs, saveBriefStatus, type BriefStatus } from './workspaceData'
import { SectionEyebrow } from '../components/SectionEyebrow'
import { formatINR } from '../data/pricing'

const statuses: Array<'All' | BriefStatus> = ['All', 'Pending', 'Signed', 'In Progress', 'Complete']
const klass = (status: BriefStatus) => `brief-status status-${status.toLowerCase().replaceAll(' ', '-')}`
export function WorkspaceProjects() {
  const [briefs, setBriefs] = useState(readBriefs)
  const [status, setStatus] = useState<'All' | BriefStatus>('All')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => briefs.filter((b) => b.status !== 'Archived').filter((b) => status === 'All' || status === b.status).filter((b) => !query || `${b.name} ${b.project} ${b.type}`.toLowerCase().includes(query.toLowerCase())), [briefs,status,query])
  function update(id: string, next: BriefStatus) { saveBriefStatus(id,next); setBriefs(readBriefs()) }
  return <div className="workspace-section-page"><div className="workspace-page-heading"><div><SectionEyebrow>CLIENT WORK</SectionEyebrow><h1>All <span>briefs.</span></h1><p>Keep an eye on every project as it moves through the studio.</p></div><span className="workspace-page-count">{filtered.length} results</span></div><div className="brief-toolbar"><label className="brief-search"><Search size={16} /><span className="sr-only">Search briefs</span><input placeholder="Search projects or clients" value={query} onChange={(e) => setQuery(e.target.value)} /></label><div className="brief-filter-tabs" role="group" aria-label="Filter briefs by status">{statuses.map((item) => <button type="button" className={status===item?'is-active':''} aria-pressed={status===item} onClick={()=>setStatus(item)} key={item}>{item}</button>)}</div></div><div className="brief-table-wrap"><table className="brief-table"><thead><tr><th>PROJECT</th><th>CLIENT</th><th>STATUS</th><th>ESTIMATE</th><th>UPDATED</th><th aria-label="Project actions" /></tr></thead><tbody>{filtered.map((brief) => <tr key={brief.id}><td><Link className="brief-table-project" to={`/workspace/projects/${brief.id}`}><span className="brief-monogram">{brief.project.split(' ').map((v)=>v[0]).slice(0,2).join('')}</span><span><strong>{brief.project}</strong><small>{brief.type}</small></span></Link></td><td>{brief.name}</td><td><label className="sr-only" htmlFor={`status-${brief.id}`}>Status for {brief.project}</label><select className={`brief-status-select ${klass(brief.status)}`} id={`status-${brief.id}`} value={brief.status} onChange={(e)=>update(brief.id,e.target.value as BriefStatus)}>{statuses.slice(1).map((s)=><option key={s}>{s}</option>)}</select></td><td>{formatINR(brief.budget)}</td><td>{brief.updated}</td><td><Link className="table-action" to={`/workspace/projects/${brief.id}`} aria-label={`Open ${brief.project}`}><ArrowUpRight size={15}/></Link></td></tr>)}</tbody></table>{!filtered.length && <div className="workspace-empty"><Search size={20}/><h2>No briefs found</h2><p>Try another search or status filter.</p></div>}</div><p className="workspace-data-caption">Fictional demonstration records · changes are saved locally in this browser.</p></div>
}
