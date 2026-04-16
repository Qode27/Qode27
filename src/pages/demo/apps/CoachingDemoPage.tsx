import { useState } from 'react'
import { FiBookOpen, FiCalendar, FiDollarSign, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { coachingUsers, createCoachingState } from '../../../data/demo/coaching'
import { buildToast } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Campus'], ['students', 'Students'], ['timetable', 'Timetable'], ['fees', 'Fees'], ['admissions', 'Admissions']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/coaching' : `/demo/coaching/${section}`
}

function EduBadge({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-rose-50 text-rose-700' : 'bg-violet-50 text-violet-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function CoachingDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, patchState, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-coaching', createInitialState: createCoachingState, users: coachingUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [selectedDay, setSelectedDay] = useState('Mon')

  const markCollected = (id: string) => {
    patchState((current) => ({ ...current, fees: current.fees.map((fee) => (fee.id === id ? { ...fee, status: 'Paid' } : fee)) }))
    addToast(buildToast('Fee updated', 'Collection status changed in local demo state.', 'success'))
  }

  const moveLead = (id: string) => {
    patchState((current) => ({ ...current, leads: current.leads.map((lead) => (lead.id === id ? { ...lead, stage: lead.stage === 'Inquiry' ? 'Counselling' : 'Admitted' } : lead)) }))
    addToast(buildToast('Admission stage updated', 'Lead progression saved locally.', 'success'))
  }

  return (
    <>
      <Seo title="Coaching Institute Interactive Demo | Qode27" description="Interactive frontend-only coaching software demo with students, timetable, attendance, fees, and admissions." canonicalPath={activeSection === 'dashboard' ? '/demo/coaching' : `/demo/coaching/${activeSection}`} />
      <div className="min-h-screen bg-[#faf5ff] text-slate-900">
        <div className="mx-auto max-w-[1650px] px-4 py-4 lg:px-6">
          <header className="rounded-[2rem] border border-violet-100 bg-[linear-gradient(135deg,#ffffff_0%,#faf5ff_60%,#fdf2f8_100%)] p-6 shadow-[0_24px_60px_rgba(91,33,182,0.08)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl"><div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-violet-600"><Link to="/" className="font-semibold">Qode27</Link><span className="h-1 w-1 rounded-full bg-violet-300" /><span>Demo Environment - sample data only</span></div><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">Institute software designed around classes, attendance rhythm, and fee visibility.</h1><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">This product feels like a campus hub. Timetables, batch health, and fee follow-up lead the experience instead of a corporate admin dashboard.</p></div>
              <div className="grid gap-3 sm:grid-cols-2"><select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Persona switched', 'Institute workspace updated for the selected role.', 'info')) }} className="min-h-12 rounded-xl border border-violet-100 bg-white px-4 text-sm outline-none">{users.map((user) => <option key={user.email} value={user.email}>{user.name} · {user.role}</option>)}</select><button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Campus refreshed', 'Schedule and fee data refreshed locally.', 'info')) }} className="rounded-xl border border-violet-100 bg-white px-4 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh'}</button><button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'Institute sample data restored.', 'success')) }} className="rounded-xl border border-violet-100 bg-white px-4 text-sm font-semibold text-slate-900">Reset</button><a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white">Request tailored demo</a></div>
            </div>
            <nav className="mt-6 flex flex-wrap gap-2">{sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeSection === slug ? 'bg-violet-600 text-white' : 'bg-white text-slate-700 hover:bg-violet-50 hover:text-violet-700'}`}>{label}</Link>)}</nav>
          </header>

          <main className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              {activeSection === 'dashboard' ? <><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[['Students', '1,284', '92 new admissions'], ['Attendance', '91.3%', 'Morning batches stronger'], ['Fee Collection', 'Rs 18.6L', '27 dues this week'], ['Faculty Slots', '42', '6 classes today']].map(([label, value, note]) => <div key={label} className="rounded-[1.5rem] border border-violet-100 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</section><section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><div className="flex items-center gap-3"><FiCalendar className="text-violet-600" /><h3 className="text-2xl font-semibold text-slate-950">Today timetable</h3></div><div className="mt-5 flex gap-2">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <button key={day} type="button" onClick={() => setSelectedDay(day)} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedDay === day ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700'}`}>{day}</button>)}</div><div className="mt-6 grid gap-3">{state.timetable.map((classItem) => <div key={classItem.id} className="grid gap-3 rounded-[1.2rem] border border-violet-100 bg-violet-50/50 p-4 md:grid-cols-[0.8fr_1.2fr_0.8fr_auto] md:items-center"><p className="font-semibold text-slate-950">{classItem.slot}</p><div><p className="font-semibold text-slate-950">{classItem.subject}</p><p className="mt-1 text-sm text-slate-600">{classItem.faculty}</p></div><p className="text-sm text-slate-600">{classItem.batch}</p><EduBadge tone="neutral">{classItem.room}</EduBadge></div>)}</div></section></> : null}
              {activeSection === 'students' ? <section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><div className="flex items-center gap-3"><FiUsers className="text-violet-600" /><h3 className="text-2xl font-semibold text-slate-950">Student roster</h3></div><div className="mt-6 space-y-3">{state.students.map((student) => <div key={student.id} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(91,33,182,0.04)]"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{student.name}</p><p className="mt-1 text-sm text-slate-600">{student.batch} · {student.program}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{student.attendance}</span><EduBadge tone={student.feeStatus === 'Paid' ? 'positive' : student.feeStatus === 'Overdue' ? 'warning' : 'neutral'}>{student.feeStatus}</EduBadge></div></div></div>)}</div></section> : null}
              {activeSection === 'timetable' ? <section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><div className="flex items-center gap-3"><FiBookOpen className="text-violet-600" /><h3 className="text-2xl font-semibold text-slate-950">Batch timetable</h3></div><div className="mt-6 grid gap-4 md:grid-cols-2">{state.timetable.map((classItem) => <div key={classItem.id} className="rounded-[1.2rem] border border-violet-100 bg-violet-50/50 p-5"><p className="text-xs uppercase tracking-[0.18em] text-violet-600">{classItem.batch}</p><p className="mt-3 text-xl font-semibold text-slate-950">{classItem.subject}</p><p className="mt-2 text-sm text-slate-600">{classItem.faculty} · {classItem.slot}</p><div className="mt-4"><EduBadge tone="neutral">{classItem.room}</EduBadge></div></div>)}</div></section> : null}
              {activeSection === 'fees' ? <section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><div className="flex items-center gap-3"><FiDollarSign className="text-violet-600" /><h3 className="text-2xl font-semibold text-slate-950">Fee tracking</h3></div><div className="mt-6 space-y-3">{state.fees.map((fee) => <div key={fee.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{fee.student}</p><p className="mt-1 text-sm text-slate-600">{fee.amount} · Due {fee.dueDate}</p></div><div className="flex items-center gap-3"><EduBadge tone={fee.status === 'Paid' ? 'positive' : fee.status === 'Overdue' ? 'warning' : 'neutral'}>{fee.status}</EduBadge>{fee.status !== 'Paid' ? <button type="button" onClick={() => markCollected(fee.id)} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white">Mark paid</button> : null}</div></div></div>)}</div></section> : null}
              {activeSection === 'admissions' ? <section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Admissions pipeline</h3><div className="mt-6 grid gap-4 md:grid-cols-3">{[['Inquiry'], ['Counselling'], ['Admitted']].map((lane) => <div key={lane[0]} className="rounded-[1.2rem] border border-violet-100 bg-violet-50/50 p-4"><p className="text-xs uppercase tracking-[0.18em] text-violet-600">{lane[0]}</p><div className="mt-4 space-y-3">{state.leads.filter((lead) => lead.stage === lane[0]).map((lead) => <div key={lead.id} className="rounded-xl bg-white p-3 shadow-[0_8px_20px_rgba(91,33,182,0.05)]"><p className="font-semibold text-slate-950">{lead.student}</p><p className="mt-1 text-sm text-slate-600">{lead.program} · {lead.source}</p>{lead.stage !== 'Admitted' ? <button type="button" onClick={() => moveLead(lead.id)} className="mt-3 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white">Move forward</button> : null}</div>)}</div></div>)}</div></section> : null}
            </div>
            <aside className="space-y-6"><section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><p className="text-xs uppercase tracking-[0.22em] text-violet-600">Campus note</p><div className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><p>Student attendance, fees, and admissions all mutate the same mock dataset, so the walkthrough feels connected.</p><p>Batch-first design makes this feel like institute software, not a generic admin panel.</p><p><a href={buildDemoWhatsAppHref(app.name)} className="font-semibold text-violet-700">WhatsApp Qode27</a> for a tailored rollout.</p></div></section><section className="rounded-[1.8rem] border border-violet-100 bg-white p-6"><p className="text-xs uppercase tracking-[0.22em] text-violet-600">Attendance rhythm</p><div className="mt-5 grid h-48 grid-cols-6 items-end gap-3">{state.attendanceTrend.map((point) => <div key={point.label} className="flex h-full flex-col justify-end"><div className="rounded-full bg-violet-50 p-2"><div className="rounded-full bg-[linear-gradient(180deg,#ec4899_0%,#7c3aed_100%)]" style={{ height: `${point.value}%` }} /></div><p className="mt-2 text-center text-xs uppercase tracking-[0.18em] text-slate-500">{point.label}</p></div>)}</div></section></aside>
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
