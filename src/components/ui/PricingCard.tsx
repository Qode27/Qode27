import { FiCheckCircle } from 'react-icons/fi'
import type { PricingPlan } from '../../data/site'
import Button from './Button'

type PricingCardProps = {
  plan: PricingPlan
  featured?: boolean
}

export default function PricingCard({ plan, featured = false }: PricingCardProps) {
  return (
    <article
      className={`rounded-[1.6rem] border p-7 ${
        featured
          ? 'border-[var(--color-accent)]/30 bg-[linear-gradient(135deg,rgba(27,123,168,0.08),rgba(20,184,166,0.08))] shadow-[0_26px_60px_rgba(15,23,42,0.08)]'
          : 'border-slate-200/70 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">{plan.name}</p>
      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{plan.priceLabel}</h3>
      <p className="mt-3 text-sm font-medium text-slate-900">{plan.bestFor}</p>
      <p className="mt-4 text-sm leading-7 text-slate-600">{plan.description}</p>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
            <FiCheckCircle className="mt-1 shrink-0 text-[var(--color-accent)]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm font-medium text-slate-700">Support: {plan.supportLevel}</p>
      <div className="mt-8 flex flex-col gap-3">
        <Button href="/request-demo" className="w-full justify-center">
          Request Demo
        </Button>
        <Button href="/contact" variant="secondary" className="w-full justify-center">
          Contact Sales
        </Button>
      </div>
    </article>
  )
}
