import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
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
import { buildRequestDemoPath, featuredSolutionSlugs, solutions } from '../data/solutions'

const featuredSolutions = solutions.filter((solution) => featuredSolutionSlugs.includes(solution.slug))

function HeroVisual() {
  const labels = [
    'Truck parking and yard operations',
    'Inventory, distribution, and dispatch',
    'Healthcare, HR, retail, and education',
  ]

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
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Qode27 Solutions</p>
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/74">
                Multi-Industry
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
              Multi-industry software with the clarity of a product company and the flexibility of a custom solutions team.
            </h2>
            <div className="mt-6 grid gap-3">
              {labels.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                  <span className="text-sm text-white/78">{item}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                </div>
              ))}
            </div>
          </Motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Custom workflows', text: 'Adapted to the way your team actually operates.' },
              { title: 'Operational dashboards', text: 'High-clarity visibility for daily decision-making.' },
              { title: 'Business-ready rollout', text: 'Structured delivery without unnecessary complexity.' },
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
        title="Qode27 | Multi-Industry Business Software Company"
        description="Qode27 builds software for logistics, inventory, parking, healthcare, retail, coaching, HRMS, port operations, and custom business workflows."
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
                Premium multi-industry software company
              </div>
              <h1 className="mt-8 font-display text-5xl font-bold leading-[0.92] tracking-[-0.07em] text-slate-950 sm:text-6xl lg:text-[4.8rem]">
                We build software for your business, no matter your industry.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-[1.16rem]">
                From logistics and inventory to healthcare, coaching, retail, and operations, Qode27 builds smart software that automates work and drives growth.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button href="/request-demo" className="sm:min-w-[12rem] hover:scale-[1.02]">
                  Request Demo
                </Button>
                <Button href="/solutions" variant="secondary" className="sm:min-w-[12rem]">
                  Explore Solutions
                  <FiArrowRight />
                </Button>
              </div>
              <div className="mt-8 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                {['No public demos', 'Built for real operations', 'Custom software available'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <FiCheckCircle className="text-[var(--color-accent)]" />
                    {item}
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
            eyebrow="Industries We Serve"
            title="Software solutions built for different business models, not one narrow niche."
            description="Qode27 works across business operations, logistics, distribution, healthcare, retail, education, and internal systems, with custom delivery when a listed solution is not enough."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {solutions.map((solution) => (
              <Reveal key={solution.slug}>
                <Motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.24 }}
                  className="group rounded-[1.45rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition duration-300 group-hover:scale-105 group-hover:bg-[rgba(20,131,181,0.14)]">
                    {createElement(solution.icon)}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{solution.name}</h3>
                  <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,rgba(20,131,181,0.18),rgba(20,131,181,0))]" />
                  <p className="mt-4 text-sm leading-7 text-slate-600">{solution.cardDescription}</p>
                  <Button href={`/solutions/${solution.slug}`} variant="ghost" className="mt-6 px-0 text-left">
                    View Solution
                    <FiArrowRight />
                  </Button>
                </Motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <SectionHeader
            eyebrow="Featured Solutions"
            title="A software portfolio designed around real-world operational workflows."
            description="These solution lines show how Qode27 translates different business domains into clean, scalable systems with clear CTA paths."
          />
          <div className="mt-14 grid gap-7 lg:grid-cols-2 xl:grid-cols-3">
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
            title="Businesses choose Qode27 when they need software that fits operations, not the other way around."
            description="Our positioning is simple: practical systems, clean interfaces, multi-industry understanding, and software designed to grow with the business."
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
            title="Don't see your industry? We build custom software for your business."
            description="Every business has different workflows. We design systems tailored to your operations, team, and growth goals without forcing you into rigid templates."
            primaryLabel="Request Demo"
            primaryHref={buildRequestDemoPath('Custom Software')}
            secondaryLabel="Talk to Us"
            secondaryHref="/contact"
          />
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <SectionHeader
            eyebrow="Use Cases"
            title="Real business scenarios we design software around."
            description="Each use case reflects the kind of operational problem Qode27 is built to solve across multiple industries."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {businessScenarios.map((scenario, index) => (
              <Reveal key={scenario}>
                <UseCaseBlock step={index + 1} title={`Operational scenario ${index + 1}`} text={scenario} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="Case Study Structure"
            title="A proof section that is ready to grow as your portfolio grows."
            description="Even before real case studies are added, the site now has a premium structure for showcasing outcomes, industries, and business results."
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
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <p className="mt-5 text-sm font-medium text-[var(--color-accent)]">{item.outcome}</p>
                </Motion.article>
              </Reveal>
            ))}
          </div>
          <div className="mt-9">
            <Button href="/case-studies" variant="secondary">
              View All Case Studies
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="Testimonials"
            title="Premium testimonial structure, ready for future client proof."
            description="These placeholders are framed to support later expansion without changing the design system."
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
            title="Ready to build software that fits your business?"
            description="Tell us about your operations, your bottlenecks, and what your team needs next. We will help you move toward the right solution path."
          />
        </Container>
      </section>
    </Motion.div>
  )
}
