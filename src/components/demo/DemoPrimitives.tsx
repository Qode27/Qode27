import type { ReactNode } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiRefreshCw, FiRotateCcw } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import type {
  DemoActionItem,
  DemoAppConfig,
  DemoCardStyle,
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

function sectionHref(appSlug: string, sectionSlug: string) {
  return sectionSlug === 'dashboard' ? `/demo/${appSlug}` : `/demo/${appSlug}/${sectionSlug}`
}

function getShellClass(app: DemoAppConfig) {
  if (app.identity.navStyle === 'command-center') return 'demo-shell demo-shell--command'
  if (app.identity.navStyle === 'operations-rail') return 'demo-shell demo-shell--operations'
  if (app.identity.navStyle === 'workflow-topbar') return 'demo-shell demo-shell--workflow'
  return 'demo-shell demo-shell--enterprise'
}

function getPanelClass(style: DemoCardStyle) {
  if (style === 'tactical') return 'rounded-[1.8rem] border border-[var(--demo-line)] bg-[rgba(14,14,14,0.86)] text-white shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl'
  if (style === 'industrial') return 'rounded-[1.3rem] border border-[var(--demo-line)] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]'
  if (style === 'clinical') return 'rounded-[1.4rem] border border-[var(--demo-line)] bg-white shadow-[0_18px_38px_rgba(8,47,73,0.08)]'
  return 'rounded-[1.6rem] border border-[var(--demo-line)] bg-[var(--demo-panel)] shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl'
}

function getMetricClass(app: DemoAppConfig) {
  if (app.identity.cardStyle === 'tactical') return 'rounded-[1.5rem] border border-[var(--demo-line)] bg-[rgba(20,20,20,0.92)] text-white shadow-[0_22px_60px_rgba(0,0,0,0.32)]'
  if (app.identity.cardStyle === 'industrial') return 'rounded-[1.15rem] border border-slate-300 bg-white'
  if (app.identity.cardStyle === 'clinical') return 'rounded-[1.2rem] border border-teal-100 bg-white'
  return 'rounded-[1.5rem] border border-white/70 bg-white/88 backdrop-blur-xl'
}

function getBadgeClass(app: DemoAppConfig, tone: 'neutral' | 'positive' | 'warning') {
  if (app.identity.cardStyle === 'tactical') {
    return {
      neutral: 'bg-white/10 text-white',
      positive: 'bg-emerald-500/14 text-emerald-300',
      warning: 'bg-amber-500/14 text-amber-300',
    }[tone]
  }

  if (app.identity.cardStyle === 'industrial') {
    return {
      neutral: 'bg-slate-100 text-slate-700',
      positive: 'bg-emerald-50 text-emerald-700',
      warning: 'bg-orange-50 text-orange-700',
    }[tone]
  }

  if (app.identity.cardStyle === 'clinical') {
    return {
      neutral: 'bg-sky-50 text-sky-700',
      positive: 'bg-emerald-50 text-emerald-700',
      warning: 'bg-amber-50 text-amber-700',
    }[tone]
  }

  return {
    neutral: 'bg-slate-100 text-slate-700',
    positive: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
  }[tone]
}

function getTableClass(app: DemoAppConfig) {
  if (app.identity.tableStyle === 'board') return 'border-[var(--demo-line)] bg-[rgba(14,14,14,0.92)] text-white'
  if (app.identity.tableStyle === 'warehouse') return 'border-slate-300 bg-white'
  if (app.identity.tableStyle === 'clinical') return 'border-teal-100 bg-white'
  return 'border-slate-200 bg-white'
}

function renderActionButtons(actions: DemoActionItem[]) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {actions.map((action) => (
        <Button key={action.label} href={action.href} variant={action.variant ?? 'secondary'} size="sm">
          {action.label}
          <FiArrowRight />
        </Button>
      ))}
    </div>
  )
}

