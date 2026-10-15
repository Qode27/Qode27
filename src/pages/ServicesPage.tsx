import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import Button from '../components/ui/Button'
import CtaSection from '../components/ui/CtaSection'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionIntro from '../components/ui/SectionIntro'
import Seo from '../components/ui/Seo'
import ServiceVisual from '../components/visual/ServiceVisual'
import { services } from '../data/services'

const engagementPaths = [
  {
    title: 'Start from a product',
    text: 'When one of our industry platforms fits your operation closely, we configure it for your roles, workflows, and reporting.',
    href: '/products',
    cta: 'Browse products',
  },
  {
    title: 'Extend a product',
    text: 'When a product covers most of what you need, we build the business-specific modules around it.',
    href: '/services/custom-software',
    cta: 'How extension works',
  },
  {
    title: 'Build from the ground up',
    text: 'When your process is unique, we design and engineer a system specifically for it — from workflow map to deployment.',
    href: '/contact',
    cta: 'Discuss your project',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services | Custom Software, Web Applications & SaaS Development | Qode27"
        description="Custom software development, web applications, SaaS product development, business process automation, UI/UX design, and cloud engineering from Qode27."
        canonicalPath="/services"
      />
      <PageHero
        eyebrow="Services"
        title="Engineering capability for software your operations depend on."
        text="Six disciplines, practised on our own products and applied to yours — from understanding the workflow to running the system in production."
        actions={
          <>
            <Button href="/contact">
              Discuss Your Project <FiArrowRight aria-hidden="true" />
            </Button>
            <Button href="#service-list" variant="secondary">
              Explore Our Capabilities
            </Button>
          </>
        }
      />

      <section id="service-list" className="pb-8">
        <div className="section-shell">
          {services.map((service, index) => (
            <Reveal key={service.slug}>
              <article className="grid gap-10 border-t border-[var(--color-line)] py-16 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-24">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4">
                    <span className="mono text-sm text-[var(--color-subtle)]">0{index + 1}</span>
                    <service.icon aria-hidden="true" className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h2 className="display-md mt-6">{service.name}</h2>
                  <p className="mt-4 text-lg font-medium text-white">{service.outcome}</p>
                  <p className="mt-4 max-w-xl leading-7 text-[var(--color-muted)]">{service.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.capabilities.slice(0, 4).map((capability) => (
                      <li key={capability.title} className="chip">
                        {capability.title}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/services/${service.slug}`} className="link-arrow mt-8">
                    Explore {service.shortName.toLowerCase()} <FiArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
                <ServiceVisual kind={service.visual} className={index % 2 === 1 ? 'lg:order-1' : ''} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-light">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Ways to engage"
            title="Three paths to the right system."
            text="Every engagement begins with your workflow. Where it leads depends on how closely an existing product fits."
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {engagementPaths.map((path, index) => (
              <li key={path.title}>
                <Reveal delay={index * 0.06} className="paper-card flex h-full flex-col p-7">
                  <span className="mono text-sm text-[var(--color-ink-muted)]">0{index + 1}</span>
                  <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.03em]">{path.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-[var(--color-ink-muted)]">{path.text}</p>
                  <Link to={path.href} className="mt-8 inline-flex items-center gap-2 font-semibold text-[var(--color-ink)]">
                    {path.cta} <FiArrowRight aria-hidden="true" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection title="Not sure which service fits? Start with the workflow." primary={{ label: 'Talk to Our Team', href: '/contact' }} />
    </>
  )
}
