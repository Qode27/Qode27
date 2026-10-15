import { motion as Motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import HeroVisual from '../three/HeroVisual'
import Button from '../ui/Button'
import { products } from '../../data/products'

const facts = [`${products.length} industry products`, 'Live interactive demos', 'Custom engineering']

export default function HomeHero() {
  const reduce = useReducedMotion()
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section className="noise relative isolate overflow-hidden">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="glow-accent pointer-events-none absolute right-[-15%] top-[-10%] -z-10 h-[50rem] w-[50rem]" />
      <div aria-hidden="true" className="glow-violet pointer-events-none absolute bottom-[-30%] left-[-20%] -z-10 h-[40rem] w-[40rem]" />

      <div className="shell-wide grid min-h-[100svh] items-center gap-6 pb-16 pt-28 lg:grid-cols-[1.02fr_1fr] lg:gap-4 lg:pb-20 lg:pt-24">
        <div className="relative z-10 max-w-[44rem]">
          <Motion.p className="eyebrow" {...enter(0.05)}>
            Business software · SaaS · Custom systems
          </Motion.p>
          <Motion.h1 className="display-xl mt-7" {...enter(0.12)}>
            Software engineered around how your business <span className="text-gradient">actually runs.</span>
          </Motion.h1>
          <Motion.p className="lede mt-7 max-w-[36rem]" {...enter(0.22)}>
            Qode27 designs and builds SaaS platforms, web applications, and custom operational systems for healthcare, logistics, distribution,
            education, retail, and professional services.
          </Motion.p>
          <Motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" {...enter(0.32)}>
            <Button href="/contact">
              Discuss Your Project <FiArrowRight aria-hidden="true" />
            </Button>
            <Button href="/services" variant="secondary">
              Explore Our Solutions
            </Button>
          </Motion.div>
          <Motion.ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--color-subtle)]" {...enter(0.42)}>
            {facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-gold)]" />
                {fact}
              </li>
            ))}
          </Motion.ul>
        </div>

        <Motion.div
          className="relative -mx-4 h-[22rem] sm:mx-0 sm:h-[30rem] lg:h-[min(46rem,82svh)]"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVisual nodeCount={products.length} />
        </Motion.div>
      </div>
    </section>
  )
}
