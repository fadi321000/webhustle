import { ArrowUpRight, AtSign, Check, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { contactDetails, whatsappUrl } from '../data/contact'
import { formatINR, getPricingConfig, type OptionalAssetId, type PackageId } from '../data/pricing'
import { SectionEyebrow } from './SectionEyebrow'

export type QuoteSelection = {
  packageId: PackageId
  maintenance: boolean
  assetIds: OptionalAssetId[]
}

export function PricingCalculator({ quote, setQuote, total }: { quote: QuoteSelection; setQuote: Dispatch<SetStateAction<QuoteSelection>>; total: number }) {
  const { packages: pricingPackages, maintenance: maintenanceOption, assets: optionalAssets } = getPricingConfig()
  const selectedPackage = pricingPackages.find((item) => item.id === quote.packageId) ?? pricingPackages[1]
  const selectedAssets = optionalAssets.filter((item) => quote.assetIds.includes(item.id))
  const additionalCosts = (quote.maintenance ? maintenanceOption.price : 0) + selectedAssets.reduce((sum, asset) => sum + asset.price, 0)
  const whatsappMessage = [
    'Hi WebHustle, I’d like to discuss a project.',
    `Package: ${selectedPackage.name} (${formatINR(selectedPackage.price)})`,
    `Delivery estimate: ${selectedPackage.delivery}`,
    `Optional services: ${[...(quote.maintenance ? [maintenanceOption.name] : []), ...selectedAssets.map((asset) => asset.name)].join(', ') || 'None'}`,
    `Planning estimate: ${formatINR(total)}`,
  ].join('\n')

  function chooseAsset(assetId: OptionalAssetId, checked: boolean) {
    setQuote((current) => ({ ...current, assetIds: checked ? [...current.assetIds, assetId] : current.assetIds.filter((id) => id !== assetId) }))
  }

  return (
    <section className="pricing-section" id="pricing-calculator">
      <div className="container">
        <div className="request-section-heading pricing-heading"><div><SectionEyebrow>Thoughtful scope. Clear estimate.</SectionEyebrow><h2>Design a package tailored for your<br className="desktop-break" /> exact growth goals.</h2></div><p>Select an initial framework setup tier, toggle comprehensive partner maintenance service, and choose optional assets.</p></div>
        <div className="pricing-cards" role="group" aria-label="Choose an initial framework setup tier">
          {pricingPackages.map((pricingPackage) => {
            const selected = quote.packageId === pricingPackage.id
            return <button type="button" className={`pricing-card${selected ? ' is-selected' : ''}${pricingPackage.badge ? ' recommended-card' : ''}`} aria-pressed={selected} onClick={() => setQuote((current) => ({ ...current, packageId: pricingPackage.id }))} key={pricingPackage.id}>
              {pricingPackage.badge && <span className="recommended-badge"><Sparkles size={11} />{pricingPackage.badge}</span>}
              <span className="pricing-card-top"><span className="package-dot">{selected && <i />}</span><span className="package-tier">{pricingPackage.id === 'starter' ? '01 / ESSENTIAL' : pricingPackage.id === 'growth' ? '02 / MOMENTUM' : '03 / PARTNERSHIP'}</span></span>
              <span className="package-name">{pricingPackage.name}</span><span className="package-price">{formatINR(pricingPackage.price)}<small> / project</small></span>
              <span className="package-description">{pricingPackage.description}</span>
              <span className="package-delivery"><span>DELIVERY</span><strong>{pricingPackage.delivery}</strong></span>
              <span className="package-select">{selected ? <><Check size={13} /> Selected</> : 'Select package'}</span>
            </button>
          })}
        </div>

        <div className="pricing-config-grid">
          <div className="pricing-options">
            <div className="pricing-option-heading"><div><span className="option-index">01</span><div><h3>Partner support</h3><p>Keep your site secure and cared for after launch.</p></div></div><span className="optional-label">OPTIONAL</span></div>
            <label className={`maintenance-option${quote.maintenance ? ' is-enabled' : ''}`}>
              <span className="maintenance-icon"><ShieldCheck size={18} /></span><span className="maintenance-copy"><strong>{maintenanceOption.name}</strong><small>{maintenanceOption.description}</small></span><span className="maintenance-price">+{formatINR(maintenanceOption.price)}</span>
              <input className="switch-input" type="checkbox" checked={quote.maintenance} onChange={(event) => setQuote((current) => ({ ...current, maintenance: event.target.checked }))} aria-label={maintenanceOption.name} /><span className="switch-track" aria-hidden="true"><i /></span>
            </label>

            <div className="pricing-option-heading assets-heading"><div><span className="option-index">02</span><div><h3>Optional launch assets</h3><p>Choose practical extras to support your next step.</p></div></div><span className="optional-label">ADD AS NEEDED</span></div>
            <div className="asset-options">{optionalAssets.map((asset) => <label className={`asset-option${quote.assetIds.includes(asset.id) ? ' is-selected' : ''}`} key={asset.id}><input type="checkbox" checked={quote.assetIds.includes(asset.id)} onChange={(event) => chooseAsset(asset.id, event.target.checked)} /><span className="asset-check"><Check size={11} /></span><span className="asset-copy"><strong>{asset.name}</strong><small>{asset.description}</small></span><span className="asset-price">+{formatINR(asset.price)}</span></label>)}</div>
            <p className="estimate-note">Optional asset prices are planning estimates; final scope is confirmed before work begins.</p>
          </div>

          <aside className="statement-panel" aria-live="polite" aria-label="Project estimate">
            <div className="statement-heading"><span>PROJECT STATEMENT OF WORK</span><span className="statement-mark">WH</span></div>
            <div className="statement-line"><span>Selected package</span><strong>{selectedPackage.name}</strong></div>
            <div className="statement-line"><span>Package price</span><strong>{formatINR(selectedPackage.price)}</strong></div>
            <div className="statement-line"><span>Delivery estimate</span><strong className="delivery-value">{selectedPackage.delivery}</strong></div>
            <div className="statement-divider" />
            <div className="statement-line"><span>Optional services</span><strong>{quote.maintenance || selectedAssets.length ? `${Number(quote.maintenance) + selectedAssets.length} selected` : 'None'}</strong></div>
            {quote.maintenance && <div className="statement-detail"><span>Premium support · 3 months</span><span>{formatINR(maintenanceOption.price)}</span></div>}
            {selectedAssets.map((asset) => <div className="statement-detail" key={asset.id}><span>{asset.name}</span><span>{formatINR(asset.price)}</span></div>)}
            <div className="statement-line additional-line"><span>Additional costs</span><strong>{formatINR(additionalCosts)}</strong></div>
            <div className="statement-divider total-divider" />
            <div className="statement-total"><span>Total estimate</span><strong>{formatINR(total)}</strong></div>
            <p className="statement-disclaimer">Planning estimate only. No payment is taken here; the final scope and price are confirmed together.</p>
            <a className="contact-action whatsapp-action" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Book via WhatsApp Now <ArrowUpRight size={14} /></a>
            <a className="contact-action instagram-action" href={contactDetails.instagramUrl} target="_blank" rel="noreferrer"><AtSign size={15} /> DM on Instagram <ArrowUpRight size={14} /></a>
            {!contactDetails.whatsappNumber && <small className="contact-config-note">Add VITE_WHATSAPP_NUMBER to route directly to your studio number.</small>}
          </aside>
        </div>
      </div>
    </section>
  )
}
