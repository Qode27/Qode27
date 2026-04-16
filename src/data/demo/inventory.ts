import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type InventoryItem = {
  sku: string
  name: string
  zone: string
  onHand: number
  reorderPoint: number
  status: 'Healthy' | 'Low' | 'Critical'
}

export type InventoryPurchaseOrder = {
  id: string
  vendor: string
  eta: string
  amount: string
  status: 'Approved' | 'Awaiting GRN' | 'Draft'
}

export type InventoryVendor = {
  id: string
  name: string
  category: string
  fillRate: string
  leadTime: string
}

export type InventoryInvoice = {
  id: string
  customer: string
  amount: string
  status: 'Paid' | 'Pending'
  dueDate: string
}

export type InventoryState = {
  items: InventoryItem[]
  purchaseOrders: InventoryPurchaseOrder[]
  vendors: InventoryVendor[]
  invoices: InventoryInvoice[]
  throughputTrend: DemoTrendPoint[]
}

export const inventoryUsers: DemoUser[] = [
  { name: 'Akhil Bansal', role: 'Warehouse Head', email: 'akhil@demo.qode27', avatar: 'AB' },
  { name: 'Priya Suresh', role: 'Procurement Manager', email: 'priya@demo.qode27', avatar: 'PS' },
  { name: 'Tarun Rao', role: 'Dispatch Lead', email: 'tarun@demo.qode27', avatar: 'TR' },
]

export function createInventoryState(): InventoryState {
  return {
    items: [
      { sku: 'SKU-1102', name: 'Hydraulic Valve Kit', zone: 'A1', onHand: 184, reorderPoint: 120, status: 'Healthy' },
      { sku: 'SKU-1441', name: 'Thermal Sensor Pack', zone: 'B4', onHand: 62, reorderPoint: 80, status: 'Low' },
      { sku: 'SKU-1808', name: 'Bearing Assembly', zone: 'C2', onHand: 28, reorderPoint: 60, status: 'Critical' },
      { sku: 'SKU-2140', name: 'Industrial Fastener Set', zone: 'A3', onHand: 330, reorderPoint: 140, status: 'Healthy' },
      { sku: 'SKU-2399', name: 'Controller Board', zone: 'D1', onHand: 48, reorderPoint: 50, status: 'Low' },
    ],
    purchaseOrders: [
      { id: 'PO-9081', vendor: 'Omni Industrial Supply', eta: '18 Apr', amount: 'Rs 4.8L', status: 'Approved' },
      { id: 'PO-9088', vendor: 'Metro Components', eta: '20 Apr', amount: 'Rs 2.4L', status: 'Awaiting GRN' },
      { id: 'PO-9095', vendor: 'Northline Fabricators', eta: '24 Apr', amount: 'Rs 1.9L', status: 'Draft' },
    ],
    vendors: [
      { id: 'VEN-08', name: 'Omni Industrial Supply', category: 'Mechanical', fillRate: '98%', leadTime: '4 days' },
      { id: 'VEN-12', name: 'Metro Components', category: 'Electronics', fillRate: '94%', leadTime: '6 days' },
      { id: 'VEN-15', name: 'Northline Fabricators', category: 'Fabrication', fillRate: '91%', leadTime: '7 days' },
    ],
    invoices: [
      { id: 'INV-5001', customer: 'Sai Equipment', amount: 'Rs 3.1L', status: 'Paid', dueDate: '16 Apr' },
      { id: 'INV-5008', customer: 'Prism Projects', amount: 'Rs 5.4L', status: 'Pending', dueDate: '19 Apr' },
      { id: 'INV-5015', customer: 'Apex Infra', amount: 'Rs 2.3L', status: 'Pending', dueDate: '21 Apr' },
    ],
    throughputTrend: [
      { label: 'Mon', value: 64 },
      { label: 'Tue', value: 72 },
      { label: 'Wed', value: 68 },
      { label: 'Thu', value: 77 },
      { label: 'Fri', value: 81 },
      { label: 'Sat', value: 58 },
    ],
  }
}
