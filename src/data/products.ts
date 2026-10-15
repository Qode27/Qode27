import { getDemoAppBySolutionSlug, getDemoRoute } from '../config/demo-apps'
import { solutions, type Solution, type SolutionSlug } from './solutions'

export type ProductModuleGroup = { name: string; items: string[] }

type ProductExtras = {
  /** Short product label used in navigation and the product index. */
  label: string
  /** Industry page the product belongs to. */
  industry: string
  /** Who works in the product — taken from the roles modelled in each product's demo. */
  roles: string[]
  /** Module groups shown on the product page. */
  modules: ProductModuleGroup[]
  accent: string
}

const extras: Record<SolutionSlug, ProductExtras> = {
  'healthcare-management': {
    label: 'Hospital Management',
    industry: 'healthcare',
    roles: ['Medical Superintendent', 'Front Desk Manager', 'Billing Supervisor', 'Doctors'],
    modules: [
      { name: 'Patient & Appointment', items: ['Patient registration', 'Appointment scheduling', 'OPD / IPD intake', 'Doctor schedules'] },
      { name: 'Clinical Care', items: ['Doctor consultation', 'Prescriptions', 'Lab & radiology', 'Ward occupancy'] },
      { name: 'Billing & Reports', items: ['Invoicing', 'Doctor signatures', 'Role-based access', 'Operational analytics'] },
    ],
    accent: '#2dd4bf',
  },
  hrms: {
    label: 'HRMS',
    industry: 'professional-services',
    roles: ['HR Director', 'Payroll Lead', 'Talent Partner', 'Managers'],
    modules: [
      { name: 'People', items: ['Employee records', 'Organization structure'] },
      { name: 'Time', items: ['Attendance management', 'Leave and approvals'] },
      { name: 'Operations', items: ['Approval workflows', 'Payroll visibility', 'Hiring pipeline', 'Organization reporting'] },
    ],
    accent: '#7c8efc',
  },
  'inventory-management': {
    label: 'Inventory',
    industry: 'distribution',
    roles: ['Warehouse Head', 'Procurement Manager', 'Dispatch Lead'],
    modules: [
      { name: 'Stock', items: ['Stock tracking', 'Warehouse visibility', 'Reorder flags'] },
      { name: 'Movement', items: ['Inward entries', 'Outward entries', 'Purchase orders'] },
      { name: 'Control', items: ['Dispatch control', 'Vendor coordination', 'Inventory reporting'] },
    ],
    accent: '#f59e0b',
  },
  'parking-management': {
    label: 'Truck Parking',
    industry: 'logistics',
    roles: ['Site Manager', 'Revenue Desk', 'Operations Supervisor'],
    modules: [
      { name: 'Movement', items: ['Vehicle entry', 'Vehicle exit', 'Movement history'] },
      { name: 'Site', items: ['Bay allocation', 'Slot occupancy'] },
      { name: 'Revenue', items: ['Duration-based billing', 'Revenue monitoring', 'Dashboard reporting'] },
    ],
    accent: '#facc15',
  },
  'coaching-management': {
    label: 'Coaching Management',
    industry: 'education',
    roles: ['Institute Director', 'Academic Coordinator', 'Fee Desk'],
    modules: [
      { name: 'Students', items: ['Admissions', 'Student records'] },
      { name: 'Academics', items: ['Batch management', 'Attendance tracking'] },
      { name: 'Administration', items: ['Fee records', 'Dues follow-up', 'Institute reporting'] },
    ],
    accent: '#a78bfa',
  },
  'accounting-firm': {
    label: 'CA Practice',
    industry: 'professional-services',
    roles: ['Managing Partner', 'GST Manager', 'Collections Lead'],
    modules: [
      { name: 'Clients', items: ['Client ledgers', 'Assignment tracking'] },
      { name: 'Compliance', items: ['GST and tax tracking', 'Filing checkpoints'] },
      { name: 'Revenue', items: ['Invoice management', 'Collections reporting'] },
    ],
    accent: '#38bdf8',
  },
  'retail-takeaway': {
    label: 'Restaurant & Takeaway',
    industry: 'retail',
    roles: ['Outlet Manager', 'Kitchen Lead', 'Dispatch Counter'],
    modules: [
      { name: 'Orders', items: ['Order management', 'Kitchen flow', 'Dispatch counter'] },
      { name: 'Catalogue', items: ['Item records'] },
      { name: 'Performance', items: ['Revenue tracking', 'Daily operations visibility', 'Sales reporting'] },
    ],
    accent: '#fb7185',
  },
  'logistics-shipping': {
    label: 'Logistics & Shipping',
    industry: 'logistics',
    roles: ['Ops Controller', 'Customer Desk', 'Exceptions Lead'],
    modules: [
      { name: 'Shipments', items: ['Shipment records', 'Status tracking'] },
      { name: 'Operations', items: ['Centralized workflow management', 'Exception handling'] },
      { name: 'Business', items: ['Revenue visibility', 'Operational reporting'] },
    ],
    accent: '#60a5fa',
  },
  'port-operations': {
    label: 'Port Operations',
    industry: 'logistics',
    roles: ['Harbor Master', 'Berth Planner', 'Cargo Desk'],
    modules: [
      { name: 'Coordination', items: ['Movement coordination', 'Berth planning'] },
      { name: 'Records', items: ['Operational records', 'Workflow monitoring'] },
      { name: 'Oversight', items: ['Reporting and oversight', 'Centralized management'] },
    ],
    accent: '#22d3ee',
  },
  'crm-sales': {
    label: 'CRM & Sales',
    industry: 'professional-services',
    roles: ['Sales Director', 'Account Executive', 'RevOps'],
    modules: [
      { name: 'Pipeline', items: ['Pipeline board', 'Deal tracking'] },
      { name: 'Leads', items: ['Lead scoring', 'Next-action workflow'] },
      { name: 'Forecast', items: ['Revenue forecast reporting', 'Stage health'] },
    ],
    accent: '#34d399',
  },
}

export type Product = Solution & ProductExtras & { demoHref?: string }

/** Display order: flagship hospital management first. */
const order: SolutionSlug[] = [
  'healthcare-management',
  'hrms',
  'inventory-management',
  'logistics-shipping',
  'crm-sales',
  'accounting-firm',
  'coaching-management',
  'retail-takeaway',
  'parking-management',
  'port-operations',
]

export const products: Product[] = order.map((slug) => {
  const solution = solutions.find((item) => item.slug === slug) as Solution
  const demo = getDemoAppBySolutionSlug(slug)
  const demoHref = demo && demo.demoEnabled && !demo.requestDemoOnly ? getDemoRoute(demo.slug) : undefined
  return { ...solution, ...extras[slug], demoHref }
})

export function getProductBySlug(slug?: string) {
  return products.find((product) => product.slug === slug)
}

export function productHref(slug: string) {
  return `/products/${slug}`
}
