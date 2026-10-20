import { useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleCheck, ClipboardList, Mail, Pencil, Sparkles, UserRound } from 'lucide-react'
import { formatINR, getPricingConfig } from '../data/pricing'
import type { QuoteSelection } from './PricingCalculator'

const steps = [
  { title: 'About the project', icon: ClipboardList },
  { title: 'Requirements', icon: Check },
  { title: 'Budget & timeline', icon: CircleCheck },
  { title: 'Contact details', icon: UserRound },
]

const websiteTypes = ['Restaurant', 'Business', 'E-commerce', 'Portfolio', 'SaaS', 'Real Estate', 'Education', 'Custom Website']
const requirementOptions = ['Contact form', 'Product catalog', 'Online booking', 'Gallery', 'Blog', 'E-commerce', 'Custom functionality', 'Client portal', 'Newsletter signup']
const budgetOptions = ['Under ₹3,500', '₹3,500–₹6,000', '₹6,000–₹12,000', '₹12,000+', 'Not sure yet']
const timelineOptions = ['As soon as possible', '2–4 weeks', '1–2 months', 'Flexible']

type InquiryAnswers = {
  name: string
  websiteTypes: string[]
  projectDescription: string
  requirements: string[]
  additionalRequirements: string
  budget: string
  timeline: string
  projectKind: string
  email: string
  phone: string
  preferredContact: string
}

const initialAnswers: InquiryAnswers = { name: '', websiteTypes: [], projectDescription: '', requirements: [], additionalRequirements: '', budget: '', timeline: '', projectKind: '', email: '', phone: '', preferredContact: '' }

function BriefReview({ label, children, onEdit }: { label: string; children: ReactNode; onEdit: () => void }) {
  return <div className="brief-review-row"><div><span>{label}</span><p>{children}</p></div><button type="button" onClick={onEdit} aria-label={`Edit ${label}`}><Pencil size={13} /></button></div>
}

