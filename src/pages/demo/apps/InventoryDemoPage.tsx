import { useDeferredValue, useMemo, useState, type FormEvent } from 'react'
import { FiBarChart2, FiBox, FiDownload, FiShoppingCart, FiUsers } from 'react-icons/fi'
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
import { createInventoryState, inventoryUsers } from '../../../data/demo/inventory'
import { buildToast, createCsvFromRows, downloadSampleFile } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps, DemoMetric, DemoNavItem } from '../../../lib/demo/types'
import Seo from '../../../components/ui/Seo'

const sections: DemoNavItem[] = [
  { slug: 'dashboard', label: 'Dashboard', icon: FiBarChart2, description: 'Operational health across stock, orders, and vendors.' },
  { slug: 'stock', label: 'Stock', icon: FiBox, description: 'SKU-level inventory visibility with reorder awareness.' },
  { slug: 'purchase-orders', label: 'Purchase Orders', icon: FiShoppingCart, description: 'PO workflow with local-only updates and sample actions.' },
  { slug: 'vendors', label: 'Vendors', icon: FiUsers, description: 'Vendor SLA snapshot and invoice overview.' },
]

export default function InventoryDemoPage({ app, section }: DemoAppRouteProps) {
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
    storageKey: 'qode27-demo-inventory',
    createInitialState: createInventoryState,
    users: inventoryUsers,
  })

  const activeSection = sections.some((item) => item.slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [stockQuery, setStockQuery] = useState('')
  const [poForm, setPoForm] = useState({ vendor: state.vendors[0]?.name ?? '', eta: '27 Apr', amount: 'Rs 1.2L' })
  const deferredQuery = useDeferredValue(stockQuery)

  const filteredItems = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase()
    if (!term) {
      return state.items
    }

    return state.items.filter((item) => [item.sku, item.name, item.zone].some((value) => value.toLowerCase().includes(term)))
  }, [deferredQuery, state.items])

  const metrics: DemoMetric[] = [
    { label: 'Warehouse Value', value: 'Rs 2.7Cr', change: 'Across 4 active zones', tone: 'neutral' },
    { label: 'Low Stock SKUs', value: String(state.items.filter((item) => item.status !== 'Healthy').length), change: 'Reorder action recommended', tone: 'warning' },
    { label: 'Dispatch Fill Rate', value: '97.1%', change: 'Improved this week', tone: 'positive' },
    { label: 'Pending Invoices', value: `${state.invoices.filter((invoice) => invoice.status === 'Pending').length}`, change: 'Follow-up due this week', tone: 'warning' },
  ]

  const handleUserSwitch = (email: string) => {
    switchUser(email)
    addToast(buildToast('Persona switched', 'Warehouse demo role updated successfully.', 'info'))
  }

  const handleReset = () => {
    resetDemo()
    addToast(buildToast('Demo reset', 'Inventory sample data is back to its original state.', 'success'))
  }

  const handleRefresh = () => {
    refreshDemo()
    addToast(buildToast('Demo refreshed', 'This warehouse dashboard refresh is visual only.', 'info'))
  }

  const handlePurchaseOrderSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    patchState((current) => ({
      ...current,
      purchaseOrders: [
        {
          id: `PO-${Date.now()}`,
          vendor: poForm.vendor,
          eta: poForm.eta,
          amount: poForm.amount,
          status: 'Draft',
        },
        ...current.purchaseOrders,
      ],
    }))
    addToast(buildToast('Purchase order drafted', 'The PO lives only in this demo browser state.', 'success'))
  }

  const approvePurchaseOrder = (purchaseOrderId: string) => {
    patchState((current) => ({
      ...current,
      purchaseOrders: current.purchaseOrders.map((purchaseOrder) =>
        purchaseOrder.id === purchaseOrderId ? { ...purchaseOrder, status: 'Approved' } : purchaseOrder,
      ),
    }))
    addToast(buildToast('PO approved', 'The order status changed locally and safely.', 'success'))
  }

  const exportStock = () => {
    downloadSampleFile(
      'qode27-inventory-stock.csv',
      createCsvFromRows(
        state.items.map((item) => ({
          sku: item.sku,
          name: item.name,
          zone: item.zone,
          onHand: item.onHand,
          reorderPoint: item.reorderPoint,
          status: item.status,
        })),
      ),
      'text/csv;charset=utf-8',
    )
    addToast(buildToast('Stock export ready', 'Downloaded a sample stock sheet built from mock data.', 'success'))
  }

  return (
    <>
      <Seo
        title="Inventory Interactive Demo | Qode27"
        description="Interactive frontend-only inventory demo with stock, purchase orders, vendors, and sample reports."
        canonicalPath={activeSection === 'dashboard' ? '/demo/inventory' : `/demo/inventory/${activeSection}`}
      />

      <DemoShell
        app={app}
        sections={sections}
        activeSection={activeSection}
        title="A warehouse and procurement walkthrough that feels operationally real."
        subtitle="This inventory demo showcases stock visibility, low-stock actions, vendor coordination, and sample exports using a pure frontend architecture that adds no hosting or backend cost."
        currentUser={currentUser}
        onSwitchUser={handleUserSwitch}
        users={users}
        onReset={handleReset}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        actions={[
          { label: 'Request inventory rollout demo', href: buildDemoRequestPath('Inventory Demo') },
          { label: 'WhatsApp Qode27', href: buildDemoWhatsAppHref('Inventory Demo'), variant: 'secondary' },
        ]}
      >
        <DemoMetricGrid items={metrics} isRefreshing={isRefreshing} />

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.95fr]">
          <DemoPanel
            title="Warehouse throughput"
            subtitle="Illustrative dispatch and inward velocity for the week."
            action={
              <button
                type="button"
                onClick={exportStock}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-[var(--demo-primary)] hover:text-[var(--demo-primary)]"
              >
                <FiDownload />
                Export sample stock
              </button>
            }
          >
            <DemoTrendChart title="Units processed per day" data={state.throughputTrend} />
          </DemoPanel>

          <DemoPanel title="Invoice watchlist" subtitle="Client-facing revenue visibility for the supply operation.">
            <div className="space-y-3">
              {state.invoices.map((invoice) => (
                <div key={invoice.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{invoice.customer}</p>
                      <p className="mt-1 text-sm text-slate-600">{invoice.amount}</p>
                    </div>
                    <DemoBadge value={invoice.status} tone={invoice.status === 'Paid' ? 'positive' : 'warning'} />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">Due {invoice.dueDate}</p>
                </div>
              ))}
            </div>
          </DemoPanel>
        </div>

        {activeSection === 'dashboard' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.95fr]">
            <DemoPanel title="Critical stock" subtitle="The commercially strongest alerts appear first.">
              <div className="space-y-3">
                {state.items
                  .filter((item) => item.status !== 'Healthy')
                  .map((item) => (
                    <div key={item.sku} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{item.name}</p>
                          <p className="mt-1 text-sm text-slate-600">
                            {item.sku} · Zone {item.zone}
                          </p>
                        </div>
                        <DemoBadge value={item.status} tone="warning" />
                      </div>
                      <p className="mt-3 text-xs text-slate-500">
                        On hand {item.onHand} · Reorder point {item.reorderPoint}
                      </p>
                    </div>
                  ))}
              </div>
            </DemoPanel>
            <DemoPanel title="Vendor performance" subtitle="Snapshot of supplier health.">
              <DemoDataTable
                columns={[
                  { key: 'name', header: 'Vendor', render: (row) => row.name },
                  { key: 'category', header: 'Category', render: (row) => row.category },
                  { key: 'fillRate', header: 'Fill Rate', render: (row) => row.fillRate },
                  { key: 'leadTime', header: 'Lead Time', render: (row) => row.leadTime },
                ]}
                rows={state.vendors.map((vendor) => ({ ...vendor, id: vendor.id }))}
              />
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'stock' ? (
          <div className="mt-4">
            <DemoPanel title="Stock ledger" subtitle="Searchable SKU list backed by local-only datasets.">
              <div className="mb-4 rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  value={stockQuery}
                  onChange={(event) => setStockQuery(event.target.value)}
                  placeholder="Search SKU, item name, zone"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              {filteredItems.length > 0 ? (
                <DemoDataTable
                  columns={[
                    { key: 'sku', header: 'SKU', render: (row) => <span className="font-semibold text-slate-950">{row.sku}</span> },
                    { key: 'name', header: 'Item', render: (row) => row.name },
                    { key: 'zone', header: 'Zone', render: (row) => row.zone },
                    { key: 'onHand', header: 'On Hand', render: (row) => row.onHand },
                    { key: 'reorderPoint', header: 'Reorder', render: (row) => row.reorderPoint },
                    { key: 'status', header: 'Status', render: (row) => <DemoBadge value={row.status} tone={row.status === 'Healthy' ? 'positive' : 'warning'} /> },
                  ]}
                  rows={filteredItems.map((item) => ({ ...item, id: item.sku }))}
                />
              ) : (
                <DemoEmptyState title="No stock items matched" description="Try another SKU, zone, or item keyword." />
              )}
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'purchase-orders' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.85fr]">
            <DemoPanel title="Purchase orders" subtitle="Raise, review, and approve POs without any backend.">
              <div className="space-y-3">
                {state.purchaseOrders.map((purchaseOrder) => (
                  <div key={purchaseOrder.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{purchaseOrder.vendor}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {purchaseOrder.id} · ETA {purchaseOrder.eta}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DemoBadge value={purchaseOrder.status} tone={purchaseOrder.status === 'Approved' ? 'positive' : purchaseOrder.status === 'Draft' ? 'warning' : 'neutral'} />
                        {purchaseOrder.status !== 'Approved' ? (
                          <button
                            type="button"
                            onClick={() => approvePurchaseOrder(purchaseOrder.id)}
                            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                          >
                            Approve
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">{purchaseOrder.amount}</p>
                  </div>
                ))}
              </div>
            </DemoPanel>
            <DemoPanel title="Create purchase order" subtitle="Writes only to mock state stored in the browser.">
              <form className="grid gap-4" onSubmit={handlePurchaseOrderSubmit}>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Vendor</span>
                  <select
                    value={poForm.vendor}
                    onChange={(event) => setPoForm((current) => ({ ...current, vendor: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  >
                    {state.vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.name}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">ETA</span>
                  <input
                    value={poForm.eta}
                    onChange={(event) => setPoForm((current) => ({ ...current, eta: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Amount</span>
                  <input
                    value={poForm.amount}
                    onChange={(event) => setPoForm((current) => ({ ...current, amount: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--demo-primary)]"
                  />
                </label>
                <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white">
                  Save draft PO
                </button>
              </form>
            </DemoPanel>
          </div>
        ) : null}

        {activeSection === 'vendors' ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.95fr]">
            <DemoPanel title="Vendor directory" subtitle="Supplier health overview with zero database dependency.">
              <DemoDataTable
                columns={[
                  { key: 'vendor', header: 'Vendor', render: (row) => row.name },
                  { key: 'category', header: 'Category', render: (row) => row.category },
                  { key: 'fillRate', header: 'Fill Rate', render: (row) => row.fillRate },
                  { key: 'leadTime', header: 'Lead Time', render: (row) => row.leadTime },
                ]}
                rows={state.vendors.map((vendor) => ({ ...vendor, id: vendor.id }))}
              />
            </DemoPanel>
            <DemoPanel title="Receivables snapshot" subtitle="Simple finance visibility for a polished client story.">
              <div className="space-y-3">
                {state.invoices.map((invoice) => (
                  <div key={invoice.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{invoice.customer}</p>
                        <p className="mt-1 text-sm text-slate-600">{invoice.amount}</p>
                      </div>
                      <DemoBadge value={invoice.status} tone={invoice.status === 'Paid' ? 'positive' : 'warning'} />
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Due date {invoice.dueDate}</p>
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
