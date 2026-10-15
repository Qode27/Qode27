import { useRef } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BrandGlyph } from '../ui/BrandMark'
import Reveal from '../ui/Reveal'

const fragments = [
  { label: 'Spreadsheets', x: -230, y: -120 },
  { label: 'Messaging threads', x: 210, y: -150 },
  { label: 'Paper registers', x: -250, y: 60 },
  { label: 'Separate billing', x: 230, y: 90 },
  { label: 'Disconnected tools', x: -40, y: 170 },
]

const challenges = [
  {
    title: 'Work stalls between people',
    text: 'Approvals and handoffs depend on someone remembering to follow up. Status lives in conversations, not in a system.',
  },
  {
    title: 'Numbers nobody fully trusts',
    text: 'The same data is re-entered across sheets and tools. Stock, billing, and activity figures drift apart.',
  },
  {
    title: 'Leadership sees too late',
    text: 'Without a single operational view, problems surface after they have already cost time and revenue.',
  },
]

function Fragment({ label, x, y, progress }: { label: string; x: number; y: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const tx = useTransform(progress, [0, 0.75], [x, x * 0.05])
  const ty = useTransform(progress, [0, 0.75], [y, y * 0.05])
  const opacity = useTransform(progress, [0.45, 0.8], [1, 0])
  return (
    <Motion.div
      style={{ x: tx, y: ty, opacity }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-muted)]"
    >
      {label}
    </Motion.div>
  )
}

export default function ChallengesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const coreScale = useTransform(scrollYProgress, [0.4, 0.9], [0.7, 1])
  const coreOpacity = useTransform(scrollYProgress, [0.4, 0.85], [0.2, 1])

  return (
    <section className="section">
      <div className="section-shell grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow">The challenge</p>
            <h2 className="display-md mt-5">Operations rarely break in one place. They fray at every handoff.</h2>
          </Reveal>
          <ol className="mt-12 space-y-8">
            {challenges.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[var(--color-line)] pt-6">
                  <span className="mono text-sm text-[var(--color-subtle)]">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.015em]">{item.title}</h3>
                    <p className="mt-2 leading-7 text-[var(--color-muted)]">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div ref={ref} className="relative h-[24rem] overflow-hidden sm:h-[30rem]" role="img" aria-label="Scattered tools — spreadsheets, messaging, paper registers, separate billing — converging into one Qode27 system">
          <div aria-hidden="true" className="absolute inset-0 rounded-[2rem] border border-[var(--color-line)] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(76,141,255,0.12),transparent)]" />
          <div aria-hidden="true" className="absolute inset-0 scale-[0.6] sm:scale-100">
            {reduce
              ? null
              : fragments.map((fragment) => <Fragment key={fragment.label} {...fragment} progress={scrollYProgress} />)}
            <Motion.div
              style={reduce ? undefined : { scale: coreScale, opacity: coreOpacity }}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-[1.5rem] border border-[var(--color-accent)]/40 bg-[var(--color-surface-2)] px-8 py-6 shadow-[0_0_80px_-10px_rgba(76,141,255,0.5)]"
            >
              <BrandGlyph className="h-10 w-10" />
              <span className="mono text-[0.7rem] uppercase tracking-[0.18em] text-white">One operating system</span>
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
