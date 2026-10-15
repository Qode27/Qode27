import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiInfo, FiPlay } from 'react-icons/fi'
import Button from '../components/ui/Button'
import CtaSection from '../components/ui/CtaSection'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionIntro from '../components/ui/SectionIntro'
import Seo from '../components/ui/Seo'
import { getProductBySlug, products, productHref } from '../data/products'
import { caseStudies, scenarios } from '../data/work'

export default function WorkPage() {
  const demoProducts = products.filter((product) => product.demoHref)
  return (
    <>
      <Seo
        title="Work | Product Demonstrations & Capabilities | Qode27"
        description="Explore Qode27's work through interactive product demonstrations across healthcare, HR, inventory, logistics, CRM, accounting, education, retail, parking, and port operations."
        canonicalPath="/work"
      />
      <PageHero
        eyebrow="Work"
        title="Judge us by what you can open and use."
        text="Our products run as interactive demonstrations inside this website — real interfaces, real workflows, sample data. Start with the one closest to your operation."
        actions={
          <>
            <Button href="#demonstrations">
              <FiPlay aria-hidden="true" /> Browse demonstrations
            </Button>
            <Button href="/contact" variant="secondary">
              Discuss Your Project
            </Button>
          </>
        }
      />

      <section id="demonstrations" className="pb-24">
        <div className="section-shell">
          <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white/[0.02] p-5 text-sm leading-6 text-[var(--color-muted)]">
            <FiInfo aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
            <p>
              Each demonstration runs entirely in your browser with sample data and mock personas. Names, records, and figures inside demos are fictional and
              exist only to show how the product behaves.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {demoProducts.map((product, index) => (
              <li key={product.slug} className="bg-[var(--color-bg)]">
                <Reveal delay={(index % 3) * 0.04} className="group flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)]" style={{ color: product.accent }}>
                      <product.icon aria-hidden="true" />
                    </span>
                    <span className="mono text-xs text-[var(--color-subtle)]">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mono mt-8 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">{product.category}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em]">{product.name}</h2>
                  <p className="mt-3 flex-1 text-[0.94rem] leading-7 text-[var(--color-muted)]">{product.cardDescription}</p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                    <Link to={product.demoHref!} className="link-arrow">
                      <FiPlay aria-hidden="true" /> Open demo
                    </Link>
                    <Link to={productHref(product.slug)} className="link-arrow text-[var(--color-muted)]">
                      Details <FiArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Engagement patterns"
            title="The operational situations we design for."
            text="Illustrative scenarios that reflect the problems our products and custom work address. They describe typical engagements, not specific clients."
          />
          <ul className="mt-14 grid gap-4 lg:grid-cols-2">
            {scenarios.map((scenario, index) => {
              const product = getProductBySlug(scenario.product)
              return (
                <li key={scenario.scenario}>
                  <Reveal delay={(index % 2) * 0.05} className="paper-card h-full p-7 sm:p-8">
                    <p className="mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">Illustrative scenario</p>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.025em]">{scenario.scenario}</h3>
                    <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-semibold">The problem</dt>
                        <dd className="mt-1.5 text-[0.94rem] leading-7 text-[var(--color-ink-muted)]">{scenario.problem}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold">The approach</dt>
                        <dd className="mt-1.5 text-[0.94rem] leading-7 text-[var(--color-ink-muted)]">{scenario.approach}</dd>
                      </div>
                    </dl>
                    {product ? (
                      <Link to={productHref(product.slug)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                        Related: {product.label} <FiArrowRight aria-hidden="true" />
                      </Link>
                    ) : null}
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {caseStudies.length === 0 ? (
        <section className="section-tight">
          <div className="section-shell">
            <Reveal className="surface-flat flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Client case studies</h2>
                <p className="mt-1 text-[var(--color-muted)]">Detailed case studies are shared during project discussions, subject to client permission.</p>
              </div>
              <Button href="/contact" variant="secondary">
                Ask about relevant work
              </Button>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CtaSection title="Seen something close to your operation? Let us tailor it." primary={{ label: 'Request a Product Demo', href: '/request-demo' }} />
    </>
  )
}
