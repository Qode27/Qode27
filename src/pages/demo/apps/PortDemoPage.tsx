import { FiAnchor, FiBox, FiMap, FiWind } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createPortState, portUsers } from '../../../data/demo/port'
import { buildToast } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Harbor'], ['vessels', 'Vessels'], ['berths', 'Berths'], ['cargo', 'Cargo'], ['planning', 'Planning']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/port' : `/demo/port/${section}`
}

function PortBadge({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-cyan-50 text-cyan-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function PortDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-port', createInitialState: createPortState, users: portUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'

  return (
    <>
      <Seo title="Port Management Interactive Demo | Qode27" description="Interactive frontend-only port operations demo with vessels, berths, cargo handling, and planning." canonicalPath={activeSection === 'dashboard' ? '/demo/port' : `/demo/port/${activeSection}`} />
      <div className="min-h-screen bg-[#ecfeff] text-slate-900">
        <div className="mx-auto max-w-[1650px] px-4 py-4 lg:px-6">
          <header className="rounded-[2rem] border border-cyan-100 bg-[linear-gradient(135deg,#ffffff_0%,#ecfeff_55%,#e0f2fe_100%)] p-6 shadow-[0_24px_60px_rgba(14,116,144,0.08)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl"><div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-cyan-700"><Link to="/" className="font-semibold">Qode27</Link><span className="h-1 w-1 rounded-full bg-cyan-300" /><span>Demo Environment - sample data only</span></div><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">A harbor operations board for vessel schedules, berths, and cargo flow.</h1><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">This product feels maritime and planning-led. Berths, crane usage, and cargo movement define the experience instead of conventional office widgets.</p></div>
              <div className="grid gap-3 sm:grid-cols-2"><select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Persona switched', 'Harbor workspace updated.', 'info')) }} className="min-h-12 rounded-xl border border-cyan-100 bg-white px-4 text-sm outline-none">{users.map((user) => <option key={user.email} value={user.email}>{user.name} · {user.role}</option>)}</select><button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Harbor refreshed', 'Berth and cargo data refreshed locally.', 'info')) }} className="rounded-xl border border-cyan-100 bg-white px-4 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh'}</button><button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'Port sample data restored.', 'success')) }} className="rounded-xl border border-cyan-100 bg-white px-4 text-sm font-semibold text-slate-900">Reset</button><a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-700 px-4 text-sm font-semibold text-white">Request tailored demo</a></div>
            </div>
            <nav className="mt-6 flex flex-wrap gap-2">{sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeSection === slug ? 'bg-cyan-700 text-white' : 'bg-white text-slate-700 hover:bg-cyan-50 hover:text-cyan-700'}`}>{label}</Link>)}</nav>
          </header>

          <main className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              {activeSection === 'dashboard' ? <><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[['Vessels Today', '24', '4 high-priority berths'], ['Cargo Throughput', '18.4k MT', '+8% vs average'], ['Berth Utilisation', '88%', '2 docks freeing soon'], ['Crane Load', '79%', 'High handling window']].map(([label, value, note]) => <div key={label} className="rounded-[1.5rem] border border-cyan-100 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</section><section className="rounded-[1.8rem] border border-cyan-100 bg-white p-6"><div className="flex items-center gap-3"><FiAnchor className="text-cyan-700" /><h3 className="text-2xl font-semibold text-slate-950">Vessel line-up</h3></div><div className="mt-6 space-y-3">{state.vessels.map((vessel) => <div key={vessel.id} className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50/40 p-4"><div className="grid gap-3 md:grid-cols-[1fr_0.6fr_0.8fr_auto] md:items-center"><div><p className="font-semibold text-slate-950">{vessel.vessel}</p><p className="mt-1 text-sm text-slate-600">{vessel.cargo}</p></div><p className="text-sm text-slate-600">{vessel.berth}</p><p className="text-sm text-slate-600">{vessel.eta}</p><PortBadge tone={vessel.status === 'Docked' || vessel.status === 'Cleared' ? 'positive' : vessel.status === 'Approaching' ? 'warning' : 'neutral'}>{vessel.status}</PortBadge></div></div>)}</div></section></> : null}
              {activeSection === 'vessels' ? <section className="rounded-[1.8rem] border border-cyan-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Vessel schedule</h3><div className="mt-6 space-y-3">{state.vessels.map((vessel) => <div key={vessel.id} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(14,116,144,0.04)]"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{vessel.vessel}</p><p className="mt-1 text-sm text-slate-600">{vessel.cargo} · {vessel.berth}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{vessel.eta}</span><PortBadge tone={vessel.status === 'Docked' || vessel.status === 'Cleared' ? 'positive' : vessel.status === 'Approaching' ? 'warning' : 'neutral'}>{vessel.status}</PortBadge></div></div></div>)}</div></section> : null}
              {activeSection === 'berths' ? <section className="rounded-[1.8rem] border border-cyan-100 bg-white p-6"><div className="flex items-center gap-3"><FiMap className="text-cyan-700" /><h3 className="text-2xl font-semibold text-slate-950">Berth allocation</h3></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{state.docks.map((dock) => <div key={dock.id} className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50/40 p-5"><p className="text-xs uppercase tracking-[0.18em] text-cyan-700">{dock.id}</p><p className="mt-3 text-xl font-semibold text-slate-950">{dock.crane}</p><p className="mt-2 text-sm text-slate-600">{dock.occupancy} occupancy</p><div className="mt-4"><PortBadge tone={dock.status === 'Available' ? 'positive' : dock.status === 'Maintenance' ? 'warning' : 'neutral'}>{dock.status}</PortBadge></div></div>)}</div></section> : null}
              {activeSection === 'cargo' ? <section className="rounded-[1.8rem] border border-cyan-100 bg-white p-6"><div className="flex items-center gap-3"><FiBox className="text-cyan-700" /><h3 className="text-2xl font-semibold text-slate-950">Cargo handling</h3></div><div className="mt-6 space-y-3">{state.cargo.map((cargo) => <div key={cargo.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{cargo.lot}</p><p className="mt-1 text-sm text-slate-600">{cargo.commodity}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{cargo.tonnage}</span><PortBadge tone={cargo.state === 'Released' ? 'positive' : cargo.state === 'Queued' ? 'warning' : 'neutral'}>{cargo.state}</PortBadge></div></div></div>)}</div></section> : null}
              {activeSection === 'planning' ? <section className="rounded-[1.8rem] border border-cyan-100 bg-white p-6"><div className="flex items-center gap-3"><FiWind className="text-cyan-700" /><h3 className="text-2xl font-semibold text-slate-950">Planning window</h3></div><div className="mt-6 grid gap-4 md:grid-cols-3">{[['Weather', 'Favorable', 'No wind alerts'], ['Berth shifts', '2 today', 'Evening window open'], ['Pilotage', '3 slots', 'Night arrival support']].map(([title, value, note]) => <div key={title} className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50/40 p-5"><p className="text-xs uppercase tracking-[0.18em] text-cyan-700">{title}</p><p className="mt-3 text-xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</div></section> : null}
            </div>
            <aside className="space-y-6"><section className="rounded-[1.8rem] border border-cyan-100 bg-white p-6"><p className="text-xs uppercase tracking-[0.22em] text-cyan-700">Harbor note</p><div className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><p>Vessels, berth load, and cargo lots all read from the same local-only operations state.</p><p>This route is intentionally marine and planning-heavy, so it feels distinct from shipping or yard operations.</p><p><a href={buildDemoWhatsAppHref(app.name)} className="font-semibold text-cyan-700">WhatsApp Qode27</a> for a tailored rollout.</p></div></section></aside>
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
