import type { ReactNode } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Button from './Button'
import Reveal from './Reveal'

type CtaLink = { label: string; href: string }

type CtaSectionProps = {
  eyebrow?: string
  title: ReactNode
  text?: string
  primary?: CtaLink
  secondary?: CtaLink | null
}

export default function CtaSection({
  eyebrow = 'Start a conversation',
  title,
  text = 'Tell us how your operation works today and where it slows down. We will recommend the right path — an existing product, a tailored system, or a combination.',
  primary = { label: 'Discuss Your Project', href: '/contact' },
  secondary = { label: 'Explore Our Products', href: '/products' },
}: CtaSectionProps) {
  return (
    <section className="section relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <div className="noise relative isolate overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[radial-gradient(120%_120%_at_100%_0%,rgba(76,141,255,0.22),transparent_50%),radial-gradient(90%_90%_at_0%_100%,rgba(139,126,255,0.16),transparent_55%),var(--color-surface)] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10 opacity-60" />
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-lg mt-6 max-w-4xl">{title}</h2>
            {text ? <p className="lede mt-6 max-w-2xl">{text}</p> : null}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={primary.href}>
                {primary.label} <FiArrowRight aria-hidden="true" />
              </Button>
              {secondary ? (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

