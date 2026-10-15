import { FiArrowRight } from 'react-icons/fi'
import Button from '../components/ui/Button'
import CtaSection from '../components/ui/CtaSection'
import Reveal from '../components/ui/Reveal'
import SectionIntro from '../components/ui/SectionIntro'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import { BrandGlyph } from '../components/ui/BrandMark'
import TeamSection from '../components/about/TeamSection'
import { company, deliveryPhases, principles, technologyStack } from '../data/company'
import { industries } from '../data/industries'
import { products } from '../data/products'

const problemApproach = [
  { title: 'Start with the work, not the feature list', text: 'We sit with the people who run the operation to understand records, approvals, exceptions, and the reporting leadership relies on.' },
  { title: 'Find the highest-friction workflows', text: 'Not everything needs software at once. We identify where manual coordination costs the most and start there.' },
  { title: 'Combine product discipline with custom problem-solving', text: 'Where a Qode27 product fits, we configure and extend it. Where it does not, we engineer what is needed.' },
]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Qode27 | Business Software and SaaS Company, Hyderabad"
        description="Qode27 is a software company in Hyderabad building SaaS platforms and custom business systems that bring clarity, automation, and scale to real operations."
        canonicalPath="/about"
      />
      <PageHero
        eyebrow="About Qode27"
        title="We build software that solves operational problems — across industries."
        text="Qode27 works with businesses that want clarity, automation, and systems that scale, instead of scattered manual processes."
        actions={
          <Button href="/contact">
            Discuss Your Project <FiArrowRight aria-hidden="true" />
          </Button>
        }
      />

      {/* Philosophy: editorial split */}
      <section className="section rule-top">
        <div className="section-shell grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">Philosophy</p>
            <blockquote className="display-md mt-8 !font-medium">
              “Businesses do not need more software. They need one system that fits the way they work.”
            </blockquote>
          </Reveal>
          <Reveal delay={0.08} className="space-y-6 text-lg leading-8 text-[var(--color-muted)] lg:pt-14">
            <p>
              Software earns its place when it makes daily work clearer: fewer handoffs, fewer re-typed records, and fewer surprises for leadership. That is the
              standard we hold every product and engagement to.
            </p>
            <p>
              We design across multiple business environments rather than one narrow category. The {company.name} portfolio spans {products.length} industry
              products — from hospital management to port operations — which lets us recognise patterns that single-vertical teams often miss.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="section-tight">
        <div className="section-shell grid gap-4 md:grid-cols-2">
          <Reveal className="surface relative overflow-hidden p-8 sm:p-10">
            <p className="eyebrow eyebrow--plain">Mission</p>
            <p className="display-sm mt-6 !font-medium">Bring operational clarity, automation, and scalable systems to businesses that have outgrown manual processes.</p>
          </Reveal>
          <Reveal delay={0.06} className="surface relative overflow-hidden p-8 sm:p-10">
            <BrandGlyph className="absolute -right-6 -top-6 h-40 w-40 opacity-[0.06]" />
            <p className="eyebrow eyebrow--plain">Vision</p>
            <p className="display-sm mt-6 !font-medium">A portfolio of modular business platforms, each grounded in how its industry actually operates — extended by custom engineering where it matters.</p>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="section section-light">
        <div className="section-shell">
          <SectionIntro eyebrow="Approach" title="How we approach business problems." />
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {problemApproach.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 0.06}>
                  <span className="font-display text-6xl font-semibold tracking-[-0.05em] text-black/10">0{index + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--color-ink-muted)]">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TeamSection />

      {/* Principles */}
      <section className="section">
        <div className="section-shell">
          <SectionIntro eyebrow="Engineering and product principles" title="What we will not compromise on." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.title} className="bg-[var(--color-bg)] p-8">
                <Reveal delay={(index % 3) * 0.04}>
                  <h3 className="text-lg font-semibold tracking-[-0.015em]">{principle.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--color-muted)]">{principle.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery methodology */}
      <section className="section section-raised rule-top">
        <div className="section-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Collaboration and delivery</p>
            <h2 className="display-md mt-5">Working with us.</h2>
            <p className="lede mt-5 max-w-md">Your team stays involved from discovery to rollout. Every milestone ends with working software reviewed together.</p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {technologyStack.map((item) => (
                <li key={item.name} className="chip">
                  {item.name}
                </li>
              ))}
            </ul>
          </Reveal>
          <ol className="grid gap-4 sm:grid-cols-2">
            {deliveryPhases.map((phase, index) => (
              <li key={phase.id}>
                <Reveal delay={index * 0.05} className="surface h-full p-7">
                  <span className="mono text-xs text-[var(--color-accent)]">Phase 0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.015em]">{phase.title}</h3>
                  <p className="mt-2 text-[0.94rem] leading-7 text-[var(--color-muted)]">{phase.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Company facts */}
      <section className="section-tight rule-top">
        <div className="section-shell">
          <dl className="grid gap-8 sm:grid-cols-3">
            {[
              ['Based in', company.location],
              ['Industry products', `${products.length} platforms with interactive demos`],
              ['Sectors served', industries.map((industry) => industry.name).join(', ')],
            ].map(([term, value]) => (
              <div key={term} className="border-t border-[var(--color-line)] pt-5">
                <dt className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">{term}</dt>
                <dd className="mt-3 leading-7 text-[var(--color-fg)]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaSection title="Need a software partner that understands operations, not just features?" text="Bring us your workflow, your bottlenecks, and your growth plan. We will help you shape the right solution path." />
    </>
  )
}
