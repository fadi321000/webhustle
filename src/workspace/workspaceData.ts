export type BriefStatus = 'Pending' | 'Signed' | 'In Progress' | 'Complete' | 'Archived'
export type StudioBrief = { id: string; name: string; project: string; type: string; status: BriefStatus; budget: number; updated: string; featured?: boolean; fictional: true }
export type StudioBranding = { studioName: string; tagline: string; accent: string }
const brandKey = 'webhustle-demo-brand-settings'
export const defaultBranding: StudioBranding = { studioName: 'WebHustle Studio', tagline: 'Design · Build · Grow', accent: '#c9a96b' }
export function readBranding(): StudioBranding { try { return { ...defaultBranding, ...JSON.parse(localStorage.getItem(brandKey) || '{}') } } catch { return defaultBranding } }
export function saveBranding(value: StudioBranding) { try { localStorage.setItem(brandKey, JSON.stringify(value)); window.dispatchEvent(new Event('webhustle:branding-updated')) } catch { /* Demo workspace remains usable without browser storage. */ } }

export const demoBriefs: StudioBrief[] = [
  { id: 'brief-savor', name: 'Avery Brooks', project: 'Savor dining', type: 'Restaurant website', status: 'In Progress', budget: 6200, updated: 'Today', featured: true, fictional: true },
  { id: 'brief-cloud', name: 'Jordan Lee', project: 'Cloudline', type: 'SaaS platform', status: 'Pending', budget: 4800, updated: 'Yesterday', fictional: true },
  { id: 'brief-orbit', name: 'Morgan Rivera', project: 'Orbit workspace', type: 'Product website', status: 'Signed', budget: 8500, updated: 'Oct 16', fictional: true },
  { id: 'brief-essential', name: 'Sam Patel', project: 'Essential Goods', type: 'E-commerce', status: 'In Progress', budget: 7100, updated: 'Oct 15', fictional: true },
  { id: 'brief-habitat', name: 'Taylor Chen', project: 'Habitat Living', type: 'Real estate', status: 'Complete', budget: 5600, updated: 'Oct 12', fictional: true },
  { id: 'brief-northline', name: 'Jamie Ellis', project: 'Northline Studio', type: 'Business website', status: 'Pending', budget: 3900, updated: 'Oct 10', fictional: true },
  { id: 'brief-morrow', name: 'Riley Morgan', project: 'Morrow Learning', type: 'Education', status: 'Archived', budget: 4400, updated: 'Oct 02', fictional: true },
]

const storageKey = 'webhustle-demo-brief-statuses'
export function readBriefs(): StudioBrief[] {
  if (typeof window === 'undefined') return demoBriefs
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}') as Record<string, BriefStatus>
    return demoBriefs.map((brief) => ({ ...brief, status: saved[brief.id] ?? brief.status }))
  } catch { return demoBriefs }
}
export function saveBriefStatus(id: string, status: BriefStatus) {
  try {
    const current = JSON.parse(localStorage.getItem(storageKey) || '{}') as Record<string, BriefStatus>
    localStorage.setItem(storageKey, JSON.stringify({ ...current, [id]: status }))
    window.dispatchEvent(new Event('webhustle:briefs-updated'))
  } catch { /* Demo workspace remains usable without browser storage. */ }
}
