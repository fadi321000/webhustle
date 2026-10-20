import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, CircleDollarSign, Palette, RotateCcw, Save, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { SectionEyebrow } from '../components/SectionEyebrow'
import { formatINR, maintenanceOption, optionalAssets, pricingPackages } from '../data/pricing'
import { readBranding, saveBranding, type StudioBranding } from './workspaceData'

export function WorkspaceSettings() {
  const { section } = useParams()
  const isBrand = section === 'branding'
  const [brand, setBrand] = useState<StudioBranding>(readBranding)
  const [saved, setSaved] = useState(false)
  const [rates, setRates] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem('webhustle-demo-prices') || '{}') as Record<string, number> }
    catch { return {} }
  })
  const [rateNotice, setRateNotice] = useState('')

  useEffect(() => { setSaved(false) }, [section])
  function saveBrand() { saveBranding(brand); setSaved(true) }
  function changePrice(id: string, value: string) { setRates((current) => ({ ...current, [id]: Number(value) || 0 })) }
  function saveRates() {
    localStorage.setItem('webhustle-demo-prices', JSON.stringify(rates))
    setRateNotice('Rates saved in this browser.')
    window.setTimeout(() => setRateNotice(''), 3500)
  }
  function resetRates() {
    localStorage.removeItem('webhustle-demo-prices')
    setRates({})
    setRateNotice('Default public rates restored.')
  }
  const rateFor = (id: string, fallback: number) => rates[id] ?? fallback

  return <div className="workspace-section-page">
    <div className="workspace-page-heading">
      <div><SectionEyebrow>STUDIO SETTINGS</SectionEyebrow><h1>{isBrand ? 'Studio ' : 'Pricing &'}<span>{isBrand ? 'branding.' : ' rates.'}</span></h1><p>{isBrand ? 'A compact identity guide for this local workspace demo.' : 'The same package and optional service rates shown in the public calculator.'}</p></div>
      <span className="workspace-page-count"><ShieldCheck size={13} /> Local demo setting</span>
    </div>

    {isBrand ? <div className="settings-layout">
      <section className="workspace-panel settings-form">
        <div className="workspace-panel-heading"><div><span className="workspace-kicker">STUDIO IDENTITY</span><h2>Identity at a glance</h2></div><Palette size={18} /></div>
        <label className="settings-field">Studio name<input value={brand.studioName} onChange={(event) => { setBrand({ ...brand, studioName: event.target.value }); setSaved(false) }} maxLength={48} /></label>
        <label className="settings-field">Tagline<input value={brand.tagline} onChange={(event) => { setBrand({ ...brand, tagline: event.target.value }); setSaved(false) }} maxLength={64} /></label>
        <label className="settings-field">Accent color<span className="color-input-wrap"><input type="color" value={brand.accent} onChange={(event) => { setBrand({ ...brand, accent: event.target.value }); setSaved(false) }} /><span>{brand.accent.toUpperCase()}</span></span></label>
        <button className="button button-gold" type="button" onClick={saveBrand}><Save size={14} />{saved ? 'Saved locally' : 'Save changes'}</button>
        {saved && <span className="settings-success" role="status"><Check size={14} />Identity saved in this browser.</span>}
        <small>These settings only affect this workspace demo and are not connected to a shared brand profile.</small>
      </section>
      <aside className="workspace-panel brand-preview"><span className="workspace-kicker">PREVIEW</span><div className="brand-monogram-preview">WH</div><h2>{brand.studioName || 'Your studio'}</h2><p>{brand.tagline || 'Add a tagline'}</p><span className="brand-color-swatch" style={{ backgroundColor: brand.accent }} /><span className="settings-preview-note">This local setting does not change the public site branding.</span></aside>
    </div> : <section className="workspace-panel pricing-settings">
      <div className="workspace-panel-heading"><div><span className="workspace-kicker">PUBLIC CALCULATOR RATES</span><h2>Package pricing</h2></div><CircleDollarSign size={18} /></div>
      <p className="settings-intro">Edit the local public calculator estimate. These are planning estimates only. Changes are browser-local and are not shared with a production studio.</p>
      <div className="rate-list">
        {pricingPackages.map((item, index) => <label className="rate-row" key={item.id}><span className="rate-index">0{index + 1}</span><span className="rate-name"><strong>{item.name}</strong><small>{item.delivery}</small></span><span className="rate-input-wrap"><span>₹</span><input type="number" min="0" step="100" value={rateFor(item.id, item.price)} onChange={(event) => changePrice(item.id, event.target.value)} aria-label={`${item.name} price`} /></span></label>)}
        <label className="rate-row"><span className="rate-index">+</span><span className="rate-name"><strong>{maintenanceOption.name}</strong><small>Optional · three months</small></span><span className="rate-input-wrap"><span>₹</span><input type="number" min="0" step="100" value={rateFor(maintenanceOption.id, maintenanceOption.price)} onChange={(event) => changePrice(maintenanceOption.id, event.target.value)} aria-label="Maintenance price" /></span></label>
        {optionalAssets.map((asset) => <label className="rate-row rate-row-asset" key={asset.id}><span className="rate-index">·</span><span className="rate-name"><strong>{asset.name}</strong><small>Optional planning asset</small></span><span className="rate-input-wrap"><span>₹</span><input type="number" min="0" step="100" value={rateFor(asset.id, asset.price)} onChange={(event) => changePrice(asset.id, event.target.value)} aria-label={`${asset.name} price`} /></span></label>)}
      </div>
      <div className="rate-settings-actions"><Link to="/request" className="button button-quiet">View public calculator <ArrowUpRight size={14} /></Link><div><button className="rate-reset" type="button" onClick={resetRates}><RotateCcw size={13} />Reset</button><button className="button button-gold" type="button" onClick={saveRates}><Save size={14} />Save rates</button></div></div>
      {rateNotice && <p className="settings-success" role="status"><Check size={14} />{rateNotice}</p>}
      <div className="settings-data-notice"><ShieldCheck size={15} /><span>This local demo stores rate overrides in your browser. There is no user authentication, shared database or production pricing connection.</span></div>
      <div className="settings-current-rates"><h3>Current starting rates</h3>{pricingPackages.map((item) => <span key={item.id}>{item.name}<strong>{formatINR(rateFor(item.id, item.price))}</strong></span>)}</div>
    </section>}
  </div>
}