function EnterpriseShell(props: DemoShellProps) {
  const { app, sections, activeSection, title, subtitle, currentUser, onSwitchUser, users, onReset, onRefresh, isRefreshing, actions, children } = props

  return (
    <div className="relative mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-6">
      <aside className={`p-5 ${getPanelClass(app.identity.cardStyle)}`}>
        <NavLink to="/" className="inline-flex items-center" aria-label="Qode27 home">
          <BrandLogo className="h-10 max-w-[10rem]" />
        </NavLink>
        <div className="mt-6 rounded-[1.5rem] p-5 text-white shadow-[0_22px_60px_rgba(15,23,42,0.18)]" style={{ background: app.accent.gradient }}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/66">Powered by Qode27</p>
          <h1 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.05em]">{app.shortName}</h1>
          <p className="mt-3 text-sm leading-6 text-white/80">{app.tagline}</p>
        </div>
        <div className="mt-6">
          <p className="px-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Admin Sections</p>
          <nav className="mt-3 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <NavLink
                  key={section.slug}
                  to={sectionHref(app.slug, section.slug)}
                  className={`flex items-start gap-3 rounded-[1.2rem] px-3 py-3 transition ${
                    activeSection === section.slug ? 'bg-[var(--demo-primary)] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  <span className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl ${activeSection === section.slug ? 'bg-white/14 text-white' : 'bg-[var(--demo-surface)] text-[var(--demo-primary)]'}`}>
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{section.label}</span>
                    <span className={`mt-1 block text-xs leading-5 ${activeSection === section.slug ? 'text-white/70' : 'text-slate-500'}`}>{section.description}</span>
                  </span>
                </NavLink>
              )
            })}
          </nav>
        </div>
        <div className="mt-6 rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Mock Workspace</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Corporate-safe demo. Sample data only. No production API calls.</p>
        </div>
      </aside>

      <div className="space-y-6">
        <header className={`p-6 ${getPanelClass(app.identity.cardStyle)}`}>
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                <span>{app.identity.dashboardLabel}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{app.category}</span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2.5rem]">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[25rem]">
              <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Mock Login</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--demo-surface)] font-semibold text-[var(--demo-primary)]">{currentUser.avatar}</div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">{currentUser.name}</p>
                    <p className="truncate text-xs text-slate-500">{currentUser.role}</p>
                  </div>
                </div>
                <select value={currentUser.email} onChange={(event) => onSwitchUser(event.target.value)} className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]">
                  {users.map((user) => (
                    <option key={user.email} value={user.email}>
                      {user.name} · {user.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Controls</p>
                <div className="mt-3 grid gap-2">
                  <button type="button" onClick={onRefresh} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:border-[var(--demo-primary)] hover:text-[var(--demo-primary)]">
                    <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
                    Refresh
                  </button>
                  <button type="button" onClick={onReset} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:border-rose-300 hover:text-rose-600">
                    <FiRotateCcw />
                    Reset demo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
            <div className="inline-flex flex-wrap items-center gap-2">
              {sections.map((section) => (
                <NavLink key={section.slug} to={sectionHref(app.slug, section.slug)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeSection === section.slug ? 'bg-[var(--demo-surface)] text-[var(--demo-primary)]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950'}`}>
                  {section.label}
                </NavLink>
              ))}
            </div>
            {renderActionButtons(actions)}
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

function WorkflowShell(props: DemoShellProps) {
  const { app, sections, activeSection, title, subtitle, currentUser, onSwitchUser, users, onReset, onRefresh, isRefreshing, actions, children } = props
  return (
    <div className="relative mx-auto min-h-screen max-w-[1600px] px-4 py-4 lg:px-6">
      <header className={`overflow-hidden p-0 ${getPanelClass(app.identity.cardStyle)}`}>
        <div className="border-b border-[var(--demo-line)] bg-[linear-gradient(135deg,rgba(13,148,136,0.12),rgba(255,255,255,0.4))] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <NavLink to="/" className="inline-flex items-center" aria-label="Qode27 home">
                <BrandLogo className="h-10 max-w-[10rem]" />
              </NavLink>
              <div className="hidden h-8 w-px bg-[var(--demo-line)] sm:block" />
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--demo-primary)]">Powered by Qode27</p>
                <h1 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-950">{app.shortName}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-[1rem] border border-[var(--demo-line)] bg-white px-4 py-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Active Persona</p>
                <select value={currentUser.email} onChange={(event) => onSwitchUser(event.target.value)} className="mt-2 bg-transparent text-sm font-medium text-slate-900 outline-none">
                  {users.map((user) => (
                    <option key={user.email} value={user.email}>
                      {user.name} · {user.role}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={onRefresh} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--demo-line)] bg-white px-4 text-sm font-semibold text-slate-900">
                <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button type="button" onClick={onReset} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--demo-line)] bg-white px-4 text-sm font-semibold text-slate-900">
                <FiRotateCcw />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-6">
          <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr] xl:items-end">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--demo-primary)]">{app.identity.dashboardLabel}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2.4rem]">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{subtitle}</p>
            </div>
            <div className="rounded-[1.4rem] border border-teal-100 bg-[linear-gradient(135deg,rgba(13,148,136,0.08),rgba(255,255,255,0.9))] p-4">
              <p className="text-sm font-semibold text-slate-950">Care flow note</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Clinical demo mode stays fast and safe. Every registration, appointment, and payment stays local to the browser.</p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <NavLink key={section.slug} to={sectionHref(app.slug, section.slug)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${activeSection === section.slug ? 'border-transparent bg-[var(--demo-primary)] text-white shadow-[0_14px_34px_rgba(13,148,136,0.24)]' : 'border-[var(--demo-line)] bg-white text-slate-700 hover:border-[var(--demo-primary)] hover:text-[var(--demo-primary)]'}`}>
                    <Icon className="text-sm" />
                    {section.label}
                  </NavLink>
                )
              })}
            </div>
            {renderActionButtons(actions)}
          </div>
        </div>
      </header>
      <main className="mt-6">{children}</main>
    </div>
  )
}

