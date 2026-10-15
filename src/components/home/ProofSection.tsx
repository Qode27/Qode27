import { clients, testimonials } from '../../data/proof'
import Reveal from '../ui/Reveal'

/** Client names and testimonials. Renders nothing until verified entries exist in src/data/proof.ts. */
export default function ProofSection() {
  if (clients.length === 0 && testimonials.length === 0) return null

  return (
    <section className="section-tight rule-top" aria-label="Clients and testimonials">
      <div className="section-shell">
        {clients.length ? (
          <div>
            <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">Trusted by</p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
              {clients.map((client) => (
                <li key={client.name} className="text-[var(--color-muted)]">
                  {client.logo ? <img src={client.logo} alt={client.name} className="h-8 w-auto opacity-80" loading="lazy" /> : <span className="font-display text-lg font-semibold">{client.name}</span>}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {testimonials.length ? (
          <ul className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${clients.length ? 'mt-14' : ''}`}>
            {testimonials.map((item, index) => (
              <li key={item.name}>
                <Reveal delay={index * 0.05} className="surface h-full p-7">
                  <blockquote className="text-lg leading-8 text-white">“{item.quote}”</blockquote>
                  <p className="mt-6 text-sm text-[var(--color-muted)]">
                    <span className="font-medium text-white">{item.name}</span> · {item.role}, {item.company}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
