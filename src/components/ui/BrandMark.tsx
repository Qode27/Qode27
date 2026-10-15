type BrandMarkProps = {
  className?: string
  showWordmark?: boolean
  tone?: 'dark' | 'light'
}

/** Lightweight vector Qode27 mark: an open ring with circuit traces, echoing the brand icon. */
export function BrandGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="q27-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fb0ff" />
          <stop offset="1" stopColor="#2f6fe8" />
        </linearGradient>
      </defs>
      <path d="M27.5 9.2A13 13 0 1 0 27.5 30.8" fill="none" stroke="url(#q27-ring)" strokeWidth="5" strokeLinecap="round" />
      <path d="M24 15h6.5l3-3M24 20h9M24 25h6.5l3 3" fill="none" stroke="#7fb0ff" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="34.6" cy="11" r="1.6" fill="#d6a648" />
      <circle cx="34.6" cy="20" r="1.6" fill="#7fb0ff" />
      <circle cx="34.6" cy="29" r="1.6" fill="#d6a648" />
    </svg>
  )
}

export default function BrandMark({ className = '', showWordmark = true, tone = 'dark' }: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <BrandGlyph className="h-8 w-8 shrink-0" />
      {showWordmark ? (
        <span
          className={`font-display text-[1.32rem] font-semibold leading-none tracking-[-0.04em] ${tone === 'dark' ? 'text-white' : 'text-[var(--color-ink)]'}`}
        >
          Qode<span className="text-[var(--color-gold)]">27</span>
        </span>
      ) : null}
    </span>
  )
}
