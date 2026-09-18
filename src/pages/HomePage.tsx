import { motion as Motion } from 'framer-motion'
import { FiActivity, FiArrowRight, FiBox, FiCheck, FiCpu, FiHeart, FiLayers, FiMapPin, FiMenu, FiSliders, FiTruck, FiZap } from 'react-icons/fi'
import BusinessCore from '../components/visual/BusinessCore'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import Seo from '../components/ui/Seo'

const products = [
  { name: 'HMS', icon: FiHeart, label: 'Patient flow, billing, and day-to-day clinical visibility.', slug: 'healthcare-management' },
  { name: 'HRMS', icon: FiLayers, label: 'People operations, approvals, attendance, and payroll.', slug: 'hrms' },
  { name: 'Inventory & Distribution', icon: FiBox, label: 'Stock movement and dispatch control across operations.', slug: 'inventory-management' },
  { name: 'Logistics', icon: FiTruck, label: 'Shipment, dispatch, delivery, and operational tracking.', slug: 'logistics-shipping' },
  { name: 'Business Operations', icon: FiSliders, label: 'The workflows, approvals, and reports unique to your business.', slug: 'parking-management' },
  { name: 'AI Automation', icon: FiCpu, label: 'Practical automation designed around the work your team repeats.', slug: 'crm-sales' },
]

const fragments = ['Spreadsheets', 'WhatsApp', 'Manual Reports', 'Disconnected Systems']
const businessNodes = ['Hospital', 'Distributor', 'Training Center', 'Restaurant', 'Logistics', 'Enterprise Operations']
const reasons = [
  { label: 'Built around real workflows', Icon: FiSliders },
  { label: 'Automation first', Icon: FiZap },
  { label: 'Cloud-ready architecture', Icon: FiLayers },
  { label: 'Scalable systems', Icon: FiActivity },
  { label: 'AI-assisted operations', Icon: FiCpu },
]

export default function HomePage() {
  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="qode-home overflow-hidden">
      <Seo title="Qode27 | Software Built Around Your Business" description="Qode27 turns real business workflows into intelligent software, automation, and systems built to run." />

      <section className="qode-hero relative isolate min-h-[min(880px,100svh)] overflow-hidden pt-20">
        <div className="qode-noise" />
        <div className="qode-hero__light qode-hero__light--one" />
        <div className="qode-hero__light qode-hero__light--two" />
        <Container className="relative z-10 grid gap-12 pb-16 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-24 lg:pt-24">
          <Reveal>
            <div className="max-w-xl">
              <p className="qode-eyebrow"><span /> Business systems, built to run</p>
              <h1 className="qode-display mt-7 text-5xl sm:text-6xl lg:text-7xl">Software Built Around <em>Your Business.</em></h1>
              <p className="qode-lede mt-7 max-w-lg">Qode27 turns real business workflows into intelligent software, automation and systems built to run.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/solutions" className="qode-button-primary">Explore Qode27 <FiArrowRight /></Button>
                <Button href="#products" variant="secondary" className="qode-button-secondary">See What We Build</Button>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
                {['Built around real workflows', 'Interactive product demos', 'Designed to scale with you'].map((item) => <span className="inline-flex items-center gap-2" key={item}><FiCheck className="text-cyan-300" />{item}</span>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="min-h-[420px] lg:min-h-[600px]"><BusinessCore /></Reveal>
        </Container>
      </section>

      <section className="qode-section qode-problem" id="how-it-works">
        <Container>
          <Reveal><div className="max-w-2xl"><p className="qode-eyebrow"><span /> The problem</p><h2 className="qode-heading mt-6">Most businesses don't need more software.</h2><p className="qode-lede mt-5">They need software that actually fits the way they work.</p></div></Reveal>
          <div className="qode-fragments mt-12">
            {fragments.map((item, index) => <Reveal key={item} delay={index * 0.06}><div className={`qode-fragment qode-fragment--${index}`}><FiMenu /><span>{item}</span><i /></div></Reveal>)}
            <div className="qode-fragments__line" />
            <div className="qode-fragments__core"><span>Q</span><small>ONE SYSTEM</small></div>
          </div>
        </Container>
      </section>

      <section className="qode-section" id="products">
        <Container>
          <Reveal><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div className="max-w-2xl"><p className="qode-eyebrow"><span /> What we build</p><h2 className="qode-heading mt-6">Systems that make operations feel simpler.</h2></div><Button href="/solutions" variant="ghost" className="qode-link">View all solutions <FiArrowRight /></Button></div></Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => { const Icon = product.icon; return <Reveal key={product.name} delay={index * 0.04}><a href={`/solutions/${product.slug}`} className="qode-product-card group"><div className="qode-product-card__visual"><Icon /><div className="qode-product-card__orb" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="p-6"><h3>{product.name}</h3><p>{product.label}</p><span className="qode-product-card__cta">Explore system <FiArrowRight /></span></div></a></Reveal> })}
          </div>
        </Container>
      </section>

      <section className="qode-section qode-ecosystem-section">
        <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><Reveal><div className="max-w-md"><p className="qode-eyebrow"><span /> One system. Many businesses.</p><h2 className="qode-heading mt-6">Built for the way work moves.</h2><p className="qode-lede mt-5">The same operating principles adapt to the different realities of your business.</p><div className="mt-8 grid gap-3">{businessNodes.map((node) => <div key={node} className="qode-node-label"><FiMapPin />{node}</div>)}</div></div></Reveal><Reveal delay={0.1} className="min-h-[400px]"><BusinessCore mode="ecosystem" /></Reveal></Container>
      </section>

      <section className="qode-section qode-process">
        <Container><Reveal><p className="qode-eyebrow"><span /> How it works</p><h2 className="qode-heading mt-6 max-w-2xl">From the workflow you have to the system you need.</h2></Reveal>
          <div className="qode-process-grid mt-12">{[['01', 'Understand', 'We learn how work moves, where teams lose time, and what needs clarity.'], ['02', 'Build', 'We shape the system around the workflows that have the most business impact.'], ['03', 'Operate', 'Your team gets a structured operating layer that can grow with the business.']].map(([number, title, text], index) => <Reveal key={number} delay={index * 0.08}><article><span>{number}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
        </Container>
      </section>

      <section className="qode-section qode-reasons">
        <Container><Reveal><div className="max-w-3xl"><p className="qode-eyebrow"><span /> Why Qode27</p><h2 className="qode-heading mt-6">Less friction. More operational clarity.</h2></div></Reveal><div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-5">{reasons.map(({ label, Icon }) => <div className="qode-reason" key={label}><Icon /><p>{label}</p></div>)}</div></Container>
      </section>

      <section className="qode-final-cta"><Container><Reveal><div className="qode-final-cta__inner"><BusinessCore mode="cta" /><div className="relative z-10 max-w-3xl"><p className="qode-eyebrow"><span /> Build with Qode27</p><h2 className="qode-display mt-6 text-4xl sm:text-5xl lg:text-6xl">Your Business Has a Workflow.<br /><em>We Build the System Around It.</em></h2><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button href="/contact" className="qode-button-primary">Build With Qode27 <FiArrowRight /></Button><Button href="/request-demo" variant="secondary" className="qode-button-secondary">Request a Demo</Button></div></div></div></Reveal></Container></section>
    </Motion.div>
  )
}
