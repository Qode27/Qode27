import { useRef } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const statement =
  'Most businesses do not need more software. They need one system that fits the way they work — designed with care, engineered properly, and built to grow with them.'

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total
  const opacity = useTransform(progress, [start, start + 1 / total], [0.18, 1])
  return (
    <Motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </Motion.span>
  )
}

/** Editorial statement whose words light up as the reader scrolls through it. */
export default function PositioningStatement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = statement.split(' ')

  return (
    <section className="section rule-top">
      <div className="section-shell">
        <p className="eyebrow">Our position</p>
        <p ref={ref} className="display-md relative mt-8 max-w-5xl !font-medium !leading-[1.15]">
          {reduce
            ? statement
            : words.map((word, index) => <Word key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress} />)}
        </p>
      </div>
    </section>
  )
}
