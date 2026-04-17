import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiCommand,
  FiDatabase,
  FiGrid,
  FiHeart,
  FiLayers,
  FiMap,
  FiMonitor,
  FiPackage,
  FiPlayCircle,
  FiShield,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import Seo from '../components/ui/Seo'
import { DemoProductPreview } from '../components/demo/DemoPrimitives'
import { demoApps, getDemoRoute } from '../config/demo-apps'
import { buildRequestDemoPath } from '../data/solutions'

const productOutcomes: Record<string, string> = {
  hms: 'Speed up patient flow, billing, and front-desk operations.',
  hrms: 'Unify workforce records, approvals, payroll, and hiring.',
  inventory: 'Control stock, vendors, dispatch, and warehouse risk.',
  parking: 'Track occupancy, entry-exit flow, and revenue live.',
  coaching: 'Manage batches, timetables, attendance, and fees.',
  ca: 'Run compliance work, invoices, and client visibility cleanly.',
  restaurant: 'Move orders faster with live kitchen and outlet control.',
  shipping: 'Track shipments, milestones, and delays in one place.',
  port: 'Coordinate berths, vessels, and cargo with operational clarity.',
  crm: 'Drive pipeline movement, follow-ups, and forecast confidence.',
}

const demoCapabilities: Record<string, string[]> = {
  hms: ['Appointments and reception', 'Billing and claims', 'Doctor schedule', 'Prescription view'],
  hrms: ['Employee directory', 'Leave approvals', 'Payroll snapshot', 'Recruitment workflow'],
  inventory: ['Stock ledger', 'Low stock alerts', 'Procurement queue', 'Dispatch readiness'],
  crm: ['Pipeline board', 'Lead scoring', 'Next actions', 'Forecast confidence'],
  parking: ['Live occupancy board', 'Bay allocation', 'Movement log', 'Revenue desk'],
  shipping: ['Shipment tracking', 'Milestones timeline', 'Exceptions desk', 'Delivery confidence'],
}

const industryTiles = [
  { icon: FiHeart, label: 'Hospitals', note: 'Patient, billing, and operations flow.' },
  { icon: FiDatabase, label: 'Warehouses', note: 'Stock, inward, outward, and dispatch.' },
  { icon: FiPackage, label: 'Logistics', note: 'Movement, status, and delivery visibility.' },
  { icon: FiClipboard, label: 'Coaching Institutes', note: 'Batches, attendance, and fee control.' },
  { icon: FiShield, label: 'CA Firms', note: 'Client work, invoices, and compliance.' },
  { icon: FiMonitor, label: 'Retail & Takeaway', note: 'Orders, kitchen, and daily revenue.' },
  { icon: FiMap, label: 'Transport & Parking', note: 'Occupancy, bay usage, and receipts.' },
  { icon: FiGrid, label: 'Shipping & Port', note: 'Vessels, consignments, and cargo handling.' },
  { icon: FiTrendingUp, label: 'Sales Teams', note: 'Deals, forecasting, and follow-up discipline.' },
  { icon: FiUsers, label: 'Service Businesses', note: 'Custom workflows for daily execution.' },
]

const differentiators = [
  { icon: FiClock, title: 'Fast Deployment', note: 'Start from a working system, not a blank project.' },
  { icon: FiCommand, title: 'Built for Real Operations', note: 'Designed around workflows people actually run every day.' },
  { icon: FiShield, title: 'Secure and Reliable', note: 'Clean architecture, safe demos, and serious production thinking.' },
  { icon: FiLayers, title: 'Cost-Effective Growth', note: 'Expand modules and users without rebuilding from zero.' },
]

const heroSignals = [
  'Interactive demos across 10 products',
  'Visual product quality clients can feel instantly',
  'Built for real business operators, not technical teams',
]

