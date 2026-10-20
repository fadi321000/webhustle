import { useMemo, useState } from 'react'
import { PricingCalculator, type QuoteSelection } from '../components/PricingCalculator'
import { ProjectInquiryWizard } from '../components/ProjectInquiryWizard'
import { formatINR, getPricingConfig } from '../data/pricing'
import { SectionEyebrow } from '../components/SectionEyebrow'
import { useSearchParams } from 'react-router-dom'
import { getDesignProject } from '../data/designs'

export function RequestWebsitePage() {
  const { packages: pricingPackages, maintenance: maintenanceOption, assets: optionalAssets } = getPricingConfig()
  const [searchParams] = useSearchParams()
  const [quote, setQuote] = useState<QuoteSelection>({ packageId: 'growth', maintenance: false, assetIds: [] })
  const projectReference = getDesignProject(searchParams.get('reference') ?? undefined)
  const category = searchParams.get('category') ?? projectReference?.category
  const categoryToWebsiteType: Record<string, string> = { Restaurants: 'Restaurant', 'E-commerce': 'E-commerce', Business: 'Business', Portfolios: 'Portfolio', SaaS: 'SaaS', 'Real Estate': 'Real Estate', Education: 'Education', 'Personal Brands': 'Portfolio' }
  const initialWebsiteType = category ? categoryToWebsiteType[category] : undefined
  const total = useMemo(() => {
    const basePrice = pricingPackages.find((item) => item.id === quote.packageId)?.price ?? pricingPackages[1].price
    const assetPrice = optionalAssets.filter((asset) => quote.assetIds.includes(asset.id)).reduce((sum, asset) => sum + asset.price, 0)
    return basePrice + (quote.maintenance ? maintenanceOption.price : 0) + assetPrice
  }, [quote])

  return <div className="request-page"><section className="request-intro container"><SectionEyebrow>Let’s get to know your next move</SectionEyebrow><h1>Let’s Build Something<br /><span>Amazing.</span></h1><p>Start with a clear estimate, then tell us what you have in mind. We’ll take it from there, together.</p><div className="request-intro-meta"><span>01 / Find your package</span><i /><span>02 / Share your brief</span><i /><span>03 / Start a conversation</span></div><span className="request-estimate-preview">Current planning estimate <strong>{formatINR(total)}</strong></span></section><PricingCalculator quote={quote} setQuote={setQuote} total={total} /><div className="inquiry-container container"><ProjectInquiryWizard quote={quote} total={total} initialWebsiteType={initialWebsiteType} referenceName={projectReference?.name} /></div></div>
}
