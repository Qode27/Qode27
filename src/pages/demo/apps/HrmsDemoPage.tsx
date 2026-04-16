import { useDeferredValue, useMemo, useState, type FormEvent } from 'react'
import { FiBarChart2, FiDollarSign, FiDownload, FiSearch, FiUserPlus, FiUsers } from 'react-icons/fi'
import {
  DemoBadge,
  DemoDataTable,
  DemoEmptyState,
  DemoMetricGrid,
  DemoPanel,
  DemoShell,
  DemoToastStack,
  DemoTrendChart,
} from '../../../components/demo/DemoPrimitives'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createHrmsState, hrmsUsers, type HrmsCandidate } from '../../../data/demo/hrms'
import { buildToast, createCsvFromRows, downloadSampleFile } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps, DemoMetric, DemoNavItem } from '../../../lib/demo/types'
import Seo from '../../../components/ui/Seo'

const sections: DemoNavItem[] = [
  { slug: 'dashboard', label: 'Dashboard', icon: FiBarChart2, description: 'Executive view across workforce, attendance, and approvals.' },
  { slug: 'employees', label: 'Employees', icon: FiUsers, description: 'Searchable employee records with status, leave, and location.' },
  { slug: 'payroll', label: 'Payroll', icon: FiDollarSign, description: 'Payroll runs, salary movement, and finance-facing summary.' },
  { slug: 'recruitment', label: 'Recruitment', icon: FiUserPlus, description: 'Hiring pipeline with a local-only candidate intake form.' },
]

