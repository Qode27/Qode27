import { motion as Motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import { Navigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import FAQAccordion from '../components/ui/FAQAccordion'
import Reveal from '../components/ui/Reveal'
import Seo from '../components/ui/Seo'
import { buildRequestDemoPath, getSolutionBySlug } from '../data/solutions'

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const solution = getSolutionBySlug(slug)

  if (!solution) {
    return <Navigate to="/solutions" replace />
  }

  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title={`${solution.keywordsTitle} | Qode27`}
        description={solution.keywordsDescription}
        canonicalPath={`/solutions/${solution.slug}`}
      />

      <section className="section-spacing pt-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/15 bg-[var(--color-accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                {solution.category}
              </div>
              <h1 className="mt-7 font-display text-5xl font-bold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-6xl">
                {solution.heroTitle}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">{solution.heroDescription}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href={buildRequestDemoPath(solution.name)}>Request Demo</Button>
                <Button href="/contact" variant="secondary">
                  Book Consultation
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {solution.screenshots.map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Mockup Preview</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-950">{item}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Structured placeholder ready for real UI screenshots or product visuals later.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[1.4rem] border border-slate-200/70 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                <h2 className="text-2xl font-semibold text-slate-950">Industry Problems</h2>
                <ul className="mt-6 space-y-4">
                  {solution.problems.map((problem) => (
                    <li key={problem} className="flex items-start gap-3 text-base leading-7 text-slate-600">
                      <FiCheckCircle className="mt-1 shrink-0 text-[var(--color-accent)]" />
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[1.4rem] border border-slate-200/70 bg-slate-50 p-8">
                <h2 className="text-2xl font-semibold text-slate-950">Qode27 Solution Approach</h2>
                <ul className="mt-6 space-y-4">
                  {solution.approach.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-7 text-slate-600">
                      <FiCheckCircle className="mt-1 shrink-0 text-[var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[1.4rem] border border-slate-200/70 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                <h2 className="text-2xl font-semibold text-slate-950">Key Features</h2>
                <div className="mt-6 grid gap-3">
                  {solution.features.map((feature) => (
                    <div key={feature} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[1.4rem] border border-slate-200/70 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                <h2 className="text-2xl font-semibold text-slate-950">Benefits</h2>
                <ul className="mt-6 space-y-4">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-base leading-7 text-slate-600">
                      <FiCheckCircle className="mt-1 shrink-0 text-[var(--color-accent)]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-6 rounded-[1.4rem] border border-slate-200/70 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <h2 className="text-2xl font-semibold text-slate-950">Use Cases</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {solution.useCases.map((useCase, index) => (
                <div key={useCase} className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Scenario {index + 1}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{useCase}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.4rem] border border-slate-200/70 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <h2 className="text-2xl font-semibold text-slate-950">Frequently Asked Questions</h2>
            <div className="mt-6">
              <FAQAccordion items={solution.faqs} />
            </div>
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(135deg,#0f172a_0%,#13253a_55%,#17384d_100%)] p-8 text-white sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Request Demo</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Ready to explore the right software setup for this workflow?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">
              We do not expose public demo environments. Share your business details and Qode27 will schedule the right walkthrough based on your requirement.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={buildRequestDemoPath(solution.name)}>Request Demo</Button>
              <Button href="/contact" variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Motion.div>
  )
}
