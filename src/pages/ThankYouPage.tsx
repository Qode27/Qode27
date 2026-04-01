import { motion as Motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Seo from '../components/ui/Seo'

export default function ThankYouPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Thank You | Qode27"
        description="Thank you for contacting Qode27. Our team will reach out shortly to discuss your business requirement."
        canonicalPath="/thank-you"
      />
      <section className="section-spacing pt-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-slate-200/80 bg-white p-10 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">Thank You</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
              Your request has been received.
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Thank you. Our team will contact you shortly to understand your requirement and schedule a demo.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/solutions">Explore Solutions</Button>
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
