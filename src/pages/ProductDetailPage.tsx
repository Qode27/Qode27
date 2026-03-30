import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { Navigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { getProductBySlug } from '../data/site'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <section className="section-spacing pt-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-white/82 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent-strong)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-base">
                  {createElement(product.icon)}
                </span>
                {product.category}
              </div>
              <h1 className="mt-7 font-display text-5xl font-bold leading-[0.98] tracking-[-0.06em] text-black sm:text-6xl">
                {product.headline}
              </h1>
              <p className="mt-6 text-lg leading-8 text-neutral-600">{product.description}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href={product.primaryCta.href}>
                  {product.primaryCta.label}
                  <FiArrowRight />
                </Button>
                <Button href={product.secondaryCta.href} variant="secondary">
                  {product.secondaryCta.label}
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {product.metrics.map((metric) => (
                <div key={metric.label} className="rounded-[1.75rem] border border-black/6 bg-white p-6 shadow-[0_18px_36px_rgba(15,23,42,0.05)]">
                  <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">{metric.label}</p>
                  <p className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-black">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[2rem] border border-black/6 bg-white p-8 shadow-[0_20px_42px_rgba(15,23,42,0.05)]">
                <h2 className="text-2xl font-semibold text-black">Core features</h2>
                <ul className="mt-6 space-y-4">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-base leading-7 text-neutral-600">
                      <FiCheckCircle className="mt-1 shrink-0 text-[var(--color-accent-strong)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-[2rem] border border-black/6 bg-black p-8 text-white shadow-[0_28px_55px_rgba(15,23,42,0.22)]">
                <h2 className="text-2xl font-semibold">Why teams choose it</h2>
                <ul className="mt-6 space-y-4">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-base leading-7 text-white/82">
                      <FiCheckCircle className="mt-1 shrink-0 text-[var(--color-accent)]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </Motion.div>
  )
}
