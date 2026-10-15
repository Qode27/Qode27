import type { ReactNode } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function Reveal({ children, className = '', delay = 0, y = 28 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Motion.div>
  )
}
