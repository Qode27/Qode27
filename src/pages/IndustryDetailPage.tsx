import { Link, useParams } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiPlay } from 'react-icons/fi'
import Button from '../components/ui/Button'
import CtaSection from '../components/ui/CtaSection'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionIntro from '../components/ui/SectionIntro'
import Seo from '../components/ui/Seo'
import ProductInterface from '../components/visual/ProductInterface'
import WorkflowTrack from '../components/visual/WorkflowTrack'
import { getIndustryBySlug, industries } from '../data/industries'
import { getProductBySlug, productHref } from '../data/products'
import NotFoundPage from './NotFoundPage'

export default function IndustryDetailPage() {
  const { slug } = useParams()
  const industry = getIndustryBySlug(slug)
  if (!industry) return <NotFoundPage />

  const relatedProducts = industry.products.map((item) => getProductBySlug(item)).filter((item) => item !== undefined)
  const lead = relatedProducts[0]
  const otherIndustries = industries.filter((item) => item.slug !== industry.slug)

  return (
    <>
      <Seo title={industry.seoTitle} description={industry.seoDescription} canonicalPath={`/industries/${industry.slug}`} />
      <PageHero
        eyebrow={`Industries · ${industry.name}`}
        title={industry.heroTitle}
        text={industry.heroText}
        breadcrumbs={[{ label: 'Industries', href: '/industries' }, { label: industry.name }]}
        actions={
          <>
            <Button href={`/contact?interest=${encodeURIComponent(`${industry.name} software`)}`}>
              Discuss Your Project <FiArrowRight aria-hidden="true" />
            </Button>
            {lead ? (
              <Button href={productHref(lead.slug)} variant="secondary">
                Explore {lead.label}
              </Button>
            ) : null}
          </>
        }
        aside={lead ? <ProductInterface name={lead.label} accent={lead.accent} modules={lead.modules} /> : undefined}
      />

      <section className="section section-light">
        <div className="section-shell">
          <SectionIntro eyebrow="Industry challenges" title={`Where ${industry.name.toLowerCase()} operations lose time.`} />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {industry.challenges.map((challenge, index) => (
              <li key={challenge.title}>
                <Reveal delay={index * 0.05} className="paper-card h-full p-7">
                  <span className="mono text-sm text-[var(--color-ink-muted)]">0{index + 1}</span>
                  <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.025em]">{challenge.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--color-ink-muted)]">{challenge.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="section-shell">
          <SectionIntro eyebrow="Connected workflow" title="One record, carried through every stage." text="Each stage is captured where it happens, so the next person and the reporting layer see the same truth." />
          <div className="mt-14">
            <WorkflowTrack steps={industry.workflow} label={`${industry.name} workflow`} />
          </div>
        </div>
      </section>

      <section className="section section-raised rule-top">
        <div className="section-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Our approach</p>
            <h2 className="display-md mt-5">How we structure the solution.</h2>
            <ol className="mt-10 space-y-6">
              {industry.approach.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="mono text-sm text-[var(--color-accent)]">0{index + 1}</span>
                  <p className="leading-7 text-[var(--color-fg)]">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <div>
            <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">Relevant products</p>
            <ul className="mt-5 grid gap-4">
              {relatedProducts.map((product) => (
                <li key={product.slug}>
                  <Reveal className="surface p-6 sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="mono text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: product.accent }}>
                          {product.category}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">{product.name}</h3>
                        <p className="mt-2 max-w-lg text-[0.94rem] leading-7 text-[var(--color-muted)]">{product.cardDescription}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                      <Link to={productHref(product.slug)} className="link-arrow">
                        Product details <FiArrowUpRight aria-hidden="true" />
                      </Link>
                      {product.demoHref ? (
                        <Link to={product.demoHref} className="link-arrow text-[var(--color-muted)]">
                          <FiPlay aria-hidden="true" /> Interactive demo
                        </Link>
                      ) : null}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-tight rule-top">
        <div className="section-shell">
          <p className="eyebrow">Other industries</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {otherIndustries.map((item) => (
              <li key={item.slug}>
                <Link to={`/industries/${item.slug}`} className="chip hover:text-white">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection eyebrow={industry.name} title="Bring us your workflow and bottlenecks." primary={{ label: 'Talk to Our Team', href: '/contact' }} />
    </>
  )
}