function HeroStack() {
  const heroApps = demoApps.filter((app) => ['hms', 'hrms', 'inventory', 'crm'].includes(app.slug))

  return (
    <Motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="relative mx-auto w-full max-w-[44rem]"
    >
      <div className="hero-orb left-4 top-8 h-28 w-28 bg-cyan-300/25" />
      <div className="hero-orb right-4 top-24 h-48 w-48 bg-blue-300/16" />
      <div className="hero-orb bottom-0 left-1/3 h-36 w-36 bg-emerald-300/16" />
      <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(20,131,181,0.1),transparent_32%)]" />

      <Motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-panel relative overflow-hidden rounded-[2.15rem] p-4 sm:p-5"
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(20,131,181,0.1),transparent)]" />
        <div className="product-preview-frame relative rounded-[1.7rem]">
          <div className="mt-4">
            <DemoProductPreview app={heroApps[0]} />
          </div>
          <div className="border-t border-slate-200/80 px-4 py-4 sm:px-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Qode27 Product Stack</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">Real software visuals across multiple industries</p>
              </div>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Demo-ready
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Ops', 'Unified'],
              ['Dashboards', 'Live'],
              ['Workflows', 'Clickable'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1rem] border border-slate-200 bg-slate-50/75 px-4 py-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.22 }}
        className="absolute -left-3 top-[8%] hidden w-[14rem] rounded-[1.4rem] border border-white/80 bg-white/95 p-4 shadow-[0_24px_56px_rgba(15,23,42,0.12)] backdrop-blur-xl md:block"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan-700">Hospital Flow</p>
          <FiHeart className="text-cyan-600" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-950">Appointments, billing, and doctor availability.</p>
        <div className="mt-3">
          <DemoProductPreview app={heroApps[0]} />
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.28 }}
        className="absolute -right-3 top-[18%] hidden w-[14rem] rounded-[1.4rem] border border-white/80 bg-white/95 p-4 shadow-[0_24px_56px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:block"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-indigo-700">HRMS</p>
          <FiUsers className="text-indigo-600" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-950">People operations, payroll, and approvals.</p>
        <div className="mt-3">
          <DemoProductPreview app={heroApps[1]} />
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.34 }}
        className="absolute left-[6%] top-[68%] hidden w-[15rem] rounded-[1.4rem] border border-white/80 bg-white/95 p-4 shadow-[0_24px_56px_rgba(15,23,42,0.12)] backdrop-blur-xl md:block"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-orange-700">Inventory</p>
          <FiPackage className="text-orange-600" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-950">Stock alerts, procurement, and warehouse control.</p>
        <div className="mt-3">
          <DemoProductPreview app={heroApps[2]} />
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.4 }}
        className="absolute right-[4%] top-[70%] hidden w-[15rem] rounded-[1.4rem] border border-white/80 bg-white/95 p-4 shadow-[0_24px_56px_rgba(15,23,42,0.12)] backdrop-blur-xl md:block"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-violet-700">CRM</p>
          <FiTrendingUp className="text-violet-600" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-950">Deals, follow-ups, and forecast visibility.</p>
        <div className="mt-3">
          <DemoProductPreview app={heroApps[3]} />
        </div>
      </Motion.div>
    </Motion.div>
  )
}

