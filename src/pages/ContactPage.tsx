import { useSearchParams } from 'react-router-dom'
import { FiMail, FiMapPin, FiMessageCircle, FiPhone, FiPlay } from 'react-icons/fi'
import InquiryForm from '../components/contact/InquiryForm'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import Seo from '../components/ui/Seo'
import { Link } from 'react-router-dom'
import { company } from '../data/company'
import { matchInterest } from '../lib/interests'

const nextSteps = [
  { title: 'We read your requirements', text: 'Someone who understands software delivery reviews what you shared.' },
  { title: 'A focused conversation', text: 'We discuss your workflow, users, and priorities — and whether a product or custom build fits.' },
  { title: 'A clear recommendation', text: 'You receive a suggested path, scope, and next steps to consider.' },
]

export default function ContactPage({ mode = 'contact' }: { mode?: 'contact' | 'demo' }) {
  const [params] = useSearchParams()
  const rawInterest = params.get('interest') ?? params.get('industry')
  const matched = matchInterest(rawInterest)
  const isDemo = mode === 'demo'

  const channels = [
    { icon: FiMail, label: 'Email', value: company.email, href: company.emailHref },
    { icon: FiPhone, label: 'Phone', value: company.phoneDisplay, href: company.phoneHref },
    { icon: FiMessageCircle, label: 'WhatsApp', value: 'Message us on WhatsApp', href: company.whatsappHref },
    { icon: FiMapPin, label: 'Location', value: company.location, href: company.mapsHref },
  ]

  return (
    <>
      <Seo
        title={isDemo ? 'Request a Product Demo | Qode27' : 'Contact Qode27 | Discuss Your Software Project'}
        description={
          isDemo
            ? 'Request a tailored walkthrough of a Qode27 product — hospital management, HRMS, inventory, logistics, CRM, and more.'
            : 'Discuss your software project with Qode27. Share your requirements for custom software, SaaS development, web applications, or one of our business products.'
        }
        canonicalPath={isDemo ? '/request-demo' : '/contact'}
      />
      <PageHero
        eyebrow={isDemo ? 'Request a demo' : 'Contact'}
        title={isDemo ? 'See the product, configured around your workflow.' : 'Tell us what you are building — or what is slowing you down.'}
        text={
          isDemo
            ? 'Share a little about your team and process. We will arrange a walkthrough focused on the parts of the product that matter to you.'
            : 'Share your requirements and we will respond with a considered next step. No obligation, and no generic sales script.'
        }
        className="!pb-10"
      />

      <section className="pb-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal>
            <InquiryForm
              key={`${mode}-${matched}`}
              defaultInterest={matched}
              defaultRequirements={!matched && rawInterest ? `Interested in: ${rawInterest}\n\n` : ''}
              source={isDemo ? 'request-demo' : 'contact'}
              submitLabel={isDemo ? 'Request a Product Demo' : 'Send Inquiry'}
            />
          </Reveal>

          <aside className="space-y-10" aria-label="Other ways to reach us">
            <Reveal delay={0.06}>
              <h2 className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">Direct contact</h2>
              <ul className="mt-5 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="group flex items-center gap-4 py-4"
                    >
                      <channel.icon aria-hidden="true" className="shrink-0 text-[var(--color-accent)]" />
                      <span>
                        <span className="block text-xs text-[var(--color-subtle)]">{channel.label}</span>
                        <span className="block text-[0.95rem] text-white group-hover:underline group-hover:underline-offset-4">{channel.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[1.75rem_1fr] gap-3">
                    <span className="mono text-sm text-[var(--color-accent)]">0{index + 1}</span>
                    <div>
                      <p className="font-medium text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.14} className="surface-flat p-6">
              <p className="font-medium text-white">Prefer to explore first?</p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Every product has an interactive demo running in your browser with sample data.</p>
              <Link to="/demo" className="link-arrow mt-4 text-sm">
                <FiPlay aria-hidden="true" /> Browse demos
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
