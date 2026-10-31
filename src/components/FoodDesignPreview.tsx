import { useState, type CSSProperties, type FormEvent } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Menu, Phone, X } from 'lucide-react'
import type { DesignProject } from '../data/designs'

export function FoodDesignPreview({ project, compact = false }: { project: DesignProject; compact?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [reservationSent, setReservationSent] = useState(false)
  const food = project.food
  if (!food) return null

  const style = {
    '--food-paper': project.palette[0],
    '--food-accent': project.palette[1],
    '--food-ink': project.palette[2],
    '--food-image': `url("${project.previewImage}")`,
  } as CSSProperties

  function reserve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReservationSent(true)
  }

  return (
    <div className={`food-site food-layout-${food.layout}${compact ? ' is-compact' : ''}`} style={style}>
      {compact
        ? <div className="food-nav"><span className="food-wordmark">{project.name}<span>.</span></span><span className="food-card-category">{food.cuisine}</span></div>
        : <header className="food-nav">
          <a className="food-wordmark" href="#food-home">{project.name}<span>.</span></a>
          <button className="food-mobile-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <nav className={menuOpen ? 'is-open' : ''} aria-label={`${project.name} navigation`} onClick={() => setMenuOpen(false)}>
            <a href="#food-story">Our story</a><a href="#food-menu">The menu</a><a href="#food-visit">Find us</a>
            <a className="food-book-link" href="#food-book">Book a table <ArrowUpRight size={14} /></a>
          </nav>
        </header>}

      <main>
        <section className="food-hero" id="food-home">
          <div className="food-hero-image" role="img" aria-label={project.previewAlt} />
          <div className="food-hero-copy">
            <span className="food-kicker">{food.cuisine} <i /> A little something special</span>
            <h1>{food.tagline}</h1>
            <p>{project.description}</p>
            <div className="food-hero-actions">{compact
              ? <><span className="food-primary-link">Explore the menu <ArrowRight size={15} /></span><span className="food-secondary-link">Save me a seat</span></>
              : <><a className="food-primary-link" href="#food-menu">Explore the menu <ArrowRight size={15} /></a><a className="food-secondary-link" href="#food-book">Save me a seat</a></>}</div>
            <span className="food-hero-note"><ArrowDown size={13} /> {food.address}</span>
          </div>
          <span className="food-hero-index">A TABLE FOR EVERY STORY <i /> EST. AS A CONCEPT</span>
        </section>

        {!compact && <>
          <section className="food-story" id="food-story">
            <div><span className="food-section-kicker">A note from our kitchen</span><h2>Made with care.<br /><em>Meant to be shared.</em></h2></div>
            <p>{food.story}</p>
          </section>

          <section className="food-menu" id="food-menu">
            <div className="food-menu-heading"><div><span className="food-section-kicker">A few house favorites</span><h2>Good things<br /><em>on the table.</em></h2></div><p>Sample menu · Prices shown for this concept preview</p></div>
            <div className="food-dishes">{food.dishes.map((dish, index) => <article className="food-dish" key={dish.name}><span className="food-dish-number">0{index + 1}</span><div><h3>{dish.name}</h3><p>{dish.description}</p></div><span className="food-dish-price">{dish.price}</span></article>)}</div>
            <p className="food-menu-footnote">A small taste of what this sample menu could become.</p>
          </section>

          <section className="food-booking" id="food-book">
            <div><span className="food-section-kicker">Make an evening of it</span><h2>Your table<br /><em>is waiting.</em></h2><p>Share a few details to try the sample booking experience. This demo does not send a real reservation.</p></div>
            <form onSubmit={reserve}>
              <label>Your name<input name="name" autoComplete="name" placeholder="How should we greet you?" required /></label>
              <div className="food-form-row"><label>Guests<select name="guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></label><label>When<input name="date" type="date" required /></label></div>
              <button type="submit">{reservationSent ? 'Request noted' : 'Request a table'} <ArrowRight size={15} /></button>
              {reservationSent && <p className="food-booking-confirmation" role="status">Thanks — your sample booking request is ready. No reservation was sent.</p>}
            </form>
          </section>

          <section className="food-visit" id="food-visit">
            <div><span className="food-section-kicker">Come find your seat</span><h2>Here when<br /><em>you need us.</em></h2></div>
            <div className="food-visit-details"><p><MapPin size={16} /><span>{food.address}<small>Fictional demo location</small></span></p><p><Phone size={15} /><span>{food.phone}<small>Sample contact number</small></span></p><p className="food-hours">{food.hours}<small>Sample opening hours</small></p></div>
          </section>
          <footer className="food-footer"><a className="food-wordmark" href="#food-home">{project.name}<span>.</span></a><span>A fictional restaurant website concept.</span><a href="#food-home">Back to the top <ArrowUpRight size={13} /></a></footer>
        </>}
      </main>
    </div>
  )
}
