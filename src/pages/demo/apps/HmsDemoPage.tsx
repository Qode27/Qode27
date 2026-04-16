import { useState, type FormEvent } from 'react'
import { FiActivity, FiCalendar, FiCreditCard, FiFileText, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createHmsState, hmsUsers } from '../../../data/demo/hms'
import { buildToast, createCsvFromRows, downloadSampleFile } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Control Desk'], ['patients', 'Patients'], ['appointments', 'Appointments'], ['billing', 'Billing'], ['prescriptions', 'Prescriptions']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/hms' : `/demo/hms/${section}`
}

function MedChip({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function HmsDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, patchState, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-hms', createInitialState: createHmsState, users: hmsUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [appointmentForm, setAppointmentForm] = useState({ patient: '', doctor: state.doctors[0]?.name ?? '', time: '03:15 PM', type: 'Follow-up' })

  const addAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!appointmentForm.patient.trim()) {
      addToast(buildToast('Patient name required', 'Add patient name to continue.', 'warning'))
      return
    }
    patchState((current) => ({ ...current, appointments: [{ id: `APT-${Date.now()}`, patient: appointmentForm.patient, doctor: appointmentForm.doctor, time: appointmentForm.time, type: appointmentForm.type, status: 'Confirmed' }, ...current.appointments] }))
    setAppointmentForm({ patient: '', doctor: state.doctors[0]?.name ?? '', time: '03:15 PM', type: 'Follow-up' })
    addToast(buildToast('Appointment booked', 'This registration exists only in local demo state.', 'success'))
  }

  const settleBill = (id: string) => {
    patchState((current) => ({ ...current, billings: current.billings.map((item) => (item.id === id ? { ...item, status: 'Settled' } : item)) }))
    addToast(buildToast('Bill settled', 'Billing desk updated locally.', 'success'))
  }

  const exportBilling = () => {
    downloadSampleFile('qode27-hms-billing.csv', createCsvFromRows(state.billings.map((billing) => ({ department: billing.department, amount: billing.amount, mode: billing.paymentMode, status: billing.status }))), 'text/csv;charset=utf-8')
    addToast(buildToast('Billing exported', 'Sample report created in-browser.', 'success'))
  }

  return (
    <>
      <Seo title="Hospital Management Interactive Demo | Qode27" description="Interactive frontend-only hospital demo with patient flow, doctor schedules, billing, and prescriptions." canonicalPath={activeSection === 'dashboard' ? '/demo/hms' : `/demo/hms/${activeSection}`} />
      <div className="min-h-screen bg-[#f3fbfb]">
        <div className="mx-auto max-w-[1600px] px-4 py-4 lg:px-6">
          <header className="overflow-hidden rounded-[2rem] border border-teal-100 bg-white shadow-[0_26px_70px_rgba(8,47,73,0.08)]">
            <div className="border-b border-teal-100 bg-[linear-gradient(135deg,#f0fdfa_0%,#ffffff_60%)] px-6 py-5">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-4">
                  <Link to="/" className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">Qode27</Link>
                  <div className="hidden h-8 w-px bg-teal-100 sm:block" />
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.24em] text-teal-600">Demo Environment - sample data only</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-950">Clinical flow board</h1>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Persona switched', 'Clinical workspace updated for the selected role.', 'info')) }} className="min-h-12 rounded-xl border border-teal-100 bg-white px-4 text-sm outline-none">
                    {users.map((user) => <option key={user.email} value={user.email}>{user.name} · {user.role}</option>)}
                  </select>
                  <button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Desk refreshed', 'Hospital workflow refreshed locally.', 'info')) }} className="rounded-xl border border-teal-100 bg-white px-4 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh'}</button>
                  <button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'Hospital sample records restored.', 'success')) }} className="rounded-xl border border-teal-100 bg-white px-4 text-sm font-semibold text-slate-900">Reset</button>
                </div>
              </div>
              <div className="mt-5 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
                <div>
                  <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950">Built for fast reception, patient flow, and billing certainty.</h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">This product behaves like a medical operations desk: denser, faster, and more action-oriented than a typical admin dashboard.</p>
                </div>
                <div className="rounded-[1.6rem] border border-teal-100 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-950">Quick actions</p>
                  <div className="mt-4 grid gap-3">
                    <a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white">Request tailored demo</a>
                    <a href={buildDemoWhatsAppHref(app.name)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-teal-100 px-4 text-sm font-semibold text-slate-900">WhatsApp Qode27</a>
                  </div>
                </div>
              </div>
            </div>
            <nav className="flex flex-wrap gap-2 px-6 py-4">
              {sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${activeSection === slug ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-700'}`}>{slug === 'dashboard' ? <FiActivity /> : slug === 'appointments' ? <FiCalendar /> : slug === 'billing' ? <FiCreditCard /> : slug === 'prescriptions' ? <FiFileText /> : <FiUsers />}{label}</Link>)}
            </nav>
          </header>

          <main className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              {activeSection === 'dashboard' ? <><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[['Appointments', '126', '14 walk-ins included'], ['Collections', 'Rs 4.8L', 'Billing desk ahead'], ['Ward Utilisation', '82%', '12 beds available'], ['Pending Claims', '11', '3 need escalation']].map(([label, value, note]) => <div key={label} className="rounded-[1.5rem] border border-teal-100 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</section><section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><div className="flex items-center justify-between gap-3"><div><h3 className="text-2xl font-semibold text-slate-950">Live patient board</h3><p className="mt-2 text-sm leading-6 text-slate-600">A reception-first view of current admissions and waiting patients.</p></div><MedChip tone="neutral">Clinical priority</MedChip></div><div className="mt-6 grid gap-3">{state.patients.map((patient) => <div key={patient.id} className="grid gap-3 rounded-[1.2rem] border border-teal-100 bg-teal-50/40 p-4 md:grid-cols-[1.2fr_0.9fr_0.7fr_auto] md:items-center"><div><p className="font-semibold text-slate-950">{patient.name}</p><p className="mt-1 text-sm text-slate-600">{patient.id} · {patient.unit}</p></div><p className="text-sm text-slate-600">{patient.doctor}</p><p className="text-sm text-slate-600">{patient.bill}</p><MedChip tone={patient.status === 'Admitted' ? 'positive' : patient.status === 'Waiting' ? 'warning' : 'neutral'}>{patient.status}</MedChip></div>)}</div></section></> : null}

              {activeSection === 'patients' ? <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Patient registration records</h3><div className="mt-6 space-y-3">{state.patients.map((patient) => <div key={patient.id} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(8,47,73,0.04)]"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{patient.name}</p><p className="mt-1 text-sm text-slate-600">{patient.unit} · {patient.doctor}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{patient.bill}</span><MedChip tone={patient.status === 'Admitted' ? 'positive' : patient.status === 'Waiting' ? 'warning' : 'neutral'}>{patient.status}</MedChip></div></div></div>)}</div></section> : null}

              {activeSection === 'appointments' ? <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Appointments desk</h3><div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]"><div className="space-y-3">{state.appointments.map((appointment) => <div key={appointment.id} className="rounded-[1.2rem] border border-teal-100 bg-teal-50/40 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{appointment.patient}</p><p className="mt-1 text-sm text-slate-600">{appointment.doctor} · {appointment.type}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{appointment.time}</span><MedChip tone={appointment.status === 'Checked In' ? 'positive' : appointment.status === 'Delayed' ? 'warning' : 'neutral'}>{appointment.status}</MedChip></div></div></div>)}</div><form onSubmit={addAppointment} className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-5"><h4 className="text-lg font-semibold text-slate-950">Register appointment</h4><div className="mt-4 grid gap-4"><input value={appointmentForm.patient} onChange={(event) => setAppointmentForm((current) => ({ ...current, patient: event.target.value }))} placeholder="Patient name" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" /><select value={appointmentForm.doctor} onChange={(event) => setAppointmentForm((current) => ({ ...current, doctor: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">{state.doctors.map((doctor) => <option key={doctor.id} value={doctor.name}>{doctor.name}</option>)}</select><div className="grid gap-4 sm:grid-cols-2"><input value={appointmentForm.time} onChange={(event) => setAppointmentForm((current) => ({ ...current, time: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" /><input value={appointmentForm.type} onChange={(event) => setAppointmentForm((current) => ({ ...current, type: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" /></div><button type="submit" className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white">Add appointment</button></div></form></div></section> : null}

              {activeSection === 'billing' ? <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h3 className="text-2xl font-semibold text-slate-950">Billing and claims</h3><p className="mt-2 text-sm text-slate-600">Collections stay tied to departments and payment mode, not just invoice rows.</p></div><button type="button" onClick={exportBilling} className="rounded-xl border border-teal-100 px-4 py-3 text-sm font-semibold text-slate-900">Export sample billing</button></div><div className="mt-6 space-y-3">{state.billings.map((billing) => <div key={billing.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{billing.department}</p><p className="mt-1 text-sm text-slate-600">{billing.amount} · {billing.paymentMode}</p></div><div className="flex items-center gap-3"><MedChip tone={billing.status === 'Settled' ? 'positive' : 'warning'}>{billing.status}</MedChip>{billing.status === 'Pending' ? <button type="button" onClick={() => settleBill(billing.id)} className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white">Mark settled</button> : null}</div></div></div>)}</div></section> : null}

              {activeSection === 'prescriptions' ? <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Prescription and diagnostics snapshot</h3><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[['PAT-401', 'Cardiology meds + ECG review', 'Urgent review'], ['PAT-412', 'General medicine refill + CBC', 'Lab billing linked'], ['PAT-427', 'Neurology imaging package', 'Insurance authorization']].map(([patient, note, tag]) => <div key={patient} className="rounded-[1.3rem] border border-teal-100 bg-teal-50/40 p-5"><p className="text-sm font-semibold text-slate-950">{patient}</p><p className="mt-2 text-sm leading-6 text-slate-600">{note}</p><div className="mt-4"><MedChip tone="neutral">{tag}</MedChip></div></div>)}</div></section> : null}
            </div>

            <aside className="space-y-6">
              <section className="rounded-[1.8rem] border border-teal-100 bg-white p-6"><p className="text-xs uppercase tracking-[0.22em] text-teal-600">Doctor schedule</p><div className="mt-5 space-y-3">{state.doctors.map((doctor) => <div key={doctor.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><p className="font-semibold text-slate-950">{doctor.name}</p><p className="mt-1 text-sm text-slate-600">{doctor.specialty} · Room {doctor.room}</p><p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{doctor.opdLoad}</p></div>)}</div></section>
              <section className="rounded-[1.8rem] border border-teal-100 bg-[linear-gradient(180deg,#ffffff_0%,#f0fdfa_100%)] p-6"><p className="text-xs uppercase tracking-[0.22em] text-teal-600">Workflow note</p><div className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><p>Forms, registration, and payment updates never touch live patient systems.</p><p>This demo intentionally feels operational and clinical rather than decorative.</p><p>Reception, appointments, and billing can all be shown live without backend risk.</p></div></section>
            </aside>
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
