import type { ReactNode } from 'react'
import type { ServiceVisual as ServiceVisualKind } from '../../data/services'

const ACCENT = '#4c8dff'
const VIOLET = '#8b7eff'
const GOLD = '#d6a648'
const LINE = 'rgba(148,163,196,0.28)'
const TEXT = '#cfd6e4'
const SUBTLE = '#7b8598'

function Box({ x, y, w, h, label, sub, stroke = LINE, fill = 'rgba(18,25,39,0.9)' }: { x: number; y: number; w: number; h: number; label: string; sub?: string; stroke?: string; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={stroke} />
      <text x={x + 14} y={y + (sub ? h / 2 - 3 : h / 2 + 4)} fill={TEXT} fontSize="12.5" fontWeight="600" fontFamily="Inter, sans-serif">
        {label}
      </text>
      {sub ? (
        <text x={x + 14} y={y + h / 2 + 13} fill={SUBTLE} fontSize="10.5" fontFamily="Inter, sans-serif">
          {sub}
        </text>
      ) : null}
    </g>
  )
}

function Flow({ d, color = ACCENT }: { d: string; color?: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke={LINE} strokeWidth="1.2" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeDasharray="4 16" className="animate-dash" />
    </g>
  )
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 560 420" role="img" aria-label={label} className="h-auto w-full">
      {children}
    </svg>
  )
}

function Architecture() {
  const layers = [
    { label: 'People & roles', sub: 'Who acts, who approves' },
    { label: 'Interface', sub: 'Task-focused screens' },
    { label: 'Workflow & rules', sub: 'States, approvals, validations' },
    { label: 'Records', sub: 'Single system of record' },
    { label: 'Reporting', sub: 'Decisions, not just data' },
  ]
  return (
    <Frame label="Layered architecture of a custom business system: roles, interface, workflow, records, and reporting, with integrations alongside">
      {layers.map((layer, i) => (
        <Box key={layer.label} x={40 + i * 8} y={30 + i * 74} w={330 - i * 16} h={56} label={layer.label} sub={layer.sub} stroke={i === 2 ? ACCENT : LINE} />
      ))}
      {layers.slice(0, -1).map((_, i) => (
        <Flow key={i} d={`M ${200} ${86 + i * 74} L ${200} ${104 + i * 74}`} />
      ))}
      <Box x={410} y={170} w={120} h={80} label="Integrations" sub="Scoped per project" stroke={VIOLET} />
      <Flow d="M 370 214 C 390 214 390 210 410 210" color={VIOLET} />
      <circle cx="200" cy="245" r="3" fill={GOLD} />
    </Frame>
  )
}

function Browser() {
  return (
    <Frame label="A responsive web application shown on a desktop browser window and a phone">
      <rect x="20" y="30" width="400" height="300" rx="14" fill="rgba(18,25,39,0.9)" stroke={LINE} />
      <line x1="20" y1="62" x2="420" y2="62" stroke={LINE} />
      {[40, 54, 68].map((cx) => (
        <circle key={cx} cx={cx} cy="46" r="4" fill="rgba(255,255,255,0.15)" />
      ))}
      <rect x="140" y="38" width="160" height="16" rx="8" fill="none" stroke={LINE} />
      <rect x="20" y="62" width="88" height="268" fill="rgba(255,255,255,0.02)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="34" y={82 + i * 26} width={i === 1 ? 60 : 50} height="8" rx="4" fill={i === 1 ? ACCENT : 'rgba(255,255,255,0.12)'} />
      ))}
      <text x="126" y="92" fill={TEXT} fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">
        Operations dashboard
      </text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={126 + i * 96} y="108" width="84" height="56" rx="8" fill="none" stroke={i === 0 ? ACCENT : LINE} />
      ))}
      <rect x="126" y="176" width="276" height="136" rx="8" fill="none" stroke={LINE} />
      <Flow d="M 140 290 C 190 250 220 270 260 230 S 340 200 388 196" />
      <rect x="440" y="120" width="104" height="210" rx="16" fill="rgba(18,25,39,0.95)" stroke={VIOLET} />
      <rect x="452" y="146" width="80" height="34" rx="6" fill="none" stroke={LINE} />
      <rect x="452" y="188" width="80" height="34" rx="6" fill="none" stroke={LINE} />
      <rect x="452" y="230" width="80" height="70" rx="6" fill="none" stroke={LINE} />
      <text x="20" y="372" fill={SUBTLE} fontSize="11" fontFamily="JetBrains Mono, monospace">
        One codebase · desktop, tablet, and phone layouts
      </text>
    </Frame>
  )
}

