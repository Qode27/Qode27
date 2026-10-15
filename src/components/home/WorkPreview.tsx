import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiPlay } from 'react-icons/fi'
import { getProductBySlug } from '../../data/products'
import Reveal from '../ui/Reveal'
import SectionIntro from '../ui/SectionIntro'

const showcase = ['inventory-management', 'logistics-shipping', 'crm-sales'] as const

export default function WorkPreview() {
  const items = showcase.map((slug) => getProductBySlug(slug)!).filter((item) => item.demoHref)
  return (
    <section className="section rule-top">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            eyebrow="Selected work"
            title="Work you can open, not just read about."
            text="Our products run as interactive demonstrations inside this website. Every demo uses sample data and never touches live systems."
          />
          <Link to="/work" className="link-arrow shrink-0">
            View all work <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {items.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.06}>
              <Link to={product.demoHref!} className="surface surface-interactive group flex h-full flex-col overflow-hidden">
                <div className="relative h-44 overflow-hidden border-b border-[var(--color-line)]" aria-hidden="true">
                  <div className="absolute inset-0" style={{ background: `radial-gradient(80% 100% at 30% 0%, ${product.accent}33, transparent 70%)` }} />
                  <div className="absolute inset-x-6 bottom-0 top-8 rounded-t-xl border border-b-0 border-[var(--color-line-strong)] bg-[#0a0e18] p-4 transition-transform duration-700 group-hover:-translate-y-2">
                    <div className="flex gap-3">
                      <span className="h-16 w-14 rounded-md bg-white/[0.04]" />
                      <div className="flex-1 space-y-2">
                        <span className="block h-2 w-1/2 rounded-full" style={{ background: product.accent }} />
                        <span className="block h-2 w-5/6 rounded-full bg-white/[0.07]" />
                        <span className="block h-2 w-2/3 rounded-full bg-white/[0.07]" />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {product.modules.map((group) => (
                        <span key={group.name} className="truncate rounded border border-[var(--color-line)] px-2 py-1.5 text-[0.62rem] text-[var(--color-subtle)]">
                          {group.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">Interactive demo · sample data</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em]">{product.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[var(--color-muted)]">{product.cardDescription}</p>
                  <span className="link-arrow mt-6">
                    <FiPlay aria-hidden="true" /> Open demo
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
