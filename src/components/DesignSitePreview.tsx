import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, Search, Sparkles } from 'lucide-react'
import type { DesignProject } from '../data/designs'

export function DesignSitePreview({ project, compact = false }: { project: DesignProject; compact?: boolean }) {
  return (
    <div className={`design-site design-${project.variant}${compact ? ' is-compact' : ''}`}>
      {project.variant === 'savor' && <SavorPreview project={project} />}
      {project.variant === 'orbit' && <OrbitPreview project={project} />}
      {project.variant === 'essential' && <EssentialPreview project={project} />}
      {project.variant === 'habitat' && <HabitatPreview project={project} />}
      {project.variant === 'northline' && <NorthlinePreview project={project} />}
      {project.variant === 'monroe' && <MonroePreview project={project} />}
      {project.variant === 'morrow' && <MorrowPreview project={project} />}
      {project.variant === 'avery' && <AveryPreview project={project} />}
    </div>
  )
}

function Image({ project, className = '' }: { project: DesignProject; className?: string }) {
  return <img className={`design-photo ${className}`} src={project.previewImage} alt={project.previewAlt} loading="lazy" />
}

function MiniNav({ name, dark = false }: { name: string; dark?: boolean }) {
  return <div className={`mini-nav${dark ? ' dark' : ''}`}><strong>{name}</strong><span><i>About</i><i>Journal</i><b>Explore <ArrowUpRight size={10} /></b></span><Menu className="mini-menu" size={14} /></div>
}

function SavorPreview({ project }: { project: DesignProject }) {
  return <><div className="savor-bar">Dinner, made special <span>Book a table <ArrowUpRight size={10} /></span></div><div className="savor-cover"><Image project={project} /><div className="savor-cover-shade" /><MiniNav name="SAVOR" dark /><div className="savor-hero-copy"><span>SEASONAL · LOCAL · ALWAYS GOOD</span><strong>A taste of<br />the good life.</strong><span className="preview-action">View our menu <ArrowRight size={11} /></span></div></div><div className="savor-footer"><span>Good food. Good company.</span><span>Our story　·　The menu　·　Find us</span></div></>
}

function OrbitPreview({ project: _project }: { project: DesignProject }) {
  return <><div className="orbit-site-nav"><strong>orbit<span>●</span></strong><span>Product　 Solutions　 Resources</span><span className="preview-action">Get started <ArrowUpRight size={10} /></span></div><div className="orbit-site-hero"><div className="orbit-kicker">WORK, IN SYNC <Sparkles size={11} /></div><strong>Make room for<br /><em>your best work.</em></strong><p>A calmer way to plan, share and move forward together.</p><span className="preview-action">See how it works <ArrowRight size={11} /></span><div className="orbit-app-card"><div className="orbit-app-top"><span>Good morning, Casey</span><span>⌕　•••</span></div><div className="orbit-app-stat"><b>This week</b><span>4 of 6 projects moving</span><i><Check size={10} /></i></div><div className="orbit-app-bars"><i /><i /><i /><i /><i /><i /><i /></div></div></div><div className="orbit-below">Everything in its orbit <ArrowDown size={11} /></div></>
}

function EssentialPreview({ project }: { project: DesignProject }) {
  return <><div className="essential-promo">A little less, a lot more.　<span>Free shipping over $75</span></div><div className="essential-nav"><span>Objects　Our story　Notes</span><strong>essential</strong><span>Search　Bag (0)</span></div><div className="essential-hero"><div><span>THE EVERYDAY EDIT</span><strong>Made for<br />the in-between.</strong><p>Well-made things for a home that feels like you.</p><span className="preview-action">Shop the collection <ArrowRight size={11} /></span></div><Image project={project} /></div><div className="essential-bottom">A softer kind of everyday <span>01 — 04</span></div></>
}

function HabitatPreview({ project }: { project: DesignProject }) {
  return <><div className="habitat-nav"><strong>habitat<span>.</span></strong><span>Buy　Rent　Discover</span><span className="preview-action">Find a home <ArrowUpRight size={10} /></span></div><div className="habitat-hero"><Image project={project} /><div className="habitat-copy"><span>COME HOME TO YOURSELF</span><strong>Space to<br />be here.</strong><span className="preview-action">Explore homes <ArrowRight size={11} /></span></div><div className="habitat-search"><Search size={11} /><span>Neighbourhood</span><i>Any home type</i><b>Search <ArrowRight size={10} /></b></div></div><div className="habitat-bottom">Thoughtfully found, naturally lived.</div></>
}

function NorthlinePreview({ project }: { project: DesignProject }) {
  return <><MiniNav name="NORTHLINE" /><div className="northline-hero"><div><span>STRATEGY · DESIGN · CHANGE</span><strong>A clearer path<br />to what’s next.</strong><p>Independent thinking for businesses ready to move forward.</p><span className="preview-action">What we do <ArrowRight size={11} /></span></div><Image project={project} /></div><div className="northline-footer">Good work begins with a better question. <span>01 / 03</span></div></>
}

function MonroePreview({ project }: { project: DesignProject }) {
  return <><MiniNav name="MONROE / SELECTED WORK" dark /><div className="monroe-hero"><span>INDEPENDENT ART DIRECTION & DESIGN</span><strong>Ideas, made<br />visible.</strong><Image project={project} /><div>Selected work 2022 — 2025 <ArrowUpRight size={11} /></div></div></>
}

function MorrowPreview({ project }: { project: DesignProject }) {
  return <><MiniNav name="morrow" /><div className="morrow-hero"><div><span>LEARN AT YOUR OWN PACE</span><strong>Curiosity opens<br />every door.</strong><p>Little lessons. Big possibilities.</p><span className="preview-action">Find your course <ArrowRight size={11} /></span></div><Image project={project} /></div><div className="morrow-row">Thoughtfully designed learning for everyone　　<span>Explore subjects <ArrowRight size={10} /></span></div></>
}

function AveryPreview({ project }: { project: DesignProject }) {
  return <><MiniNav name="avery lane" /><div className="avery-hero"><div><span>CREATIVE DIRECTOR · NEW YORK</span><strong>Making space<br />for a little<br /><em>more feeling.</em></strong><span className="preview-action">Selected work <ArrowRight size={11} /></span></div><Image project={project} /></div><div className="avery-bottom">Independent by nature. Collaborative by design.</div></>
}
