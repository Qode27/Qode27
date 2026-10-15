import { useId, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

type Faq = { question: string; answer: string }

export default function FaqList({ items, tone = 'dark' }: { items: Faq[]; tone?: 'dark' | 'light' }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  const line = tone === 'dark' ? 'border-[var(--color-line)]' : 'border-black/10'

  return (
    <div className={`border-t ${line}`}>
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`
        return (
          <div key={item.question} className={`border-b ${line}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left text-lg font-medium tracking-[-0.015em]"
              >
                <span>{item.question}</span>
                <FiPlus aria-hidden="true" className={`mt-1 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`max-w-3xl pb-6 leading-7 ${tone === 'dark' ? 'text-[var(--color-muted)]' : 'text-[var(--color-ink-muted)]'}`}
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
