import type { ReactNode } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import Container from './Container'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  text?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  breadcrumbs?: Crumb[]
  className?: string
}

export default function PageHero({ eyebrow, title, text, actions, aside, breadcrumbs, className = '' }: PageHeroProps) {
  const reduce = useReducedMotion()
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section className={`relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40 ${className}`.trim()}>
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="glow-accent pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem]" />
      <Container className="relative">
        {breadcrumbs ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-subtle)]">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {index > 0 ? <FiChevronRight aria-hidden="true" className="h-3.5 w-3.5" /> : null}
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-[var(--color-muted)]">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className={aside ? 'grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16' : ''}>
          <div className="max-w-4xl">
            <Motion.p className="eyebrow" {...enter(0)}>
              {eyebrow}
            </Motion.p>
            <Motion.h1 className="display-lg mt-6" {...enter(0.06)}>
              {title}
            </Motion.h1>
            {text ? (
              <Motion.p className="lede mt-6 max-w-2xl" {...enter(0.14)}>
                {text}
              </Motion.p>
            ) : null}
            {actions ? (
              <Motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" {...enter(0.22)}>
                {actions}
              </Motion.div>
            ) : null}
          </div>
          {aside ? (
            <Motion.div className="min-w-0" {...enter(0.2)}>
              {aside}
            </Motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
