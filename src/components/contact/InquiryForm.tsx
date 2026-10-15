import { useId, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiMail } from 'react-icons/fi'
import { company } from '../../data/company'
import { buildInquiryMailto, submitInquiry, type InquiryPayload } from '../../lib/inquiry'
import { interestOptions, OTHER_INTEREST } from '../../lib/interests'

type Values = Omit<InquiryPayload, 'source'> & { consent: boolean; website: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'submitting' | 'sent' | 'unconfigured' | 'error'

const timelines = ['Exploring options', 'Within 3 months', '3–6 months', 'More than 6 months']
function validate(values: Values): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.company.trim()) errors.company = 'Please enter your company or organization.'
  if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a valid phone number, or leave it blank.'
  if (!values.interest) errors.interest = 'Please choose what you are interested in.'
  if (values.requirements.trim().length < 20) errors.requirements = 'Please describe your requirements in at least 20 characters.'
  if (!values.consent) errors.consent = 'Please confirm so we can use these details to respond.'
  return errors
}

type InquiryFormProps = {
  defaultInterest?: string
  defaultRequirements?: string
  source: string
  submitLabel: string
}

export default function InquiryForm({ defaultInterest = '', defaultRequirements = '', source, submitLabel }: InquiryFormProps) {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: defaultInterest,
    timeline: '',
    requirements: defaultRequirements,
    consent: false,
    website: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const payload: InquiryPayload = {
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    phone: values.phone.trim(),
    interest: values.interest,
    timeline: values.timeline,
    requirements: values.requirements.trim(),
    source,
  }

  const set = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const focusStatus = () => window.requestAnimationFrame(() => statusRef.current?.focus())

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (values.website) return // honeypot: silently ignore automated submissions

    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      const result = await submitInquiry(payload)
      setStatus(result.status === 'sent' ? 'sent' : 'unconfigured')
    } catch {
      setStatus('error')
    }
    focusStatus()
  }

  if (status === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="surface p-8 outline-none sm:p-10">
        <FiCheckCircle aria-hidden="true" className="h-8 w-8 text-emerald-400" />
        <h2 className="display-sm mt-6">Thank you — your inquiry has been sent.</h2>
        <p className="mt-3 leading-7 text-[var(--color-muted)]">
          Our team will review your requirements and reply to <span className="text-white">{payload.email}</span>. If anything is urgent, you can also reach us at{' '}
          <a className="underline underline-offset-4" href={company.phoneHref}>
            {company.phoneDisplay}
          </a>
          .
        </p>
        <Link to="/products" className="link-arrow mt-8">
          Explore our products while you wait <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    )
  }

  const fieldProps = (field: keyof Values) => ({
    id: `${id}-${field}`,
    name: field,
    'aria-invalid': errors[field] ? (true as const) : undefined,
    'aria-describedby': errors[field] ? `${id}-${field}-error` : undefined,
  })

  const fieldError = (field: keyof Values) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="field-error">
        {errors[field]}
      </p>
    ) : null

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="surface relative p-6 sm:p-10" aria-describedby={`${id}-required-note`}>
      <p id={`${id}-required-note`} className="text-sm text-[var(--color-subtle)]">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="field-label">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input {...fieldProps('name')} className="field" autoComplete="name" required value={values.name} onChange={(e) => set('name', e.target.value)} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">
            Business email <span aria-hidden="true">*</span>
          </label>
          <input {...fieldProps('email')} type="email" className="field" autoComplete="email" required value={values.email} onChange={(e) => set('email', e.target.value)} />
          {fieldError('email')}
        </div>
        <div>
          <label htmlFor={`${id}-company`} className="field-label">
            Company <span aria-hidden="true">*</span>
          </label>
          <input {...fieldProps('company')} className="field" autoComplete="organization" required value={values.company} onChange={(e) => set('company', e.target.value)} />
          {fieldError('company')}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="field-label">
            Phone <span className="font-normal text-[var(--color-subtle)]">(optional)</span>
          </label>
          <input {...fieldProps('phone')} type="tel" className="field" autoComplete="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} />
          {fieldError('phone')}
        </div>
        <div>
          <label htmlFor={`${id}-interest`} className="field-label">
            Service or solution of interest <span aria-hidden="true">*</span>
          </label>
          <select {...fieldProps('interest')} className="field" required value={values.interest} onChange={(e) => set('interest', e.target.value)}>
            <option value="">Select an option</option>
            {Object.entries(interestOptions).map(([group, options]) => (
              <optgroup key={group} label={group}>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={OTHER_INTEREST}>{OTHER_INTEREST}</option>
          </select>
          {fieldError('interest')}
        </div>
        <div>
          <label htmlFor={`${id}-timeline`} className="field-label">
            Timeline <span className="font-normal text-[var(--color-subtle)]">(optional)</span>
          </label>
          <select {...fieldProps('timeline')} className="field" value={values.timeline} onChange={(e) => set('timeline', e.target.value)}>
            <option value="">Select a timeline</option>
            {timelines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${id}-requirements`} className="field-label">
          Project requirements <span aria-hidden="true">*</span>
        </label>
        <textarea
          {...fieldProps('requirements')}
          rows={6}
          className="field min-h-40 resize-y"
          required
          placeholder="How does the process work today, where does it slow down, and who will use the system?"
          value={values.requirements}
          onChange={(e) => set('requirements', e.target.value)}
        />
        {fieldError('requirements')}
      </div>

      {/* Honeypot — hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website', e.target.value)} />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-6 text-[var(--color-muted)]">
          <input
            {...fieldProps('consent')}
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
          />
          <span>
            I agree that Qode27 may use these details to respond to my inquiry, as described in the{' '}
            <Link to="/privacy" className="text-white underline underline-offset-4">
              privacy notice
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        {fieldError('consent')}
      </div>

      {status === 'unconfigured' || status === 'error' ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className={`mt-6 rounded-xl border p-5 outline-none ${status === 'error' ? 'border-red-400/40 bg-red-500/[0.06]' : 'border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)]'}`}
        >
          <div className="flex items-start gap-3">
            <FiAlertCircle aria-hidden="true" className={`mt-0.5 shrink-0 ${status === 'error' ? 'text-red-300' : 'text-[var(--color-accent)]'}`} />
            <div>
              <p className="font-semibold text-white">{status === 'error' ? 'Your inquiry could not be sent.' : 'Online submission is not available right now.'}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                {status === 'error'
                  ? 'Nothing was submitted. Please try again, or send the same details by email.'
                  : 'Your details have not been sent yet. Use the button below to open your email app with everything pre-filled, then press send.'}
              </p>
              <a href={buildInquiryMailto(payload)} className="btn btn-primary btn-sm mt-4">
                <FiMail aria-hidden="true" /> Send by email instead
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-accent" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : submitLabel} {status === 'submitting' ? null : <FiArrowRight aria-hidden="true" />}
        </button>
        <p className="text-xs leading-5 text-[var(--color-subtle)]">We use your details only to respond to this inquiry.</p>
      </div>
    </form>
  )
}
