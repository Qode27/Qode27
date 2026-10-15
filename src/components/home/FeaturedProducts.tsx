import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiPlay } from 'react-icons/fi'
import { getProductBySlug, products, productHref } from '../../data/products'
import ProductInterface from '../visual/ProductInterface'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionIntro from '../ui/SectionIntro'

export default function FeaturedProducts() {
  const hms = getProductBySlug('healthcare-management')!
  const [activeGroup, setActiveGroup] = useState(0)
  const others = products.filter((product) => product.slug !== hms.slug)

  return (
    <section className="section">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Products"
          title="Industry platforms, ready to deploy and extend."
          text="Each product is a working foundation for a specific operation — configured for your team and extended where your process demands it."
        />

        {/* Flagship spotlight */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[radial-gradient(70%_90%_at_100%_0%,rgba(45,212,191,0.12),transparent_60%),var(--color-surface)] p-6 sm:p-10 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="mono text-xs uppercase tracking-[0.16em] text-[#2dd4bf]">Flagship · Healthcare</p>
                <h3 className="display-md mt-4">{hms.name}</h3>
                <p className="mt-4 max-w-lg leading-7 text-[var(--color-muted)]">{hms.heroDescription}</p>
                <div role="group" aria-label="Hospital management module groups" className="mt-8 grid gap-2">
                  {hms.modules.map((group, index) => (
                    <button
                      key={group.name}
                      type="button"
                      aria-pressed={activeGroup === index}
                      onClick={() => setActiveGroup(index)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                        activeGroup === index ? 'border-[#2dd4bf]/50 bg-white/[0.04] text-white' : 'border-[var(--color-line)] text-[var(--color-muted)] hover:text-white'
                      }`}
                    >
                      <span className="font-medium">{group.name}</span>
                      <span className="text-xs text-[var(--color-subtle)]">{group.items.length} modules</span>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={productHref(hms.slug)}>
                    Explore the product <FiArrowRight aria-hidden="true" />
                  </Button>
                  {hms.demoHref ? (
                    <Button href={hms.demoHref} variant="secondary">
                      <FiPlay aria-hidden="true" /> Open live demo
                    </Button>
                  ) : null}
                </div>
              </div>
              <ProductInterface name="Hospital Management" accent={hms.accent} modules={hms.modules} activeGroup={activeGroup} />
            </div>
          </div>
        </Reveal>

        {/* Product index */}
        <ul className="mt-6 grid border-t border-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {others.map((product) => (
            <li key={product.slug} className="border-b border-[var(--color-line)] sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r">
              <Link to={productHref(product.slug)} className="group flex h-full items-start justify-between gap-4 p-6 transition-colors hover:bg-white/[0.02]">
                <div>
                  <p className="mono text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: product.accent }}>
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.015em]">{product.label}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-muted)]">{product.introDescription}</p>
                </div>
                <FiArrowUpRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[var(--color-subtle)] transition group-hover:text-white" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
