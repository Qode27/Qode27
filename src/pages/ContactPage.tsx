import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import { contactMethods } from '../data/site'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'

export default function ContactPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <section className="section-spacing pt-12">
        <Container>
          <SectionHeader
            eyebrow="Contact"
            title="Talk to Qode27 about demos, pricing, or rollout strategy."
            description="The fastest path is usually a short product discovery conversation. We can recommend the right product fit, rollout shape, and pricing path from there."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-4">
              {contactMethods.map((method) => {
                const CardIcon = method.icon

                return (
                  <Reveal key={method.title}>
                    <a
                      href={method.href}
                      className="group rounded-[1.75rem] border border-black/6 bg-white p-6 shadow-[0_18px_36px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-[var(--color-accent)]/30 hover:shadow-[0_22px_44px_rgba(19,178,191,0.12)]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]">
                        {createElement(CardIcon)}
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-black">{method.title}</h3>
                      <p className="mt-2 text-base font-medium text-neutral-800">{method.value}</p>
                      <p className="mt-3 text-sm leading-7 text-neutral-600">{method.description}</p>
                    </a>
                  </Reveal>
                )
              })}
            </div>

            <Reveal>
              <div className="rounded-[2rem] border border-black/6 bg-black p-7 text-white shadow-[0_30px_60px_rgba(15,23,42,0.2)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">Request a walkthrough</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">See how Qode27 can package your workflow into a premium product experience.</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white/80">Name</span>
                    <input className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none placeholder:text-white/34 focus:border-[var(--color-accent)]" placeholder="Your name" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white/80">Company</span>
                    <input className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none placeholder:text-white/34 focus:border-[var(--color-accent)]" placeholder="Company name" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white/80">Email</span>
                    <input className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none placeholder:text-white/34 focus:border-[var(--color-accent)]" placeholder="name@company.com" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white/80">Product interest</span>
                    <select className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none focus:border-[var(--color-accent)]">
                      <option className="text-black">Qode27 HMS</option>
                      <option className="text-black">Qode27 HRMS</option>
                      <option className="text-black">Automation Suite</option>
                    </select>
                  </label>
                </div>
                <label className="mt-4 block space-y-2">
                  <span className="text-sm font-medium text-white/80">What do you want to improve?</span>
                  <textarea className="min-h-36 w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none placeholder:text-white/34 focus:border-[var(--color-accent)]" placeholder="Tell us about your current workflow, tooling issues, or rollout goals." />
                </label>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button href="mailto:qode27business@gmail.com">Email Qode27</Button>
                  <Button href="/demo/hms" variant="secondary">
                    View HMS Demo
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </Motion.div>
  )
}
