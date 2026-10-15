import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { industries } from '../../data/industries'
import Reveal from '../ui/Reveal'

export default function IndustriesIndex() {
  return (
    <section className="section section-light">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Industries</p>
              <h2 className="display-md mt-5">Built for sectors where operations carry the business.</h2>
              <p className="lede mt-5 max-w-md">
                Each industry has its own records, handoffs, and pressure points. Our products and engagements are shaped around them.
              </p>
              <Link to="/industries" className="btn btn-light mt-8">
                Explore industries <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <ul className="border-t border-black/10">
            {industries.map((industry, index) => (
              <li key={industry.slug} className="border-b border-black/10">
                <Reveal delay={index * 0.04}>
                  <Link to={`/industries/${industry.slug}`} className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 py-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--color-ink)] transition group-hover:border-[var(--color-accent-strong)] group-hover:text-[var(--color-accent-strong)]">
                      <industry.icon aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-xl font-semibold tracking-[-0.025em] sm:text-2xl">{industry.name}</span>
                      <span className="mt-1 block text-sm text-[var(--color-ink-muted)]">{industry.summary}</span>
                    </span>
                    <FiArrowRight aria-hidden="true" className="h-5 w-5 text-[var(--color-ink-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--color-ink)]" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
