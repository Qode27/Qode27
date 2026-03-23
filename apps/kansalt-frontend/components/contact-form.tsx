'use client';

import { FormEvent, useState } from 'react';

const initialState = {
  name: '',
  email: '',
  organization: '',
  product: 'Hospitals',
  message: ''
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Lead submission failed');
      }

      setForm(initialState);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <input
        className="rounded-2xl border border-white/70 bg-white px-4 py-3 outline-none transition focus:border-ink"
        placeholder="Name"
        value={form.name}
        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
        required
      />
      <input
        className="rounded-2xl border border-white/70 bg-white px-4 py-3 outline-none transition focus:border-ink"
        placeholder="Contact email"
        type="email"
        value={form.email}
        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        required
      />
      <input
        className="rounded-2xl border border-white/70 bg-white px-4 py-3 outline-none transition focus:border-ink"
        placeholder="Company / Organization"
        value={form.organization}
        onChange={(event) => setForm((current) => ({ ...current, organization: event.target.value }))}
      />
      <select
        className="rounded-2xl border border-white/70 bg-white px-4 py-3 outline-none transition focus:border-ink"
        value={form.product}
        onChange={(event) => setForm((current) => ({ ...current, product: event.target.value }))}
      >
        <option value="Hospitals">Hospitals</option>
        <option value="Coaching Institutes">Coaching Institutes</option>
        <option value="CA Firms">CA Firms</option>
        <option value="Law Firms">Law Firms</option>
        <option value="SMEs / Businesses">SMEs / Businesses</option>
      </select>
      <textarea
        className="min-h-36 rounded-2xl border border-white/70 bg-white px-4 py-3 outline-none transition focus:border-ink md:col-span-2"
        placeholder="Tell us about your business problem, workflow, or software requirement"
        value={form.message}
        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
        required
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:opacity-95 disabled:opacity-60 md:col-span-2"
      >
        {status === 'submitting' ? 'Sending...' : 'Get Your Software Built'}
      </button>
      {status === 'success' ? <p className="text-sm font-medium text-teal-700 md:col-span-2">Inquiry sent. Kansalt will get back to you shortly.</p> : null}
      {status === 'error' ? <p className="text-sm font-medium text-rose-700 md:col-span-2">Unable to submit right now. Please try again after the API gateway is running.</p> : null}
    </form>
  );
}
