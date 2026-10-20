import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { SectionPage } from './pages/SectionPage'
import { routes } from './data/navigation'
const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })))
const ExploreDesignsPage = lazy(() => import('./pages/ExploreDesignsPage').then((module) => ({ default: module.ExploreDesignsPage })))
const DesignDemoPage = lazy(() => import('./pages/DesignDemoPage').then((module) => ({ default: module.DesignDemoPage })))
const RequestWebsitePage = lazy(() => import('./pages/RequestWebsitePage').then((module) => ({ default: module.RequestWebsitePage })))
const MarketplacePage = lazy(() => import('./pages/MarketplacePage').then((module) => ({ default: module.MarketplacePage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((module) => ({ default: module.ServicesPage })))
const WorkspaceLayout = lazy(() => import('./workspace/WorkspaceLayout').then((module) => ({ default: module.WorkspaceLayout })))
const WorkspaceDashboard = lazy(() => import('./workspace/WorkspaceDashboard').then((module) => ({ default: module.WorkspaceDashboard })))
const WorkspaceProjects = lazy(() => import('./workspace/WorkspaceProjects').then((module) => ({ default: module.WorkspaceProjects })))
const WorkspaceArchive = lazy(() => import('./workspace/WorkspaceArchive').then((module) => ({ default: module.WorkspaceArchive })))
const WorkspaceSettings = lazy(() => import('./workspace/WorkspaceSettings').then((module) => ({ default: module.WorkspaceSettings })))
const WorkspaceProjectDetail = lazy(() => import('./workspace/WorkspaceProjectDetail').then((module) => ({ default: module.WorkspaceProjectDetail })))

export default function App() {
  return <Suspense fallback={<div className="route-loading" role="status">Opening WebHustle Studio…</div>}><Routes>
    <Route path="/workspace" element={<WorkspaceLayout />}>
      <Route index element={<WorkspaceDashboard />} />
      <Route path="projects" element={<WorkspaceProjects />} />
      <Route path="archive" element={<WorkspaceArchive />} />
      <Route path="projects/:projectId" element={<WorkspaceProjectDetail />} />
      <Route path="settings/:section" element={<WorkspaceSettings />} />
    </Route>
    <Route element={<SiteLayout />}>
      <Route path="/designs/:slug" element={<DesignDemoPage />} />
      {routes.map((route) => <Route key={route.path} path={route.path} element={route.path === '/' ? <HomePage /> : route.path === '/designs' ? <ExploreDesignsPage /> : route.path === '/request' ? <RequestWebsitePage /> : route.path === '/marketplace' ? <MarketplacePage /> : route.path === '/contact' ? <ContactPage /> : route.path === '/services' ? <ServicesPage /> : <SectionPage />} />)}
      <Route path="*" element={<SectionPage />} />
    </Route>
  </Routes></Suspense>
}
