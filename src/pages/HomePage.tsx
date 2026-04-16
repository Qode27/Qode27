import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiLayers, FiSettings, FiShield } from 'react-icons/fi'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Seo from '../components/ui/Seo'
import SolutionCard from '../components/ui/SolutionCard'
import TestimonialCard from '../components/ui/TestimonialCard'
import UseCaseBlock from '../components/ui/UseCaseBlock'
import {
  businessScenarios,
  caseStudyPreviews,
  testimonials,
  trustBar,
  whyQode,
} from '../data/site'
import { buildRequestDemoPath, solutions } from '../data/solutions'

const featuredSolutionSlugs = ['logistics-shipping', 'inventory-management', 'parking-management', 'coaching-management'] as const
const featuredSolutionSlugSet = new Set<string>(featuredSolutionSlugs)
const featuredSolutions = solutions.filter((solution) => featuredSolutionSlugSet.has(solution.slug))

const howItWorks = [
  {
    icon: FiLayers,
    step: '1. Choose a system',
    text: 'Start from a proven system already built for the kind of operational work you run, so you move faster with less guesswork from day one.',
  },
  {
    icon: FiSettings,
    step: '2. Adapt it to your workflow',
    text: 'We shape roles, approvals, dashboards, and reporting around your real process, so the system fits the business instead of disrupting it.',
  },
  {
    icon: FiShield,
    step: '3. Deploy and scale',
    text: 'Go live with more clarity, lower implementation risk, and a cleaner path to add modules, users, and reporting as operations grow.',
  },
]

const idealClientSignals = [
  'Businesses managing real operations like dispatch, stock movement, front-desk flow, billing, approvals, or daily coordination.',
  'Teams that are still relying on spreadsheets, WhatsApp updates, calls, and manual follow-up to keep work moving.',
  'Owners and managers who need better workflow control, cleaner reporting, and live visibility across the business.',
  'Companies that want a serious system implementation without funding a slow custom build from a blank page.',
]

const whyApproachWorks = [
  {
    title: 'Faster implementation',
    text: 'You start from a system foundation that already exists, which cuts delay and gets the business to usable software sooner.',
  },
  {
    title: 'Lower execution risk',
    text: 'Proven structures reduce the uncertainty, rework, and scope drift that usually slow down custom-from-scratch projects.',
  },
  {
    title: 'Easier team adoption',
    text: 'When software matches the actual workflow, teams understand it faster and use it with less resistance.',
  },
  {
    title: 'Built to scale over time',
    text: 'The system can expand cleanly as you add users, deeper process layers, reporting, and operational complexity.',
  },
]

const solutionLibrary = [
  {
    title: 'Operations & Logistics Systems',
    description: 'Built for businesses managing movement, dispatch, coordination, tracking, and workflow visibility.',
    outcome: 'Bring jobs, status updates, billing, and reporting into one structured system.',
    href: '/solutions?category=logistics',
  },
  {
    title: 'Inventory & Distribution Systems',
    description: 'Built for stock-driven businesses that need control across warehouse, inward, outward, and dispatch workflows.',
    outcome: 'Improve stock accuracy, reduce coordination gaps, and make inventory decisions with confidence.',
    href: '/solutions?category=distribution',
  },
  {
    title: 'Retail & Transaction Systems',
    description: 'Built for fast-moving businesses handling orders, sales, items, and day-level performance.',
    outcome: 'Get cleaner order flow, clearer revenue visibility, and stronger control over daily operations.',
    href: '/solutions?category=retail',
  },
  {
    title: 'Education & Admin Systems',
    description: 'Built for institutes managing admissions, attendance, fees, batches, and academic administration.',
    outcome: 'Reduce admin workload, centralize records, and run operations with more structure.',
    href: '/solutions?category=education',
  },
  {
    title: 'Healthcare Systems',
    description: 'Built for hospitals and clinics that need better front-desk flow, billing control, and operational visibility.',
    outcome: 'Simplify patient handling, improve billing accuracy, and give management a clearer operating picture.',
    href: '/solutions?category=healthcare',
  },
]

