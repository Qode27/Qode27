import { FiArrowRight } from 'react-icons/fi'

type UseCaseBlockProps = {
  scenario: string
  problem: string
  outcome: string
  step: number
}

export default function UseCaseBlock({ scenario, problem, outcome, step }: UseCaseBlockProps) {
  return (
    <article className="relative rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.1)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Use Case {step}</p>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-[var(--color-accent)]">
          <FiArrowRight />
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-950">{scenario}</h3>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Problem</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{problem}</p>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Outcome</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{outcome}</p>
      <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,rgba(20,131,181,0.35),rgba(20,131,181,0))]" />
    </article>
  )
}
