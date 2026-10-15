import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionIntroProps = {
  eyebrow: string
  title: ReactNode
  text?: ReactNode
  align?: 'left' | 'center'
  size?: 'lg' | 'md'
  className?: string
  actions?: ReactNode
}

export default function SectionIntro({ eyebrow, title, text, align = 'left', size = 'md', className = '', actions }: SectionIntroProps) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`.trim()}>
      <p className={`eyebrow ${centered ? 'eyebrow--plain' : ''}`}>{eyebrow}</p>
      <h2 className={`${size === 'lg' ? 'display-lg' : 'display-md'} mt-5`}>{title}</h2>
      {text ? <p className={`lede mt-5 ${centered ? 'mx-auto' : ''} max-w-2xl`}>{text}</p> : null}
      {actions ? <div className={`mt-8 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>{actions}</div> : null}
    </Reveal>
  )
}
