import { motion as Motion, useReducedMotion } from 'framer-motion'
import { FiActivity, FiBox, FiCpu, FiHeart, FiLayers, FiTruck } from 'react-icons/fi'

type CoreMode = 'hero' | 'ecosystem' | 'cta'

const modules = [
  { label: 'HRMS', icon: FiLayers, x: '9%', y: '18%' },
  { label: 'HMS', icon: FiHeart, x: '72%', y: '8%' },
  { label: 'Inventory', icon: FiBox, x: '78%', y: '59%' },
  { label: 'Logistics', icon: FiTruck, x: '7%', y: '68%' },
  { label: 'Operations', icon: FiActivity, x: '43%', y: '82%' },
  { label: 'AI Automation', icon: FiCpu, x: '46%', y: '3%' },
]

export default function BusinessCore({ mode = 'hero' }: { mode?: CoreMode }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className={`business-core business-core--${mode}`} aria-hidden="true">
      <div className="business-core__grid" />
      <div className="business-core__glow business-core__glow--one" />
      <div className="business-core__glow business-core__glow--two" />
      <svg className="business-core__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {modules.map((module) => (
          <line key={module.label} x1="50" y1="50" x2={parseFloat(module.x)} y2={parseFloat(module.y)} />
        ))}
      </svg>
      <Motion.div
        className="business-core__orb"
        animate={reducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="business-core__orb-inner">Q</div>
      </Motion.div>
      {modules.map((module, index) => {
        const Icon = module.icon
        return (
          <Motion.div
            key={module.label}
            className="business-core__module"
            style={{ left: module.x, top: module.y }}
            animate={reducedMotion ? undefined : { y: [0, index % 2 ? 7 : -7, 0] }}
            transition={{ duration: 5 + index * 0.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }}
          >
            <Icon />
            <span>{module.label}</span>
          </Motion.div>
        )
      })}
    </div>
  )
}
