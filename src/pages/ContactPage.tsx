import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import RequestDemoForm from '../components/ui/RequestDemoForm'
import Reveal from '../components/ui/Reveal'
import Seo from '../components/ui/Seo'
import { contactMethods } from '../data/site'

export default function ContactPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Contact | Qode27"
        description="Contact Qode27 in Hyderabad to discuss software consultation, custom systems, or multi-industry business software requirements."
        canonicalPath="/contact"
      />

      <section className="section-spacing pt-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/15 bg-[var(--color-accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">
              Contact Qode27
            </p>
            <h1 className="mt-7 font-display text-5xl font-bold leading-[0.97] tracking-[-0.06em] text-slate-950 sm:text-6xl">
              Let&apos;s talk about your business workflow.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Reach out for a general inquiry, a software consultation, or a deeper discussion about the operational system your business needs next.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {contactMethods.map((method) => (
              <Reveal key={method.title} className="h-full">
                <a
                  href={method.href}
                  target={method.href.startsWith('https://') ? '_blank' : undefined}
                  rel={method.href.startsWith('https://') ? 'noreferrer' : undefined}
                  className="flex h-full flex-col rounded-[1.4rem] border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.09)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    {createElement(method.icon)}
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-slate-950">{method.title}</h2>
                  <p className="mt-2 text-base font-medium text-slate-950">{method.value}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{method.description}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-[1.6rem] border border-slate-200/80 bg-[linear-gradient(135deg,#0f172a_0%,#13253a_55%,#17384d_100%)] p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Consultation</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">General inquiry, software consultation, or business workflow discussion.</h2>
                <p className="mt-4 text-base leading-8 text-white/72">
                  Qode27 works with businesses across truck parking, distribution, shipping, ports, retail, coaching, healthcare, HR, and custom internal systems.
                </p>
                <div className="mt-8 grid gap-4">
                  {['General inquiry', 'Request software consultation', 'Talk about your business workflow'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/78">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <RequestDemoForm
              title="Send us your business requirement"
              subtitle="Use this form to start the conversation. We will route your inquiry to the right solution or custom software path."
              storageKey="qode27-contact-submissions"
              successMessage="Thank you. Our team will contact you shortly to discuss your business requirement."
            />
          </div>
        </Container>
      </section>
    </Motion.div>
  )
}
