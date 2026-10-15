import type { IconType } from 'react-icons'
import { FiBookOpen, FiBox, FiBriefcase, FiHeart, FiShoppingBag, FiTruck } from 'react-icons/fi'
import type { SolutionSlug } from './solutions'

export type Industry = {
  slug: string
  icon: IconType
  name: string
  tagline: string
  summary: string
  heroTitle: string
  heroText: string
  challenges: { title: string; text: string }[]
  workflow: string[]
  products: SolutionSlug[]
  approach: string[]
  seoTitle: string
  seoDescription: string
}

export const industries: Industry[] = [
  {
    slug: 'healthcare',
    icon: FiHeart,
    name: 'Healthcare',
    tagline: 'Hospitals and clinics',
    summary: 'Patient flow, clinical records, and billing connected in one operating view for hospitals and clinics.',
    heroTitle: 'Healthcare software that keeps patient flow and billing in step.',
    heroText:
      'Hospitals and clinics lose time when registration, consultation, diagnostics, and billing are coordinated by hand. We build systems that connect them.',
    challenges: [
      { title: 'Front-desk congestion', text: 'Manual registration and scheduling slow down patient intake during peak hours.' },
      { title: 'Billing disconnected from care', text: 'Services delivered and services billed drift apart when records are separate.' },
      { title: 'Limited administrative visibility', text: 'Administrators struggle to see activity across departments in one place.' },
    ],
    workflow: ['Registration', 'Appointment', 'Consultation', 'Lab & radiology', 'Billing', 'Reports'],
    products: ['healthcare-management', 'hrms'],
    approach: [
      'Structure patient movement from registration through discharge.',
      'Tie billing to the services actually delivered.',
      'Give administrators an operational view across departments.',
    ],
    seoTitle: 'Healthcare Software for Hospitals and Clinics | Qode27',
    seoDescription:
      'Hospital and clinic management software covering registration, appointments, OPD/IPD, prescriptions, billing, and reporting. Built by Qode27.',
  },
  {
    slug: 'logistics',
    icon: FiTruck,
    name: 'Logistics & Transport',
    tagline: 'Shipping, ports, and truck parking',
    summary: 'Movement, status, and revenue tracked in one system for shipping operators, port teams, and parking sites.',
    heroTitle: 'One operating view for movement, status, and revenue.',
    heroText:
      'Logistics teams coordinate across calls, chats, and spreadsheets. We centralize movement records and status so managers see what is happening without chasing updates.',
    challenges: [
      { title: 'Status lives in conversations', text: 'Updates scattered across calls and messages make it hard to know where work stands.' },
      { title: 'Billing disputes', text: 'When movement and billing are tracked separately, disagreements and leakage follow.' },
      { title: 'Complex coordination', text: 'Multiple teams, sites, and handoffs require a shared system of record.' },
    ],
    workflow: ['Booking / entry', 'Allocation', 'Movement', 'Status updates', 'Billing', 'Reporting'],
    products: ['logistics-shipping', 'port-operations', 'parking-management'],
    approach: [
      'Record every movement once, at the point where it happens.',
      'Connect operational status with billing and revenue.',
      'Give management a live view across sites and jobs.',
    ],
    seoTitle: 'Logistics, Shipping, and Port Operations Software | Qode27',
    seoDescription:
      'Logistics software for shipment tracking, port operations coordination, and truck parking management. Centralized movement, status, and revenue visibility.',
  },
  {
    slug: 'distribution',
    icon: FiBox,
    name: 'Distribution & Warehousing',
    tagline: 'Distributors and stock-driven businesses',
    summary: 'Inventory, inward and outward movement, and dispatch aligned so stock numbers can be trusted.',
    heroTitle: 'Inventory numbers your team can actually trust.',
    heroText:
      'When inward, outward, and dispatch activity are updated in different places, stock figures drift. We build systems that keep movement and records aligned.',
    challenges: [
      { title: 'Stock figures drift', text: 'Manual updates across sheets and calls lead to mismatched inventory.' },
      { title: 'Dispatch delays', text: 'Teams cannot confirm availability quickly before committing to orders.' },
      { title: 'Weak warehouse visibility', text: 'Owners lack timely reporting on movement and stock position.' },
    ],
    workflow: ['Purchase', 'Inward', 'Storage', 'Order', 'Dispatch', 'Reporting'],
    products: ['inventory-management', 'crm-sales'],
    approach: [
      'Bring inward, outward, and warehouse activity into one platform.',
      'Check availability before dispatch, not after.',
      'Surface movement history and stock position on demand.',
    ],
    seoTitle: 'Inventory and Distribution Software | Qode27',
    seoDescription:
      'Inventory management software for distributors: stock tracking, inward and outward entries, dispatch control, and warehouse reporting.',
  },
  {
    slug: 'education',
    icon: FiBookOpen,
    name: 'Education',
    tagline: 'Coaching centres and institutes',
    summary: 'Admissions, attendance, batches, and fee records managed in one structured admin system.',
    heroTitle: 'Institute administration without the spreadsheet overhead.',
    heroText:
      'Coaching centres and institutes spend significant time reconciling admissions, attendance, and fees. We centralize student administration so staff can focus on teaching.',
    challenges: [
      { title: 'Scattered student records', text: 'Admissions and student details spread across files and sheets.' },
      { title: 'Attendance effort', text: 'Daily attendance and batch tracking consume administrative time.' },
      { title: 'Fee follow-up', text: 'Tracking dues and collections manually is slow and error-prone.' },
    ],
    workflow: ['Enquiry', 'Admission', 'Batch assignment', 'Attendance', 'Fees', 'Reports'],
    products: ['coaching-management'],
    approach: [
      'Centralize student information from enquiry to completion.',
      'Make attendance and batch management a daily routine, not a reconciliation task.',
      'Give leadership a clear view of admissions and dues.',
    ],
    seoTitle: 'Coaching Institute Management Software | Qode27',
    seoDescription:
      'Coaching and institute management software for admissions, attendance, batch management, fee tracking, and reporting.',
  },
  {
    slug: 'retail',
    icon: FiShoppingBag,
    name: 'Retail & Food Service',
    tagline: 'Restaurants, takeaways, and stores',
    summary: 'Orders, item records, and daily sales visible in one interface for fast-moving operations.',
    heroTitle: 'Day-level control for fast-moving retail and food service.',
    heroText:
      'High order volume leaves little time for reconciliation. We build systems that record orders and sales as they happen, so owners see the day clearly.',
    challenges: [
      { title: 'Fragmented order handling', text: 'Orders tracked across disconnected tools lead to errors and delays.' },
      { title: 'End-of-day reporting', text: 'Sales summaries are compiled manually after the fact.' },
      { title: 'Limited item insight', text: 'Owners cannot easily see item-level performance.' },
    ],
    workflow: ['Order', 'Kitchen / preparation', 'Dispatch', 'Payment', 'Daily summary'],
    products: ['retail-takeaway'],
    approach: [
      'Record orders once and carry them through preparation and dispatch.',
      'Make sales and item performance visible during the day.',
      'Scale from a single outlet to broader operations.',
    ],
    seoTitle: 'Restaurant and Retail Order Management Software | Qode27',
    seoDescription:
      'Order management software for restaurants, takeaways, and retail: order tracking, item records, revenue visibility, and daily sales reporting.',
  },
  {
    slug: 'professional-services',
    icon: FiBriefcase,
    name: 'Professional Services',
    tagline: 'CA firms, sales teams, and service businesses',
    summary: 'Client work, compliance checkpoints, pipelines, and invoicing organized for service businesses.',
    heroTitle: 'Structure for client work, compliance, and follow-through.',
    heroText:
      'Service businesses run on recurring client work and timely follow-up. We build systems that keep assignments, deadlines, pipelines, and invoices visible.',
    challenges: [
      { title: 'Deadlines tracked manually', text: 'Filing and compliance milestones depend on individual memory.' },
      { title: 'Revenue follow-through', text: 'Invoices and collections slip when ownership is unclear.' },
      { title: 'Pipeline uncertainty', text: 'Managers cannot see whether targets are backed by real opportunities.' },
    ],
    workflow: ['Lead / client', 'Engagement', 'Assignments', 'Compliance checkpoints', 'Invoicing', 'Collections'],
    products: ['accounting-firm', 'crm-sales', 'hrms'],
    approach: [
      'Centralize client records, assignments, and deadlines.',
      'Make next actions and ownership explicit.',
      'Connect delivered work with invoicing and collections.',
    ],
    seoTitle: 'Software for CA Firms and Professional Services | Qode27',
    seoDescription:
      'Software for accounting firms and professional services: client ledgers, GST and compliance tracking, CRM pipelines, invoicing, and HR operations.',
  },
]

export function getIndustryBySlug(slug?: string) {
  return industries.find((industry) => industry.slug === slug)
}
