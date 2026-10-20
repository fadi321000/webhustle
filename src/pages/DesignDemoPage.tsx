import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { DesignSitePreview } from '../components/DesignSitePreview'
import { SectionEyebrow } from '../components/SectionEyebrow'
import { getDesignProject } from '../data/designs'

export function DesignDemoPage() {
  const { slug } = useParams()
  const project = getDesignProject(slug)
  if (!project) return <section className="section-placeholder container"><SectionEyebrow>Preview not found</SectionEyebrow><h1>This design is<br /><span>not available.</span></h1><Link className="button button-quiet" to="/designs"><ArrowLeft size={14} /> Back to designs</Link></section>
  return <section className="demo-page container"><div className="demo-heading"><div><Link to="/designs" className="demo-back"><ArrowLeft size={13} /> All designs</Link><SectionEyebrow>{project.category} / Local demo</SectionEyebrow><h1>{project.name}<span>.</span></h1><p>{project.description}</p></div><Link className="button button-gold" to={`/request?reference=${project.slug}&category=${encodeURIComponent(project.category)}`}>Request something similar <ArrowUpRight size={15} /></Link></div><div className="demo-site-frame"><DesignSitePreview project={project} /></div><p className="demo-note">A local concept preview by WebHustle. Designed to show a possible direction for your project.</p></section>
}
