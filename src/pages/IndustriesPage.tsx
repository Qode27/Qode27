import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import Button from '../components/ui/Button'
import CtaSection from '../components/ui/CtaSection'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import Seo from '../components/ui/Seo'
import { industries } from '../data/industries'
import { getProductBySlug } from '../data/products'

export default function IndustriesPage() {
  return (
    <>
      <Seo
        title="Industries | Healthcare, Logistics, Distribution, Education & Retail Software | Qode27"
        description="Qode27 builds software for healthcare, logistics and transport, distribution and warehousing, education, retail and food service, and professional services."
        canonicalPath="/industries"
      />
      <PageHero
        eyebrow="Industries"
        title="Software shaped by how each sector actually operates."
        text="Every industry has its own records, handoffs, and pressure points. We bring product foundations and engineering experience built around them."
        actions={
          <Button href="/contact">
            Discuss Your Project <FiArrowRight aria-hidden="true" />
          </Button>
        }
      />

      <section className="pb-24">
        <div className="section-shell">
          <ul className="grid gap-4 md:grid-cols-2">
            {industries.map((industry, index) => (
              <li key={industry.slug} className={index === 0 ? 'md:col-span-2' : ''}>
                <Reveal delay={(index % 2) * 0.05} className="h-full">
                  <Link
                    to={`/industries/${industry.slug}`}
                    className={`surface surface-interactive group relative flex h-full flex-col overflow-hidden p-7 sm:p-9 ${index === 0 ? 'lg:grid lg:grid-cols-[1fr_1fr] lg:gap-12' : ''}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-line-strong)] text-[var(--color-accent)]">
                          <industry.icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <FiArrowUpRight aria-hidden="true" className="h-5 w-5 text-[var(--color-subtle)] transition group-hover:text-white" />
                      </div>
                      <p className="mono mt-8 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">{industry.tagline}</p>
                      <h2 className="display-sm mt-2">{industry.name}</h2>
                      <p className="mt-3 max-w-lg leading-7 text-[var(--color-muted)]">{industry.summary}</p>
                    </div>
                    <div className="mt-8 lg:mt-0">
                      <p className="text-sm font-medium text-white">Typical workflow</p>
                      <ol className="mt-3 flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-muted)]">
                        {industry.workflow.map((step, stepIndex) => (
                          <li key={step} className="flex items-center gap-1.5">
                            <span className="rounded-md border border-[var(--color-line)] px-2 py-1">{step}</span>
                            {stepIndex < industry.workflow.length - 1 ? <span aria-hidden="true" className="text-[var(--color-subtle)]">→</span> : null}
                          </li>
                        ))}
                      </ol>
                      <p className="mt-6 text-sm text-[var(--color-subtle)]">
                        Products: {industry.products.map((slug) => getProductBySlug(slug)?.label).join(' · ')}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection title="Your sector is not listed? The patterns often transfer." text="Operational problems — handoffs, records, approvals, reporting — repeat across industries. Tell us how your operation works." />
    </>
  )
}
