import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Seo from '../components/ui/Seo'
import { buildProcess, customSoftwareReasons } from '../data/site'

export default function CustomSoftwarePage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Custom Software | Qode27"
        description="Qode27 builds custom software around the way your business works across logistics, operations, retail, healthcare, education, and more."
        canonicalPath="/custom-software"
      />

      <section className="section-spacing pt-12">
        <Container>
          <SectionHeader
            eyebrow="Custom Software"
            title="Custom software built around the way your business works."
            description="We do not force your operations into rigid templates. Qode27 builds systems that match your workflow, team structure, and growth goals."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {customSoftwareReasons.map((reason) => (
              <Reveal key={reason}>
                <article className="rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <p className="text-base leading-8 text-slate-600">{reason}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <SectionHeader
            eyebrow="Build Process"
            title="A clean delivery flow that keeps the software aligned with real operations."
            description="The process is designed to reduce ambiguity and give businesses more clarity from discovery to deployment."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {buildProcess.map((step, index) => (
              <Reveal key={step.title}>
                <article className="rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Step {index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaBanner
            eyebrow="Talk To Qode27"
            title="Need software for a business workflow that is not listed on the site?"
            description="That is exactly where custom software makes sense. Tell us how your operations work and we will help shape the right system."
          />
        </Container>
      </section>
    </Motion.div>
  )
}
