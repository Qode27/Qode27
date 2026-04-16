import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type ShipmentRecord = {
  id: string
  customer: string
  route: string
  container: string
  stage: 'Booked' | 'In Transit' | 'Customs Hold' | 'Delivered'
  eta: string
}

export type ShipmentMilestone = {
  id: string
  shipmentId: string
  title: string
  timestamp: string
  status: 'Done' | 'Active' | 'Pending'
}

export type ShipmentException = {
  id: string
  shipmentId: string
  issue: string
  owner: string
  severity: 'Low' | 'Medium' | 'High'
}

export type ShippingState = {
  shipments: ShipmentRecord[]
  milestones: ShipmentMilestone[]
  exceptions: ShipmentException[]
  deliveryTrend: DemoTrendPoint[]
}

export const shippingUsers: DemoUser[] = [
  { name: 'Rakesh Menon', role: 'Ops Controller', email: 'rakesh@demo.qode27', avatar: 'RM' },
  { name: 'Tanvi Shah', role: 'Customer Desk', email: 'tanvi@demo.qode27', avatar: 'TS' },
  { name: 'Joel Pinto', role: 'Exceptions Lead', email: 'joel@demo.qode27', avatar: 'JP' },
]

export function createShippingState(): ShippingState {
  return {
    shipments: [
      { id: 'SHP-101', customer: 'Apex Retail', route: 'Nhava Sheva → Dubai', container: 'CMAU-8821', stage: 'In Transit', eta: '19 Apr' },
      { id: 'SHP-112', customer: 'BluePeak Metals', route: 'Chennai → Singapore', container: 'MSCU-1142', stage: 'Booked', eta: '22 Apr' },
      { id: 'SHP-119', customer: 'Northline Foods', route: 'Mundra → Jeddah', container: 'OOLU-6118', stage: 'Customs Hold', eta: 'Delay risk' },
      { id: 'SHP-124', customer: 'Nexa Pharma', route: 'Kandla → Colombo', container: 'SEGU-5120', stage: 'Delivered', eta: 'Arrived' },
    ],
    milestones: [
      { id: 'MS-01', shipmentId: 'SHP-101', title: 'Loaded on vessel', timestamp: '17 Apr 08:10', status: 'Done' },
      { id: 'MS-02', shipmentId: 'SHP-101', title: 'Transshipment scan', timestamp: '19 Apr 11:30', status: 'Active' },
      { id: 'MS-03', shipmentId: 'SHP-112', title: 'Customs filing', timestamp: '18 Apr 03:00', status: 'Pending' },
    ],
    exceptions: [
      { id: 'EX-01', shipmentId: 'SHP-119', issue: 'HS code clarification pending', owner: 'Joel Pinto', severity: 'High' },
      { id: 'EX-02', shipmentId: 'SHP-112', issue: 'Awaiting exporter invoice copy', owner: 'Tanvi Shah', severity: 'Medium' },
    ],
    deliveryTrend: [
      { label: 'Mon', value: 31 },
      { label: 'Tue', value: 28 },
      { label: 'Wed', value: 36 },
      { label: 'Thu', value: 33 },
      { label: 'Fri', value: 39 },
    ],
  }
}