export function ProjectInquiryWizard({ quote, total, initialWebsiteType, referenceName }: { quote: QuoteSelection; total: number; initialWebsiteType?: string; referenceName?: string }) {
  const { packages: pricingPackages, maintenance: maintenanceOption, assets: optionalAssets } = getPricingConfig()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<InquiryAnswers>(() => ({ ...initialAnswers, websiteTypes: initialWebsiteType ? [initialWebsiteType] : [], projectDescription: referenceName ? `I’m interested in a website with a similar feel to ${referenceName}.` : '' }))
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)
  const submissionLock = useRef(false)
  const selectedPackage = pricingPackages.find((item) => item.id === quote.packageId) ?? pricingPackages[1]
  const selectedAssets = optionalAssets.filter((item) => quote.assetIds.includes(item.id))
  const summaryLines = useMemo(() => [
    `Project lead: ${answers.name}`,
    `Website type: ${answers.websiteTypes.join(', ')}`,
    `Website brief: ${answers.projectDescription}`,
    `Pages & features: ${answers.requirements.join(', ')}`,
    answers.additionalRequirements ? `Additional requirements: ${answers.additionalRequirements}` : '',
    `Budget: ${answers.budget}`,
    `Timeline: ${answers.timeline}`,
    `Project: ${answers.projectKind}`,
    `Email: ${answers.email}`,
    answers.phone ? `Phone: ${answers.phone}` : '',
    `Preferred contact: ${answers.preferredContact}`,
    `Package: ${selectedPackage.name} — ${formatINR(selectedPackage.price)}`,
    `Delivery estimate: ${selectedPackage.delivery}`,
    `Add-ons: ${[...(quote.maintenance ? [maintenanceOption.name] : []), ...selectedAssets.map((asset) => asset.name)].join(', ') || 'None'}`,
    `Planning estimate: ${formatINR(total)}`,
  ].filter(Boolean).join('\n'), [answers, quote.maintenance, selectedAssets, selectedPackage, total])

  function update<K extends keyof InquiryAnswers>(field: K, value: InquiryAnswers[K]) {
    setAnswers((current) => ({ ...current, [field]: value }))
  }

  function toggleList(field: 'websiteTypes' | 'requirements', value: string, checked: boolean) {
    setAnswers((current) => ({ ...current, [field]: checked ? [...current[field], value] : current[field].filter((item) => item !== value) }))
  }

  function validateCurrentStep() {
    const nextErrors: string[] = []
    if (step === 0) {
      if (!answers.name.trim()) nextErrors.push('Add your name so we know who we are speaking with.')
      if (!answers.websiteTypes.length) nextErrors.push('Choose at least one website type.')
      if (answers.projectDescription.trim().length < 12) nextErrors.push('Tell us a little more about what you want the website to do (at least 12 characters).')
    }
    if (step === 1 && !answers.requirements.length && !answers.additionalRequirements.trim()) nextErrors.push('Choose a page or feature, or describe a custom requirement.')
    if (step === 2) {
      if (!answers.budget) nextErrors.push('Select an estimated budget.')
      if (!answers.timeline) nextErrors.push('Choose a preferred timeline.')
      if (!answers.projectKind) nextErrors.push('Tell us whether this is a new website or a redesign.')
    }
    if (step === 3 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) nextErrors.push('Enter a valid email address so we can follow up.')
    if (step === 3 && !answers.preferredContact) nextErrors.push('Choose how you would prefer the studio to contact you.')
    setErrors(nextErrors)
    return nextErrors.length === 0
  }

  async function nextStep(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validateCurrentStep()) return
    if (step < steps.length - 1) setStep((current) => current + 1)
    else await submitInquiry()
    setErrors([])
  }

  async function submitInquiry() {
    if (submissionLock.current) return
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
    if (!accessKey) {
      setSubmissionError('The inquiry form is not connected yet. Please try again later or contact the studio directly.')
      return
    }
    if (honeypotRef.current?.checked) return

    setIsSubmitting(true)
    submissionLock.current = true
    setSubmissionError('')
    const submittedAt = new Date().toISOString()
    const message = [
      `Customer: ${answers.name.trim()}`,
      `Website category: ${answers.websiteTypes.join(', ')}`,
      `Project description: ${answers.projectDescription.trim()}`,
      `Required pages and features: ${answers.requirements.join(', ') || 'None selected'}`,
      ...(answers.additionalRequirements.trim() ? [`Additional requirements: ${answers.additionalRequirements.trim()}`] : []),
      `Project budget: ${answers.budget}`,
      `Preferred timeline: ${answers.timeline}`,
      `Project type: ${answers.projectKind}`,
      `Email: ${answers.email.trim()}`,
      ...(answers.phone.trim() ? [`Phone: ${answers.phone.trim()}`] : []),
      `Preferred contact method: ${answers.preferredContact}`,
      `Pricing package: ${selectedPackage.name} (${formatINR(selectedPackage.price)})`,
      `Delivery estimate: ${selectedPackage.delivery}`,
      `Maintenance add-on: ${quote.maintenance ? 'Selected' : 'Not selected'}`,
      `Other selected assets: ${selectedAssets.map((asset) => asset.name).join(', ') || 'None'}`,
      `Estimated project price: ${formatINR(total)} (planning estimate; no payment taken)`,
      `Submitted at: ${submittedAt}`,
    ].join('\n')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'New Website Request — WebHustle',
          from_name: 'WebHustle Website Inquiry',
          name: answers.name.trim(),
          email: answers.email.trim(),
          replyto: answers.email.trim(),
          ...(answers.phone.trim() ? { phone: answers.phone.trim() } : {}),
          preferred_contact: answers.preferredContact,
          website_category: answers.websiteTypes.join(', '),
          project_description: answers.projectDescription.trim(),
          required_pages_and_features: answers.requirements.join(', '),
          ...(answers.additionalRequirements.trim() ? { additional_requirements: answers.additionalRequirements.trim() } : {}),
          project_budget: answers.budget,
          preferred_timeline: answers.timeline,
          project_type: answers.projectKind,
          pricing_package: selectedPackage.name,
          package_price: formatINR(selectedPackage.price),
          delivery_estimate: selectedPackage.delivery,
          maintenance_add_on: quote.maintenance ? 'Selected' : 'Not selected',
          other_selected_assets: selectedAssets.map((asset) => asset.name).join(', ') || 'None',
          estimated_project_price: formatINR(total),
          submitted_at: submittedAt,
          message,
          botcheck: honeypotRef.current?.checked ? '1' : '',
        }),
      })
      const result = await response.json()
      if (!response.ok || result.success !== true) {
        throw new Error(typeof result.message === 'string' ? result.message : 'The inquiry could not be sent. Please try again.')
      }
      setSubmitted(true)
    } catch (error) {
      setSubmissionError(error instanceof Error && error.message !== 'Failed to fetch'
        ? error.message
        : 'We couldn’t reach the submission service. Check your connection and try again; your answers are still here.')
    } finally {
      submissionLock.current = false
      setIsSubmitting(false)
    }
  }

  function backStep() {
    setErrors([])
    setStep((current) => Math.max(0, current - 1))
  }

  const previousStep = (index: number) => { setErrors([]); setSubmitted(false); setStep(index) }

  if (submitted) return <section className="inquiry-success" aria-live="polite"><span className="success-icon"><CircleCheck size={25} /></span><p className="form-step-kicker">REQUEST SENT</p><h2>Thanks, {answers.name.trim()}.</h2><p>Your website request was sent successfully. The WebHustle team can reply to {answers.email.trim()}.</p><details className="submitted-brief"><summary>Review your submitted brief</summary><pre>{summaryLines}</pre></details></section>

  return (
    <section className="inquiry-section" id="project-inquiry">
      <div className="inquiry-heading"><div><p className="form-step-kicker">A FEW DETAILS, THEN WE’LL TAKE IT FROM HERE</p><h2>Let’s Build Something<br /><span>Amazing.</span></h2></div><p>Tell us what you’re imagining. We’ll use your answers to understand the right next step together.</p></div>
      {referenceName && <p className="reference-project-note"><Sparkles size={14} /> Starting from a design like <strong>{referenceName}</strong>. You can change this in your brief.</p>}
      <div className="inquiry-panel">
        <ol className="step-progress" aria-label="Project inquiry steps">{steps.map(({ title, icon: Icon }, index) => <li key={title} className={`progress-item${step === index ? ' is-current' : ''}${step > index ? ' is-complete' : ''}`} aria-current={step === index ? 'step' : undefined}><span className="progress-icon">{step > index ? <Check size={14} /> : <Icon size={14} />}</span><span className="progress-label"><small>STEP 0{index + 1}</small><strong>{title}</strong></span>{index < steps.length - 1 && <i className="progress-connector" />}</li>)}</ol>

        <form className="inquiry-form" onSubmit={nextStep} noValidate>
          <div className="inquiry-honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Leave this field empty</label><input ref={honeypotRef} id="inquiry-website" name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" /></div>
          {step === 0 && <div className="form-step-panel"><div className="form-step-title"><span>01</span><div><h3>About the project</h3><p>Let’s start with the big picture.</p></div></div>
            <label className="field-label" htmlFor="visitor-name">Your name <span>REQUIRED</span></label><input className="form-input" id="visitor-name" autoComplete="name" placeholder="What should we call you?" value={answers.name} onChange={(event) => update('name', event.target.value)} />
            <fieldset className="choice-fieldset"><legend>What type of website do you need? <span>SELECT ALL THAT APPLY</span></legend><div className="choice-grid">{websiteTypes.map((type) => <label className={`choice-option${answers.websiteTypes.includes(type) ? ' is-checked' : ''}`} key={type}><input type="checkbox" checked={answers.websiteTypes.includes(type)} onChange={(event) => toggleList('websiteTypes', type, event.target.checked)} /><span className="choice-check"><Check size={11} /></span>{type}</label>)}</div></fieldset>
            <label className="field-label" htmlFor="project-description">What would you like the website to do? <span>REQUIRED</span></label><textarea className="form-textarea" id="project-description" rows={5} placeholder="Pages, features and content you need — e.g. a menu, online booking, a gallery..." value={answers.projectDescription} onChange={(event) => update('projectDescription', event.target.value)} />
          </div>}

          {step === 1 && <div className="form-step-panel"><div className="form-step-title"><span>02</span><div><h3>Requirements</h3><p>Pick the pieces you know you’ll need. We can shape the rest together.</p></div></div>
            <fieldset className="choice-fieldset"><legend>Pages and features <span>SELECT ALL THAT APPLY</span></legend><div className="choice-grid feature-grid">{requirementOptions.map((requirement) => <label className={`choice-option${answers.requirements.includes(requirement) ? ' is-checked' : ''}`} key={requirement}><input type="checkbox" checked={answers.requirements.includes(requirement)} onChange={(event) => toggleList('requirements', requirement, event.target.checked)} /><span className="choice-check"><Check size={11} /></span>{requirement}</label>)}</div></fieldset>
            <label className="field-label" htmlFor="extra-requirements">Anything else we should know? <span>OPTIONAL</span></label><textarea className="form-textarea" id="extra-requirements" rows={5} placeholder="Tell us about integrations, content, accessibility needs or a feature you have in mind..." value={answers.additionalRequirements} onChange={(event) => update('additionalRequirements', event.target.value)} />
          </div>}

          {step === 2 && <div className="form-step-panel"><div className="form-step-title"><span>03</span><div><h3>Budget and timeline</h3><p>A rough idea helps us suggest a realistic path forward.</p></div></div>
            <fieldset className="choice-fieldset"><legend>Estimated budget <span>IN INDIAN RUPEES</span></legend><div className="radio-grid">{budgetOptions.map((option) => <label className={`choice-option${answers.budget === option ? ' is-checked' : ''}`} key={option}><input type="radio" name="budget" checked={answers.budget === option} onChange={() => update('budget', option)} /><span className="radio-check" />{option}</label>)}</div></fieldset>
            <fieldset className="choice-fieldset"><legend>Preferred timeline</legend><div className="radio-grid">{timelineOptions.map((option) => <label className={`choice-option${answers.timeline === option ? ' is-checked' : ''}`} key={option}><input type="radio" name="timeline" checked={answers.timeline === option} onChange={() => update('timeline', option)} /><span className="radio-check" />{option}</label>)}</div></fieldset>
            <fieldset className="choice-fieldset"><legend>Is this a new website or a redesign?</legend><div className="radio-grid">{['A new website', 'A redesign', 'Not sure yet'].map((option) => <label className={`choice-option${answers.projectKind === option ? ' is-checked' : ''}`} key={option}><input type="radio" name="project-kind" checked={answers.projectKind === option} onChange={() => update('projectKind', option)} /><span className="radio-check" />{option}</label>)}</div></fieldset>
          </div>}

          {step === 3 && <div className="form-step-panel"><div className="form-step-title"><span>04</span><div><h3>Contact details</h3><p>One last thing. Please check your brief before preparing it.</p></div></div>
            <div className="review-heading"><span>YOUR BRIEF SO FAR</span><span>Use edit to make changes</span></div>
            <div className="brief-review-list"><BriefReview label="Project overview" onEdit={() => previousStep(0)}>{answers.name} · {answers.websiteTypes.join(', ')}<br />{answers.projectDescription}</BriefReview><BriefReview label="Pages & features" onEdit={() => previousStep(1)}>{[...answers.requirements, answers.additionalRequirements].filter(Boolean).join(', ')}</BriefReview><BriefReview label="Budget & timeline" onEdit={() => previousStep(2)}>{answers.budget} · {answers.timeline} · {answers.projectKind}</BriefReview></div>
            <div className="quote-review"><span>PACKAGE ESTIMATE</span><strong>{selectedPackage.name} · {formatINR(total)}</strong><small>{selectedPackage.delivery} · Estimate only, no payment is taken</small></div>
            <div className="contact-fields"><div><label className="field-label" htmlFor="contact-email">Email address <span>REQUIRED</span></label><input className="form-input" id="contact-email" type="email" autoComplete="email" placeholder="you@example.com" value={answers.email} onChange={(event) => update('email', event.target.value)} /></div><div><label className="field-label" htmlFor="contact-phone">Phone or WhatsApp <span>OPTIONAL</span></label><input className="form-input" id="contact-phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" value={answers.phone} onChange={(event) => update('phone', event.target.value)} /></div></div>
            <label className="field-label" htmlFor="preferred-contact">Preferred contact method <span>REQUIRED</span></label><select className="form-input" id="preferred-contact" value={answers.preferredContact} onChange={(event) => update('preferredContact', event.target.value)}><option value="">Choose a contact method</option><option>Email</option><option>Phone call</option><option>WhatsApp</option></select>
            <p className="privacy-note"><Mail size={14} /> Your project details are sent to Web3Forms when you submit. This website does not store them.</p>
          </div>}

          {errors.length > 0 && <div className="form-errors" role="alert"><strong>One more thing before you continue:</strong><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
          {submissionError && <div className="form-errors" role="alert"><strong>Your request wasn’t sent.</strong><p>{submissionError}</p></div>}
          <div className="wizard-actions"><button className="wizard-back" type="button" disabled={isSubmitting} onClick={step === 0 ? () => document.getElementById('pricing-calculator')?.scrollIntoView({ behavior: 'smooth' }) : backStep}><ArrowLeft size={14} />{step === 0 ? 'Back to package' : 'Back'}</button><button className="button button-gold wizard-next" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending request…' : step === steps.length - 1 ? 'Submit website request' : 'Continue'}{!isSubmitting && (step === steps.length - 1 ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />)}</button></div>
        </form>
      </div>
      <p className="wizard-reassurance">Your first conversation is always complimentary. We’ll confirm the scope, timing and final estimate before any work begins.</p>
    </section>
  )
}
