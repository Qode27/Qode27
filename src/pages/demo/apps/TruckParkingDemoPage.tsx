import { useState, type FormEvent } from 'react'
import { FiBarChart2, FiDownload, FiGrid, FiTruck, FiUsers } from 'react-icons/fi'
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
import { createTruckParkingState, truckParkingUsers } from '../../../data/demo/truckParking'
import { buildToast, createCsvFromRows, downloadSampleFile } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps, DemoMetric, DemoNavItem } from '../../../lib/demo/types'
import Seo from '../../../components/ui/Seo'

const sections: DemoNavItem[] = [
  { slug: 'dashboard', label: 'Dashboard', icon: FiBarChart2, description: 'Occupancy, revenue, movement, and operational pulse.' },
  { slug: 'bays', label: 'Bays', icon: FiGrid, description: 'Slot-level visibility for zone assignment and utilisation.' },
  { slug: 'movement', label: 'Movement', icon: FiTruck, description: 'Entries, exits, and queued trucks in one workflow.' },
  { slug: 'revenue', label: 'Revenue', icon: FiUsers, description: 'Revenue summary and sample receipt management.' },
]

export default function TruckParkingDemoPage({ app, section }: DemoAppRouteProps) {
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
    storageKey: 'qode27-demo-truck-parking',
    createInitialState: createTruckParkingState,
    users: truckParkingUsers,
  })

  const activeSection = sections.some((item) => item.slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [movementForm, setMovementForm] = useState({ truckNumber: '', transporter: '', bay: 'B-12' })

  const metrics: DemoMetric[] = [
    { label: 'Occupied Bays', value: `${state.bays.filter((bay) => bay.status === 'Occupied').length}`, change: '2 lanes close to full', tone: 'warning' },
    { label: 'Queued Trucks', value: `${state.movements.filter((movement) => movement.status === 'Queued').length}`, change: 'Fast-lane can absorb 1 more', tone: 'neutral' },
    { label: 'Revenue Today', value: 'Rs 1.46L', change: '11% above average', tone: 'positive' },
    { label: 'Average Stay', value: '6h 12m', change: 'Turnaround improving', tone: 'positive' },
  ]

  const handleUserSwitch = (email: string) => {
    switchUser(email)
    addToast(buildToast('Persona switched', 'Parking site demo role updated.', 'info'))
  }

  const handleReset = () => {
    resetDemo()
    addToast(buildToast('Demo reset', 'Truck parking sample data has been restored.', 'success'))
  }

  const handleRefresh = () => {
    refreshDemo()
    addToast(buildToast('Board refreshed', 'No live parking backend was touched.', 'info'))
  }

  const handleMovementSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!movementForm.truckNumber.trim() || !movementForm.transporter.trim()) {
      addToast(buildToast('Incomplete vehicle entry', 'Add truck number and transporter to continue.', 'warning'))
      return
    }

    patchState((current) => ({
      ...current,
      movements: [
        {
          id: `MOV-${Date.now()}`,
          truckNumber: movementForm.truckNumber,
          transporter: movementForm.transporter,
          bay: movementForm.bay,
          duration: '00h 05m',
          status: 'Queued',
        },
        ...current.movements,
      ],
      bays: current.bays.map((bay) => (bay.id === movementForm.bay ? { ...bay, status: 'Reserved', eta: 'Arriving now' } : bay)),
    }))
    setMovementForm({ truckNumber: '', transporter: '', bay: 'B-12' })
    addToast(buildToast('Truck queued', 'Vehicle entry saved inside local demo state only.', 'success'))
  }

  const markInvoicePaid = (invoiceId: string) => {
    patchState((current) => ({
      ...current,
      invoices: current.invoices.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: 'Paid' } : invoice)),
    }))
    addToast(buildToast('Receipt updated', 'Collection status changed in the demo sandbox.', 'success'))
  }

  const exportMovements = () => {
    downloadSampleFile(
      'qode27-truck-parking-movements.csv',
      createCsvFromRows(
        state.movements.map((movement) => ({
          id: movement.id,
          truckNumber: movement.truckNumber,
          transporter: movement.transporter,
          bay: movement.bay,
          duration: movement.duration,
          status: movement.status,
        })),
      ),
      'text/csv;charset=utf-8',
    )
    addToast(buildToast('Movement export ready', 'Generated a sample CSV from local parking records.', 'success'))
  }

  return (
    <>
      <Seo
        title="Truck Parking Interactive Demo | Qode27"
        description="Interactive frontend-only truck parking demo with occupancy, bay management, vehicle movement, and revenue flows."
        canonicalPath={activeSection === 'dashboard' ? '/demo/truck-parking' : `/demo/truck-parking/${activeSection}`}
      />

      <DemoShell
        app={app}
        sections={sections}
        activeSection={activeSection}
        title="An operations-heavy truck parking demo that still feels premium and sales-ready."
        subtitle="The parking experience runs entirely on local mock data for bays, entries, exits, revenue, and occupancy, so you can showcase the product without spinning up a separate backend or database."
        currentUser={currentUser}
        onSwitchUser={handleUserSwitch}
        users={users}
        onReset={handleReset}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        actions={[
          { label: 'Request parking rollout demo', href: buildDemoRequestPath('Truck Parking Demo') },
          { label: 'WhatsApp Qode27', href: buildDemoWhatsAppHref('Truck Parking Demo'), variant: 'secondary' },
        ]}
      >
        <DemoMetricGrid items={metrics} isRefreshing={isRefreshing} />

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.95fr]">
          <DemoPanel
            title="Occupancy curve"
            subtitle="Zone utilisation trend rendered with lightweight frontend-only visuals."
            action={
              <button
                type="button"
                onClick={exportMovements}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-[var(--demo-primary)] hover:text-[var(--demo-primary)]"
              >
                <FiDownload />
                Export movement sheet
              </button>
            }
          >
            <DemoTrendChart title="Occupied bays by hour" data={state.occupancyTrend} />
          </DemoPanel>
          <DemoPanel title="Live operational notes" subtitle="Good demo storytelling for clients watching the flow.">
            <div className="space-y-3">
              {[
                'Two container trucks are approaching the central lane from dispatch gate 2.',
                'FASTag receipts are being mirrored to billing desk within demo mode only.',
                'South yard has spare capacity for one additional tanker convoy.',
              ].map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </DemoPanel>
        </div>

        {activeSection === 'dashboard' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.95fr]">
            <DemoPanel title="Current movements" subtitle="Fast overview of entries, exits, and queued trucks.">
              <DemoDataTable
                columns={[
                  { key: 'truck', header: 'Truck', render: (row) => <div><p className="font-semibold text-slate-950">{row.truckNumber}</p><p className="text-xs text-slate-500">{row.transporter}</p></div> },
                  { key: 'bay', header: 'Bay', render: (row) => row.bay },
                  { key: 'duration', header: 'Duration', render: (row) => row.duration },
                  { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Parked' ? 'positive' : row.status === 'Queued' ? 'warning' : 'neutral'} /> },
                ]}
                rows={state.movements.map((movement) => ({ ...movement, id: movement.id }))}
              />
            </DemoPanel>
            <DemoPanel title="Revenue tracker" subtitle="Illustrative billing and collection view.">
              <div className="space-y-3">
                {state.invoices.map((invoice) => (
                  <div key={invoice.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{invoice.transporter}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {invoice.amount} · {invoice.mode}
                        </p>
                      </div>
                      <DemoBadge value={invoice.status} tone={invoice.status === 'Paid' ? 'positive' : 'warning'} />
                    </div>
                  </div>
                ))}
              </div>
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'bays' ? (
          <div className="mt-4">
            <DemoPanel title="Bay board" subtitle="Visual slot inventory for an impressive operations demo.">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {state.bays.map((bay) => (
                  <div key={bay.id} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{bay.id}</p>
                      <DemoBadge value={bay.status} tone={bay.status === 'Available' ? 'positive' : bay.status === 'Reserved' ? 'warning' : 'neutral'} />
                    </div>
                    <p className="mt-4 text-sm text-slate-600">{bay.zone}</p>
                    <p className="mt-1 text-sm text-slate-500">{bay.truckType}</p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{bay.eta}</p>
                  </div>
                ))}
              </div>
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'movement' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <DemoPanel title="Vehicle movement log" subtitle="Structured entry/exit workflow without live infrastructure.">
              <DemoDataTable
                columns={[
                  { key: 'truckNumber', header: 'Truck', render: (row) => row.truckNumber },
                  { key: 'transporter', header: 'Transporter', render: (row) => row.transporter },
                  { key: 'bay', header: 'Bay', render: (row) => row.bay },
                  { key: 'duration', header: 'Duration', render: (row) => row.duration },
                  { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Parked' ? 'positive' : row.status === 'Queued' ? 'warning' : 'neutral'} /> },
                ]}
                rows={state.movements.map((movement) => ({ ...movement, id: movement.id }))}
              />
            </DemoPanel>
            <DemoPanel title="Queue a truck" subtitle="Creates a safe mock entry without any real gate hardware integration.">
              <form className="grid gap-4" onSubmit={handleMovementSubmit}>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Truck number</span>
                  <input
                    value={movementForm.truckNumber}
                    onChange={(event) => setMovementForm((current) => ({ ...current, truckNumber: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Transporter</span>
                  <input
                    value={movementForm.transporter}
                    onChange={(event) => setMovementForm((current) => ({ ...current, transporter: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Preferred bay</span>
                  <select
                    value={movementForm.bay}
                    onChange={(event) => setMovementForm((current) => ({ ...current, bay: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  >
                    {state.bays.map((bay) => (
                      <option key={bay.id} value={bay.id}>
                        {bay.id} · {bay.zone}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white">
                  Queue vehicle
                </button>
              </form>
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'revenue' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.95fr]">
            <DemoPanel title="Receipts" subtitle="Sample receipts and collections for operator walkthroughs.">
              <div className="space-y-3">
                {state.invoices.map((invoice) => (
                  <div key={invoice.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{invoice.transporter}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {invoice.id} · {invoice.amount}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DemoBadge value={invoice.status} tone={invoice.status === 'Paid' ? 'positive' : 'warning'} />
                        {invoice.status === 'Pending' ? (
                          <button
                            type="button"
                            onClick={() => markInvoicePaid(invoice.id)}
                            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                          >
                            Mark paid
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Mode: {invoice.mode}</p>
                  </div>
                ))}
              </div>
            </DemoPanel>
            <DemoPanel title="Finance notes" subtitle="Useful for business-value storytelling in demos.">
              <div className="space-y-3">
                {[
                  'Every receipt in this screen is mock-only and safe to click during a sales walkthrough.',
                  'Download actions generate sample exports inside the browser instead of hitting a real reporting service.',
                  'The same architecture can scale to multi-site parking demos later with only new config and mock data.',
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
