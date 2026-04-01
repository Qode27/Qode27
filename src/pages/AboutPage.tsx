import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Seo from '../components/ui/Seo'
import { aboutValues, whyQode } from '../data/site'
import { solutions } from '../data/solutions'

export default function AboutPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="About Qode27 | Multi-Industry Business Software Company"
        description="Qode27 builds software that solves operational problems across industries with clarity, automation, and scalable business systems."
        canonicalPath="/about"
      />

      <section className="section-spacing pt-12">
        <Container>
          <SectionHeader
            eyebrow="About Qode27"
            title="A serious software company focused on operational clarity, automation, and scalable business systems."
            description="Qode27 builds software that solves operational problems across industries. We work with businesses that want clarity, automation, and scalable systems instead of scattered manual processes."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutValues.map((value) => (
              <Reveal key={value.title}>
                <article className="rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    {createElement(value.icon)}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <SectionHeader
            eyebrow="Industries"
            title="We design software across multiple business environments, not one narrow category."
            description="The Qode27 portfolio spans truck parking, inventory, shipping, ports, education, retail, healthcare, HRMS, and broader custom operations."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {solutions.map((solution) => (
              <Reveal key={solution.slug}>
                <article className="rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <h3 className="text-xl font-semibold text-slate-950">{solution.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{solution.introDescription}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <SectionHeader
            eyebrow="Our Approach"
            title="We combine product discipline with custom problem-solving."
            description="Businesses trust Qode27 because we focus on practical outcomes: cleaner execution, stronger reporting, faster adoption, and systems that grow with the operation."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyQode.map((item) => (
              <Reveal key={item.title}>
                <article className="rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaBanner
            eyebrow="Work With Qode27"
            title="Need a software partner that understands operations, not just features?"
            description="Bring us your workflow, your bottlenecks, and your growth plan. We will help you shape the right solution path."
          />
        </Container>
      </section>
    </Motion.div>
  )
}
