import type { ProductModuleGroup } from '../../data/products'

type ProductInterfaceProps = {
  name: string
  accent: string
  modules: ProductModuleGroup[]
  activeGroup?: number
  className?: string
}

/**
 * A stylised, data-free product window. It shows the real module structure of a
 * product (navigation groups and module names) without inventing figures.
 */
export default function ProductInterface({ name, accent, modules, activeGroup = 0, className = '' }: ProductInterfaceProps) {
  const active = modules[activeGroup] ?? modules[0]
  return (
    <figure
      className={`relative overflow-hidden rounded-[1.25rem] border border-[var(--color-line-strong)] bg-[#0a0e18] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] ${className}`.trim()}
      aria-label={`${name} interface structure`}
    >
      <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mono mx-auto truncate rounded-full border border-[var(--color-line)] px-3 py-1 text-[0.65rem] text-[var(--color-subtle)]">
          qode27 · {name.toLowerCase()}
        </div>
      </div>
      <div className="grid min-h-[20rem] grid-cols-[8.5rem_1fr] sm:grid-cols-[11rem_1fr]">
        <aside className="border-r border-[var(--color-line)] p-3 sm:p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-5 w-5 rounded-md" style={{ background: accent }} aria-hidden="true" />
            <span className="truncate text-[0.72rem] font-semibold text-white">{name}</span>
          </div>
          <ul className="space-y-1">
            {modules.map((group, index) => (
              <li
                key={group.name}
                className={`truncate rounded-md px-2 py-1.5 text-[0.7rem] ${index === activeGroup ? 'bg-white/[0.07] text-white' : 'text-[var(--color-subtle)]'}`}
              >
                {group.name}
              </li>
            ))}
          </ul>
        </aside>
        <div className="@container min-w-0 p-3 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-[0.8rem] font-semibold text-white">{active.name}</p>
            <span className="h-5 w-16 rounded-full border border-[var(--color-line)]" aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-2.5 @[22rem]:grid-cols-2">
            {active.items.map((item, index) => (
              <div key={item} className="rounded-lg border border-[var(--color-line)] bg-white/[0.02] p-3">
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: index === 0 ? accent : 'rgba(255,255,255,0.3)' }} aria-hidden="true" />
                  <span className="text-[0.7rem] leading-snug text-[var(--color-muted)]">{item}</span>
                </div>
                <div className="mt-3 space-y-1.5" aria-hidden="true">
                  <span className="block h-1.5 w-11/12 rounded-full bg-white/[0.06]" />
                  <span className="block h-1.5 w-2/3 rounded-full bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-[var(--color-line)] p-3" aria-hidden="true">
            <div className="flex items-end gap-1.5">
              {[0.45, 0.7, 0.55, 0.85, 0.6, 0.75, 0.5, 0.9].map((h, i) => (
                <span key={i} className="flex-1 rounded-sm" style={{ height: `${h * 3.5}rem`, background: `linear-gradient(to top, ${accent}55, ${accent}10)` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">Illustrative layout of the {name} modules. Not real data.</figcaption>
    </figure>
  )
}
