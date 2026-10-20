export type PackageId = 'starter' | 'growth' | 'pro'

export type PricingPackage = {
  id: PackageId
  name: string
  price: number
  description: string
  delivery: string
  badge?: string
}

export const pricingPackages: PricingPackage[] = [
  { id: 'starter', name: 'Starter Tier', price: 1000, description: 'Perfect for launch-oriented founders and immediate traction.', delivery: '72-Hour Express Delivery' },
  { id: 'growth', name: 'Growth Suite', price: 3500, description: 'Engineered for scaling enterprises requiring maximum impact.', delivery: '7–10 Business Days', badge: 'Recommended' },
  { id: 'pro', name: 'Pro Partnership', price: 6000, description: 'Elite technical integration and ongoing bespoke optimization.', delivery: '14–18 Business Days' },
]

export const maintenanceOption = {
  id: 'maintenance',
  name: 'Secure 3 Months of Premium Support & Updates',
  price: 500,
  description: 'A dedicated partner for updates, questions and small improvements after launch.',
}

// Optional launch assets are planning estimates and can be adjusted here without changing the calculator UI.
export const optionalAssets = [
  { id: 'seo', name: 'SEO foundation', description: 'Metadata, search basics and launch checklist.', price: 750 },
  { id: 'analytics', name: 'Analytics setup', description: 'A simple view of visits and useful actions.', price: 500 },
  { id: 'content', name: 'Content migration', description: 'Move and format content for up to five pages.', price: 1000 },
] as const

export function getPricingConfig() {
  let overrides: Record<string, number> = {}
  if (typeof window !== 'undefined') {
    try { overrides = JSON.parse(localStorage.getItem('webhustle-demo-prices') || '{}') as Record<string, number> } catch { /* defaults */ }
  }
  return {
    packages: pricingPackages.map((item) => ({ ...item, price: overrides[item.id] ?? item.price })),
    maintenance: { ...maintenanceOption, price: overrides[maintenanceOption.id] ?? maintenanceOption.price },
    assets: optionalAssets.map((item) => ({ ...item, price: overrides[item.id] ?? item.price })),
  }
}

export type OptionalAssetId = (typeof optionalAssets)[number]['id']

export const formatINR = (amount: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(amount)
