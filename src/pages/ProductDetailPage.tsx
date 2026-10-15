import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiCheck, FiPlay, FiUser } from 'react-icons/fi'
import Button from '../components/ui/Button'
import CtaSection from '../components/ui/CtaSection'
import FaqList from '../components/ui/FaqList'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionIntro from '../components/ui/SectionIntro'
import Seo from '../components/ui/Seo'
import ProductInterface from '../components/visual/ProductInterface'
import WorkflowTrack from '../components/visual/WorkflowTrack'
import { SITE_URL } from '../data/company'
import { getIndustryBySlug } from '../data/industries'
import { getProductBySlug, products, productHref } from '../data/products'
import NotFoundPage from './NotFoundPage'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [activeGroup, setActiveGroup] = useState(0)

  if (!product) return <NotFoundPage />

  const industry = getIndustryBySlug(product.industry)
  const demoRequestHref = `/request-demo?interest=${encodeURIComponent(product.name)}`
  const others = products.filter((item) => item.slug !== product.slug && item.industry === product.industry).slice(0, 2)
  const group = product.modules[activeGroup] ?? product.modules[0]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: product.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web browser',
      description: product.introDescription,
      url: `${SITE_URL}${productHref(product.slug)}`,
      publisher: { '@type': 'Organization', name: 'Qode27', url: SITE_URL },
      featureList: product.features.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: product.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
  ]

  return (
    <>
      <Seo title={`${product.name} | Qode27`} description={`${product.introDescription} ${product.keywordsDescription}`} canonicalPath={productHref(product.slug)} jsonLd={jsonLd} />

      <PageHero
        eyebrow={`${product.category} · ${product.label}`}
        title={product.heroTitle}
        text={product.heroDescription}
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: product.label }]}
        actions={
          <>
            <Button href={demoRequestHref}>
              Request a Product Demo <FiArrowRight aria-hidden="true" />
            </Button>
            {product.demoHref ? (
              <Button href={product.demoHref} variant="secondary">
                <FiPlay aria-hidden="true" /> Open interactive demo
              </Button>
            ) : null}
          </>
        }
        aside={<ProductInterface name={product.label} accent={product.accent} modules={product.modules} activeGroup={activeGroup} />}
      />

      {/* Problem */}
      <section className="section rule-top">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">The problem</p>
            <h2 className="display-md mt-5">Why teams look for this system.</h2>
            <p className="lede mt-5 max-w-md">{product.introDescription}</p>
          </Reveal>
          <ul className="space-y-4">
            {product.problems.map((problem, index) => (
              <li key={problem}>
                <Reveal delay={index * 0.05} className="surface flex gap-5 p-6">
                  <span className="mono text-sm" style={{ color: product.accent }}>
                    0{index + 1}
                  </span>
                  <p className="leading-7 text-[var(--color-fg)]">{problem}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modules explorer */}
      <section className="section section-raised rule-top" aria-labelledby="modules-heading">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Capabilities</p>
            <h2 id="modules-heading" className="display-md mt-5">
              Modules that work as one system.
            </h2>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div role="tablist" aria-label={`${product.label} module groups`} className="grid gap-2">
              {product.modules.map((item, index) => (
                <button
                  key={item.name}
                  id={`tab-${index}`}
                  role="tab"
                  type="button"
                  aria-selected={activeGroup === index}
                  aria-controls="module-panel"
                  tabIndex={activeGroup === index ? 0 : -1}
                  onClick={() => setActiveGroup(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                      event.preventDefault()
                      const nextIndex = (index + 1) % product.modules.length
                      setActiveGroup(nextIndex)
                      document.getElementById(`tab-${nextIndex}`)?.focus()
                    }
                    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                      event.preventDefault()
                      const prevIndex = (index - 1 + product.modules.length) % product.modules.length
                      setActiveGroup(prevIndex)
                      document.getElementById(`tab-${prevIndex}`)?.focus()
                    }
                  }}
                  className={`flex items-center justify-between rounded-2xl border px-5 py-5 text-left transition-colors ${
                    activeGroup === index ? 'border-[var(--color-line-strong)] bg-white/[0.04]' : 'border-transparent text-[var(--color-muted)] hover:text-white'
                  }`}
                >
                  <span className="text-lg font-semibold tracking-[-0.02em]">{item.name}</span>
                  <span className="mono text-xs text-[var(--color-subtle)]">{item.items.length}</span>
                </button>
              ))}
            </div>
            <div id="module-panel" role="tabpanel" aria-labelledby={`tab-${activeGroup}`} className="surface p-7 sm:p-9">
              <h3 className="display-sm">{group.name}</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] p-4">
                    <FiCheck aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: product.accent }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-[var(--color-subtle)]">All features: {product.features.join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section">
        <div className="section-shell">
          <SectionIntro eyebrow="Workflow" title="How the system changes daily work." />
          <div className="mt-14">
            <WorkflowTrack steps={product.approach} accent={product.accent} label={`${product.label} approach`} />
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {product.useCases.map((useCase, index) => (
              <Reveal key={useCase} delay={index * 0.05}>
                <p className="h-full border-l pl-5 leading-7 text-[var(--color-muted)]" style={{ borderColor: product.accent }}>
                  {useCase}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section section-light">
        <div className="section-shell">
          <SectionIntro eyebrow="Built for every role" title="One system, each person sees what they need." />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.roles.map((role, index) => (
              <li key={role}>
                <Reveal delay={index * 0.05} className="paper-card h-full p-6">
                  <FiUser aria-hidden="true" className="text-[var(--color-accent-strong)]" />
                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.015em]">{role}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">Role-based access to the screens and actions this role needs.</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {product.benefits.map((benefit) => (
              <p key={benefit} className="flex items-start gap-3 text-[var(--color-ink)]">
                <FiCheck aria-hidden="true" className="mt-1 shrink-0 text-[var(--color-accent-strong)]" /> {benefit}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Demo band */}
      {product.demoHref ? (
        <section className="section-tight">
          <div className="section-shell">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] border border-[var(--color-line)] p-8 sm:flex-row sm:items-center" style={{ background: `linear-gradient(110deg, ${product.accent}1f, transparent 60%)` }}>
                <div>
                  <h2 className="display-sm">Try the {product.label} demo now.</h2>
                  <p className="mt-2 text-[var(--color-muted)]">Runs in your browser with sample data. Nothing you do touches a live system.</p>
                </div>
                <Button href={product.demoHref}>
                  <FiPlay aria-hidden="true" /> Open interactive demo
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="section">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="display-md mt-5">Questions about {product.label}.</h2>
            {industry ? (
              <Link to={`/industries/${industry.slug}`} className="link-arrow mt-10 text-[var(--color-muted)]">
                {industry.name} industry overview <FiArrowUpRight aria-hidden="true" />
              </Link>
            ) : null}
          </Reveal>
          <FaqList items={product.faqs} />
        </div>
      </section>

      {others.length ? (
        <section className="section-tight rule-top">
          <div className="section-shell">
            <p className="eyebrow">Related products</p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link to={productHref(item.slug)} className="surface surface-interactive group flex items-center justify-between gap-4 p-6">
                    <span>
                      <span className="block font-semibold">{item.name}</span>
                      <span className="mt-1 block text-sm text-[var(--color-muted)]">{item.introDescription}</span>
                    </span>
                    <FiArrowUpRight aria-hidden="true" className="shrink-0 text-[var(--color-subtle)] group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaSection
        eyebrow={product.label}
        title={`See ${product.label} configured for your operation.`}
        text="Tell us about your team, roles, and workflow. We will arrange a walkthrough focused on the parts that matter to you."
        primary={{ label: 'Request a Product Demo', href: demoRequestHref }}
        secondary={{ label: 'Talk to Our Team', href: '/contact' }}
      />
    </>
  )
}
