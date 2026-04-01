import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Seo from '../components/ui/Seo'
import SolutionCard from '../components/ui/SolutionCard'
import { whyQode } from '../data/site'
import { solutions } from '../data/solutions'

export default function SolutionsPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Solutions | Qode27 Multi-Industry Software"
        description="Explore Qode27 solutions for logistics, inventory, parking, education, retail, healthcare, port operations, and HRMS."
        canonicalPath="/solutions"
      />

      <section className="section-spacing pt-12">
        <Container>
          <SectionHeader
            eyebrow="Solutions"
            title="Software solutions built around real business operations."
            description="We create systems for logistics, inventory, parking, education, retail, healthcare, and beyond. Every solution route is designed to move qualified interest into a conversation."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => (
              <Reveal key={solution.slug}>
                <SolutionCard solution={solution} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing bg-slate-50/70">
        <Container>
          <SectionHeader
            eyebrow="Why Custom Systems"
            title="Businesses choose tailored systems when generic software stops fitting the way work actually happens."
            description="Qode27 combines reusable product thinking with custom workflow design so every solution feels focused and scalable."
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
            eyebrow="Request Demo"
            title="Need help choosing the right solution for your business?"
            description="Tell us about your workflow and we will guide you to the right product or custom software path."
          />
        </Container>
      </section>
    </Motion.div>
  )
}