function Platform() {
  const tenants = ['Customer A', 'Customer B', 'Customer C']
  return (
    <Frame label="A multi-tenant SaaS platform: a shared core with configurable modules serving several customers">
      <circle cx="280" cy="200" r="92" fill="rgba(76,141,255,0.06)" stroke={ACCENT} strokeOpacity="0.5" />
      <text x="280" y="192" textAnchor="middle" fill={TEXT} fontSize="14" fontWeight="600" fontFamily="Inter, sans-serif">
        Platform core
      </text>
      <text x="280" y="211" textAnchor="middle" fill={SUBTLE} fontSize="10.5" fontFamily="Inter, sans-serif">
        Tenancy · roles · configuration
      </text>
      {['Module', 'Module', 'Module', 'Module'].map((m, i) => {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 4
        const x = 280 + Math.cos(a) * 130
        const y = 200 + Math.sin(a) * 130
        return (
          <g key={i}>
            <Flow d={`M ${280 + Math.cos(a) * 92} ${200 + Math.sin(a) * 92} L ${x - Math.cos(a) * 22} ${y - Math.sin(a) * 22}`} color={VIOLET} />
            <rect x={x - 34} y={y - 14} width="68" height="28" rx="14" fill="rgba(18,25,39,0.95)" stroke={VIOLET} strokeOpacity="0.7" />
            <text x={x} y={y + 4} textAnchor="middle" fill={TEXT} fontSize="10.5" fontFamily="Inter, sans-serif">
              {m} {i + 1}
            </text>
          </g>
        )
      })}
      {tenants.map((tenant, i) => (
        <g key={tenant}>
          <rect x={30 + i * 180} y="360" width="140" height="40" rx="10" fill="rgba(18,25,39,0.9)" stroke={i === 1 ? GOLD : LINE} />
          <text x={100 + i * 180} y="384" textAnchor="middle" fill={TEXT} fontSize="11.5" fontFamily="Inter, sans-serif">
            {tenant}
          </text>
          <Flow d={`M ${100 + i * 180} 360 C ${100 + i * 180} 320 280 330 280 292`} />
        </g>
      ))}
    </Frame>
  )
}

function Automation() {
  return (
    <Frame label="An automated approval workflow: request, validation, approval routing, notification, and record update">
      <Box x={20} y={40} w={130} h={52} label="Request" sub="Submitted once" />
      <Box x={210} y={40} w={130} h={52} label="Validate" sub="Rules applied" />
      <Flow d="M 150 66 L 210 66" />
      <g>
        <polygon points="470,30 530,66 470,102 410,66" fill="rgba(18,25,39,0.95)" stroke={ACCENT} />
        <text x="470" y="70" textAnchor="middle" fill={TEXT} fontSize="11.5" fontWeight="600" fontFamily="Inter, sans-serif">
          Approve?
        </text>
      </g>
      <Flow d="M 340 66 L 410 66" />
      <Box x={390} y={180} w={150} h={52} label="Notify" sub="Right person, right time" stroke={VIOLET} />
      <Flow d="M 470 102 L 470 180" color={VIOLET} />
      <Box x={200} y={180} w={150} h={52} label="Return with note" sub="Clear reason" />
      <Flow d="M 430 82 C 380 120 300 130 280 180" color={GOLD} />
      <Box x={300} y={300} w={240} h={56} label="Record updated" sub="Status visible to everyone" stroke={ACCENT} />
      <Flow d="M 465 232 L 465 300" />
      <text x="20" y="390" fill={SUBTLE} fontSize="11" fontFamily="JetBrains Mono, monospace">
        No chasing · no re-keying · full status trail
      </text>
    </Frame>
  )
}