function OperationsShell(props: DemoShellProps) {
  const { app, sections, activeSection, title, subtitle, currentUser, onSwitchUser, users, onReset, onRefresh, isRefreshing, actions, children } = props
  return (
    <div className="relative mx-auto grid min-h-screen max-w-[1680px] gap-4 px-4 py-4 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-5">
      <aside className="rounded-[1.5rem] border border-slate-300 bg-[linear-gradient(180deg,#18212b_0%,#111827_100%)] p-4 text-white shadow-[0_28px_70px_rgba(15,23,42,0.24)]">
        <NavLink to="/" className="inline-flex items-center" aria-label="Qode27 home">
          <BrandLogo className="h-10 max-w-[10rem]" />
        </NavLink>
        <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-orange-300">Operations Layer</p>
          <h1 className="mt-3 text-xl font-semibold tracking-[-0.04em]">{app.shortName}</h1>
          <p className="mt-3 text-sm leading-6 text-white/72">{app.tagline}</p>
        </div>
        <div className="mt-6 space-y-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <NavLink key={section.slug} to={sectionHref(app.slug, section.slug)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${activeSection === section.slug ? 'bg-orange-500 text-white' : 'text-white/72 hover:bg-white/8 hover:text-white'}`}>
                <Icon />
                {section.label}
              </NavLink>
            )
          })}
        </div>
        <div className="mt-6 rounded-[1rem] border border-white/10 bg-black/20 p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/55">Persona</p>
          <select value={currentUser.email} onChange={(event) => onSwitchUser(event.target.value)} className="mt-3 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-3 text-sm text-white outline-none">
            {users.map((user) => (
              <option key={user.email} value={user.email} className="text-slate-900">
                {user.name} · {user.role}
              </option>
            ))}
          </select>
        </div>
      </aside>
      <div className="space-y-4">
        <header className={`p-5 ${getPanelClass(app.identity.cardStyle)}`}>
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-orange-600">{app.identity.dashboardLabel}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2.35rem]">{title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{subtitle}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={onRefresh} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900">
                <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
                Sync board
              </button>
              <button type="button" onClick={onReset} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900">
                <FiRotateCcw />
                Reset sample
              </button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="grid gap-3 sm:grid-cols-4">
              {['No live APIs', 'Dense data view', 'Sample exports', 'Warehouse-safe demo'].map((item) => (
                <div key={item} className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
            {renderActionButtons(actions)}
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

function CommandShell(props: DemoShellProps) {
  const { app, sections, activeSection, title, subtitle, currentUser, onSwitchUser, users, onReset, onRefresh, isRefreshing, actions, children } = props
  return (
    <div className="relative mx-auto min-h-screen max-w-[1680px] px-4 py-4 lg:px-6">
      <header className="rounded-[1.75rem] border border-[var(--demo-line)] bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(10,10,10,0.96))] p-5 text-white shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-300">
              <NavLink to="/" className="inline-flex items-center" aria-label="Qode27 home">
                <BrandLogo className="h-10 max-w-[10rem]" />
              </NavLink>
              <span className="h-1 w-1 rounded-full bg-amber-200/60" />
              <span>{app.identity.dashboardLabel}</span>
              <span className="h-1 w-1 rounded-full bg-amber-200/60" />
              <span>Powered by Qode27</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[2.55rem]">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72">{subtitle}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/50">Operator</p>
              <select value={currentUser.email} onChange={(event) => onSwitchUser(event.target.value)} className="mt-3 w-full bg-transparent text-sm font-medium text-white outline-none">
                {users.map((user) => (
                  <option key={user.email} value={user.email} className="text-slate-900">
                    {user.name} · {user.role}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" onClick={onRefresh} className="inline-flex min-h-full items-center justify-center gap-2 rounded-[1rem] border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white">
              <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
              Refresh live board
            </button>
            <button type="button" onClick={onReset} className="inline-flex min-h-full items-center justify-center gap-2 rounded-[1rem] border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white">
              <FiRotateCcw />
              Reset yard
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <NavLink key={section.slug} to={sectionHref(app.slug, section.slug)} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${activeSection === section.slug ? 'border-transparent bg-amber-400 text-black' : 'border-white/10 bg-white/5 text-white/80 hover:border-amber-300/40 hover:text-white'}`}>
                  <Icon />
                  {section.label}
                </NavLink>
              )
            })}
          </div>
          {renderActionButtons(actions)}
        </div>
      </header>
      <main className="mt-5">{children}</main>
    </div>
  )
}

export function DemoShell(props: DemoShellProps) {
  const { app } = props
  const themeStyle: DemoThemeStyle = {
    '--demo-primary': app.accent.primary,
    '--demo-secondary': app.accent.secondary,
    '--demo-surface': app.accent.surface,
    '--demo-gradient': app.accent.gradient,
    '--demo-ink': app.accent.ink,
    '--demo-page': app.accent.page,
    '--demo-panel': app.accent.panel,
    '--demo-line': app.accent.line,
  }

  return (
    <div className={getShellClass(app)} style={themeStyle}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_var(--demo-secondary),transparent_52%)] opacity-16" />
      {app.identity.navStyle === 'workflow-topbar' ? <WorkflowShell {...props} /> : null}
      {app.identity.navStyle === 'enterprise-sidebar' ? <EnterpriseShell {...props} /> : null}
      {app.identity.navStyle === 'operations-rail' ? <OperationsShell {...props} /> : null}
      {app.identity.navStyle === 'command-center' ? <CommandShell {...props} /> : null}
    </div>
  )
}

export function DemoMetricGrid({ app, items, isRefreshing = false, columnsClass = 'md:grid-cols-2 xl:grid-cols-4' }: { app: DemoAppConfig; items: DemoMetric[]; isRefreshing?: boolean; columnsClass?: string }) {
  return (
    <div className={`grid gap-4 ${columnsClass}`}>
      {items.map((item, index) => (
        <Motion.div
          key={item.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: app.identity.motionStyle === 'urgent' ? 0.18 : 0.26, delay: 0.03 * index }}
          className={`${getMetricClass(app)} p-5 ${isRefreshing ? 'animate-pulse' : ''}`}
        >
          <p className={`text-sm font-medium ${app.identity.cardStyle === 'tactical' ? 'text-white/60' : 'text-slate-500'}`}>{item.label}</p>
          <p className={`mt-4 text-3xl font-semibold tracking-[-0.05em] ${app.identity.cardStyle === 'tactical' ? 'text-white' : 'text-slate-950'}`}>{item.value}</p>
          <p className={`mt-3 text-sm font-medium ${app.identity.cardStyle === 'tactical' && item.tone === 'neutral' ? 'text-white/60' : toneClassMap[item.tone ?? 'neutral']}`}>{item.change}</p>
        </Motion.div>
      ))}
    </div>
  )
}

export function DemoPanel({ app, title, subtitle, action, children, className = '' }: { app: DemoAppConfig; title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`${getPanelClass(app.identity.cardStyle)} p-5 sm:p-6 ${className}`.trim()}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className={`text-xl font-semibold tracking-[-0.04em] ${app.identity.cardStyle === 'tactical' ? 'text-white' : 'text-slate-950'}`}>{title}</h3>
          {subtitle ? <p className={`mt-2 text-sm leading-6 ${app.identity.cardStyle === 'tactical' ? 'text-white/68' : 'text-slate-600'}`}>{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function DemoDataTable<Row extends { id?: string | number }>({ app, columns, rows }: { app: DemoAppConfig; columns: DemoTableColumn<Row>[]; rows: Row[] }) {
  const shellClass = getTableClass(app)
  const isDark = app.identity.tableStyle === 'board'

  return (
    <div className={`overflow-hidden rounded-[1.25rem] border ${shellClass}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className={isDark ? 'bg-white/5' : app.identity.tableStyle === 'warehouse' ? 'bg-slate-100' : 'bg-slate-50'}>
              {columns.map((column) => (
                <th key={column.key} className={`px-4 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-white/55' : 'text-slate-500'} ${column.className ?? ''}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id ?? index} className={`border-t ${isDark ? 'border-white/10 bg-transparent' : 'border-slate-200 bg-white'}`}>
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-4 align-top text-sm ${isDark ? 'text-white/82' : 'text-slate-700'} ${column.className ?? ''}`}>
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

export function DemoTrendChart({ app, title, valueSuffix = '', data, mode = 'bars' }: { app: DemoAppConfig; title: string; valueSuffix?: string; data: DemoTrendPoint[]; mode?: 'bars' | 'lineish' }) {
  const maxValue = Math.max(...data.map((point) => point.value), 1)
  const dark = app.identity.cardStyle === 'tactical'

  return (
    <div className={`rounded-[1.3rem] border p-4 ${dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
      <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</p>
      <div className="mt-5 grid h-52 items-end gap-3" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map((point, index) => (
          <div key={point.label} className="flex h-full flex-col justify-end">
            <div className={`relative flex-1 overflow-hidden rounded-full ${dark ? 'bg-black/30' : 'bg-white'} px-2 py-2`}>
              {mode === 'lineish' && index > 0 ? <div className="absolute left-[-45%] top-[35%] h-0.5 w-[90%] -rotate-12 bg-[var(--demo-secondary)] opacity-45" /> : null}
              <div className="absolute inset-x-2 bottom-2 rounded-full bg-[linear-gradient(180deg,var(--demo-secondary),var(--demo-primary))]" style={{ height: `${Math.max((point.value / maxValue) * 100, 8)}%` }} />
            </div>
            <p className={`mt-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-white/52' : 'text-slate-500'}`}>{point.label}</p>
            <p className={`mt-1 text-center text-xs ${dark ? 'text-white/72' : 'text-slate-600'}`}>
              {point.value}
              {valueSuffix}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DemoBadge({ app, value, tone = 'neutral' }: { app: DemoAppConfig; value: string; tone?: 'neutral' | 'positive' | 'warning' }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClass(app, tone)}`}>{value}</span>
}

export function DemoEmptyState({ app, title, description }: { app: DemoAppConfig; title: string; description: string }) {
  const dark = app.identity.cardStyle === 'tactical'
  return (
    <div className={`rounded-[1.3rem] border border-dashed px-6 py-10 text-center ${dark ? 'border-white/10 bg-white/5 text-white' : 'border-slate-300 bg-slate-50'}`}>
      <div className={`mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl ${dark ? 'bg-white/10 text-white/70' : 'bg-white text-slate-500'} shadow-[0_10px_25px_rgba(15,23,42,0.08)]`}>
        <FiAlertCircle />
      </div>
      <h4 className={`mt-4 text-lg font-semibold ${dark ? 'text-white' : 'text-slate-950'}`}>{title}</h4>
      <p className={`mt-2 text-sm leading-6 ${dark ? 'text-white/70' : 'text-slate-600'}`}>{description}</p>
    </div>
  )
}

export function DemoToastStack({ toasts }: { toasts: DemoToast[] }) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] space-y-3">
      {toasts.map((toast) => {
        const toneClasses = { info: 'border-slate-200 bg-white', success: 'border-emerald-200 bg-emerald-50', warning: 'border-amber-200 bg-amber-50' }[toast.tone]
        return (
          <Motion.div key={toast.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className={`pointer-events-auto w-[20rem] rounded-[1.2rem] border p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ${toneClasses}`}>
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

export function DemoProductPreview({ app }: { app: DemoAppConfig }) {
  const variant = app.identity.previewVariant
  const address = `${app.slug}.qode27.com`

  const frame = (eyebrow: string, title: string, content: ReactNode) => (
    <div className="product-preview-frame">
      <div className="product-preview-toolbar">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
        <span className="product-preview-url">{address}</span>
      </div>
      <div className="product-preview-surface p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{title}</p>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Live view
          </div>
        </div>
        {content}
      </div>
    </div>
  )

  if (variant === 'parking') {
    return (
      <div className="product-preview-frame overflow-hidden bg-[linear-gradient(180deg,#0f1115_0%,#1b1f25_100%)]">
        <div className="product-preview-toolbar border-white/8 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.62rem] font-medium tracking-[0.08em] text-white/60">{address}</span>
        </div>
        <div className="p-4 text-white">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-amber-300">Yard command</p>
              <p className="mt-1 text-sm font-semibold text-white">Live bay occupancy and movement</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/62">
              Live board
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1rem] border border-white/10 bg-white/[0.05] p-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/52">Slot map</p>
                <span className="rounded-full bg-emerald-500/14 px-2 py-1 text-[0.62rem] font-semibold text-emerald-300">78% occupied</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((cell) => (
                  <div key={cell} className={`h-9 rounded-lg ${cell % 3 === 0 ? 'bg-amber-400' : cell % 4 === 0 ? 'bg-orange-500' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-[1rem] border border-white/10 bg-white/[0.05] p-3">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/52">Entries</p>
                <p className="mt-2 text-xl font-semibold">52 / 67</p>
                <div className="mt-3 h-2 rounded-full bg-white/8">
                  <div className="h-2 w-[78%] rounded-full bg-amber-400" />
                </div>
              </div>
              <div className="rounded-[1rem] border border-white/10 bg-white/[0.05] p-3">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/52">Collections</p>
                <p className="mt-2 text-xl font-semibold">Rs 1.46L</p>
                <div className="mt-3 flex gap-2 text-[0.62rem] text-white/62">
                  <span className="rounded-full border border-white/10 px-2 py-1">12 exits</span>
                  <span className="rounded-full border border-white/10 px-2 py-1">4 pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'inventory') {
    return frame(
      'Warehouse control',
      'Stock heat, movement, and exception handling',
      <div className="grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1rem] border border-slate-200 bg-slate-950 p-3 text-white">
          <div className="flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/52">Warehouse board</p>
            <span className="rounded-full bg-orange-500/18 px-2 py-1 text-[0.62rem] font-semibold text-orange-200">98 alerts</span>
          </div>
          <div className="mt-4 grid grid-cols-6 gap-1.5">
            {[58, 72, 34, 81, 63, 29].map((level, index) => (
              <div key={level} className="flex h-20 items-end rounded-lg bg-white/6 p-1">
                <div className={`w-full rounded-md ${index === 2 || index === 5 ? 'bg-orange-400' : 'bg-cyan-300'}`} style={{ height: `${level}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-[1rem] border border-slate-200 bg-white p-3">
            <div className="mb-3 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              <span>Low stock</span>
              <span>SKU 0041</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between"><span>Bearing Assembly</span><span className="text-orange-600">28</span></div>
              <div className="flex justify-between"><span>Thermal Sensor Pack</span><span className="text-orange-600">62</span></div>
              <div className="flex justify-between"><span>Hydraulic Valve Kit</span><span>184</span></div>
            </div>
          </div>
          <div className="rounded-[1rem] border border-slate-200 bg-white p-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-slate-500">Dispatch fill</p>
                <p className="mt-1 font-semibold text-slate-950">97.1%</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-slate-500">Vendor SLA</p>
                <p className="mt-1 font-semibold text-slate-950">94.6%</p>
              </div>
            </div>
          </div>
        </div>
      </div>,
    )
  }

  if (variant === 'hms') {
    return frame(
      'Clinical flow',
      'Reception, priority queue, and patient activity',
      <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
        <div className="space-y-3">
          <div className="rounded-[1rem] border border-teal-100 bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-teal-700">Reception desk</p>
              <span className="rounded-full bg-teal-50 px-2 py-1 text-[0.62rem] font-semibold text-teal-700">126 today</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[72%] rounded-full bg-teal-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1rem] border border-teal-100 bg-white p-3">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">Billing priority</p>
              <p className="mt-2 text-sm font-semibold text-slate-950">3 urgent follow-ups</p>
            </div>
            <div className="rounded-[1rem] border border-teal-100 bg-white p-3">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">Doctor queue</p>
              <p className="mt-2 text-sm font-semibold text-slate-950">14 waiting</p>
            </div>
          </div>
        </div>
        <div className="rounded-[1rem] border border-teal-100 bg-white p-3">
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">Patient flow</p>
          <div className="mt-3 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between"><span>Mahesh Babu</span><span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">Admitted</span></div>
            <div className="flex justify-between"><span>Rekha Menon</span><span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">Waiting</span></div>
            <div className="flex justify-between"><span>Sunita Rao</span><span className="rounded-full bg-sky-50 px-2 py-1 text-sky-700">Discharged</span></div>
          </div>
        </div>
      </div>,
    )
  }

  if (variant === 'coaching') {
    return frame(
      'Academic operations',
      'Batch attendance, timetable, and coaching control',
      <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[1rem] border border-violet-100 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-violet-700">Timetable</p>
            <span className="rounded-full bg-violet-50 px-2 py-1 text-[0.62rem] font-semibold text-violet-700">93% attendance</span>
          </div>
          <div className="grid grid-cols-5 gap-2 text-[0.62rem]">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
              <div key={day} className="rounded-lg bg-violet-50 px-2 py-3 text-center font-semibold text-violet-700">{day}</div>
            ))}
          </div>
        </div>
        <div className="rounded-[1rem] border border-violet-100 bg-white p-3">
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">Today</p>
          <div className="mt-3 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between"><span>7:00 AM Physics</span><span>Hall A</span></div>
            <div className="flex justify-between"><span>9:00 AM Biology</span><span>Hall B</span></div>
            <div className="flex justify-between"><span>4:30 PM Test review</span><span>Hall C</span></div>
          </div>
        </div>
      </div>,
    )
  }

  if (variant === 'ca') {
    return frame(
      'Practice visibility',
      'Client ledger, compliance deadlines, and collections',
      <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[1rem] border border-emerald-100 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-emerald-700">Client ledger</p>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[0.62rem] font-semibold text-emerald-700">18 open invoices</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-slate-50 px-3 py-3">
              <p className="text-slate-500">Collections</p>
              <p className="mt-1 font-semibold text-slate-950">Rs 9.4L</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-3">
              <p className="text-slate-500">GST reviews</p>
              <p className="mt-1 font-semibold text-slate-950">41 open</p>
            </div>
          </div>
        </div>
        <div className="rounded-[1rem] border border-emerald-100 bg-white p-3 text-xs text-slate-600">
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">Deadline board</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between"><span>Audit filing</span><span>Today</span></div>
            <div className="flex justify-between"><span>TDS summary</span><span>Tomorrow</span></div>
            <div className="flex justify-between"><span>GST reconciliation</span><span>3 days</span></div>
          </div>
        </div>
      </div>,
    )
  }

  if (variant === 'restaurant') {
    return frame(
      'Outlet operations',
      'Kitchen load, prep speed, and live order progression',
      <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[1rem] border border-orange-100 bg-white p-3">
          <div className="flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-rose-700">Kitchen SLA</p>
            <span className="rounded-full bg-orange-50 px-2 py-1 text-[0.62rem] font-semibold text-orange-700">14 min avg</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg bg-orange-50 px-3 py-3 text-center"><p className="font-semibold text-slate-950">8</p><p className="mt-1 text-slate-500">Queued</p></div>
            <div className="rounded-lg bg-orange-50 px-3 py-3 text-center"><p className="font-semibold text-slate-950">11</p><p className="mt-1 text-slate-500">Cooking</p></div>
            <div className="rounded-lg bg-orange-50 px-3 py-3 text-center"><p className="font-semibold text-slate-950">5</p><p className="mt-1 text-slate-500">Ready</p></div>
          </div>
        </div>
        <div className="rounded-[1rem] border border-orange-100 bg-white p-3 text-xs text-slate-600">
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">Order stream</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between"><span>#1043 Paneer Roll</span><span>Pickup</span></div>
            <div className="flex justify-between"><span>#1044 Burger Combo</span><span>Cooking</span></div>
            <div className="flex justify-between"><span>#1045 Pasta Box</span><span>Ready</span></div>
          </div>
        </div>
      </div>,
    )
  }

  if (variant === 'shipping') {
    return frame(
      'Movement visibility',
      'Shipment milestones, exceptions, and delivery confidence',
      <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[1rem] border border-sky-100 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-sky-700">Milestones</p>
            <span className="rounded-full bg-sky-50 px-2 py-1 text-[0.62rem] font-semibold text-sky-700">184 live</span>
          </div>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className={`h-2 flex-1 rounded-full ${step < 3 ? 'bg-sky-500' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-[1rem] border border-sky-100 bg-white p-3 text-xs text-slate-600">
          <div className="flex justify-between"><span>In transit</span><span>101</span></div>
          <div className="mt-2 flex justify-between"><span>Exceptions</span><span>7</span></div>
          <div className="mt-2 flex justify-between"><span>On-time score</span><span>96%</span></div>
        </div>
      </div>,
    )
  }

  if (variant === 'port') {
    return frame(
      'Harbor operations',
      'Berth scheduling, cargo throughput, and vessel sequencing',
      <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[1rem] border border-cyan-100 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-cyan-700">Berth board</p>
            <span className="rounded-full bg-cyan-50 px-2 py-1 text-[0.62rem] font-semibold text-cyan-700">24 vessels</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((slot) => (
              <div key={slot} className={`rounded-lg px-2 py-3 text-center text-[0.62rem] font-semibold ${slot < 4 ? 'bg-cyan-50 text-cyan-700' : 'bg-slate-100 text-slate-500'}`}>
                B-{slot}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1rem] border border-cyan-100 bg-white p-3 text-xs text-slate-600">
          <div className="flex justify-between"><span>Berth use</span><span>88%</span></div>
          <div className="mt-2 flex justify-between"><span>Cargo</span><span>18.4k MT</span></div>
          <div className="mt-2 flex justify-between"><span>ETA changes</span><span>3</span></div>
        </div>
      </div>,
    )
  }

  if (variant === 'crm') {
    return frame(
      'Revenue pipeline',
      'Deals, next actions, and forecast confidence',
      <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[1rem] border border-violet-100 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-violet-700">Pipeline</p>
            <span className="rounded-full bg-violet-50 px-2 py-1 text-[0.62rem] font-semibold text-violet-700">Rs 3.8Cr</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-[0.62rem]">
            {[
              ['Lead', '12'],
              ['Qualified', '8'],
              ['Negotiation', '6'],
              ['Won', '4'],
            ].map(([stage, total]) => (
              <div key={stage} className="rounded-lg bg-violet-50 px-2 py-3 text-center text-violet-700">
                <p className="font-semibold">{total}</p>
                <p className="mt-1">{stage}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1rem] border border-violet-100 bg-white p-3 text-xs text-slate-600">
          <div className="flex justify-between"><span>Next follow-ups</span><span>11</span></div>
          <div className="mt-2 flex justify-between"><span>Forecast confidence</span><span>82%</span></div>
          <div className="mt-2 flex justify-between"><span>Won this month</span><span>4</span></div>
        </div>
      </div>,
    )
  }

  return frame(
    'People operations',
    'Attendance, payroll, and team visibility',
    <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
      <div className="rounded-[1rem] border border-indigo-100 bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-indigo-700">Workforce board</p>
          <span className="rounded-full bg-indigo-50 px-2 py-1 text-[0.62rem] font-semibold text-indigo-700">96.4% attendance</span>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-indigo-50 px-2 py-1 text-[0.62rem] font-semibold text-indigo-700">Payroll</span>
          <span className="rounded-full bg-indigo-50 px-2 py-1 text-[0.62rem] font-semibold text-indigo-700">Recruitment</span>
        </div>
      </div>
      <div className="rounded-[1rem] border border-indigo-100 bg-white p-3">
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex justify-between"><span>Engineering</span><span>84</span></div>
          <div className="flex justify-between"><span>Operations</span><span>52</span></div>
          <div className="flex justify-between"><span>Sales</span><span>37</span></div>
        </div>
      </div>
    </div>,
  )
}
