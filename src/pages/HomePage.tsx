import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Globe2, Layers3, Network, Package, ShoppingBag, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionEyebrow } from '../components/SectionEyebrow'
import { HomeAntigravity } from '../components/HomeAntigravity'

const capabilities = [
  { number: '01', title: 'Web applications', description: 'Purpose-built tools, client portals and platforms.', icon: Code2, to: '/services' },
  { number: '02', title: 'Business websites', description: 'Professional websites with clear content and intuitive navigation.', icon: Globe2, to: '/services' },
  { number: '03', title: 'Digital products', description: 'Design systems, reusable interfaces and tailored digital experiences.', icon: Layers3, to: '/services' },
]

const services = [
  { title: 'Custom Website Development', description: 'A thoughtful, high-performing website built around how your business works and where it wants to go.', icon: Code2 },
  { title: 'Website Redesign', description: 'Bring clarity and fresh momentum to your digital presence with a considered redesign.', icon: Layers3 },
  { title: 'E-commerce Development', description: 'An effortless storefront that makes it easier for customers to discover and buy.', icon: ShoppingBag },
]

const floatingCards = [
  { title: 'Web applications', icon: Code2, position: 'float-web', delay: 0 },
  { title: 'Mobile experiences', icon: Smartphone, position: 'float-mobile', delay: .1 },
  { title: 'Connected systems', icon: Network, position: 'float-connected', delay: .2 },
  { title: 'Digital products', icon: Package, position: 'float-products', delay: .3 },
]

export function HomePage() {
  const reduceMotion = useReducedMotion()
  return (
    <div className="home-page">
      <section className="hero container">
        <div className="hero-copy">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            <SectionEyebrow>Independent digital studio <span className="eyebrow-separator">/</span> Est. 2024</SectionEyebrow>
            <h1>Digital craft for<br /><span>ambitious brands.</span></h1>
            <p className="hero-lede">WebHustle is an independent digital studio for people building what comes next. We bring strategy, design and development together to create clear, considered digital experiences.</p>
            <div className="hero-actions"><Link className="button button-gold magnetic-button" to="/request">Start Your Project <ArrowUpRight size={16} /></Link><Link className="button button-quiet" to="/designs">Explore designs <ArrowRight size={16} /></Link></div>
            <div className="hero-meta"><span className="availability"><i /> Available for select projects</span><span className="meta-divider" /><span>Design · Build · Grow</span></div>
          </motion.div>
        </div>
        <motion.div className="hero-art" initial={reduceMotion ? false : { opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .12 }} aria-label="Abstract sculptural sphere illuminated in warm gold" role="img">
          <div className="art-grain" /><HomeAntigravity /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-orb" /><div className="art-light" />
          <div className="art-caption"><span>FIG. 01</span><span>Form follows feeling</span></div>
          <div className="art-stamp"><span aria-hidden="true">✳</span><span>Made with<br />intention</span></div>
        </motion.div>
        <a className="scroll-cue" href="#next-move"><span className="scroll-icon"><ArrowDown size={14} /></span><span>Scroll to explore</span></a>
      </section>

      <section className="next-move-section" id="next-move">
        <div className="container next-move-inner">
          <div className="next-move-heading"><SectionEyebrow>Digital, with direction</SectionEyebrow><h2>Built for your<br /><span>next move.</span></h2><p>Wherever you’re headed, we make the digital work that helps you get there.</p></div>
          <div className="orbit-stage" aria-label="WebHustle capabilities: web applications, mobile experiences, connected systems and digital products">
            <div className="sphere-halo" /><div className="sphere-orbit sphere-orbit-a" /><div className="sphere-orbit sphere-orbit-b" /><div className="sphere-orbit sphere-orbit-c" /><div className="center-sphere"><span>WH</span></div>
            {floatingCards.map(({ title, icon: Icon, position, delay }) => <motion.div key={title} className={`floating-card ${position}`} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .55, delay }}><span className="floating-icon"><Icon size={17} strokeWidth={1.65} /></span><span>{title}</span></motion.div>)}
          </div>
        </div>
      </section>

      <section className="capabilities-section container">
        <div className="section-heading"><div><SectionEyebrow>What we make</SectionEyebrow><h2>Digital work with<br /><span>real purpose.</span></h2></div><p>Useful, beautifully made experiences that bring your next big idea to life.</p></div>
        <div className="capability-grid">{capabilities.map(({ number, title, description, icon: Icon, to }) => <article className="capability-card" key={number}><span className="capability-number">{number} <i>/</i></span><span className="capability-icon"><Icon size={19} strokeWidth={1.65} /></span><h3>{title}</h3><p>{description}</p><Link className="card-link" to={to} aria-label={`Explore ${title} services`}><ArrowUpRight size={17} /></Link></article>)}</div>
      </section>

      <section className="services-section">
        <div className="container"><div className="section-heading services-heading"><div><SectionEyebrow>How we can help</SectionEyebrow><h2>Your ambition.<br /><span>Our expertise.</span></h2></div><p>From a first idea to the next iteration, we bring the right people and craft to make it happen.</p></div>
          <div className="service-grid">{services.map(({ title, description, icon: Icon }, index) => <article className="service-card" key={title}><div className="service-card-top"><span className="service-icon"><Icon size={19} strokeWidth={1.65} /></span><span className="service-index">0{index + 1}</span></div><h3>{title}</h3><p>{description}</p><Link className="text-link" to={`/request?service=${index === 0 ? 'custom-website' : index === 1 ? 'redesign' : 'ecommerce'}`}>Tell us about your project <ArrowRight size={15} /></Link></article>)}</div>
        </div>
      </section>

      <section className="home-cta container"><div><SectionEyebrow>Have a good one?</SectionEyebrow><h2>Let’s make your next<br /><span>move a memorable one.</span></h2></div><Link className="button button-gold magnetic-button" to="/request">Tell us what you’re building <ArrowUpRight size={16} /></Link></section>
    </div>
  )
}
