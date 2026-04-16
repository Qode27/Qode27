import { useState, type FormEvent } from 'react'
import { FiCircle, FiMapPin, FiTruck } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createTruckParkingState, truckParkingUsers } from '../../../data/demo/truckParking'
import { buildToast, createCsvFromRows, downloadSampleFile } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Live Board'], ['bays', 'Bay Grid'], ['movement', 'Movement'], ['revenue', 'Revenue'], ['surveillance', 'Surveillance']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/parking' : `/demo/parking/${section}`
}

function YardBadge({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-500/14 text-emerald-300' : tone === 'warning' ? 'bg-amber-500/14 text-amber-300' : 'bg-white/10 text-white'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function TruckParkingDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, patchState, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-truck-parking', createInitialState: createTruckParkingState, users: truckParkingUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [movementForm, setMovementForm] = useState({ truckNumber: '', transporter: '', bay: 'B-12' })

  const queueTruck = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!movementForm.truckNumber.trim() || !movementForm.transporter.trim()) {
      addToast(buildToast('Incomplete entry', 'Add truck number and transporter.', 'warning'))
      return
    }
    patchState((current) => ({ ...current, movements: [{ id: `MOV-${Date.now()}`, truckNumber: movementForm.truckNumber, transporter: movementForm.transporter, bay: movementForm.bay, duration: '00h 05m', status: 'Queued' }, ...current.movements], bays: current.bays.map((bay) => (bay.id === movementForm.bay ? { ...bay, status: 'Reserved', eta: 'Arriving now' } : bay)) }))
    setMovementForm({ truckNumber: '', transporter: '', bay: 'B-12' })
    addToast(buildToast('Truck queued', 'Movement register updated locally.', 'success'))
  }

  const markPaid = (id: string) => {
    patchState((current) => ({ ...current, invoices: current.invoices.map((invoice) => (invoice.id === id ? { ...invoice, status: 'Paid' } : invoice)) }))
    addToast(buildToast('Receipt updated', 'Payment status changed in local demo state.', 'success'))
  }

  const exportMovementLog = () => {
    downloadSampleFile('qode27-yard-movements.csv', createCsvFromRows(state.movements.map((movement) => ({ truckNumber: movement.truckNumber, transporter: movement.transporter, bay: movement.bay, duration: movement.duration, status: movement.status }))), 'text/csv;charset=utf-8')
    addToast(buildToast('Movement log exported', 'CSV created locally.', 'success'))
  }

  return (
    <>
      <Seo title="Truck Parking Interactive Demo | Qode27" description="Interactive frontend-only truck parking demo with occupancy, movement logs, bay allocation, and yard revenue." canonicalPath={activeSection === 'dashboard' ? '/demo/parking' : `/demo/parking/${activeSection}`} />
      <div className="min-h-screen bg-[#121212] text-white">
        <div className="mx-auto max-w-[1700px] px-4 py-4 lg:px-6">
          <header className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(10,10,10,0.96))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl"><div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-amber-300"><Link to="/" className="font-semibold text-amber-200">Qode27</Link><span className="h-1 w-1 rounded-full bg-amber-200/60" /><span>Demo Environment - sample data only</span></div><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">A live yard command center for occupancy, movement, and earnings.</h1><p className="mt-4 max-w-3xl text-base leading-8 text-white/72">This product is intentionally bolder and more tactical than the others. It behaves like an operations room with live status emphasis, bay allocation, and fast entry-to-payment flow.</p></div>
              <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[26rem]"><select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Operator switched', 'Yard permissions updated for the selected role.', 'info')) }} className="min-h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none">{users.map((user) => <option key={user.email} value={user.email} className="text-slate-900">{user.name} · {user.role}</option>)}</select><button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Board refreshed', 'Live signals refreshed locally.', 'info')) }} className="rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white">{isRefreshing ? 'Refreshing...' : 'Refresh live board'}</button><button type="button" onClick={() => { resetDemo(); addToast(buildToast('Yard reset', 'Sample movement data restored.', 'success')) }} className="rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white">Reset yard</button><button type="button" onClick={exportMovementLog} className="rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white">Export movement log</button></div>
            </div>
            <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><nav className="flex flex-wrap gap-2">{sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${activeSection === slug ? 'border-transparent bg-amber-400 text-black' : 'border-white/10 bg-white/5 text-white/80 hover:text-white'}`}>{label}</Link>)}</nav><div className="flex flex-col gap-3 sm:flex-row"><a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-5 text-sm font-semibold text-black">Request tailored demo</a><a href={buildDemoWhatsAppHref(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-5 text-sm font-semibold text-white">WhatsApp Qode27</a></div></div>
          </header>

          <main className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              {activeSection === 'dashboard' ? <><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[['Occupied Bays', `${state.bays.filter((item) => item.status === 'Occupied').length}/67`, '2 lanes near capacity'], ['Queued Trucks', `${state.movements.filter((item) => item.status === 'Queued').length}`, 'Gate load manageable'], ['Daily Revenue', 'Rs 1.46L', '11% above average'], ['Avg Stay', '6h 12m', 'Turnaround improving']].map(([label, value, note]) => <div key={label} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5"><p className="text-sm text-white/55">{label}</p><p className="mt-4 text-3xl font-semibold text-white">{value}</p><p className="mt-2 text-sm text-white/68">{note}</p></div>)}</section><section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><div className="flex items-center justify-between gap-3"><h3 className="text-2xl font-semibold text-white">Live movement board</h3><YardBadge tone="warning">Movement priority</YardBadge></div><div className="mt-6 space-y-3">{state.movements.map((movement) => <div key={movement.id} className="grid gap-3 rounded-[1.1rem] border border-white/10 bg-black/20 p-4 md:grid-cols-[1.2fr_0.7fr_0.7fr_auto] md:items-center"><div><p className="font-semibold text-white">{movement.truckNumber}</p><p className="mt-1 text-sm text-white/60">{movement.transporter}</p></div><p className="text-sm text-white/72">{movement.bay}</p><p className="text-sm text-white/72">{movement.duration}</p><YardBadge tone={movement.status === 'Parked' ? 'positive' : movement.status === 'Queued' ? 'warning' : 'neutral'}>{movement.status}</YardBadge></div>)}</div></section></> : null}

              {activeSection === 'bays' ? <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><h3 className="text-2xl font-semibold text-white">Bay occupancy grid</h3><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{state.bays.map((bay) => <div key={bay.id} className="rounded-[1.1rem] border border-white/10 bg-black/20 p-4"><div className="flex items-center justify-between gap-3"><p className="text-xl font-semibold text-white">{bay.id}</p><YardBadge tone={bay.status === 'Available' ? 'positive' : bay.status === 'Reserved' ? 'warning' : 'neutral'}>{bay.status}</YardBadge></div><p className="mt-4 text-sm text-white/68">{bay.zone}</p><p className="mt-1 text-sm text-white/54">{bay.truckType}</p><p className="mt-4 text-xs uppercase tracking-[0.18em] text-amber-300">{bay.eta}</p></div>)}</div></section> : null}

              {activeSection === 'movement' ? <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><h3 className="text-2xl font-semibold text-white">Queue vehicle</h3><form onSubmit={queueTruck} className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_0.9fr_auto] md:items-end"><input value={movementForm.truckNumber} onChange={(event) => setMovementForm((current) => ({ ...current, truckNumber: event.target.value }))} placeholder="Truck number" className="min-h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none" /><input value={movementForm.transporter} onChange={(event) => setMovementForm((current) => ({ ...current, transporter: event.target.value }))} placeholder="Transporter" className="min-h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none" /><select value={movementForm.bay} onChange={(event) => setMovementForm((current) => ({ ...current, bay: event.target.value }))} className="min-h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none">{state.bays.map((bay) => <option key={bay.id} value={bay.id} className="text-slate-900">{bay.id} · {bay.zone}</option>)}</select><button type="submit" className="min-h-12 rounded-xl bg-amber-400 px-5 text-sm font-semibold text-black">Add to queue</button></form></section> : null}

              {activeSection === 'revenue' ? <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><h3 className="text-2xl font-semibold text-white">Receipts and pending payments</h3><div className="mt-6 space-y-3">{state.invoices.map((invoice) => <div key={invoice.id} className="rounded-[1.1rem] border border-white/10 bg-black/20 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-white">{invoice.transporter}</p><p className="mt-1 text-sm text-white/60">{invoice.amount} · {invoice.mode}</p></div><div className="flex items-center gap-3"><YardBadge tone={invoice.status === 'Paid' ? 'positive' : 'warning'}>{invoice.status}</YardBadge>{invoice.status === 'Pending' ? <button type="button" onClick={() => markPaid(invoice.id)} className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-black">Mark paid</button> : null}</div></div></div>)}</div></section> : null}

              {activeSection === 'surveillance' ? <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><div className="grid gap-4 md:grid-cols-3">{['Gate camera 01', 'Central lane 02', 'Payment kiosk 03'].map((camera, index) => <div key={camera} className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,#1b1b1b_0%,#0d0d0d_100%)] p-4"><div className="flex items-center justify-between gap-3"><p className="font-semibold text-white">{camera}</p><FiCircle className={index === 1 ? 'text-amber-300' : 'text-emerald-300'} /></div><div className="mt-4 h-40 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(250,204,21,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" /><p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/50">Placeholder feed for demo storytelling</p></div>)}</div></section> : null}
            </div>

            <aside className="space-y-5">
              <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><p className="text-xs uppercase tracking-[0.22em] text-amber-300">Yard map</p><div className="mt-5 grid grid-cols-4 gap-3">{Array.from({ length: 12 }, (_, index) => <div key={index} className={`rounded-xl p-4 text-center text-sm font-semibold ${index % 5 === 0 ? 'bg-amber-400 text-black' : index % 3 === 0 ? 'bg-orange-500 text-white' : 'bg-white/10 text-white'}`}>B-{String(index + 1).padStart(2, '0')}</div>)}</div></section>
              <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><p className="text-xs uppercase tracking-[0.22em] text-amber-300">Operator notes</p><div className="mt-4 space-y-3 text-sm leading-6 text-white/68"><p>Entry, exit, bay status, and receipts all mutate the same local-only yard state.</p><p>Live-looking visuals are simulated, so this route stays safe for production websites with zero extra infra.</p></div></section>
              <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><div className="flex items-center gap-3"><FiMapPin className="text-amber-300" /><p className="font-semibold text-white">North gate alert</p></div><p className="mt-3 text-sm leading-6 text-white/68">One incoming tanker is reserved for bay B-07. Manual override remains disabled in demo mode.</p></section>
              <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"><div className="flex items-center gap-3"><FiTruck className="text-amber-300" /><p className="font-semibold text-white">Fast lane</p></div><p className="mt-3 text-sm leading-6 text-white/68">Two trucks are tagged for exit within the next 20 minutes.</p></section>
            </aside>
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
