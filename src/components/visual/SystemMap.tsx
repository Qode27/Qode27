import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import { products, productHref } from '../../data/products'

const foundation = ['Roles & access', 'Workflow engine', 'Records', 'Reporting']
const CX = 300
const CY = 300

/**
 * Interactive map of the Qode27 product ecosystem: every product sits on a shared,
 * modular foundation. Selecting a product traces its connection and reveals its modules.
 */
export default function SystemMap() {
  const [selected, setSelected] = useState(0)
  const product = products[selected]
  const positions = products.map((_, index) => {
    const angle = (index / products.length) * Math.PI * 2 - Math.PI / 2
    return { x: CX + Math.cos(angle) * 235, y: CY + Math.sin(angle) * 235 }
  })

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
      <div>
        <div role="group" aria-label="Select a product" className="flex flex-wrap gap-2">
          {products.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
                selected === index ? 'border-transparent bg-white text-black' : 'border-[var(--color-line-strong)] text-[var(--color-muted)] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[19rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <Motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mono text-xs uppercase tracking-[0.16em]" style={{ color: product.accent }}>
                {product.category}
              </p>
              <h3 className="display-sm mt-3">{product.name}</h3>
              <p className="mt-3 max-w-lg leading-7 text-[var(--color-muted)]">{product.cardDescription}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {product.modules.map((group) => (
                  <div key={group.name}>
                    <p className="text-sm font-semibold text-white">{group.name}</p>
                    <ul className="mt-2 space-y-1.5 text-[0.85rem] text-[var(--color-subtle)]">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-5">
                <Link to={productHref(product.slug)} className="link-arrow">
                  View {product.label} <FiArrowRight aria-hidden="true" />
                </Link>
                {product.demoHref ? (
                  <Link to={product.demoHref} className="link-arrow text-[var(--color-muted)]">
                    <FiPlay aria-hidden="true" /> Open interactive demo
                  </Link>
                ) : null}
              </div>
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[36rem]" aria-hidden="true">
        <svg viewBox="0 0 600 600" className="h-auto w-full">
          <defs>
            <radialGradient id="sm-core" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#1f2a4a" />
              <stop offset="1" stopColor="#0a0e18" />
            </radialGradient>
          </defs>
          <circle cx={CX} cy={CY} r="235" fill="none" stroke="rgba(148,163,196,0.14)" strokeDasharray="2 6" />
          <circle cx={CX} cy={CY} r="150" fill="none" stroke="rgba(148,163,196,0.10)" />
          {positions.map((pos, index) => (
            <line
              key={`l-${index}`}
              x1={CX}
              y1={CY}
              x2={pos.x}
              y2={pos.y}
              stroke={index === selected ? product.accent : 'rgba(148,163,196,0.14)'}
              strokeWidth={index === selected ? 1.6 : 1}
              strokeDasharray={index === selected ? '5 10' : undefined}
              className={index === selected ? 'animate-dash' : undefined}
            />
          ))}
          <circle cx={CX} cy={CY} r="96" fill="url(#sm-core)" stroke="rgba(76,141,255,0.45)" />
          {foundation.map((layer, index) => (
            <text
              key={layer}
              x={CX}
              y={CY - 30 + index * 21}
              textAnchor="middle"
              fill={index === 1 ? '#ffffff' : '#a1aabb'}
              fontSize="13"
              fontFamily="Inter, sans-serif"
              fontWeight={index === 1 ? 600 : 400}
            >
              {layer}
            </text>
          ))}
          <text x={CX} y={CY + 64} textAnchor="middle" fill="#d6a648" fontSize="9.5" letterSpacing="2" fontFamily="JetBrains Mono, monospace">
            SHARED FOUNDATION
          </text>
          {positions.map((pos, index) => {
            const active = index === selected
            return (
              <g key={`n-${products[index].slug}`} style={{ cursor: 'pointer' }} onClick={() => setSelected(index)}>
                <circle cx={pos.x} cy={pos.y} r={active ? 30 : 22} fill={active ? `${products[index].accent}22` : 'rgba(12,17,28,0.95)'} stroke={active ? products[index].accent : 'rgba(148,163,196,0.3)'} />
                <circle cx={pos.x} cy={pos.y} r="5" fill={active ? products[index].accent : '#a1aabb'} />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