function Design() {
  const swatches = ['#05070c', '#121927', ACCENT, VIOLET, GOLD, '#eef1f6']
  return (
    <Frame label="A design system: colour tokens, a type scale, and reusable interface components">
      <text x="30" y="46" fill={SUBTLE} fontSize="10.5" fontFamily="JetBrains Mono, monospace">
        TOKENS
      </text>
      {swatches.map((color, i) => (
        <rect key={color} x={30 + i * 46} y="58" width="36" height="36" rx="8" fill={color} stroke={LINE} />
      ))}
      <text x="330" y="46" fill={SUBTLE} fontSize="10.5" fontFamily="JetBrains Mono, monospace">
        TYPE
      </text>
      {[28, 20, 14, 11].map((size, i) => (
        <text key={size} x="330" y={78 + i * 30} fill={TEXT} fontSize={size} fontWeight={i < 2 ? 600 : 400} fontFamily="Inter Tight, Inter, sans-serif">
          Aa {size}
        </text>
      ))}
      <text x="30" y="150" fill={SUBTLE} fontSize="10.5" fontFamily="JetBrains Mono, monospace">
        COMPONENTS
      </text>
      <rect x="30" y="164" width="120" height="38" rx="19" fill="#eef1f6" />
      <text x="90" y="187" textAnchor="middle" fill="#05070c" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">
        Primary
      </text>
      <rect x="164" y="164" width="120" height="38" rx="19" fill="none" stroke={LINE} />
      <text x="224" y="187" textAnchor="middle" fill={TEXT} fontSize="12" fontFamily="Inter, sans-serif">
        Secondary
      </text>
      <rect x="30" y="220" width="254" height="42" rx="10" fill="rgba(5,7,12,0.6)" stroke={ACCENT} />
      <text x="44" y="246" fill={SUBTLE} fontSize="12" fontFamily="Inter, sans-serif">
        Field with focus state
      </text>
      <rect x="30" y="280" width="500" height="110" rx="14" fill="rgba(18,25,39,0.9)" stroke={LINE} />
      <rect x="48" y="300" width="140" height="10" rx="5" fill="rgba(255,255,255,0.18)" />
      <rect x="48" y="320" width="240" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="48" y="336" width="200" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="410" y="350" width="100" height="26" rx="13" fill={ACCENT} />
      <Flow d="M 224 202 C 224 240 300 250 330 280" color={VIOLET} />
    </Frame>
  )
}

function Infrastructure() {
  const steps = ['Commit', 'Build', 'Test', 'Deploy']
  return (
    <Frame label="Backend and delivery: an automated pipeline from commit to deployment feeding application services, authentication, and a PostgreSQL database">
      {steps.map((step, i) => (
        <g key={step}>
          <rect x={20 + i * 135} y="40" width="110" height="44" rx="22" fill="rgba(18,25,39,0.9)" stroke={i === 3 ? GOLD : LINE} />
          <text x={75 + i * 135} y="67" textAnchor="middle" fill={TEXT} fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">
            {step}
          </text>
          {i < steps.length - 1 ? <Flow d={`M ${130 + i * 135} 62 L ${155 + i * 135} 62`} /> : null}
        </g>
      ))}
      <Flow d="M 480 84 C 480 130 280 120 280 160" color={GOLD} />
      <Box x={180} y={160} w={200} h={60} label="Application services" sub="Node.js · APIs" stroke={ACCENT} />
      <Box x={20} y={290} w={150} h={56} label="Authentication" sub="Roles & access" />
      <Box x={205} y={290} w={150} h={56} label="PostgreSQL" sub="Supabase" stroke={VIOLET} />
      <Box x={390} y={290} w={150} h={56} label="Cloud hosting" sub="Environments" />
      <Flow d="M 240 220 C 240 260 95 250 95 290" />
      <Flow d="M 280 220 L 280 290" color={VIOLET} />
      <Flow d="M 320 220 C 320 260 465 250 465 290" />
    </Frame>
  )
}

const visuals: Record<ServiceVisualKind, () => ReactNode> = {
  architecture: Architecture,
  browser: Browser,
  platform: Platform,
  automation: Automation,
  design: Design,
  infrastructure: Infrastructure,
}

export default function ServiceVisual({ kind, className = '' }: { kind: ServiceVisualKind; className?: string }) {
  const Visual = visuals[kind]
  return (
    <div className={`relative rounded-[1.5rem] border border-[var(--color-line)] bg-[radial-gradient(80%_80%_at_70%_20%,rgba(76,141,255,0.10),transparent),var(--color-surface)] p-4 sm:p-6 ${className}`.trim()}>
      <Visual />
    </div>
  )
}
