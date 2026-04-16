import { FiAlertCircle, FiMap, FiPackage, FiTruck } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createShippingState, shippingUsers } from '../../../data/demo/shipping'
import { buildToast } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Atlas'], ['shipments', 'Shipments'], ['milestones', 'Milestones'], ['exceptions', 'Exceptions'], ['delivery', 'Delivery']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/shipping' : `/demo/shipping/${section}`
}

function ShipBadge({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function ShippingDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-shipping', createInitialState: createShippingState, users: shippingUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'

  return (
    <>
      <Seo title="Shipping Interactive Demo | Qode27" description="Interactive frontend-only shipping demo with shipments, milestones, exceptions, and delivery tracking." canonicalPath={activeSection === 'dashboard' ? '/demo/shipping' : `/demo/shipping/${activeSection}`} />
      <div className="min-h-screen bg-[#eff6ff] text-slate-900">
        <div className="mx-auto max-w-[1650px] px-4 py-4 lg:px-6">
          <header className="rounded-[2rem] border border-sky-100 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_60%,#ecfeff_100%)] p-6 shadow-[0_24px_60px_rgba(37,99,235,0.08)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl"><div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-sky-700"><Link to="/" className="font-semibold">Qode27</Link><span className="h-1 w-1 rounded-full bg-sky-300" /><span>Demo Environment - sample data only</span></div><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">A shipment atlas built around movement, milestones, and customer promises.</h1><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">This product favors route awareness and exception handling. It feels like a logistics workspace rather than a simple KPI page.</p></div>
              <div className="grid gap-3 sm:grid-cols-2"><select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Persona switched', 'Shipping workspace updated.', 'info')) }} className="min-h-12 rounded-xl border border-sky-100 bg-white px-4 text-sm outline-none">{users.map((user) => <option key={user.email} value={user.email}>{user.name} · {user.role}</option>)}</select><button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Atlas refreshed', 'Shipment signals refreshed locally.', 'info')) }} className="rounded-xl border border-sky-100 bg-white px-4 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh'}</button><button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'Shipping sample data restored.', 'success')) }} className="rounded-xl border border-sky-100 bg-white px-4 text-sm font-semibold text-slate-900">Reset</button><a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white">Request tailored demo</a></div>
            </div>
            <nav className="mt-6 flex flex-wrap gap-2">{sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeSection === slug ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700'}`}>{label}</Link>)}</nav>
          </header>

          <main className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              {activeSection === 'dashboard' ? <><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[['Active Shipments', '184', '31 priority consignments'], ['On-Time Delivery', '96.2%', '+1.4% this week'], ['Exceptions', '7', '2 customs holds'], ['Milestones Today', '46', 'High tracking load']].map(([label, value, note]) => <div key={label} className="rounded-[1.5rem] border border-sky-100 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</section><section className="rounded-[1.8rem] border border-sky-100 bg-white p-6"><div className="flex items-center gap-3"><FiMap className="text-sky-700" /><h3 className="text-2xl font-semibold text-slate-950">Route board</h3></div><div className="mt-6 space-y-3">{state.shipments.map((shipment) => <div key={shipment.id} className="rounded-[1.2rem] border border-sky-100 bg-sky-50/40 p-4"><div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto] md:items-center"><div><p className="font-semibold text-slate-950">{shipment.customer}</p><p className="mt-1 text-sm text-slate-600">{shipment.route}</p></div><p className="text-sm text-slate-600">{shipment.container}</p><p className="text-sm text-slate-600">{shipment.eta}</p><ShipBadge tone={shipment.stage === 'Delivered' ? 'positive' : shipment.stage === 'Customs Hold' ? 'warning' : 'neutral'}>{shipment.stage}</ShipBadge></div></div>)}</div></section></> : null}
              {activeSection === 'shipments' ? <section className="rounded-[1.8rem] border border-sky-100 bg-white p-6"><div className="flex items-center gap-3"><FiPackage className="text-sky-700" /><h3 className="text-2xl font-semibold text-slate-950">Shipment register</h3></div><div className="mt-6 space-y-3">{state.shipments.map((shipment) => <div key={shipment.id} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(37,99,235,0.04)]"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{shipment.customer}</p><p className="mt-1 text-sm text-slate-600">{shipment.route} · {shipment.container}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{shipment.eta}</span><ShipBadge tone={shipment.stage === 'Delivered' ? 'positive' : shipment.stage === 'Customs Hold' ? 'warning' : 'neutral'}>{shipment.stage}</ShipBadge></div></div></div>)}</div></section> : null}
              {activeSection === 'milestones' ? <section className="rounded-[1.8rem] border border-sky-100 bg-white p-6"><div className="flex items-center gap-3"><FiTruck className="text-sky-700" /><h3 className="text-2xl font-semibold text-slate-950">Milestone timeline</h3></div><div className="mt-6 space-y-3">{state.milestones.map((milestone) => <div key={milestone.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{milestone.title}</p><p className="mt-1 text-sm text-slate-600">{milestone.shipmentId} · {milestone.timestamp}</p></div><ShipBadge tone={milestone.status === 'Done' ? 'positive' : milestone.status === 'Pending' ? 'warning' : 'neutral'}>{milestone.status}</ShipBadge></div></div>)}</div></section> : null}
              {activeSection === 'exceptions' ? <section className="rounded-[1.8rem] border border-sky-100 bg-white p-6"><div className="flex items-center gap-3"><FiAlertCircle className="text-sky-700" /><h3 className="text-2xl font-semibold text-slate-950">Exceptions desk</h3></div><div className="mt-6 space-y-3">{state.exceptions.map((exception) => <div key={exception.id} className="rounded-[1.2rem] border border-amber-100 bg-amber-50/60 p-4"><p className="font-semibold text-slate-950">{exception.issue}</p><p className="mt-1 text-sm text-slate-600">{exception.shipmentId} · {exception.owner}</p><div className="mt-3"><ShipBadge tone={exception.severity === 'High' ? 'warning' : 'neutral'}>{exception.severity}</ShipBadge></div></div>)}</div></section> : null}
              {activeSection === 'delivery' ? <section className="rounded-[1.8rem] border border-sky-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Delivery confidence</h3><div className="mt-6 grid gap-4 md:grid-cols-3">{[['Priority', '31 consignments', 'Customer-facing'], ['Ports', '4 active corridors', 'Multi-stop coverage'], ['Held', '2 customs risks', 'Escalation ready']].map(([title, value, note]) => <div key={title} className="rounded-[1.2rem] border border-sky-100 bg-sky-50/40 p-5"><p className="text-xs uppercase tracking-[0.18em] text-sky-700">{title}</p><p className="mt-3 text-xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</div></section> : null}
            </div>
            <aside className="space-y-6"><section className="rounded-[1.8rem] border border-sky-100 bg-white p-6"><p className="text-xs uppercase tracking-[0.22em] text-sky-700">Atlas note</p><div className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><p>Milestones, exceptions, and shipment rows all sit on the same local-only tracking state.</p><p>This route is intentionally map-and-timeline oriented so it feels operationally different from the others.</p><p><a href={buildDemoWhatsAppHref(app.name)} className="font-semibold text-sky-700">WhatsApp Qode27</a> for a tailored rollout.</p></div></section></aside>
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