export default function HrmsDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()

  const {
    state,
    patchState,
    currentUser,
    users,
    switchUser,
    resetDemo,
    refreshDemo,
    isRefreshing,
    toasts,
    addToast,
  } = useDemoAppState({
    storageKey: 'qode27-demo-hrms',
    createInitialState: createHrmsState,
    users: hrmsUsers,
  })

  const activeSection = sections.some((item) => item.slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearch = useDeferredValue(searchQuery)
  const [candidateForm, setCandidateForm] = useState({ name: '', role: '', owner: currentUser.name })

  const filteredEmployees = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase()
    if (!term) {
      return state.employees
    }

    return state.employees.filter((employee) => {
      return [employee.name, employee.department, employee.location, employee.role].some((value) => value.toLowerCase().includes(term))
    })
  }, [deferredSearch, state.employees])

  const metrics: DemoMetric[] = [
    { label: 'Total Employees', value: '248', change: '12 new joins this quarter', tone: 'positive' },
    { label: 'Pending Leaves', value: String(state.leaveRequests.filter((item) => item.status === 'Pending').length), change: '2 need manager action', tone: 'warning' },
    { label: 'Hiring Pipeline', value: `${state.candidates.length} roles`, change: 'Offer stage moving well', tone: 'neutral' },
    { label: 'Attendance This Week', value: '96.4%', change: 'Improved from last week', tone: 'positive' },
  ]

  const handleUserSwitch = (email: string) => {
    switchUser(email)
    addToast(buildToast('Persona switched', 'Mock sign-in updated for this HRMS demo.', 'info'))
  }

  const handleReset = () => {
    resetDemo()
    addToast(buildToast('Demo reset', 'HRMS sample data has been restored.', 'success'))
  }

  const handleRefresh = () => {
    refreshDemo()
    addToast(buildToast('Dashboard refreshed', 'No live APIs were called. This is a visual refresh only.', 'info'))
  }

  const handleApproveLeave = (requestId: string) => {
    patchState((current) => ({
      ...current,
      leaveRequests: current.leaveRequests.map((request) => (request.id === requestId ? { ...request, status: 'Approved' } : request)),
    }))
    addToast(buildToast('Leave request updated', 'Approval was saved to mock state only.', 'success'))
  }

  const handleCandidateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!candidateForm.name.trim() || !candidateForm.role.trim()) {
      addToast(buildToast('Form incomplete', 'Add candidate name and role to continue.', 'warning'))
      return
    }

    const newCandidate: HrmsCandidate = {
      id: `CAN-${Date.now()}`,
      name: candidateForm.name,
      role: candidateForm.role,
      stage: 'Profile Review',
      score: 'Pending',
      owner: candidateForm.owner,
    }

    patchState((current) => ({
      ...current,
      candidates: [newCandidate, ...current.candidates],
    }))
    setCandidateForm({ name: '', role: '', owner: currentUser.name })
    addToast(buildToast('Candidate added', 'The profile was added to this local demo pipeline.', 'success'))
  }

  const exportEmployees = () => {
    downloadSampleFile(
      'qode27-hrms-employees.csv',
      createCsvFromRows(
        state.employees.map((employee) => ({
          id: employee.id,
          name: employee.name,
          department: employee.department,
          role: employee.role,
          location: employee.location,
          status: employee.status,
        })),
      ),
      'text/csv;charset=utf-8',
    )
    addToast(buildToast('Sample export ready', 'Downloaded a CSV generated entirely from mock data.', 'success'))
  }

  return (
    <>
      <Seo
        title="HRMS Interactive Demo | Qode27"
        description="Interactive frontend-only HRMS demo with sample employees, payroll, attendance, and recruitment flows."
        canonicalPath={activeSection === 'dashboard' ? '/demo/hrms' : `/demo/hrms/${activeSection}`}
      />

      <DemoShell
        app={app}
        sections={sections}
        activeSection={activeSection}
        title="People operations with a serious business-ready demo layer."
        subtitle="This HRMS walkthrough uses local mock datasets, premium UI, and sample workflows for attendance, leave, payroll, and recruitment without touching any production system."
        currentUser={currentUser}
        onSwitchUser={handleUserSwitch}
        users={users}
        onReset={handleReset}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        actions={[
          { label: 'Request tailored HRMS demo', href: buildDemoRequestPath('HRMS Demo') },
          { label: 'WhatsApp Qode27', href: buildDemoWhatsAppHref('HRMS Demo'), variant: 'secondary' },
        ]}
      >
        <DemoMetricGrid items={metrics} isRefreshing={isRefreshing} />

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
          <DemoPanel
            title="Attendance momentum"
            subtitle="A premium stand-in for attendance and productivity reporting."
            action={
              <button
                type="button"
                onClick={exportEmployees}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-[var(--demo-primary)] hover:text-[var(--demo-primary)]"
              >
                <FiDownload />
                Sample export
              </button>
            }
          >
            <DemoTrendChart title="Weekly attendance trend" valueSuffix="%" data={state.attendanceTrend} />
          </DemoPanel>

          <DemoPanel title="Pending approvals" subtitle="Leave approvals and action items for the current mock persona.">
            <div className="space-y-3">
              {state.leaveRequests.map((request) => (
                <div key={request.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{request.employee}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {request.type} · {request.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <DemoBadge value={request.status} tone={request.status === 'Pending' ? 'warning' : request.status === 'Approved' ? 'positive' : 'neutral'} />
                      {request.status === 'Pending' ? (
                        <button
                          type="button"
                          onClick={() => handleApproveLeave(request.id)}
                          className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Approve
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DemoPanel>
        </div>

        {activeSection === 'dashboard' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            <DemoPanel title="Team snapshot" subtitle="Cross-functional headcount and readiness view.">
              <DemoDataTable
                columns={[
                  { key: 'name', header: 'Employee', render: (row) => <div><p className="font-semibold text-slate-950">{row.name}</p><p className="text-xs text-slate-500">{row.id}</p></div> },
                  { key: 'department', header: 'Department', render: (row) => row.department },
                  { key: 'attendance', header: 'Attendance', render: (row) => row.attendance },
                  { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Active' ? 'positive' : 'warning'} /> },
                ]}
                rows={state.employees.slice(0, 4)}
              />
            </DemoPanel>

            <DemoPanel title="Hiring pipeline" subtitle="Commercially strong flow without backend complexity.">
              <div className="grid gap-3">
                {state.candidates.map((candidate) => (
                  <div key={candidate.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{candidate.name}</p>
                        <p className="mt-1 text-sm text-slate-600">{candidate.role}</p>
                      </div>
                      <DemoBadge value={candidate.stage} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>{candidate.owner}</span>
                      <span>{candidate.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'employees' ? (
          <div className="mt-4 space-y-4">
            <DemoPanel title="Employee directory" subtitle="Search, filter, and inspect realistic employee records inside demo mode.">
              <div className="mb-4 flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3">
                <FiSearch className="text-slate-500" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search employees, departments, locations"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              {filteredEmployees.length > 0 ? (
                <DemoDataTable
                  columns={[
                    { key: 'employee', header: 'Employee', render: (row) => <div><p className="font-semibold text-slate-950">{row.name}</p><p className="text-xs text-slate-500">{row.role}</p></div> },
                    { key: 'department', header: 'Department', render: (row) => row.department },
                    { key: 'location', header: 'Location', render: (row) => row.location },
                    { key: 'leave', header: 'Leave', render: (row) => `${row.leaveBalance} days` },
                    { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Active' ? 'positive' : 'warning'} /> },
                  ]}
                  rows={filteredEmployees}
                />
              ) : (
                <DemoEmptyState title="No employees matched" description="Adjust the search query to bring back the mock employee list." />
              )}
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'payroll' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.9fr]">
            <DemoPanel title="Payroll runs" subtitle="Recent payroll cycles shown with business-grade summary labels.">
              <DemoDataTable
                columns={[
                  { key: 'month', header: 'Month', render: (row) => row.month },
                  { key: 'total', header: 'Total Payroll', render: (row) => <span className="font-semibold text-slate-950">{row.total}</span> },
                  { key: 'variance', header: 'Variance', render: (row) => row.variance },
                  { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Closed' ? 'positive' : 'warning'} /> },
                ]}
                rows={state.payrollRuns.map((item) => ({ ...item, id: item.month }))}
              />
            </DemoPanel>
            <DemoPanel title="Payroll notes" subtitle="Safe sample workflow actions.">
              <div className="rounded-[1.3rem] bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-950">April payroll checklist</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <li>Attendance close locked for 5 departments</li>
                  <li>Variable pay inputs received from sales and operations</li>
                  <li>No bank payout is triggered in demo mode</li>
                </ul>
              </div>
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'recruitment' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <DemoPanel title="Open pipeline" subtitle="Candidates update instantly using local demo state.">
              <div className="grid gap-3">
                {state.candidates.map((candidate) => (
                  <div key={candidate.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{candidate.name}</p>
                        <p className="mt-1 text-sm text-slate-600">{candidate.role}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DemoBadge value={candidate.stage} />
                        <span className="text-xs text-slate-500">{candidate.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DemoPanel>
            <DemoPanel title="Add candidate" subtitle="Form writes only to this browser-local sandbox.">
              <form className="grid gap-4" onSubmit={handleCandidateSubmit}>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Candidate name</span>
                  <input
                    value={candidateForm.name}
                    onChange={(event) => setCandidateForm((current) => ({ ...current, name: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Role</span>
                  <input
                    value={candidateForm.role}
                    onChange={(event) => setCandidateForm((current) => ({ ...current, role: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Owner</span>
                  <select
                    value={candidateForm.owner}
                    onChange={(event) => setCandidateForm((current) => ({ ...current, owner: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  >
                    {users.map((user) => (
                      <option key={user.email} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white">
                  Add candidate
                </button>
              </form>
            </DemoPanel>
          </div>
        ) : null}
      </DemoShell>

      <DemoToastStack toasts={toasts} />
    </>
  )
}