function ProductCard({ slug }: { slug: string }) {
  const app = demoApps.find((item) => item.slug === slug)

  if (!app) return null

  return (
    <Reveal>
      <Motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.24 }}
        className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white shadow-[0_22px_55px_rgba(15,23,42,0.08)]"
      >
        <div className="relative p-5 text-white" style={{ background: `linear-gradient(135deg, ${app.accent.primary} 0%, ${app.accent.secondary} 100%)` }}>
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 32%)' }} />
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/84">
              {app.category}
            </span>
            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/76">
              Interactive
            </span>
          </div>
          <div className="relative">
            <h3 className="mt-4 text-[1.55rem] font-semibold tracking-[-0.04em]">{app.name}</h3>
            <p className="mt-2 max-w-[18rem] text-sm leading-6 text-white/82">{productOutcomes[app.slug]}</p>
          </div>
        </div>
        <div className="p-5">
          <DemoProductPreview app={app} />
          <div className="mt-4 flex flex-wrap gap-2">
            {app.heroMetrics.slice(0, 2).map((metric) => (
              <span key={metric.label} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-600">
                {metric.label}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={getDemoRoute(app.slug)} size="sm" className="justify-center">
              Explore Demo
              <FiArrowRight />
            </Button>
            <Button href={buildRequestDemoPath(app.name)} variant="secondary" size="sm" className="justify-center">
              Request Demo
            </Button>
          </div>
        </div>
      </Motion.article>
    </Reveal>
  )
}

export default function HomePage() {
  const [activeDemoSlug, setActiveDemoSlug] = useState<'hms' | 'hrms' | 'inventory' | 'crm' | 'parking' | 'shipping'>('hms')
  const activeDemo = useMemo(() => demoApps.find((app) => app.slug === activeDemoSlug) ?? demoApps[0], [activeDemoSlug])

  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Qode27 | Premium Business Software For Real Operations"
        description="Qode27 builds modern business software for hospitals, warehouses, parking, coaching, logistics, accounting, restaurants, CRM, and more."
        canonicalPath="/"
      />

      <section className="relative overflow-hidden pt-8 sm:pt-12">
        <div className="hero-orb left-[-5rem] top-12 h-44 w-44 bg-cyan-300/20" />
        <div className="hero-orb right-[-4rem] top-24 h-56 w-56 bg-blue-300/15" />
        <Container className="section-spacing relative">
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)] shadow-[0_12px_24px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                Premium Business Software
              </div>
              <h1 className="mt-8 text-[3rem] font-semibold leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-[3.8rem] lg:text-[4.8rem]">
                Run Your Entire Business on Autopilot
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                From hospitals to warehouses, Qode27 builds powerful business software that replaces manual work with speed, clarity, and control.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button href="/request-demo" className="sm:min-w-[12rem]">
                  Request Demo
                </Button>
                <Button href="/solutions" variant="secondary" className="sm:min-w-[12rem]">
                  Explore Products
                  <FiArrowRight />
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroSignals.map((item) => (
                  <div key={item} className="rounded-[1.25rem] border border-slate-200/70 bg-white/88 p-4 shadow-[0_12px_24px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <FiCheckCircle className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <HeroStack />
          </div>
        </Container>
      </section>

      <section className="section-spacing pt-0">
        <Container>
          <Reveal>
            <div className="homepage-panel p-6 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">Product Showcase</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">Modern software products, built for real industries.</h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Real product visuals. Real demo routes. Clear next steps.</p>
                </div>
                <Button href="/demo" variant="secondary">
                  View All Demos
                  <FiPlayCircle />
                </Button>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {['hms', 'hrms', 'inventory', 'parking', 'coaching', 'ca', 'restaurant', 'shipping', 'port', 'crm'].map((slug) => (
                  <ProductCard key={slug} slug={slug} />
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">Interactive Demos</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">Don’t Just Read. Experience It.</h2>
                <p className="mt-4 max-w-md text-base leading-7 text-slate-600">Explore real product flows instead of static screenshots.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="homepage-panel p-6">
                <div className="flex flex-wrap gap-2">
                  {(['hms', 'hrms', 'inventory', 'crm', 'parking', 'shipping'] as const).map((slug) => {
                    const item = demoApps.find((app) => app.slug === slug)
                    if (!item) return null

                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => setActiveDemoSlug(slug)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          activeDemoSlug === slug ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {item.shortName}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
                  <div className="product-preview-frame rounded-[1.7rem]">
                    <div className="flex items-center justify-between gap-3 px-5 pt-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{activeDemo.category}</p>
                        <h3 className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">{activeDemo.name}</h3>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                        Live Demo
                      </span>
                    </div>
                    <p className="mt-3 px-5 text-sm leading-6 text-slate-600">{productOutcomes[activeDemo.slug]}</p>
                    <div className="mt-5 px-5 pb-5">
                      <DemoProductPreview app={activeDemo} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(demoCapabilities[activeDemo.slug] ?? []).map((capability) => (
                        <div key={capability} className="homepage-soft-card p-4">
                          <p className="text-sm font-semibold text-slate-950">{capability}</p>
                        </div>
                      ))}
                    </div>
                    <div className="homepage-soft-card p-5">
                      <p className="text-sm font-semibold text-slate-950">Why it converts</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{activeDemo.tagline}</p>
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <Button href={getDemoRoute(activeDemo.slug)} size="sm">
                          Open Demo
                          <FiArrowRight />
                        </Button>
                        <Button href={buildRequestDemoPath(activeDemo.name)} variant="secondary" size="sm">
                          Request Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-rose-100 bg-[linear-gradient(180deg,#fff8f8_0%,#ffffff_100%)] p-7 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">Before Qode27</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">Too many tools. Too little visibility.</h2>
                <div className="mt-6 space-y-3">
                  {[
                    'Scattered spreadsheets',
                    'Manual billing',
                    'Missed follow-ups',
                    'No live visibility',
                    'Delays and mistakes',
                  ].map((item) => (
                    <div key={item} className="rounded-[1.2rem] border border-rose-100 bg-white px-4 py-4 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-[linear-gradient(180deg,#f4fff9_0%,#ffffff_100%)] p-7 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">After Qode27</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">One operating system for the business.</h2>
                <div className="mt-6 space-y-3">
                  {[
                    'One unified dashboard',
                    'Faster operations',
                    'Automated workflows',
                    'Better tracking',
                    'Business clarity',
                  ].map((item) => (
                    <div key={item} className="rounded-[1.2rem] border border-emerald-100 bg-white px-4 py-4 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">Industries</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">Software for the operations that actually run the business.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {industryTiles.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.03}>
                <Motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="homepage-soft-card p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <item.icon />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
                </Motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">Why Qode27</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">Why businesses trust Qode27 to lead their software rollout.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {differentiators.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <Motion.article
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.24 }}
                  className="homepage-soft-card p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <item.icon />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
                </Motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.3rem] bg-[linear-gradient(135deg,#0f172a_0%,#12344a_52%,#1483b5_100%)] px-6 py-10 text-white shadow-[0_28px_70px_rgba(15,23,42,0.18)] sm:px-8 lg:px-12">
              <div className="hero-orb right-10 top-10 h-32 w-32 bg-cyan-300/20" />
              <div className="hero-orb bottom-0 left-0 h-40 w-40 bg-blue-300/14" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">Final CTA</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">Let's Build Your Business System</h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-white/74">Tell us what you need to manage or automate. We'll show you a working path.</p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Button href="/request-demo">Request Demo</Button>
                    <Button href="/contact" variant="secondary">
                      Contact Us
                    </Button>
                  </div>
                </div>
                <div className="rounded-[1.7rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                  <div className="grid gap-3">
                    {['Interactive demos ready', 'Multi-industry product lineup', 'Built to convert serious inquiries'].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/6 px-4 py-3">
                        <FiCheckCircle className="text-cyan-200" />
                        <span className="text-sm font-medium text-white/84">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </Motion.div>
  )
}
