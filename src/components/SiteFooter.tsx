import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Brand } from './Brand'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block"><Brand /><p>Independent digital studio.<br />Good ideas, made real.</p></div>
        <div className="footer-column"><h2>Discover</h2><Link to="/designs">Explore Designs</Link><Link to="/marketplace">Marketplace</Link><Link to="/designs">Live Previews</Link><small>Marketplace items are sample listings for demonstration.</small></div>
        <div className="footer-column"><h2>WebHustle</h2><Link to="/services">Services</Link><Link to="/services">About Us</Link><Link to="/contact">Contact</Link></div>
        <div className="footer-idea"><span className="footer-idea-label">Have something in mind?</span><h2>Let’s make it<br />mean something.</h2><Link className="footer-idea-link" to="/request">Start your project <ArrowUpRight size={16} /></Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} WebHustle Studio. All rights reserved.</span><span>Design · Build · Grow</span><Link to="/workspace">Studio Workspace <ArrowUpRight size={13} /></Link></div>
    </footer>
  )
}
