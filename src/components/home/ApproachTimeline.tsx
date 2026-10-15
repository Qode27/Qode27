import { useRef } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { deliveryPhases, technologyStack } from '../../data/company'
import Reveal from '../ui/Reveal'

export default function ApproachTimeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="section section-raised rule-top">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">How we deliver</p>
            <h2 className="display-md mt-5">A disciplined path from workflow to working software.</h2>
            <p className="lede mt-5 max-w-md">The workflows that matter most reach users first. Then the system expands — deliberately, with your team involved at every step.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">Engineering stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {technologyStack.map((item) => (
                <li key={item.name} className="chip">
                  <span className="text-white">{item.name}</span>
                  <span className="text-[var(--color-subtle)]">· {item.layer}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ol ref={ref} className="relative pl-10 sm:pl-14">
          <span aria-hidden="true" className="absolute bottom-2 left-[0.6rem] top-2 w-px bg-[var(--color-line-strong)] sm:left-[1.1rem]" />
          {!reduce ? (
            <Motion.span
              aria-hidden="true"
              style={{ scaleY: progress }}
              className="absolute bottom-2 left-[0.6rem] top-2 w-px origin-top bg-[var(--color-accent)] sm:left-[1.1rem]"
            />
          ) : null}
          {deliveryPhases.map((phase, index) => (
            <li key={phase.id} className="relative pb-14 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-10 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-bg)] sm:-left-14 sm:ml-[0.5rem]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              <Reveal>
                <p className="mono text-xs text-[var(--color-subtle)]">Phase 0{index + 1}</p>
                <h3 className="display-sm mt-2">{phase.title}</h3>
                <p className="mt-3 max-w-xl leading-7 text-[var(--color-muted)]">{phase.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {phase.outputs.map((output) => (
                    <li key={output} className="chip">
                      {output}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
