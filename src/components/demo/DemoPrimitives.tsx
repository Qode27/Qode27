import { motion as Motion } from 'framer-motion'
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiRefreshCw, FiRotateCcw } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import type {
  DemoMetric,
  DemoNavItem,
  DemoShellProps,
  DemoTableColumn,
  DemoThemeStyle,
  DemoToast,
  DemoTrendPoint,
} from '../../lib/demo/types'
import BrandLogo from '../ui/BrandLogo'
import Button from '../ui/Button'

const toneClassMap = {
  positive: 'text-emerald-600',
  neutral: 'text-slate-500',
  warning: 'text-amber-600',
} as const

export function DemoShell({
  app,
  sections,
  activeSection,
  title,
  subtitle,
  currentUser,
  onSwitchUser,
  users,
  onReset,
  onRefresh,
  isRefreshing,
  actions,
  children,
}: DemoShellProps) {
  const themeStyle: DemoThemeStyle = {
    '--demo-primary': app.accent.primary,
    '--demo-secondary': app.accent.secondary,
    '--demo-surface': app.accent.surface,
    '--demo-gradient': app.accent.gradient,
  }

  return (
    <div className="demo-shell" style={themeStyle}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_var(--demo-secondary),transparent_45%)] opacity-20" />
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-6">
        <aside className="rounded-[2rem] border border-white/60 bg-white/78 p-5 shadow-[0_30px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
          <NavLink to="/" className="inline-flex items-center" aria-label="Qode27 home">
            <BrandLogo className="h-10 max-w-[10rem]" />
          </NavLink>
          <div
            className="mt-6 rounded-[1.5rem] p-5 text-white shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
            style={{ background: app.accent.gradient }}
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/66">Interactive Demo</p>
            <h1 className="mt-4 text-[1.65rem] font-semibold tracking-[-0.05em]">{app.shortName}</h1>
            <p className="mt-3 text-sm leading-6 text-white/75">{app.tagline}</p>
          </div>

          <div className="mt-6">
            <p className="px-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Demo Navigation</p>
            <nav className="mt-3 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                const href = section.slug === 'dashboard' ? `/demo/${app.slug}` : `/demo/${app.slug}/${section.slug}`

                return (
                  <NavLink
                    key={section.slug}
                    to={href}
                    className={`flex items-start gap-3 rounded-[1.2rem] px-3 py-3 transition ${
                      activeSection === section.slug
                        ? 'bg-slate-950 text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl ${
                        activeSection === section.slug ? 'bg-white/14 text-white' : 'bg-[var(--demo-surface)] text-[var(--demo-primary)]'
                      }`}
                    >
                      <Icon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{section.label}</span>
                      <span className={`mt-1 block text-xs leading-5 ${activeSection === section.slug ? 'text-white/66' : 'text-slate-500'}`}>
                        {section.description}
                      </span>
                    </span>
                  </NavLink>
                )
              })}
            </nav>
          </div>

          <div className="mt-6 rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Mock Workspace</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Demo Environment. Sample data only. Every interaction stays inside browser memory or local storage.
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <header className="rounded-[2rem] border border-white/60 bg-white/86 p-5 shadow-[0_26px_70px_rgba(15,23,42,0.1)] backdrop-blur-2xl">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  <span>Qode27 Demo Mode</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{app.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="text-[var(--demo-primary)]">No live API calls</span>
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2.4rem]">{title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[25rem]">
                <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Mock Login</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--demo-surface)] font-semibold text-[var(--demo-primary)]">
                      {currentUser.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">{currentUser.name}</p>
                      <p className="truncate text-xs text-slate-500">{currentUser.role}</p>
                    </div>
                  </div>
                  <select
                    value={currentUser.email}
                    onChange={(event) => onSwitchUser(event.target.value)}
                    className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  >
                    {users.map((user) => (
                      <option key={user.email} value={user.email}>
                        {user.name} · {user.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Actions</p>
                  <div className="mt-3 grid gap-2">
                    <button
                      type="button"
                      onClick={onRefresh}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:border-[var(--demo-primary)] hover:text-[var(--demo-primary)]"
                    >
                      <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
                      Refresh demo
                    </button>
                    <button
                      type="button"
                      onClick={onReset}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:border-rose-300 hover:text-rose-600"
                    >
                      <FiRotateCcw />
                      Reset sample data
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
              <div className="inline-flex flex-wrap items-center gap-2">
                {sections.map((section) => {
                  const href = section.slug === 'dashboard' ? `/demo/${app.slug}` : `/demo/${app.slug}/${section.slug}`
                  return (
                    <NavLink
                      key={section.slug}
                      to={href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        activeSection === section.slug
                          ? 'bg-[var(--demo-surface)] text-[var(--demo-primary)]'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950'
                      }`}
                    >
                      {section.label}
                    </NavLink>
                  )
                })}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                {actions.map((action) => (
                  <Button key={action.label} href={action.href} variant={action.variant ?? 'secondary'} size="sm">
                    {action.label}
                    <FiArrowRight />
                  </Button>
                ))}
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}

export function DemoMetricGrid({ items, isRefreshing = false }: { items: DemoMetric[]; isRefreshing?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <Motion.div
          key={item.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.04 * index }}
          className={`rounded-[1.6rem] border border-white/60 bg-white/88 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl ${
            isRefreshing ? 'animate-pulse' : ''
          }`}
        >
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{item.value}</p>
          <p className={`mt-3 text-sm font-medium ${toneClassMap[item.tone ?? 'neutral']}`}>{item.change}</p>
        </Motion.div>
      ))}
    </div>
  )
}

export function DemoPanel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/60 bg-white/88 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h3>
          {subtitle ? <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function DemoDataTable<Row extends { id?: string | number }>({
  columns,
  rows,
}: {
  columns: DemoTableColumn<Row>[]
  rows: Row[]
}) {
  return (
    <div className="overflow-hidden rounded-[1.3rem] border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500 ${column.className ?? ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id ?? index} className="border-t border-slate-200 bg-white">
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-4 align-top text-sm text-slate-700 ${column.className ?? ''}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DemoTrendChart({
  title,
  valueSuffix = '',
  data,
}: {
  title: string
  valueSuffix?: string
  data: DemoTrendPoint[]
}) {
  const maxValue = Math.max(...data.map((point) => point.value), 1)

  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <div className="mt-5 grid h-52 grid-cols-6 items-end gap-3">
        {data.map((point) => (
          <div key={point.label} className="flex h-full flex-col justify-end">
            <div className="relative flex-1 rounded-full bg-white px-2 py-2 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.12)]">
              <div
                className="absolute inset-x-2 bottom-2 rounded-full bg-[linear-gradient(180deg,var(--demo-secondary),var(--demo-primary))]"
                style={{ height: `${Math.max((point.value / maxValue) * 100, 8)}%` }}
              />
            </div>
            <p className="mt-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">{point.label}</p>
            <p className="mt-1 text-center text-xs text-slate-600">
              {point.value}
              {valueSuffix}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DemoBadge({
  value,
  tone = 'neutral',
}: {
  value: string
  tone?: 'neutral' | 'positive' | 'warning'
}) {
  const classes = {
    neutral: 'bg-slate-100 text-slate-700',
    positive: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
  }[tone]

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}>{value}</span>
}

export function DemoEmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-[1.3rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-[0_10px_25px_rgba(15,23,42,0.08)]">
        <FiAlertCircle />
      </div>
      <h4 className="mt-4 text-lg font-semibold text-slate-950">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}

export function DemoToastStack({ toasts }: { toasts: DemoToast[] }) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] space-y-3">
      {toasts.map((toast) => {
        const toneClasses = {
          info: 'border-slate-200 bg-white',
          success: 'border-emerald-200 bg-emerald-50',
          warning: 'border-amber-200 bg-amber-50',
        }[toast.tone]

        return (
          <Motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className={`pointer-events-auto w-[20rem] rounded-[1.2rem] border p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ${toneClasses}`}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
                <FiCheckCircle />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">{toast.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{toast.message}</p>
              </div>
            </div>
          </Motion.div>
        )
      })}
    </div>
  )
}
