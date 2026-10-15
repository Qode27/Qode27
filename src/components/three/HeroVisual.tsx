import { Component, Suspense, lazy, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

const HeroScene = lazy(() => import('./HeroScene'))

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function supportsWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

/** Static vector composition of the same core-and-orbits idea. Used while loading and when WebGL is unavailable. */
export function HeroFallback({ className = '' }: { className?: string }) {
  const nodes = [
    [300, 92],
    [452, 190],
    [470, 360],
    [338, 492],
    [160, 460],
    [96, 290],
    [176, 128],
    [400, 120],
    [500, 270],
    [230, 520],
  ]
  return (
    <svg viewBox="0 0 600 600" className={className} role="img" aria-label="Abstract illustration of connected software products orbiting a central platform">
      <defs>
        <radialGradient id="hf-core" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#3a4c7c" />
          <stop offset="0.6" stopColor="#141b30" />
          <stop offset="1" stopColor="#070a12" />
        </radialGradient>
        <radialGradient id="hf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#4c8dff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#4c8dff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="260" fill="url(#hf-glow)" />
      <g fill="none" stroke="#9fb4e6" strokeOpacity="0.18">
        <ellipse cx="300" cy="300" rx="215" ry="120" transform="rotate(-24 300 300)" />
        <ellipse cx="300" cy="300" rx="240" ry="150" transform="rotate(38 300 300)" />
        <ellipse cx="300" cy="300" rx="200" ry="200" />
      </g>
      <g stroke="#4c8dff" strokeOpacity="0.28">
        {nodes.map(([x, y]) => (
          <line key={`${x}-${y}`} x1="300" y1="300" x2={x} y2={y} />
        ))}
      </g>
      <polygon points="300,212 376,256 376,344 300,388 224,344 224,256" fill="url(#hf-core)" stroke="#4c8dff" strokeOpacity="0.5" />
      <polygon points="300,212 376,256 300,300 224,256" fill="#ffffff" fillOpacity="0.06" />
      <ellipse cx="300" cy="300" rx="112" ry="26" fill="none" stroke="#d6a648" strokeOpacity="0.8" />
      {nodes.map(([x, y], index) => (
        <g key={`n-${x}-${y}`}>
          <circle cx={x} cy={y} r="12" fill="#4c8dff" fillOpacity="0.15" />
          <circle cx={x} cy={y} r="4.5" fill={index % 4 === 0 ? '#d6a648' : '#dce6ff'} />
        </g>
      ))}
    </svg>
  )
}

export default function HeroVisual({ nodeCount = 10 }: { nodeCount?: number }) {
  const reducedMotion = useReducedMotion() ?? false
  const [webgl] = useState(supportsWebGL)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const fallback = <HeroFallback className="h-full w-full" />
  const showScene = webgl && !failed

  return (
    <div className="relative h-full w-full">
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${ready && showScene ? 'opacity-0' : 'opacity-100'}`}>
        <div className="aspect-square h-full max-h-full max-w-full">{fallback}</div>
      </div>
      {showScene ? (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <SceneBoundary fallback={null}>
            <Suspense fallback={null}>
              <HeroScene nodeCount={nodeCount} reducedMotion={reducedMotion} onReady={() => setReady(true)} onFail={() => setFailed(true)} />
            </Suspense>
          </SceneBoundary>
        </div>
      ) : null}
    </div>
  )
}
