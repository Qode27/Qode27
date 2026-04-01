import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import PricingCard from '../components/ui/PricingCard'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Seo from '../components/ui/Seo'
import { pricingPlans } from '../data/site'

export default function PricingPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Pricing | Qode27"
        description="Explore flexible pricing for multi-industry software and custom business systems from Qode27."
        canonicalPath="/pricing"
      />

      <section className="section-spacing pt-12">
        <Container>
          <SectionHeader
            eyebrow="Pricing"
            title="Flexible pricing for businesses that need the right system, not a forced plan."
            description="Different operations need different levels of software depth. Qode27 pricing is designed to start the right conversation and move toward a tailored quote."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Reveal key={plan.name}>
                <PricingCard plan={plan} featured={index === 1} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaBanner
            eyebrow="Tailored Quote"
            title="Need pricing based on your exact workflow and scope?"
            description="The best pricing depends on the modules, operational complexity, and rollout model your business needs."
            secondaryLabel="Contact Sales"
          />
        </Container>
      </section>
    </Motion.div>
  )
}
