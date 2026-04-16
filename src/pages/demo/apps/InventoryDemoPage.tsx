import { useDeferredValue, useMemo, useState, type FormEvent } from 'react'
import { FiAlertTriangle, FiDownload, FiPackage, FiTruck } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createInventoryState, inventoryUsers } from '../../../data/demo/inventory'
import { buildToast, createCsvFromRows, downloadSampleFile } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Control'], ['stock', 'Stock Ledger'], ['purchase-orders', 'Procurement'], ['vendors', 'Vendors'], ['dispatch', 'Dispatch']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/inventory' : `/demo/inventory/${section}`
}

function OpsBadge({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-orange-50 text-orange-700' : 'bg-slate-100 text-slate-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function InventoryDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, patchState, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-inventory', createInitialState: createInventoryState, users: inventoryUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [query, setQuery] = useState('')
  const [poForm, setPoForm] = useState({ vendor: state.vendors[0]?.name ?? '', eta: '27 Apr', amount: 'Rs 1.2L' })
  const deferredQuery = useDeferredValue(query)
  const items = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase()
    if (!term) return state.items
    return state.items.filter((item) => [item.sku, item.name, item.zone].some((value) => value.toLowerCase().includes(term)))
  }, [deferredQuery, state.items])

  const approvePo = (id: string) => {
    patchState((current) => ({ ...current, purchaseOrders: current.purchaseOrders.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item)) }))
    addToast(buildToast('PO approved', 'Procurement state updated locally.', 'success'))
  }

  const draftPo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    patchState((current) => ({ ...current, purchaseOrders: [{ id: `PO-${Date.now()}`, vendor: poForm.vendor, eta: poForm.eta, amount: poForm.amount, status: 'Draft' }, ...current.purchaseOrders] }))
    addToast(buildToast('Purchase order drafted', 'PO saved to the demo workspace.', 'success'))
  }

  const exportStock = () => {
    downloadSampleFile('qode27-inventory-stock.csv', createCsvFromRows(state.items.map((item) => ({ sku: item.sku, name: item.name, zone: item.zone, onHand: item.onHand, reorderPoint: item.reorderPoint, status: item.status }))), 'text/csv;charset=utf-8')
    addToast(buildToast('Stock exported', 'CSV generated from mock warehouse data.', 'success'))
  }

  return (
    <>
      <Seo title="Inventory Interactive Demo | Qode27" description="Interactive frontend-only inventory demo with stock control, procurement, vendors, and dispatch." canonicalPath={activeSection === 'dashboard' ? '/demo/inventory' : `/demo/inventory/${activeSection}`} />
      <div className="min-h-screen bg-[#f5f6f7] text-slate-900">
        <div className="mx-auto grid min-h-screen max-w-[1680px] gap-4 px-4 py-4 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-5">
          <aside className="rounded-[1.8rem] bg-[linear-gradient(180deg,#18212b_0%,#0f172a_100%)] p-4 text-white shadow-[0_30px_70px_rgba(15,23,42,0.26)]">
            <Link to="/" className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-300">Qode27</Link>
            <div className="mt-5 rounded-[1.3rem] border border-white/10 bg-white/5 p-4"><p className="text-[0.68rem] uppercase tracking-[0.22em] text-orange-300">Warehouse control</p><h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Ops Layer</h1><p className="mt-3 text-sm leading-6 text-white/72">Industrial and denser, built for stock discipline instead of decorative dashboards.</p></div>
            <nav className="mt-6 space-y-2">{sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${activeSection === slug ? 'bg-orange-500 text-white' : 'text-white/72 hover:bg-white/8 hover:text-white'}`}><FiPackage />{label}</Link>)}</nav>
            <div className="mt-6 rounded-[1.2rem] border border-white/10 bg-black/20 p-4"><p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/55">Persona</p><select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Persona switched', 'Operational permissions updated.', 'info')) }} className="mt-3 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-3 text-sm text-white outline-none">{users.map((user) => <option key={user.email} value={user.email} className="text-slate-900">{user.name} · {user.role}</option>)}</select></div>
          </aside>

          <main className="space-y-4">
            <header className="rounded-[1.8rem] border border-slate-300 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-4xl"><p className="text-[0.72rem] uppercase tracking-[0.24em] text-orange-600">Demo Environment - sample data only</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">Warehouse software designed like an operational control room.</h2><p className="mt-4 text-base leading-8 text-slate-600">Inventory leads with stock exposure, vendor readiness, and throughput. The tone is practical and heavier, with metrics and alerts surfaced before softer summaries.</p></div>
                <div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Board refreshed', 'Warehouse telemetry reloaded locally.', 'info')) }} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh board'}</button><button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'Warehouse sample data restored.', 'success')) }} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900">Reset sample</button><a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white">Request tailored demo</a><a href={buildDemoWhatsAppHref(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-900">WhatsApp Qode27</a></div>
              </div>
            </header>

            {activeSection === 'dashboard' ? <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]"><section className="rounded-[1.5rem] border border-slate-300 bg-white p-6"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[['Warehouse Value', 'Rs 2.7Cr', 'Across 4 zones'], ['SKU Alerts', String(state.items.filter((item) => item.status !== 'Healthy').length), 'Reorder review required'], ['Fill Rate', '97.1%', 'Outbound discipline strong'], ['Pending Receivables', String(state.invoices.filter((item) => item.status === 'Pending').length), 'Commercial follow-up active']].map(([label, value, note]) => <div key={label} className="rounded-[1.1rem] border border-slate-300 bg-slate-50 p-4"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</div><div className="mt-6 grid gap-3 md:grid-cols-4">{[['Zone A', 'High turnover', '184 active units'], ['Zone B', 'Replenishment due', '62 active units'], ['Zone C', 'Critical reorder', '28 active units'], ['Zone D', 'Stable', '48 active units']].map(([zone, status, note]) => <div key={zone} className="rounded-[1rem] border border-slate-300 bg-white p-4"><p className="text-xs uppercase tracking-[0.18em] text-orange-600">{zone}</p><p className="mt-3 font-semibold text-slate-950">{status}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</div></section><section className="space-y-4"><div className="rounded-[1.5rem] border border-slate-300 bg-white p-5"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-950">Alert stack</p><FiAlertTriangle className="text-orange-500" /></div><div className="mt-4 space-y-3">{state.items.filter((item) => item.status !== 'Healthy').map((item) => <div key={item.sku} className="rounded-[1rem] border border-orange-100 bg-orange-50/60 p-4"><p className="font-semibold text-slate-950">{item.name}</p><p className="mt-1 text-sm text-slate-600">{item.sku} · Zone {item.zone}</p><p className="mt-3 text-xs uppercase tracking-[0.18em] text-orange-700">On hand {item.onHand} / reorder {item.reorderPoint}</p></div>)}</div></div><div className="rounded-[1.5rem] border border-slate-300 bg-white p-5"><p className="text-sm font-semibold text-slate-950">Commercial watchlist</p><div className="mt-4 space-y-3">{state.invoices.map((invoice) => <div key={invoice.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold text-slate-950">{invoice.customer}</p><p className="mt-1 text-sm text-slate-600">{invoice.amount}</p></div><OpsBadge tone={invoice.status === 'Paid' ? 'positive' : 'warning'}>{invoice.status}</OpsBadge></div><p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">Due {invoice.dueDate}</p></div>)}</div></div></section></div> : null}

            {activeSection === 'stock' ? <section className="rounded-[1.5rem] border border-slate-300 bg-white p-6"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h3 className="text-2xl font-semibold text-slate-950">Stock ledger</h3><p className="mt-2 text-sm text-slate-600">Dense SKU-first visibility for warehouse teams.</p></div><div className="flex gap-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search SKU, item, zone" className="min-h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none" /><button type="button" onClick={exportStock} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-900"><FiDownload />Export</button></div></div><div className="mt-6 overflow-hidden rounded-[1.3rem] border border-slate-300"><table className="min-w-full"><thead className="bg-slate-100"><tr>{['SKU', 'Item', 'Zone', 'On Hand', 'Reorder', 'Status'].map((head) => <th key={head} className="px-4 py-3 text-left text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">{head}</th>)}</tr></thead><tbody>{items.map((item) => <tr key={item.sku} className="border-t border-slate-200"><td className="px-4 py-4 font-semibold text-slate-950">{item.sku}</td><td className="px-4 py-4 text-sm text-slate-600">{item.name}</td><td className="px-4 py-4 text-sm text-slate-600">{item.zone}</td><td className="px-4 py-4 text-sm text-slate-600">{item.onHand}</td><td className="px-4 py-4 text-sm text-slate-600">{item.reorderPoint}</td><td className="px-4 py-4"><OpsBadge tone={item.status === 'Healthy' ? 'positive' : 'warning'}>{item.status}</OpsBadge></td></tr>)}</tbody></table></div></section> : null}

            {activeSection === 'purchase-orders' ? <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]"><div className="rounded-[1.5rem] border border-slate-300 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Procurement queue</h3><div className="mt-6 space-y-3">{state.purchaseOrders.map((purchaseOrder) => <div key={purchaseOrder.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{purchaseOrder.vendor}</p><p className="mt-1 text-sm text-slate-600">{purchaseOrder.id} · ETA {purchaseOrder.eta}</p></div><div className="flex items-center gap-3"><OpsBadge tone={purchaseOrder.status === 'Approved' ? 'positive' : purchaseOrder.status === 'Draft' ? 'warning' : 'neutral'}>{purchaseOrder.status}</OpsBadge>{purchaseOrder.status !== 'Approved' ? <button type="button" onClick={() => approvePo(purchaseOrder.id)} className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white">Approve</button> : null}</div></div><p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{purchaseOrder.amount}</p></div>)}</div></div><form onSubmit={draftPo} className="rounded-[1.5rem] border border-slate-300 bg-white p-6"><h3 className="text-xl font-semibold text-slate-950">Draft purchase order</h3><div className="mt-6 grid gap-4"><select value={poForm.vendor} onChange={(event) => setPoForm((current) => ({ ...current, vendor: event.target.value }))} className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none">{state.vendors.map((vendor) => <option key={vendor.id} value={vendor.name}>{vendor.name}</option>)}</select><input value={poForm.eta} onChange={(event) => setPoForm((current) => ({ ...current, eta: event.target.value }))} className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none" /><input value={poForm.amount} onChange={(event) => setPoForm((current) => ({ ...current, amount: event.target.value }))} className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none" /><button type="submit" className="min-h-12 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white">Save draft</button></div></form></section> : null}

            {activeSection === 'vendors' ? <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]"><div className="rounded-[1.5rem] border border-slate-300 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Vendor performance</h3><div className="mt-6 space-y-3">{state.vendors.map((vendor) => <div key={vendor.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold text-slate-950">{vendor.name}</p><p className="mt-1 text-sm text-slate-600">{vendor.category}</p></div><div className="text-right text-sm text-slate-600"><p>{vendor.fillRate} fill rate</p><p className="mt-1">{vendor.leadTime}</p></div></div></div>)}</div></div><div className="rounded-[1.5rem] border border-slate-300 bg-[linear-gradient(180deg,#ffffff_0%,#fff7ed_100%)] p-6"><p className="text-xs uppercase tracking-[0.22em] text-orange-600">Operator note</p><div className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><p>Vendors sit beside receivables because ops teams care about supply continuity and cash discipline together.</p><p>Sample exports and approvals remain frontend-only and safe for live walkthroughs.</p></div></div></section> : null}

            {activeSection === 'dispatch' ? <section className="rounded-[1.5rem] border border-slate-300 bg-white p-6"><div className="flex items-center gap-3"><FiTruck className="text-orange-500" /><h3 className="text-2xl font-semibold text-slate-950">Dispatch board</h3></div><div className="mt-6 grid gap-4 md:grid-cols-3">{[['Picking', '18 orders', 'Zone A and B active'], ['Packing', '11 orders', '1 invoice hold pending'], ['Outward', '27 dispatches', '97.1% fill rate']].map(([title, count, note]) => <div key={title} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-5"><p className="text-xs uppercase tracking-[0.18em] text-orange-600">{title}</p><p className="mt-3 text-2xl font-semibold text-slate-950">{count}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</div></section> : null}
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
