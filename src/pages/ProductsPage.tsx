import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { FiArrowRight, FiArrowUpRight, FiPlay } from 'react-icons/fi'
import Button from '../components/ui/Button'
import CtaSection from '../components/ui/CtaSection'
import PageHero from '../components/ui/PageHero'
import Seo from '../components/ui/Seo'
import ProductInterface from '../components/visual/ProductInterface'
import { products, productHref } from '../data/products'

export default function ProductsPage() {
  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.category)))], [])
  const [category, setCategory] = useState('All')
  const visible = category === 'All' ? products : products.filter((product) => product.category === category)
  const flagship = products[0]

  return (
    <>
      <Seo
        title="Products | Hospital Management, HRMS, Inventory & Business Software | Qode27"
        description="Qode27 business software products: hospital management, HRMS, inventory, logistics, CRM, CA practice, coaching, restaurant, truck parking, and port operations — each with an interactive demo."
        canonicalPath="/products"
      />
      <PageHero
        eyebrow="Products"
        title="Industry platforms you can try before you talk to us."
        text="Each Qode27 product is a configurable foundation for a specific operation. Explore the modules, open the interactive demo, then request a walkthrough tailored to your team."
        actions={
          <>
            <Button href="/request-demo">
              Request a Product Demo <FiArrowRight aria-hidden="true" />
            </Button>
            <Button href="/demo" variant="secondary">
              <FiPlay aria-hidden="true" /> Browse interactive demos
            </Button>
          </>
        }
        aside={<ProductInterface name={flagship.label} accent={flagship.accent} modules={flagship.modules} />}
      />

      <section className="section-tight rule-top" aria-labelledby="product-list-heading">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="product-list-heading" className="display-sm">
              {visible.length} {visible.length === 1 ? 'product' : 'products'}
              {category !== 'All' ? <span className="text-[var(--color-muted)]"> in {category}</span> : null}
            </h2>
            <div role="group" aria-label="Filter products by category" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                    category === item ? 'border-transparent bg-white text-black' : 'border-[var(--color-line-strong)] text-[var(--color-muted)] hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Motion.ul layout className="mt-10 grid gap-4 md:grid-cols-2">
            <AnimatePresence initial={false}>
              {visible.map((product) => (
                <Motion.li
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="surface relative flex flex-col overflow-hidden p-7 sm:p-8"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }} />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)]" style={{ color: product.accent }}>
                        <product.icon aria-hidden="true" />
                      </span>
                      <p className="mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">{product.category}</p>
                    </div>
                    {product.demoHref ? <span className="chip !text-[0.7rem]">Live demo</span> : null}
                  </div>
                  <h3 className="display-sm mt-6">{product.name}</h3>
                  <p className="mt-3 leading-7 text-[var(--color-muted)]">{product.cardDescription}</p>
                  <p className="mt-6 text-sm text-[var(--color-subtle)]">
                    <span className="text-[var(--color-muted)]">For:</span> {product.roles.join(', ')}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {product.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="chip">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--color-line)] pt-6">
                    <Link to={productHref(product.slug)} className="link-arrow">
                      Product details <FiArrowUpRight aria-hidden="true" />
                    </Link>
                    {product.demoHref ? (
                      <Link to={product.demoHref} className="link-arrow text-[var(--color-muted)]">
                        <FiPlay aria-hidden="true" /> Open demo
                      </Link>
                    ) : null}
                  </div>
                </Motion.li>
              ))}
            </AnimatePresence>
          </Motion.ul>
        </div>
      </section>

      <CtaSection
        eyebrow="Beyond the catalogue"
        title="Need something none of these covers? We build that too."
        primary={{ label: 'Discuss Your Project', href: '/contact' }}
        secondary={{ label: 'Custom software', href: '/services/custom-software' }}
      />
    </>
  )
}
