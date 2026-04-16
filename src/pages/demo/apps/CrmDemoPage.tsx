import { FiActivity, FiBarChart2, FiTarget, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createCrmState, crmUsers } from '../../../data/demo/crm'
import { buildToast } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Pipeline'], ['board', 'Deal Board'], ['activities', 'Activities'], ['forecast', 'Forecast'], ['accounts', 'Accounts']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/crm' : `/demo/crm/${section}`
}

function CrmBadge({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-violet-50 text-violet-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function CrmDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, patchState, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-crm', createInitialState: createCrmState, users: crmUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'

  const moveLead = (id: string) => {
    const order = ['Prospect', 'Qualified', 'Proposal', 'Negotiation', 'Won'] as const
    patchState((current) => ({
      ...current,
      leads: current.leads.map((lead) => {
        if (lead.id !== id) return lead
        const index = order.indexOf(lead.stage)
        return { ...lead, stage: order[Math.min(index + 1, order.length - 1)] }
      }),
    }))
    addToast(buildToast('Deal advanced', 'Pipeline moved in local demo state.', 'success'))
  }

  return (
    <>
      <Seo title="CRM Interactive Demo | Qode27" description="Interactive frontend-only CRM demo with pipeline stages, activities, forecasting, and account visibility." canonicalPath={activeSection === 'dashboard' ? '/demo/crm' : `/demo/crm/${activeSection}`} />
      <div className="min-h-screen bg-[#faf5ff] text-slate-900">
        <div className="mx-auto max-w-[1700px] px-4 py-4 lg:px-6">
          <header className="rounded-[2rem] border border-violet-100 bg-[linear-gradient(135deg,#ffffff_0%,#faf5ff_60%,#f0fdf4_100%)] p-6 shadow-[0_24px_60px_rgba(124,58,237,0.08)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl"><div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-violet-700"><Link to="/" className="font-semibold">Qode27</Link><span className="h-1 w-1 rounded-full bg-violet-300" /><span>Demo Environment - sample data only</span></div><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">A sales pipeline studio built around deals, next actions, and forecast confidence.</h1><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">This product leads with a board, not a dashboard. The first impression is movement through stages, not generic metrics.</p></div>
              <div className="grid gap-3 sm:grid-cols-2"><select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Persona switched', 'CRM workspace updated.', 'info')) }} className="min-h-12 rounded-xl border border-violet-100 bg-white px-4 text-sm outline-none">{users.map((user) => <option key={user.email} value={user.email}>{user.name} · {user.role}</option>)}</select><button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Pipeline refreshed', 'Forecast and activities refreshed locally.', 'info')) }} className="rounded-xl border border-violet-100 bg-white px-4 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh'}</button><button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'CRM sample data restored.', 'success')) }} className="rounded-xl border border-violet-100 bg-white px-4 text-sm font-semibold text-slate-900">Reset</button><a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white">Request tailored demo</a></div>
            </div>
            <nav className="mt-6 flex flex-wrap gap-2">{sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeSection === slug ? 'bg-violet-600 text-white' : 'bg-white text-slate-700 hover:bg-violet-50 hover:text-violet-700'}`}>{label}</Link>)}</nav>
          </header>

          <main className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              {activeSection === 'dashboard' || activeSection === 'board' ? <section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><div className="flex items-center gap-3"><FiTarget className="text-violet-700" /><h3 className="text-2xl font-semibold text-slate-950">Deal board</h3></div><div className="mt-6 grid gap-4 xl:grid-cols-5">{['Prospect', 'Qualified', 'Proposal', 'Negotiation', 'Won'].map((lane) => <div key={lane} className="rounded-[1.2rem] border border-violet-100 bg-violet-50/50 p-4"><p className="text-xs uppercase tracking-[0.18em] text-violet-700">{lane}</p><div className="mt-4 space-y-3">{state.leads.filter((lead) => lead.stage === lane).map((lead) => <div key={lead.id} className="rounded-xl bg-white p-3 shadow-[0_8px_20px_rgba(124,58,237,0.05)]"><p className="font-semibold text-slate-950">{lead.company}</p><p className="mt-1 text-sm text-slate-600">{lead.contact}</p><p className="mt-3 text-sm font-semibold text-slate-950">{lead.value}</p><div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>{lead.owner}</span><span>Score {lead.score}</span></div>{lead.stage !== 'Won' ? <button type="button" onClick={() => moveLead(lead.id)} className="mt-3 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white">Advance</button> : null}</div>)}</div></div>)}</div></section> : null}
              {activeSection === 'activities' ? <section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><div className="flex items-center gap-3"><FiActivity className="text-violet-700" /><h3 className="text-2xl font-semibold text-slate-950">Next actions</h3></div><div className="mt-6 space-y-3">{state.activities.map((activity) => <div key={activity.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><p className="font-semibold text-slate-950">{activity.company}</p><p className="mt-1 text-sm text-slate-600">{activity.note}</p><div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>{activity.owner}</span><span>{activity.due}</span></div></div>)}</div></section> : null}
              {activeSection === 'forecast' ? <section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><div className="flex items-center gap-3"><FiBarChart2 className="text-violet-700" /><h3 className="text-2xl font-semibold text-slate-950">Forecast confidence</h3></div><div className="mt-6 grid gap-4 md:grid-cols-3">{state.forecast.map((item) => <div key={item.id} className="rounded-[1.2rem] border border-violet-100 bg-violet-50/40 p-5"><p className="text-xs uppercase tracking-[0.18em] text-violet-700">{item.segment}</p><p className="mt-3 text-xl font-semibold text-slate-950">{item.target}</p><p className="mt-2 text-sm text-slate-600">Committed {item.committed}</p><div className="mt-4"><CrmBadge tone="neutral">{item.confidence} confidence</CrmBadge></div></div>)}</div></section> : null}
              {activeSection === 'accounts' ? <section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><div className="flex items-center gap-3"><FiTrendingUp className="text-violet-700" /><h3 className="text-2xl font-semibold text-slate-950">Account view</h3></div><div className="mt-6 space-y-3">{state.leads.map((lead) => <div key={lead.id} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(124,58,237,0.04)]"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{lead.company}</p><p className="mt-1 text-sm text-slate-600">{lead.contact} · {lead.owner}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{lead.value}</span><CrmBadge tone={lead.stage === 'Won' ? 'positive' : lead.stage === 'Prospect' ? 'warning' : 'neutral'}>{lead.stage}</CrmBadge></div></div></div>)}</div></section> : null}
            </div>
            <aside className="space-y-6"><section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><p className="text-xs uppercase tracking-[0.22em] text-violet-700">Pipeline note</p><div className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><p>Deals, activities, and forecast views all read from the same local-only CRM state.</p><p>This route is intentionally board-led so it feels different from inventory, HR, or finance products.</p><p><a href={buildDemoWhatsAppHref(app.name)} className="font-semibold text-violet-700">WhatsApp Qode27</a> for a tailored rollout.</p></div></section></aside>
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
