import { Link, useParams } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi'
import Button from '../components/ui/Button'
import CtaSection from '../components/ui/CtaSection'
import FaqList from '../components/ui/FaqList'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionIntro from '../components/ui/SectionIntro'
import Seo from '../components/ui/Seo'
import ServiceVisual from '../components/visual/ServiceVisual'
import { SITE_URL } from '../data/company'
import { getProductBySlug, productHref } from '../data/products'
import { getServiceBySlug, services } from '../data/services'
import NotFoundPage from './NotFoundPage'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <NotFoundPage />

  const related = service.relatedProducts.map((item) => getProductBySlug(item)).filter((item) => item !== undefined)
  const next = services[(services.indexOf(service) + 1) % services.length]
  const contactHref = `/contact?interest=${encodeURIComponent(service.name)}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.seoDescription,
      provider: { '@type': 'Organization', name: 'Qode27', url: SITE_URL },
      url: `${SITE_URL}/services/${service.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
  ]

  return (
    <>
      <Seo title={service.seoTitle} description={service.seoDescription} canonicalPath={`/services/${service.slug}`} jsonLd={jsonLd} />
      <PageHero
        eyebrow={service.name}
        title={service.heroTitle}
        text={service.heroText}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: service.shortName }]}
        actions={
          <>
            <Button href={contactHref}>
              Discuss Your Requirements <FiArrowRight aria-hidden="true" />
            </Button>
            <Button href="#capabilities" variant="secondary">
              See capabilities
            </Button>
          </>
        }
        aside={<ServiceVisual kind={service.visual} />}
      />

      {/* Problems */}
      <section className="section section-light">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Problems addressed</p>
            <h2 className="display-md mt-5">What this solves.</h2>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-black/10 bg-black/10">
            {service.problems.map((problem, index) => (
              <li key={problem.title} className="bg-[var(--color-paper)] p-7">
                <Reveal delay={index * 0.05}>
                  <div className="flex items-baseline gap-5">
                    <span className="mono text-sm text-[var(--color-ink-muted)]">0{index + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.02em]">{problem.title}</h3>
                      <p className="mt-2 leading-7 text-[var(--color-ink-muted)]">{problem.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="section">
        <div className="section-shell">
          <SectionIntro eyebrow="Solutions and capabilities" title="What we bring to the work." />
          <div className="mt-14 grid gap-x-12 gap-y-0 md:grid-cols-2">
            {service.capabilities.map((capability, index) => (
              <Reveal key={capability.title} delay={(index % 2) * 0.05}>
                <div className="border-t border-[var(--color-line)] py-7">
                  <h3 className="text-lg font-semibold tracking-[-0.015em]">{capability.title}</h3>
                  <p className="mt-2 leading-7 text-[var(--color-muted)]">{capability.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section section-raised rule-top">
        <div className="section-shell">
          <SectionIntro eyebrow="Methodology" title="How the work is run." />
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.methodology.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.06} className="relative h-full">
                  <div className="surface h-full p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-accent)] text-xs mono">{index + 1}</span>
                      {index < service.methodology.length - 1 ? <span aria-hidden="true" className="hidden h-px flex-1 bg-[var(--color-line-strong)] lg:block" /> : null}
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.015em]">{step.title}</h3>
                    <p className="mt-2 text-[0.94rem] leading-7 text-[var(--color-muted)]">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deliverables + use cases */}
      <section className="section">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <Reveal className="surface p-8 sm:p-10">
            <p className="eyebrow">Deliverables</p>
            <h2 className="display-sm mt-4">What you receive.</h2>
            <ul className="mt-8 grid gap-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[var(--color-muted)]">
                  <FiCheck aria-hidden="true" className="mt-1 shrink-0 text-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06} className="surface p-8 sm:p-10">
            <p className="eyebrow">Suitable use cases</p>
            <h2 className="display-sm mt-4">Where this fits best.</h2>
            <ul className="mt-8 divide-y divide-[var(--color-line)]">
              {service.useCases.map((item) => (
                <li key={item} className="py-4 text-[var(--color-fg)]">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related products */}
      {related.length ? (
        <section className="section-tight rule-top">
          <div className="section-shell">
            <p className="eyebrow">Related products</p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((product) => (
                <li key={product.slug}>
                  <Link to={productHref(product.slug)} className="surface surface-interactive group flex h-full items-start justify-between gap-4 p-6">
                    <div>
                      <p className="mono text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: product.accent }}>
                        {product.category}
                      </p>
                      <h3 className="mt-2 font-semibold">{product.name}</h3>
                    </div>
                    <FiArrowUpRight aria-hidden="true" className="shrink-0 text-[var(--color-subtle)] group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="section rule-top">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="display-md mt-5">Common questions.</h2>
            <Link to={`/services/${next.slug}`} className="link-arrow mt-10 text-[var(--color-muted)]">
              Next: {next.name} <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
          <FaqList items={service.faqs} />
        </div>
      </section>

      <CtaSection
        eyebrow={service.shortName}
        title="Tell us what you need to build."
        primary={{ label: 'Discuss Your Requirements', href: contactHref }}
        secondary={{ label: 'All services', href: '/services' }}
      />
    </>
  )
}
