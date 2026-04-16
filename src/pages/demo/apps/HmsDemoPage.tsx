import { useMemo, useState, type FormEvent } from 'react'
import { FiActivity, FiCalendar, FiCreditCard, FiDownload, FiUsers } from 'react-icons/fi'
import {
  DemoBadge,
  DemoDataTable,
  DemoMetricGrid,
  DemoPanel,
  DemoShell,
  DemoToastStack,
  DemoTrendChart,
} from '../../../components/demo/DemoPrimitives'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createHmsState, hmsUsers } from '../../../data/demo/hms'
import { buildToast, createCsvFromRows, downloadSampleFile } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps, DemoMetric, DemoNavItem } from '../../../lib/demo/types'
import Seo from '../../../components/ui/Seo'

const sections: DemoNavItem[] = [
  { slug: 'dashboard', label: 'Dashboard', icon: FiActivity, description: 'Collections, occupancy, and patient flow on one screen.' },
  { slug: 'patients', label: 'Patients', icon: FiUsers, description: 'Core patient records with safe sample billing context.' },
  { slug: 'appointments', label: 'Appointments', icon: FiCalendar, description: 'Mock OPD scheduling and front-desk management.' },
  { slug: 'billing', label: 'Billing', icon: FiCreditCard, description: 'Collections, pending claims, and sample report export.' },
]

