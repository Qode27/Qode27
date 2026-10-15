import { motion as Motion } from 'framer-motion'
import { FiArrowRight, FiInfo, FiMessageSquare } from 'react-icons/fi'
import { demoApps, getDemoRoute, buildDemoRequestPath } from '../../config/demo-apps'
import { DemoProductPreview } from '../../components/demo/DemoPrimitives'
import Container from '../../components/ui/Container'
import PageHero from '../../components/ui/PageHero'
import Seo from '../../components/ui/Seo'
import Button from '../../components/ui/Button'

export default function DemoCatalogPage() {
  return (
    <>
      <Seo
        title="Interactive Product Demos | Qode27"
        description="Explore Qode27 interactive demos across HRMS, healthcare, inventory, parking, coaching, CA practice, restaurant, shipping, port, and CRM products."
        canonicalPath="/demo"
      />

      <PageHero
        eyebrow="Interactive demos"
        title={`${demoApps.length} software products, running right here in your browser.`}
        text="Each demo is a frontend-only sandbox with sample data, mock login personas, and local-only workflows. A built-in guard blocks any request to live systems."
        actions={
          <>
            <Button href="/products">
              View product details <FiArrowRight aria-hidden="true" />
            </Button>
            <Button href="/request-demo" variant="secondary">
              Request a Product Demo
            </Button>
          </>
        }
      />

      <section className="pb-24">
        <Container>
          <p className="flex items-start gap-3 text-sm leading-6 text-[var(--color-muted)]">
            <FiInfo aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
            All names, records, and figures shown in demos are fictional sample data used to illustrate product behaviour.
          </p>
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            {demoApps.map((app) => {
              const Icon = app.icon
              return (
                <Motion.article
                  key={app.slug}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden rounded-[1.6rem] border border-[var(--color-line)] bg-white text-[var(--color-ink)]"
                >
                  <div className="p-7 text-white" style={{ background: app.accent.gradient }}>
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-2xl backdrop-blur-sm">
                      <Icon aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/66">{app.category}</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">{app.name}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/74">{app.summary}</p>
                  </div>
                  <div className="space-y-5 p-7">
                    <DemoProductPreview app={app} />
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{app.identity.productHint} · sample data</p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {app.heroMetrics.map((metric) => (
                        <div key={metric.label} className="rounded-[1.2rem] bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
                          <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-slate-950">{metric.value}</p>
                          <p className="mt-2 text-sm text-slate-600">{metric.change}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {app.demoEnabled && !app.requestDemoOnly ? (
                        <Button href={getDemoRoute(app.slug)} variant="light" size="sm">
                          Try interactive demo
                          <FiArrowRight aria-hidden="true" />
                        </Button>
                      ) : null}
                      <Button href={buildDemoRequestPath(app.name)} variant="outline-light" size="sm">
                        Request demo
                        <FiMessageSquare aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </Motion.article>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
