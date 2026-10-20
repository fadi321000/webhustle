import { Outlet } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { AmbientEffects } from './AmbientEffects'

export function SiteLayout() {
  return <><AmbientEffects /><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content"><Outlet /></main><SiteFooter /></>
}
