import { motion as Motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import RequestDemoForm from '../components/ui/RequestDemoForm'
import Seo from '../components/ui/Seo'
import { requestDemoBenefits } from '../data/site'

export default function RequestDemoPage() {
  const [searchParams] = useSearchParams()
  const defaultIndustry = searchParams.get('industry') ?? ''

  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Request Demo | Qode27"
        description="Request a Qode27 demo for parking, inventory, logistics, healthcare, retail, HRMS, education, port operations, or custom software."
        canonicalPath="/request-demo"
      />

      <section className="section-spacing pt-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[1.6rem] border border-slate-200/80 bg-[linear-gradient(135deg,#0f172a_0%,#13253a_55%,#17384d_100%)] p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Request Demo</p>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                A lead capture flow built to qualify serious business conversations.
              </h1>
              <p className="mt-4 text-base leading-8 text-white/72">
                Qode27 does not expose public demo links. This page is designed to capture requirements, understand fit, and move the conversation toward the right walkthrough.
              </p>
              <div className="mt-8 space-y-4">
                {requestDemoBenefits.map((item) => (
                  <div key={item.title} className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/70">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <RequestDemoForm
              defaultIndustry={defaultIndustry}
              title="Request a tailored demo"
              subtitle="Tell us about your business, industry, and requirement. We will follow up shortly to understand your need and schedule the right demo."
            />
          </div>
        </Container>
      </section>
    </Motion.div>
  )
}
