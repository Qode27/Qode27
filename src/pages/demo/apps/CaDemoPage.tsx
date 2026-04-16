import { FiCreditCard, FiFileText, FiFolder, FiList } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { caUsers, createCaState } from '../../../data/demo/ca'
import { buildToast } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Practice Desk'], ['clients', 'Clients'], ['assignments', 'Assignments'], ['invoices', 'Invoices'], ['ledger', 'Ledger']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/ca' : `/demo/ca/${section}`
}

function CaBadge({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function CaDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, patchState, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-ca', createInitialState: createCaState, users: caUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'

  const settleInvoice = (id: string) => {
    patchState((current) => ({ ...current, invoices: current.invoices.map((invoice) => (invoice.id === id ? { ...invoice, status: 'Paid' } : invoice)) }))
    addToast(buildToast('Invoice settled', 'Collections changed in local demo state.', 'success'))
  }

  const advanceAssignment = (id: string) => {
    patchState((current) => ({ ...current, assignments: current.assignments.map((assignment) => (assignment.id === id ? { ...assignment, stage: assignment.stage === 'Drafting' ? 'Review' : 'Filed' } : assignment)) }))
    addToast(buildToast('Assignment updated', 'Compliance stage changed locally.', 'success'))
  }

  return (
    <>
      <Seo title="CA Firm Interactive Demo | Qode27" description="Interactive frontend-only accounting firm demo with clients, compliance work, invoices, and ledgers." canonicalPath={activeSection === 'dashboard' ? '/demo/ca' : `/demo/ca/${activeSection}`} />
      <div className="min-h-screen bg-[#f0fdfa] text-slate-900">
        <div className="mx-auto max-w-[1650px] px-4 py-4 lg:px-6">
          <header className="rounded-[2rem] border border-teal-100 bg-white p-6 shadow-[0_24px_60px_rgba(15,118,110,0.08)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl"><div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-teal-700"><Link to="/" className="font-semibold">Qode27</Link><span className="h-1 w-1 rounded-full bg-teal-300" /><span>Demo Environment - sample data only</span></div><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">A finance-first practice desk for compliance, invoices, and client servicing.</h1><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">This product behaves like a partner desk, not a generic back office. Client health, filing stages, and receivables sit next to each other because that is how firms actually operate.</p></div>
              <div className="grid gap-3 sm:grid-cols-2"><select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Persona switched', 'Practice workspace updated for the selected role.', 'info')) }} className="min-h-12 rounded-xl border border-teal-100 bg-white px-4 text-sm outline-none">{users.map((user) => <option key={user.email} value={user.email}>{user.name} · {user.role}</option>)}</select><button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Desk refreshed', 'Client and invoice data refreshed locally.', 'info')) }} className="rounded-xl border border-teal-100 bg-white px-4 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh'}</button><button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'CA sample data restored.', 'success')) }} className="rounded-xl border border-teal-100 bg-white px-4 text-sm font-semibold text-slate-900">Reset</button><a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white">Request tailored demo</a></div>
            </div>
            <nav className="mt-6 flex flex-wrap gap-2">{sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeSection === slug ? 'bg-teal-700 text-white' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'}`}>{label}</Link>)}</nav>
          </header>

          <main className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <aside className="space-y-6"><section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><p className="text-xs uppercase tracking-[0.22em] text-teal-700">Firm snapshot</p><div className="mt-5 space-y-3">{[['Active Clients', '312'], ['Invoices Due', 'Rs 9.4L'], ['GST On Track', '94%']].map(([label, value]) => <div key={label} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p></div>)}</div></section><section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><p className="text-xs uppercase tracking-[0.22em] text-teal-700">Collections trend</p><div className="mt-5 grid h-44 grid-cols-4 items-end gap-3">{state.collectionTrend.map((point) => <div key={point.label} className="flex h-full flex-col justify-end"><div className="rounded-full bg-teal-50 p-2"><div className="rounded-full bg-[linear-gradient(180deg,#14b8a6_0%,#0f766e_100%)]" style={{ height: `${point.value * 24}%` }} /></div><p className="mt-2 text-center text-xs uppercase tracking-[0.18em] text-slate-500">{point.label}</p></div>)}</div></section><section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><a href={buildDemoWhatsAppHref(app.name)} className="text-sm font-semibold text-teal-700">WhatsApp Qode27</a><p className="mt-3 text-sm leading-6 text-slate-600">This demo never posts to accounting software, portals, or live filing systems.</p></section></aside>

            <div className="space-y-6">
              {activeSection === 'dashboard' ? <section className="grid gap-4 md:grid-cols-2"><div className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><div className="flex items-center gap-3"><FiFolder className="text-teal-700" /><h3 className="text-2xl font-semibold text-slate-950">Client watchlist</h3></div><div className="mt-6 space-y-3">{state.clients.map((client) => <div key={client.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{client.name}</p><p className="mt-1 text-sm text-slate-600">{client.owner}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{client.receivable}</span><CaBadge tone={client.gstStatus === 'Filed' ? 'positive' : client.gstStatus === 'Pending Docs' ? 'warning' : 'neutral'}>{client.gstStatus}</CaBadge></div></div></div>)}</div></div><div className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><div className="flex items-center gap-3"><FiList className="text-teal-700" /><h3 className="text-2xl font-semibold text-slate-950">Assignment flow</h3></div><div className="mt-6 space-y-3">{state.assignments.map((assignment) => <div key={assignment.id} className="rounded-[1.2rem] border border-teal-100 bg-teal-50/50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{assignment.client}</p><p className="mt-1 text-sm text-slate-600">{assignment.workType} · Due {assignment.dueDate}</p></div><CaBadge tone={assignment.stage === 'Filed' ? 'positive' : assignment.stage === 'Drafting' ? 'warning' : 'neutral'}>{assignment.stage}</CaBadge></div></div>)}</div></div></section> : null}
              {activeSection === 'clients' ? <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Client portfolio</h3><div className="mt-6 space-y-3">{state.clients.map((client) => <div key={client.id} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,118,110,0.04)]"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{client.name}</p><p className="mt-1 text-sm text-slate-600">{client.owner}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{client.receivable}</span><CaBadge tone={client.gstStatus === 'Filed' ? 'positive' : client.gstStatus === 'Pending Docs' ? 'warning' : 'neutral'}>{client.gstStatus}</CaBadge></div></div></div>)}</div></section> : null}
              {activeSection === 'assignments' ? <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Compliance assignments</h3><div className="mt-6 space-y-3">{state.assignments.map((assignment) => <div key={assignment.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{assignment.client}</p><p className="mt-1 text-sm text-slate-600">{assignment.workType} · Due {assignment.dueDate}</p></div><div className="flex items-center gap-3"><CaBadge tone={assignment.stage === 'Filed' ? 'positive' : assignment.stage === 'Drafting' ? 'warning' : 'neutral'}>{assignment.stage}</CaBadge>{assignment.stage !== 'Filed' ? <button type="button" onClick={() => advanceAssignment(assignment.id)} className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Advance</button> : null}</div></div></div>)}</div></section> : null}
              {activeSection === 'invoices' ? <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><div className="flex items-center gap-3"><FiCreditCard className="text-teal-700" /><h3 className="text-2xl font-semibold text-slate-950">Invoices and collections</h3></div><div className="mt-6 space-y-3">{state.invoices.map((invoice) => <div key={invoice.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{invoice.client}</p><p className="mt-1 text-sm text-slate-600">{invoice.amount} · Due {invoice.dueDate}</p></div><div className="flex items-center gap-3"><CaBadge tone={invoice.status === 'Paid' ? 'positive' : invoice.status === 'Overdue' ? 'warning' : 'neutral'}>{invoice.status}</CaBadge>{invoice.status !== 'Paid' ? <button type="button" onClick={() => settleInvoice(invoice.id)} className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Mark paid</button> : null}</div></div></div>)}</div></section> : null}
              {activeSection === 'ledger' ? <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><div className="flex items-center gap-3"><FiFileText className="text-teal-700" /><h3 className="text-2xl font-semibold text-slate-950">Ledger movement</h3></div><div className="mt-6 overflow-hidden rounded-[1.3rem] border border-slate-200"><table className="min-w-full"><thead className="bg-slate-50"><tr>{['Client', 'Description', 'Amount', 'Type'].map((head) => <th key={head} className="px-4 py-3 text-left text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">{head}</th>)}</tr></thead><tbody>{state.ledger.map((entry) => <tr key={entry.id} className="border-t border-slate-200"><td className="px-4 py-4 text-sm text-slate-600">{entry.client}</td><td className="px-4 py-4 text-sm text-slate-600">{entry.description}</td><td className="px-4 py-4 font-semibold text-slate-950">{entry.amount}</td><td className="px-4 py-4"><CaBadge tone={entry.kind === 'Credit' ? 'positive' : 'warning'}>{entry.kind}</CaBadge></td></tr>)}</tbody></table></div></section> : null}
            </div>
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
