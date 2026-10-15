import type { ReactNode } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

type LegalDocumentProps = {
  title: string
  updatedNote: string
  children: ReactNode
}

export default function LegalDocument({ title, updatedNote, children }: LegalDocumentProps) {
  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="eyebrow">Legal</p>
        <h1 className="display-lg mt-6">{title}</h1>
        <p className="mt-4 text-sm text-[var(--color-subtle)]">{updatedNote}</p>
        <div role="note" className="mt-8 flex gap-3 rounded-xl border border-amber-300/30 bg-amber-300/[0.05] p-5 text-sm leading-6 text-amber-100/90">
          <FiAlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" />
          <p>
            This document is a general summary pending legal review. Items marked “to be confirmed” require Qode27’s registered company details or advice from a
            qualified legal professional before they should be relied upon.
          </p>
        </div>
        <div className="prose-doc mt-6">{children}</div>
      </div>
    </article>
  )
}
