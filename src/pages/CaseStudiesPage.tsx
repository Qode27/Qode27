import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Seo from '../components/ui/Seo'
import { caseStudyPreviews } from '../data/site'

export default function CaseStudiesPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Case Studies | Qode27"
        description="Explore Qode27 case study structures for operations, distribution, education, retail, and broader business software outcomes."
        canonicalPath="/case-studies"
      />

      <section className="section-spacing pt-12">
        <Container>
          <SectionHeader
            eyebrow="Case Studies"
            title="A proof library designed for future expansion."
            description="The structure is ready for real numbers, screenshots, and client names later. For now it communicates capability, outcome thinking, and cross-industry credibility."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {caseStudyPreviews.map((item) => (
              <Reveal key={item.title}>
                <article className="rounded-[1.45rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <p className="mt-5 text-sm font-medium text-[var(--color-accent)]">{item.outcome}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaBanner
            eyebrow="Request Demo"
            title="Want to explore how Qode27 could support your business workflow?"
            description="Tell us about your operation and we will connect the right solution approach to your team."
          />
        </Container>
      </section>
    </Motion.div>
  )
}
