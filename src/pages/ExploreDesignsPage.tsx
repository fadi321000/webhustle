import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Expand, Maximize2, Monitor, RefreshCw, Search, Smartphone, Tablet, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DesignSitePreview } from '../components/DesignSitePreview'
import { SectionEyebrow } from '../components/SectionEyebrow'
import { designCategories, designProjects, type DesignCategory } from '../data/designs'

type ViewportMode = 'desktop' | 'tablet' | 'mobile'

const viewportOptions: { mode: ViewportMode; label: string; size: string; icon: typeof Monitor }[] = [
  { mode: 'desktop', label: 'Desktop', size: '1440 × 900', icon: Monitor },
  { mode: 'tablet', label: 'Tablet', size: '768 × 1024', icon: Tablet },
  { mode: 'mobile', label: 'Mobile', size: '390 × 844', icon: Smartphone },
]

export function ExploreDesignsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | DesignCategory>('All')
  const [search, setSearch] = useState('')
  const [selectedSlug, setSelectedSlug] = useState(designProjects[0]?.slug ?? '')
  const [viewport, setViewport] = useState<ViewportMode>('desktop')
  const [refreshKey, setRefreshKey] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase()
    return designProjects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory
      const matchesQuery = !query || [project.name, project.description, project.category].some((value) => value.toLowerCase().includes(query))
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, search])
  const selectedProject = designProjects.find((project) => project.slug === selectedSlug) ?? designProjects[0]
  const selectedViewport = viewportOptions.find((option) => option.mode === viewport) ?? viewportOptions[0]

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [])

  async function toggleFullscreen() {
    if (!previewRef.current) return
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await previewRef.current.requestFullscreen()
      setIsFullscreen(Boolean(document.fullscreenElement))
    } catch {
      setIsFullscreen(false)
    }
  }

  function selectPreview(project: (typeof designProjects)[number]) {
    setSelectedSlug(project.slug)
    setViewport('desktop')
    document.getElementById('design-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="explore-page">
      <section className="explore-intro container">
        <SectionEyebrow>A world of possibilities</SectionEyebrow>
        <h1>Your inspiration<br /><span>starts here.</span></h1>
        <p>Explore considered designs for every kind of business. Find your style, then make it your own.</p>
        <a className="intro-scroll" href="#project-gallery"><span><ArrowDown size={13} /></span>Find your next idea</a>
      </section>

      <section className="explore-library container" aria-label="Design library">
        <div className="library-topline"><div><span className="library-count">{designProjects.length.toString().padStart(2, '0')}</span><span>curated directions</span></div><span>Thoughtfully made. Ready to make your own.</span></div>
        <div className="explore-toolbar">
          <label className="design-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search designs by name, description or category</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search designs, styles, ideas..." /></label>
          <button className="clear-search" type="button" onClick={() => { setSearch(''); setActiveCategory('All') }}>Reset <X size={12} /></button>
        </div>
        <div className="category-filter" role="group" aria-label="Filter designs by category">
          {designCategories.map((category) => {
            const count = category === 'All' ? designProjects.length : designProjects.filter((project) => project.category === category).length
            return <button key={category} type="button" className={`category-chip${activeCategory === category ? ' is-active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}<span>{count}</span></button>
          })}
        </div>
      </section>

      <section className="preview-section" id="design-preview">
        <div className="container">
          <div className="preview-section-heading"><div><SectionEyebrow>Take a closer look</SectionEyebrow><h2>Find your <span>perspective.</span></h2></div><p>Explore the details in a viewport that feels like yours.</p></div>
          <div className="preview-shell" ref={previewRef}>
            <div className="preview-toolbar">
              <label className="preview-select-label" htmlFor="design-select">SELECT A DESIGN</label>
              <div className="preview-select-wrap"><select id="design-select" value={selectedSlug} onChange={(event) => setSelectedSlug(event.target.value)} aria-label="Select a design to preview">{designProjects.map(({ slug, name, category }) => <option value={slug} key={slug}>{name} — {category}</option>)}</select><Expand size={13} aria-hidden="true" /></div>
              <div className="viewport-controls" role="group" aria-label="Preview viewport size">{viewportOptions.map(({ mode, label, icon: Icon }) => <button type="button" key={mode} className={`viewport-button${viewport === mode ? ' is-active' : ''}`} aria-pressed={viewport === mode} onClick={() => setViewport(mode)}><Icon size={14} /><span>{label}</span></button>)}</div>
              <div className="preview-tools"><span className="viewport-size">{selectedViewport.size}</span><button type="button" className="icon-tool" onClick={() => setRefreshKey((key) => key + 1)} aria-label="Refresh design preview" title="Refresh preview"><RefreshCw size={15} /></button><button type="button" className="icon-tool" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Open preview fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <X size={15} /> : <Maximize2 size={15} />}</button></div>
            </div>
            <div className={`preview-stage stage-${viewport}`}>
              <div className={`preview-viewport viewport-${viewport}`} key={`${selectedSlug}-${refreshKey}`}>
                {selectedProject && <DesignSitePreview project={selectedProject} />}
              </div>
            </div>
            <div className="preview-caption"><span><i /> Local interactive preview <span className="caption-divider">/</span> {selectedProject?.name}</span><Link to={`/designs/${selectedProject?.slug}`}>Open full demo <ArrowUpRight size={13} /></Link></div>
          </div>
        </div>
      </section>

      <section className="project-gallery container" id="project-gallery">
        <div className="gallery-heading"><div><SectionEyebrow>Selected directions</SectionEyebrow><h2>Find something<br /><span>that feels like you.</span></h2></div><span className="gallery-result-count">Showing <strong>{filteredProjects.length}</strong> of {designProjects.length} designs</span></div>
        {filteredProjects.length ? <div className="design-grid">{filteredProjects.map((project) => <article className="design-card" key={project.slug}>
          <button className="design-card-image" type="button" onClick={() => selectPreview(project)} aria-label={`Preview ${project.name} design`}><DesignSitePreview project={project} compact /><span className="image-overlay"><span>View in preview <ArrowUpRight size={14} /></span></span></button>
          <div className="design-card-content"><div className="design-card-meta"><span className="design-category">{project.category}</span>{project.status && <span className="demo-badge"><i /><Check size={10} /> {project.status}</span>}</div><h3>{project.name}</h3><p>{project.description}</p><div className="design-card-actions"><Link className="button button-quiet" to={`/designs/${project.slug}`}>Preview <ArrowUpRight size={14} /></Link><Link className="similar-link" to={`/request?reference=${project.slug}&category=${encodeURIComponent(project.category)}`}>Request Similar <ArrowRight size={14} /></Link></div></div>
        </article>)}</div> : <div className="empty-designs"><div className="empty-search-icon"><Search size={19} /></div><h3>No designs found</h3><p>Try another search or choose a different category to find your inspiration.</p><button className="button button-quiet" type="button" onClick={() => { setSearch(''); setActiveCategory('All') }}>Clear search and filters <X size={14} /></button></div>}
      </section>
      <section className="explore-cta"><div className="container explore-cta-inner"><div><SectionEyebrow>Your idea, your direction</SectionEyebrow><h2>Found a feeling?<br /><span>Let’s make it yours.</span></h2></div><Link className="button button-gold" to="/request">Start your project <ArrowUpRight size={15} /></Link></div></section>
    </div>
  )
}
