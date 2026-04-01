import { FiMessageSquare } from 'react-icons/fi'
import type { Testimonial } from '../../data/site'

type TestimonialCardProps = {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="shine-border rounded-[1.5rem] border border-slate-200/70 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.1)]">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <FiMessageSquare />
        </span>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
          {initials}
        </span>
      </div>
      <p className="mt-6 text-base leading-8 text-slate-600">"{testimonial.quote}"</p>
      <div className="mt-7 border-t border-slate-100 pt-5">
        <p className="text-lg font-semibold text-slate-950">{testimonial.name}</p>
        <p className="mt-1 text-sm text-[var(--color-accent)]">{testimonial.businessType}</p>
        <p className="mt-2 text-sm font-medium text-slate-500">{testimonial.company}</p>
      </div>
    </article>
  )
}
