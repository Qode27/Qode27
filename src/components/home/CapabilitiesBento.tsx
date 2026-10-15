import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { services } from '../../data/services'
import ServiceVisual from '../visual/ServiceVisual'
import Reveal from '../ui/Reveal'
import SectionIntro from '../ui/SectionIntro'

export default function CapabilitiesBento() {
  const [lead, ...rest] = services
  return (
    <section className="section section-raised rule-top">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            eyebrow="Capabilities"
            title="Design, engineering, and delivery under one roof."
            text="From workflow discovery to cloud deployment, each capability is practised on our own products before it reaches yours."
          />
          <Link to="/services" className="link-arrow shrink-0">
            All services <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          <Reveal className="lg:col-span-4 lg:row-span-2">
            <Link to={`/services/${lead.slug}`} className="surface surface-interactive group grid h-full gap-8 p-6 sm:p-8 xl:grid-cols-[1fr_1.1fr] xl:items-center">
              <div>
                <lead.icon aria-hidden="true" className="h-6 w-6 text-[var(--color-accent)]" />
                <h3 className="display-sm mt-6">{lead.name}</h3>
                <p className="mt-3 leading-7 text-[var(--color-muted)]">{lead.summary}</p>
                <span className="link-arrow mt-8">
                  Explore <FiArrowUpRight aria-hidden="true" />
                </span>
              </div>
              <ServiceVisual kind={lead.visual} className="!border-0 !bg-transparent !p-0" />
            </Link>
          </Reveal>
          {rest.map((service, index) => (
            <Reveal key={service.slug} delay={0.05 * index} className={index < 2 ? 'lg:col-span-2' : 'lg:col-span-2'}>
              <Link to={`/services/${service.slug}`} className="surface surface-interactive group flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <service.icon aria-hidden="true" className="h-5 w-5 text-[var(--color-accent)]" />
                  <FiArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--color-subtle)] transition group-hover:text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.015em]">{service.name}</h3>
                <p className="mt-2 text-[0.92rem] leading-6 text-[var(--color-muted)]">{service.outcome}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
