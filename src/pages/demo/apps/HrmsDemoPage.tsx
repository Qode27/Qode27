import { useDeferredValue, useMemo, useState, type FormEvent } from 'react'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createHrmsState, hrmsUsers, type HrmsCandidate } from '../../../data/demo/hrms'
import { buildToast, createCsvFromRows, downloadSampleFile } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Overview'], ['employees', 'Directory'], ['leave', 'Leave Desk'], ['payroll', 'Payroll'], ['recruitment', 'Hiring']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/hrms' : `/demo/hrms/${section}`
}

function HrChip({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function HrmsDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, patchState, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast } = useDemoAppState({ storageKey: 'qode27-demo-hrms', createInitialState: createHrmsState, users: hrmsUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [query, setQuery] = useState('')
  const [candidateForm, setCandidateForm] = useState({ name: '', role: '', owner: currentUser.name })
  const deferredQuery = useDeferredValue(query)
  const employees = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase()
    if (!term) return state.employees
    return state.employees.filter((employee) => [employee.name, employee.department, employee.location, employee.role].some((value) => value.toLowerCase().includes(term)))
  }, [deferredQuery, state.employees])

  const approveLeave = (id: string) => {
    patchState((current) => ({ ...current, leaveRequests: current.leaveRequests.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item)) }))
    addToast(buildToast('Leave approved', 'This approval changed local demo state only.', 'success'))
  }

  const addCandidate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!candidateForm.name.trim() || !candidateForm.role.trim()) {
      addToast(buildToast('Incomplete profile', 'Add candidate name and role first.', 'warning'))
      return
    }
    const newCandidate: HrmsCandidate = { id: `CAN-${Date.now()}`, name: candidateForm.name, role: candidateForm.role, stage: 'Profile Review', score: 'Pending', owner: candidateForm.owner }
    patchState((current) => ({ ...current, candidates: [newCandidate, ...current.candidates] }))
    setCandidateForm({ name: '', role: '', owner: currentUser.name })
    addToast(buildToast('Candidate added', 'Hiring pipeline updated in-browser.', 'success'))
  }

  const exportDirectory = () => {
    downloadSampleFile('qode27-hrms-directory.csv', createCsvFromRows(state.employees.map((employee) => ({ id: employee.id, name: employee.name, department: employee.department, role: employee.role, attendance: employee.attendance, leaveBalance: employee.leaveBalance }))), 'text/csv;charset=utf-8')
    addToast(buildToast('Directory exported', 'Sample CSV generated locally.', 'success'))
  }

  return (
    <>
      <Seo title="HRMS Interactive Demo | Qode27" description="Interactive frontend-only HRMS demo with people operations, leave, payroll, and hiring workflows." canonicalPath={activeSection === 'dashboard' ? '/demo/hrms' : `/demo/hrms/${activeSection}`} />
      <div className="min-h-screen bg-[#f5f8ff] text-slate-900">
        <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-6">
          <aside className="rounded-[2rem] border border-indigo-100 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <Link to="/" className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Qode27</Link>
            <div className="mt-6 rounded-[1.6rem] bg-[linear-gradient(135deg,#172554_0%,#3659d9_100%)] p-5 text-white">
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/70">Demo Environment</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">People Desk</h1>
              <p className="mt-3 text-sm leading-6 text-white/76">Structured HR operations for approvals, payroll readiness, and hiring health.</p>
            </div>
            <nav className="mt-6 space-y-2">
              {sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`block rounded-[1.1rem] px-4 py-3 text-sm font-medium transition ${activeSection === slug ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}>{label}</Link>)}
            </nav>
            <div className="mt-6 rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">Mock Login</p>
              <select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); setCandidateForm((current) => ({ ...current, owner: users.find((user) => user.email === event.target.value)?.name ?? current.owner })); addToast(buildToast('Persona switched', 'HR permissions updated for the selected mock user.', 'info')) }} className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none">
                {users.map((user) => <option key={user.email} value={user.email}>{user.name} · {user.role}</option>)}
              </select>
              <div className="mt-4 grid gap-2">
                <button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Workspace refreshed', 'HR analytics reloaded locally.', 'info')) }} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh workspace'}</button>
                <button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'HR sample data restored.', 'success')) }} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900">Reset sample data</button>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <header className="rounded-[2rem] border border-indigo-100 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-indigo-600">Demo Environment - sample data only</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">HR software built for structure, approvals, and workforce clarity.</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">This product favors clean admin rhythm, approval visibility, payroll status, and recruiting cadence over generic dashboard chrome.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white">Request tailored demo</a>
                  <a href={buildDemoWhatsAppHref(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-900">WhatsApp Qode27</a>
                </div>
              </div>
            </header>

            {activeSection === 'dashboard' ? <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]"><section className="rounded-[1.8rem] border border-indigo-100 bg-white p-6"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[['Employees', '248', '12 new joins'], ['Attendance', '96.4%', 'Strong consistency'], ['Pending Approvals', String(state.leaveRequests.filter((item) => item.status === 'Pending').length), 'Manager review required'], ['Open Hiring', String(state.candidates.length), 'Active role tracks']].map(([label, value, note]) => <div key={label} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</div><div className="mt-6 grid gap-3">{state.leaveRequests.map((request) => <div key={request.id} className="rounded-[1.2rem] border border-slate-200 bg-white p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-950">{request.employee}</p><p className="mt-1 text-sm text-slate-600">{request.type} · {request.duration}</p></div><div className="flex items-center gap-3"><HrChip tone={request.status === 'Approved' ? 'positive' : request.status === 'Pending' ? 'warning' : 'neutral'}>{request.status}</HrChip>{request.status === 'Pending' ? <button type="button" onClick={() => approveLeave(request.id)} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Approve</button> : null}</div></div></div>)}</div></section><section className="space-y-4">{[['Payroll snapshot', state.payrollRuns.find((item) => item.status !== 'Closed')?.month ?? 'All payroll cycles closed'], ['Organization summary', 'Engineering 84 · Operations 52 · Finance & HR 31'], ['Safety note', 'All actions stay in local storage and never reach production APIs.']].map(([title, note]) => <div key={title} className="rounded-[1.6rem] border border-indigo-100 bg-white p-5"><p className="text-sm font-semibold text-slate-950">{title}</p><p className="mt-2 text-sm leading-6 text-slate-600">{note}</p></div>)}</section></div> : null}

            {activeSection === 'employees' ? <section className="rounded-[1.8rem] border border-indigo-100 bg-white p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Employee directory</h3><p className="mt-2 text-sm text-slate-600">Searchable people records with attendance and leave balance summaries.</p></div><div className="flex gap-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search employee, role, location" className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none" /><button type="button" onClick={exportDirectory} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-900"><FiDownload />Export</button></div></div><div className="mt-6 overflow-hidden rounded-[1.4rem] border border-slate-200"><table className="min-w-full"><thead className="bg-slate-50"><tr>{['Employee', 'Department', 'Location', 'Attendance', 'Leave', 'Status'].map((header) => <th key={header} className="px-4 py-3 text-left text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">{header}</th>)}</tr></thead><tbody>{employees.map((employee) => <tr key={employee.id} className="border-t border-slate-200"><td className="px-4 py-4"><p className="font-semibold text-slate-950">{employee.name}</p><p className="text-xs text-slate-500">{employee.role}</p></td><td className="px-4 py-4 text-sm text-slate-600">{employee.department}</td><td className="px-4 py-4 text-sm text-slate-600">{employee.location}</td><td className="px-4 py-4 text-sm text-slate-600">{employee.attendance}</td><td className="px-4 py-4 text-sm text-slate-600">{employee.leaveBalance} days</td><td className="px-4 py-4"><HrChip tone={employee.status === 'Active' ? 'positive' : 'warning'}>{employee.status}</HrChip></td></tr>)}</tbody></table></div></section> : null}

            {activeSection === 'leave' ? <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]"><div className="rounded-[1.8rem] border border-indigo-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Leave management</h3><div className="mt-6 space-y-3">{state.leaveRequests.map((request) => <div key={request.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-950">{request.employee}</p><p className="mt-1 text-sm text-slate-600">{request.type} · {request.duration}</p></div><HrChip tone={request.status === 'Approved' ? 'positive' : request.status === 'Pending' ? 'warning' : 'neutral'}>{request.status}</HrChip></div></div>)}</div></div><div className="rounded-[1.8rem] border border-indigo-100 bg-white p-6"><h3 className="text-xl font-semibold text-slate-950">Approval view</h3><div className="mt-6 space-y-4">{[['Escalations', '1 request requires second-level approval.'], ['Managers', 'Operations and Sales have open review items.'], ['Policy', 'Demo mode never routes actions to production HR systems.']].map(([title, note]) => <div key={title} className="rounded-[1.2rem] border border-indigo-100 bg-indigo-50/60 p-4"><p className="text-sm font-semibold text-slate-950">{title}</p><p className="mt-2 text-sm leading-6 text-slate-600">{note}</p></div>)}</div></div></section> : null}

            {activeSection === 'payroll' ? <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]"><div className="rounded-[1.8rem] border border-indigo-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Payroll cadence</h3><div className="mt-6 space-y-3">{state.payrollRuns.map((run) => <div key={run.month} className="grid gap-3 rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto_auto_auto] md:items-center"><p className="font-semibold text-slate-950">{run.month}</p><p className="text-sm text-slate-600">{run.total}</p><p className="text-sm text-slate-600">{run.variance}</p><HrChip tone={run.status === 'Closed' ? 'positive' : 'warning'}>{run.status}</HrChip></div>)}</div></div><div className="rounded-[1.8rem] border border-indigo-100 bg-[linear-gradient(180deg,#eef2ff_0%,#ffffff_100%)] p-6"><p className="text-xs uppercase tracking-[0.24em] text-indigo-600">Finance alignment</p><div className="mt-5 grid gap-4">{[['Variable pay', 'Sales incentives imported into demo state only.'], ['Bank file', 'Disabled by design in demo mode.']].map(([title, note]) => <div key={title} className="rounded-[1.2rem] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"><p className="text-sm font-semibold text-slate-950">{title}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</div></div></section> : null}

            {activeSection === 'recruitment' ? <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]"><div className="rounded-[1.8rem] border border-indigo-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Recruitment pipeline</h3><div className="mt-6 grid gap-4 md:grid-cols-3">{[['Review', ['Profile Review']], ['Assessment', ['Assignment Review', 'Panel Interview']], ['Close', ['Offer Discussion']]].map(([title, stages]) => <div key={title} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.18em] text-indigo-600">{title}</p><div className="mt-4 space-y-3">{state.candidates.filter((candidate) => (stages as string[]).includes(candidate.stage)).map((candidate) => <div key={candidate.id} className="rounded-xl bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"><p className="font-semibold text-slate-950">{candidate.name}</p><p className="mt-1 text-sm text-slate-600">{candidate.role}</p><div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>{candidate.owner}</span><span>{candidate.score}</span></div></div>)}</div></div>)}</div></div><form onSubmit={addCandidate} className="rounded-[1.8rem] border border-indigo-100 bg-white p-6"><h3 className="text-xl font-semibold text-slate-950">Add candidate</h3><div className="mt-6 grid gap-4"><input value={candidateForm.name} onChange={(event) => setCandidateForm((current) => ({ ...current, name: event.target.value }))} placeholder="Candidate name" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" /><input value={candidateForm.role} onChange={(event) => setCandidateForm((current) => ({ ...current, role: event.target.value }))} placeholder="Role" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" /><select value={candidateForm.owner} onChange={(event) => setCandidateForm((current) => ({ ...current, owner: event.target.value }))} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none">{users.map((user) => <option key={user.email} value={user.name}>{user.name}</option>)}</select><button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white">Add to pipeline<FiArrowRight /></button></div></form></section> : null}
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
