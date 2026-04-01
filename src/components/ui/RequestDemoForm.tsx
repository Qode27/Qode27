import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { solutionIndustryOptions } from '../../data/solutions'

type RequestDemoFormProps = {
  defaultIndustry?: string
  title?: string
  subtitle?: string
  storageKey?: string
  successMessage?: string
}

type FormValues = {
  fullName: string
  businessName: string
  phoneNumber: string
  emailAddress: string
  industryType: string
  businessRequirement: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  fullName: '',
  businessName: '',
  phoneNumber: '',
  emailAddress: '',
  industryType: '',
  businessRequirement: '',
  message: '',
}

function validate(values: FormValues) {
  const errors: FormErrors = {}

  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!values.businessName.trim()) errors.businessName = 'Please enter your business name.'
  if (!values.phoneNumber.trim() || values.phoneNumber.replace(/\D/g, '').length < 10) {
    errors.phoneNumber = 'Please enter a valid phone number.'
  }
  if (!values.emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailAddress)) {
    errors.emailAddress = 'Please enter a valid email address.'
  }
  if (!values.industryType.trim()) errors.industryType = 'Please select an industry type.'
  if (!values.businessRequirement.trim()) errors.businessRequirement = 'Please tell us what you need.'

  return errors
}

export default function RequestDemoForm({
  defaultIndustry = '',
  title = 'Request a demo',
  subtitle = 'Share your requirement and our team will connect with you shortly.',
  storageKey = 'qode27-request-demo-submissions',
  successMessage = 'Thank you. Our team will contact you shortly to understand your requirement and schedule a demo.',
}: RequestDemoFormProps) {
  const navigate = useNavigate()
  const [values, setValues] = useState<FormValues>({ ...initialValues, industryType: defaultIndustry })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const industryOptions = useMemo(() => solutionIndustryOptions, [])

  const setFieldValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    const existingSubmissions = window.localStorage.getItem(storageKey)
    const parsedSubmissions = existingSubmissions ? JSON.parse(existingSubmissions) : []

    window.localStorage.setItem(
      storageKey,
      JSON.stringify([
        {
          ...values,
          createdAt: new Date().toISOString(),
        },
        ...parsedSubmissions,
      ]),
    )

    setIsSubmitting(false)
    setIsSuccess(true)
    setValues(initialValues)

    window.setTimeout(() => {
      navigate('/thank-you')
    }, 900)
  }

  if (isSuccess) {
    return (
      <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Success</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-950">Request received</h3>
        <p className="mt-4 text-base leading-7 text-slate-600">{successMessage}</p>
      </div>
    )
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Request Demo</p>
      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h3>
      <p className="mt-4 text-base leading-7 text-slate-600">{subtitle}</p>

      <form className="mt-8 grid gap-4" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Full Name</span>
            <input
              value={values.fullName}
              onChange={(event) => setFieldValue('fullName', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--color-accent)]"
            />
            {errors.fullName ? <p className="text-sm text-red-600">{errors.fullName}</p> : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Business Name</span>
            <input
              value={values.businessName}
              onChange={(event) => setFieldValue('businessName', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--color-accent)]"
            />
            {errors.businessName ? <p className="text-sm text-red-600">{errors.businessName}</p> : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Phone Number</span>
            <input
              value={values.phoneNumber}
              onChange={(event) => setFieldValue('phoneNumber', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--color-accent)]"
            />
            {errors.phoneNumber ? <p className="text-sm text-red-600">{errors.phoneNumber}</p> : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Email Address</span>
            <input
              type="email"
              value={values.emailAddress}
              onChange={(event) => setFieldValue('emailAddress', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--color-accent)]"
            />
            {errors.emailAddress ? <p className="text-sm text-red-600">{errors.emailAddress}</p> : null}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Industry Type</span>
            <select
              value={values.industryType}
              onChange={(event) => setFieldValue('industryType', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--color-accent)]"
            >
              <option value="">Select your industry</option>
              {industryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.industryType ? <p className="text-sm text-red-600">{errors.industryType}</p> : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Business Requirement</span>
            <input
              value={values.businessRequirement}
              onChange={(event) => setFieldValue('businessRequirement', event.target.value)}
              placeholder="For example: inventory tracking and dispatch visibility"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--color-accent)]"
            />
            {errors.businessRequirement ? <p className="text-sm text-red-600">{errors.businessRequirement}</p> : null}
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Optional Message</span>
          <textarea
            value={values.message}
            onChange={(event) => setFieldValue('message', event.target.value)}
            className="min-h-36 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--color-accent)]"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isSubmitting ? 'Submitting...' : 'Request Demo'}
        </button>
      </form>
    </div>
  )
}