export default function HmsDemoPage({ app, section }: DemoAppRouteProps) {
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
    storageKey: 'qode27-demo-hms',
    createInitialState: createHmsState,
    users: hmsUsers,
  })

  const activeSection = sections.some((item) => item.slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [appointmentForm, setAppointmentForm] = useState({ patient: '', doctor: state.doctors[0]?.name ?? '', time: '03:15 PM', type: 'Follow-up' })

  const metrics: DemoMetric[] = [
    { label: 'Active Patients', value: '72', change: '18 admitted right now', tone: 'neutral' },
    { label: 'Collections Today', value: 'Rs 4.8L', change: 'Up 9% day-on-day', tone: 'positive' },
    { label: 'Pending Claims', value: '11', change: '3 nearing SLA breach', tone: 'warning' },
    { label: 'Doctor Availability', value: '87%', change: '3 consultants on OPD', tone: 'positive' },
  ]

  const patientRows = useMemo(() => state.patients.map((patient) => ({ ...patient, id: patient.id })), [state.patients])

  const handleUserSwitch = (email: string) => {
    switchUser(email)
    addToast(buildToast('Persona switched', 'Mock sign-in updated for the HMS demo.', 'info'))
  }

  const handleReset = () => {
    resetDemo()
    addToast(buildToast('Demo reset', 'Hospital demo data is back to its original sample state.', 'success'))
  }

  const handleRefresh = () => {
    refreshDemo()
    addToast(buildToast('Screen refreshed', 'This hospital demo still remains fully frontend-only.', 'info'))
  }

  const handleAppointmentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!appointmentForm.patient.trim()) {
      addToast(buildToast('Patient name required', 'Add a patient name to create a mock appointment.', 'warning'))
      return
    }

    patchState((current) => ({
      ...current,
      appointments: [
        {
          id: `APT-${Date.now()}`,
          patient: appointmentForm.patient,
          doctor: appointmentForm.doctor,
          time: appointmentForm.time,
          type: appointmentForm.type,
          status: 'Confirmed',
        },
        ...current.appointments,
      ],
    }))
    setAppointmentForm({ patient: '', doctor: state.doctors[0]?.name ?? '', time: '03:15 PM', type: 'Follow-up' })
    addToast(buildToast('Appointment created', 'This registration was stored locally for demo purposes only.', 'success'))
  }

  const settleBilling = (billingId: string) => {
    patchState((current) => ({
      ...current,
      billings: current.billings.map((billing) => (billing.id === billingId ? { ...billing, status: 'Settled' } : billing)),
    }))
    addToast(buildToast('Billing updated', 'Sample collection status changed locally.', 'success'))
  }

  const exportBilling = () => {
    downloadSampleFile(
      'qode27-hms-billing-report.csv',
      createCsvFromRows(
        state.billings.map((billing) => ({
          id: billing.id,
          department: billing.department,
          amount: billing.amount,
          paymentMode: billing.paymentMode,
          status: billing.status,
        })),
      ),
      'text/csv;charset=utf-8',
    )
    addToast(buildToast('Billing report ready', 'Downloaded a sample CSV generated from local mock data.', 'success'))
  }

  return (
    <>
      <Seo
        title="Hospital Management Interactive Demo | Qode27"
        description="Interactive frontend-only hospital management demo with patients, appointments, doctors, and billing sample flows."
        canonicalPath={activeSection === 'dashboard' ? '/demo/hms' : `/demo/hms/${activeSection}`}
      />

      <DemoShell
        app={app}
        sections={sections}
        activeSection={activeSection}
        title="A near-real hospital walkthrough with premium patient and billing UX."
        subtitle="This HMS demo runs fully inside the website, using realistic sample data for appointments, admissions, doctors, and collections while blocking live API calls."
        currentUser={currentUser}
        onSwitchUser={handleUserSwitch}
        users={users}
        onReset={handleReset}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        actions={[
          { label: 'Request hospital rollout demo', href: buildDemoRequestPath('Hospital Management Demo') },
          { label: 'WhatsApp Qode27', href: buildDemoWhatsAppHref('Hospital Management Demo'), variant: 'secondary' },
        ]}
      >
        <DemoMetricGrid items={metrics} isRefreshing={isRefreshing} />

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.9fr]">
          <DemoPanel title="Collections trend" subtitle="Commercially strong reporting without a charting dependency.">
            <DemoTrendChart title="Daily collections (lakhs)" data={state.collectionsTrend} />
          </DemoPanel>
          <DemoPanel title="Doctor roster" subtitle="Doctor availability and OPD load at a glance.">
            <div className="space-y-3">
              {state.doctors.map((doctor) => (
                <div key={doctor.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{doctor.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{doctor.specialty}</p>
                    </div>
                    <DemoBadge value={doctor.room} />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{doctor.opdLoad}</p>
                </div>
              ))}
            </div>
          </DemoPanel>
        </div>

        {activeSection === 'dashboard' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
            <DemoPanel title="Patient movement" subtitle="Active patients with status and billing context.">
              <DemoDataTable
                columns={[
                  { key: 'patient', header: 'Patient', render: (row) => <div><p className="font-semibold text-slate-950">{row.name}</p><p className="text-xs text-slate-500">{row.id}</p></div> },
                  { key: 'unit', header: 'Unit', render: (row) => row.unit },
                  { key: 'doctor', header: 'Doctor', render: (row) => row.doctor },
                  { key: 'bill', header: 'Bill', render: (row) => row.bill },
                  { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Discharged' ? 'neutral' : row.status === 'Waiting' ? 'warning' : 'positive'} /> },
                ]}
                rows={patientRows}
              />
            </DemoPanel>
            <DemoPanel title="Front-desk alerts" subtitle="Sample operational guidance for the current shift.">
              <div className="space-y-3">
                {[
                  'Three appointments have been rescheduled after imaging delay.',
                  'Insurance desk has 2 pending approvals due before 4:00 PM.',
                  'Pediatrics OPD crossed 90% slot utilisation for today.',
                ].map((item) => (
                  <div key={item} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'patients' ? (
          <div className="mt-4">
            <DemoPanel title="Patient records" subtitle="Representative OPD/IPD visibility using mock data only.">
              <DemoDataTable
                columns={[
                  { key: 'name', header: 'Patient', render: (row) => <div><p className="font-semibold text-slate-950">{row.name}</p><p className="text-xs text-slate-500">{row.id}</p></div> },
                  { key: 'unit', header: 'Unit', render: (row) => row.unit },
                  { key: 'doctor', header: 'Doctor', render: (row) => row.doctor },
                  { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Admitted' ? 'positive' : row.status === 'Waiting' ? 'warning' : 'neutral'} /> },
                  { key: 'bill', header: 'Billing', render: (row) => <span className="font-semibold text-slate-950">{row.bill}</span> },
                ]}
                rows={patientRows}
              />
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'appointments' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <DemoPanel title="Today's appointments" subtitle="Mock scheduling flow that feels live.">
              <DemoDataTable
                columns={[
                  { key: 'patient', header: 'Patient', render: (row) => row.patient },
                  { key: 'doctor', header: 'Doctor', render: (row) => row.doctor },
                  { key: 'time', header: 'Time', render: (row) => row.time },
                  { key: 'type', header: 'Visit Type', render: (row) => row.type },
                  { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Delayed' ? 'warning' : row.status === 'Checked In' ? 'positive' : 'neutral'} /> },
                ]}
                rows={state.appointments.map((appointment) => ({ ...appointment, id: appointment.id }))}
              />
            </DemoPanel>
            <DemoPanel title="Register appointment" subtitle="No real patient database is contacted here.">
              <form className="grid gap-4" onSubmit={handleAppointmentSubmit}>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Patient name</span>
                  <input
                    value={appointmentForm.patient}
                    onChange={(event) => setAppointmentForm((current) => ({ ...current, patient: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Doctor</span>
                  <select
                    value={appointmentForm.doctor}
                    onChange={(event) => setAppointmentForm((current) => ({ ...current, doctor: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  >
                    {state.doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Time</span>
                    <input
                      value={appointmentForm.time}
                      onChange={(event) => setAppointmentForm((current) => ({ ...current, time: event.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Visit type</span>
                    <input
                      value={appointmentForm.type}
                      onChange={(event) => setAppointmentForm((current) => ({ ...current, type: event.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                    />
                  </label>
                </div>
                <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white">
                  Add appointment
                </button>
              </form>
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'billing' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <DemoPanel
              title="Billing desk"
              subtitle="Pending and settled collections using sample records."
              action={
                <button
                  type="button"
                  onClick={exportBilling}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-[var(--demo-primary)] hover:text-[var(--demo-primary)]"
                >
                  <FiDownload />
                  Export sample report
                </button>
              }
            >
              <div className="space-y-3">
                {state.billings.map((billing) => (
                  <div key={billing.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{billing.department}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {billing.paymentMode} · {billing.amount}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DemoBadge value={billing.status} tone={billing.status === 'Settled' ? 'positive' : 'warning'} />
                        {billing.status === 'Pending' ? (
                          <button
                            type="button"
                            onClick={() => settleBilling(billing.id)}
                            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                          >
                            Mark settled
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DemoPanel>
            <DemoPanel title="Revenue notes" subtitle="Presentation-ready talking points for client walkthroughs.">
              <div className="space-y-3">
                {[
                  'Cashless claims are isolated from front-desk counters for cleaner tracking.',
                  'Sample exports are generated in browser and never sent to any backend.',
                  'Patient collections remain purely illustrative in this demo environment.',
                ].map((item) => (
                  <div key={item} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </DemoPanel>
          </div>
        ) : null}
      </DemoShell>

      <DemoToastStack toasts={toasts} />
    </>
  )
}
