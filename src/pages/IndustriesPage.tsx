import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Seo from '../components/ui/Seo'
import { solutions } from '../data/solutions'

export default function IndustriesPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Industries | Qode27"
        description="Qode27 builds business software for parking, inventory, logistics, ports, education, retail, healthcare, HRMS, and custom workflows."
        canonicalPath="/industries"
      />

      <section className="section-spacing pt-12">
        <Container>
          <SectionHeader
            eyebrow="Industries"
            title="A broader software company built for diverse operational environments."
            description="This page makes the multi-industry positioning explicit: Qode27 is not limited to one vertical, one product type, or one template workflow."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {solutions.map((solution) => (
              <Reveal key={solution.slug}>
                <article className="rounded-[1.45rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    {createElement(solution.icon)}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{solution.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{solution.introDescription}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaBanner
            eyebrow="Need A Different Domain?"
            title="Your industry does not need to look like everyone else's software."
            description="If your business workflow is unique, Qode27 can still design the right system around it."
          />
        </Container>
      </section>
    </Motion.div>
  )
}
