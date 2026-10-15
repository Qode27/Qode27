import { motion as Motion, useReducedMotion } from 'framer-motion'

type WorkflowTrackProps = {
  steps: string[]
  accent?: string
  tone?: 'dark' | 'light'
  label?: string
}

/** A connected sequence of workflow stages. Horizontal on wide screens, vertical on mobile. */
export default function WorkflowTrack({ steps, accent = 'var(--color-accent)', tone = 'dark', label = 'Workflow' }: WorkflowTrackProps) {
  const reduce = useReducedMotion()
  const lineColor = tone === 'dark' ? 'bg-[var(--color-line-strong)]' : 'bg-black/15'
  const cardClass = tone === 'dark' ? 'border-[var(--color-line)] bg-[var(--color-surface)]' : 'border-black/10 bg-white'
  return (
    <ol aria-label={label} className="relative grid gap-4 md:auto-cols-fr md:grid-flow-col md:gap-3">
        {steps.map((step, index) => (
          <li key={step} className="relative flex items-start gap-4 md:block">
            <div className="relative flex shrink-0 items-center md:mb-4">
              <Motion.span
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-[0.72rem] font-semibold mono"
                style={{ borderColor: accent, color: tone === 'dark' ? '#fff' : 'var(--color-ink)', background: tone === 'dark' ? '#0a0e18' : '#fff' }}
              >
                {String(index + 1).padStart(2, '0')}
              </Motion.span>
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className={`absolute left-9 right-[-0.75rem] top-1/2 hidden h-px md:block ${lineColor}`}>
                  <Motion.span
                    className="block h-full origin-left"
                    style={{ background: accent }}
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.08, duration: 0.6 }}
                  />
                </span>
              ) : null}
            </div>
            <div className={`flex-1 rounded-xl border px-4 py-3 text-[0.92rem] font-medium ${cardClass}`}>{step}</div>
          </li>
        ))}
    </ol>
  )
}
