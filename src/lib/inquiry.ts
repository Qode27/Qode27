import { company } from '../data/company'

export type InquiryPayload = {
  name: string
  email: string
  company: string
  phone: string
  interest: string
  timeline: string
  requirements: string
  source: string
}

export type InquiryResult = { status: 'sent' } | { status: 'unconfigured' }

/**
 * Inquiry submission boundary.
 *
 * Set `VITE_INQUIRY_ENDPOINT` to a form-handling endpoint that accepts a JSON POST
 * (for example a Formspree form URL or your own API route). Only public endpoint URLs
 * belong here — never secret keys, which would be exposed in the browser bundle.
 *
 * When no endpoint is configured the caller must not claim the inquiry was received;
 * it should offer the email handoff built by `buildInquiryMailto` instead.
 */
const endpoint = (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined)?.trim()

export function isInquiryEndpointConfigured() {
  return Boolean(endpoint)
}

export async function submitInquiry(payload: InquiryPayload, signal?: AbortSignal): Promise<InquiryResult> {
  if (!endpoint) return { status: 'unconfigured' }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, _subject: `Website inquiry: ${payload.interest} — ${payload.company}` }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Inquiry endpoint responded with ${response.status}`)
  }

  return { status: 'sent' }
}

export function buildInquiryMailto(payload: InquiryPayload) {
  const subject = `Project inquiry: ${payload.interest} — ${payload.company}`
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    `Interest: ${payload.interest}`,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    '',
    'Requirements:',
    payload.requirements,
  ]
    .filter((line) => line !== null)
    .join('\n')

  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
