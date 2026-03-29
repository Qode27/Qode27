import { motion as Motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'

export default function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <Motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      transition={{ delay }}
    >
      {children}
    </Motion.div>
  )
}