function HeroVisual() {
  return (
    <Motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative mx-auto w-full max-w-[38rem]"
    >
      <div className="hero-orb left-8 top-14 h-24 w-24 bg-cyan-300/30" />
      <div className="hero-orb bottom-6 right-6 h-32 w-32 bg-blue-300/20" />

      <div className="glass-panel shine-border relative rounded-[2rem] p-6 sm:p-7">
        <div className="grid gap-4">
          <Motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-[1.6rem] bg-[linear-gradient(135deg,#0f172a_0%,#13253a_50%,#17384d_100%)] p-6 text-white shadow-[0_30px_60px_rgba(15,23,42,0.18)]"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Qode27 System Library</p>
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/74">
                Ready To Deploy
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">A structured ecosystem of business systems for real operations.</h2>
            <div className="mt-6 grid gap-3">
              {[
                'Logistics, parking, and movement control',
                'Inventory, distribution, and dispatch visibility',
                'Retail, education, healthcare, and admin workflows',
              ].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                  <span className="text-sm text-white/78">{item}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                </div>
              ))}
            </div>
          </Motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: 'System-first', text: 'Start from a proven business system instead of from a blank page.' },
              { title: 'Workflow-fit', text: 'Adapt roles, reports, and flows around your operation.' },
              { title: 'Scale-ready', text: 'Deploy faster now and expand cleanly over time.' },
            ].map((item, index) => (
              <Motion.div
                key={item.title}
                animate={{ y: index % 2 === 0 ? [0, -6, 0] : [0, -10, 0] }}
                transition={{ duration: 8 + index, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-[1.2rem] border border-slate-200/70 bg-white p-5 shadow-[0_16px_34px_rgba(15,23,42,0.08)]"
              >
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </Motion.div>
  )
}

export default function HomePage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Qode27 | Structured Business Software Ecosystem"
        description="Qode27 offers a structured ecosystem of ready-to-deploy business systems for logistics, distribution, retail, education, healthcare, and internal operations."
        canonicalPath="/"
      />

      <section className="relative overflow-hidden pt-10 sm:pt-14">
        <div className="hero-orb left-[-5rem] top-12 h-44 w-44 bg-cyan-300/20" />
        <div className="hero-orb right-[-4rem] top-24 h-56 w-56 bg-blue-300/15" />
        <Container className="section-spacing relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)] shadow-[0_12px_24px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                Premium software systems company
              </div>
              <h1 className="mt-8 font-display text-5xl font-bold leading-[0.92] tracking-[-0.07em] text-slate-950 sm:text-6xl lg:text-[4.8rem]">
                When spreadsheets, calls, and manual follow-up start running the business, it is time for a structured system.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-[1.16rem]">
                Qode27 deploys structured business systems for logistics, distribution, retail, education, healthcare, and internal operations. Start from a proven system, adapt it to your workflow, and gain clearer control, visibility, and execution without building everything from scratch.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button href="/request-demo" className="sm:min-w-[12rem] hover:scale-[1.02]">
                  Request Your System Demo
                </Button>
                <Button href="/solutions" variant="secondary" className="sm:min-w-[12rem]">
                  Explore Proven Systems
                  <FiArrowRight />
                </Button>
              </div>
              <div className="mt-8 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                {trustBar.map((item) => (
                  <span key={item.title} className="inline-flex items-center gap-2">
                    <FiCheckCircle className="text-[var(--color-accent)]" />
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
            <HeroVisual />
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <Reveal>
            <div className="rounded-[1.7rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7">
              <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">Who This Is For</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                    Built for businesses that need operational control, not just another tool.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    If these sound familiar, Qode27 is likely a fit. If not, we are probably not the right implementation partner.
                  </p>
                </div>
                <div className="grid gap-3">
                  {idealClientSignals.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.2rem] bg-slate-50 px-4 py-4">
                      <FiCheckCircle className="mt-1 shrink-0 text-[var(--color-accent)]" />
                      <p className="text-sm leading-7 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <div className="grid gap-4 rounded-[1.6rem] border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm md:grid-cols-2 xl:grid-cols-4">
            {trustBar.map((item) => (
              <div key={item.title} className="rounded-[1.2rem] bg-slate-50 px-4 py-4">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="How Qode27 Works"
            title="A faster, lower-risk way to deploy serious business software."
            description="Most software projects fail because they start from scratch. We don’t. Qode27 works from a structured library of business systems, then adapts the right one to your workflow so deployment is clearer, faster, and far less risky."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {howItWorks.map((item) => (
              <Reveal key={item.step}>
                <Motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.24 }}
                  className="rounded-[1.45rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    {createElement(item.icon)}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.step}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </Motion.article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <div className="rounded-[1.4rem] border border-slate-200/70 bg-slate-50 px-6 py-5 text-sm font-medium text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
              Result: less manual coordination, faster implementation, lower risk, and stronger workflow control.
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <SectionHeader
            eyebrow="Why This Approach Works"
            title="Structured systems outperform blank-page software projects."
            description="The goal is not to make software feel impressive. It is to get the business onto a system that works, gets adopted, and keeps scaling without unnecessary implementation drag."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whyApproachWorks.map((item) => (
              <Reveal key={item.title} className="h-full">
                <Motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.24 }}
                  className="flex h-full flex-col rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                >
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </Motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="Solution Library"
            title="A business software ecosystem, organized by operational need."
            description="Qode27 maintains a structured library of deployable systems so businesses can start from a proven foundation instead of piecing operations together from scratch."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutionLibrary.map((item) => (
              <Reveal key={item.title}>
                <Motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.24 }}
                  className="flex h-full flex-col rounded-[1.5rem] border border-slate-200/70 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                >
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                  <p className="mt-4 text-sm font-medium leading-7 text-slate-800">{item.outcome}</p>
                  <div className="mt-auto pt-7">
                    <Button href={item.href} variant="secondary">
                      View Solutions
                    </Button>
                  </div>
                </Motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="Featured Systems"
            title="Proven systems for high-friction business workflows."
            description="These are the systems businesses usually start with when they need operational clarity, faster control, and a serious implementation path."
          />
          <div className="mt-14 grid gap-7 lg:grid-cols-2 xl:grid-cols-4">
            {featuredSolutions.map((solution) => (
              <Reveal key={solution.slug}>
                <SolutionCard solution={solution} featured />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="Why Qode27"
            title="Built for businesses that need software to fit the operation, not the other way around."
            description="Most vendors either give you a rigid product or a vague custom build process. Qode27 gives you a structured system foundation, workflow-level adaptation, and a cleaner path to deployment."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyQode.map((item) => (
              <Reveal key={item.title}>
                <Motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.24 }}
                  className="group rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition duration-300 group-hover:scale-105">
                    {createElement(item.icon)}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </Motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <CtaBanner
            eyebrow="Custom Software"
            title="When the workflow is unique, we build beyond the standard system."
            description="Choose custom when the workflow is highly specific, when multiple operational layers need to be connected, or when existing tools are creating workarounds instead of solving the problem. Expect clear workflow discovery, structured solution planning, premium usability, and a rollout path designed for scale."
            primaryLabel="Request Demo"
            primaryHref={buildRequestDemoPath('Custom Software')}
            secondaryLabel="Start Conversation"
            secondaryHref="/contact"
          />
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <SectionHeader
            eyebrow="Use Cases"
            title="Real business scenarios Qode27 is built for."
            description="The common thread is not the industry. It is the need for cleaner workflows, stronger visibility, and less dependence on manual coordination."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {businessScenarios.map((scenario, index) => (
              <Reveal key={scenario.scenario}>
                <UseCaseBlock step={index + 1} scenario={scenario.scenario} problem={scenario.problem} outcome={scenario.outcome} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="Case Study Style"
            title="What operational transformation looks like."
            description="The shift is simple but meaningful: manual updates, scattered records, and disconnected tools are replaced by a structured business system with clearer reporting and stronger execution control."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {caseStudyPreviews.map((item) => (
              <Reveal key={item.title}>
                <Motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.24 }}
                  className="rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                >
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Before</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.before}</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">After</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.after}</p>
                  <p className="mt-5 text-sm leading-7 text-slate-600">{item.description}</p>
                  <p className="mt-5 text-sm font-medium text-[var(--color-accent)]">{item.outcome}</p>
                </Motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="Testimonials"
            title="Clients usually describe the same change: more clarity, less noise."
            description="The strongest response to operational software is simple. Teams use it quickly, workflows make more sense, and management gets better visibility."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Reveal key={`${testimonial.name}-${testimonial.company}`}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <CtaBanner
            eyebrow="Final CTA"
            title="If manual coordination is still running critical workflows, this is the point to fix it."
            description="Qode27 helps serious businesses replace spreadsheet dependency, fragmented updates, and operational guesswork with structured systems built for control, visibility, and scale. Request a demo and we will identify the right system path for your workflow."
            primaryLabel="Request Your Demo"
            secondaryLabel="Talk Through Your Workflow"
            secondaryHref="/contact"
          />
        </Container>
      </section>
    </Motion.div>
  )
}
