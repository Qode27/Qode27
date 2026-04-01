import type { IconType } from 'react-icons'
import {
  FiArchive,
  FiBookOpen,
  FiBox,
  FiHeart,
  FiPackage,
  FiShoppingBag,
  FiTruck,
  FiUsers,
} from 'react-icons/fi'

export type SolutionSlug =
  | 'parking-management'
  | 'inventory-management'
  | 'logistics-shipping'
  | 'port-operations'
  | 'coaching-management'
  | 'retail-takeaway'
  | 'healthcare-management'
  | 'hrms'

export type Solution = {
  slug: SolutionSlug
  icon: IconType
  name: string
  category: string
  cardDescription: string
  introDescription: string
  heroTitle: string
  heroDescription: string
  keywordsTitle: string
  keywordsDescription: string
  problems: string[]
  approach: string[]
  features: string[]
  useCases: string[]
  benefits: string[]
  screenshots: string[]
  faqs: { question: string; answer: string }[]
  featured?: boolean
}

export const solutions: Solution[] = [
  {
    slug: 'parking-management',
    icon: FiTruck,
    name: 'Parking Management System',
    category: 'Operations',
    cardDescription: 'Track vehicle entries, exits, space usage, billing, and revenue in one system.',
    introDescription: 'Software for truck parking businesses that need operational control, billing clarity, and live site visibility.',
    heroTitle: 'Smart parking management software for truck parking businesses.',
    heroDescription:
      'Digitize vehicle entry, exit, slot usage, billing, and reporting so your team can run parking operations with more speed and less confusion.',
    keywordsTitle: 'Parking management software for business operations',
    keywordsDescription: 'Built for truck parking businesses that need movement tracking, revenue visibility, and stronger operational control.',
    problems: [
      'Manual entry and exit records create billing mistakes and weak audit trails.',
      'Site operators struggle to see slot occupancy and overall space utilization clearly.',
      'Revenue tracking becomes inconsistent when movement and billing are disconnected.',
    ],
    approach: [
      'Create a live operational view of vehicle movement and slot allocation.',
      'Connect parking duration, billing logic, and payment visibility in one workflow.',
      'Give owners and managers a clearer reporting layer for site performance.',
    ],
    features: ['Vehicle entry and exit tracking', 'Parking slot usage visibility', 'Billing and revenue monitoring', 'Dashboard reporting', 'Operational movement history'],
    useCases: [
      'A truck enters the site and the system begins tracking movement and billing instantly.',
      'Operators can check occupied and available slots before assigning parking space.',
      'Management can review daily vehicle count, billing totals, and site utilization.',
    ],
    benefits: ['Reduce billing disputes', 'Improve site visibility', 'Make operator workflows more structured', 'Centralize parking business reporting'],
    screenshots: ['Parking operations dashboard', 'Live slot occupancy view', 'Billing and movement records'],
    faqs: [
      {
        question: 'Can the software track both movement and billing together?',
        answer: 'Yes. The workflow is designed so movement data and billing visibility stay connected instead of being tracked separately.',
      },
      {
        question: 'Is this only for large parking businesses?',
        answer: 'No. The system can be adapted for growing parking businesses as well as larger multi-operator environments.',
      },
    ],
    featured: true,
  },
  {
    slug: 'inventory-management',
    icon: FiBox,
    name: 'Inventory Management Software',
    category: 'Distribution',
    cardDescription: 'Manage stock, dispatch, warehouse movement, and reporting for distributors.',
    introDescription: 'Inventory software for distributors and stock-driven businesses that need better control across inward, outward, and warehouse workflows.',
    heroTitle: 'Inventory software built for distributors and stock-driven businesses.',
    heroDescription:
      'Track stock movement, warehouse visibility, dispatch control, and inventory reporting through one structured operational system.',
    keywordsTitle: 'Inventory software for distributors and warehouse-driven businesses',
    keywordsDescription: 'Improve stock visibility, dispatch planning, and reporting without relying on scattered manual records.',
    problems: [
      'Inventory records drift out of sync when teams update stock manually.',
      'Dispatch and warehouse coordination become difficult without a clear system of record.',
      'Business owners lack timely reporting on stock movement and availability.',
    ],
    approach: [
      'Bring inward, outward, and warehouse activity into one central platform.',
      'Improve stock accuracy through structured operational updates.',
      'Surface reporting that helps businesses react faster to stock and dispatch needs.',
    ],
    features: ['Stock tracking', 'Warehouse visibility', 'Inward and outward entries', 'Dispatch control', 'Inventory reporting'],
    useCases: [
      'A distributor receives new stock and the system updates inventory records immediately.',
      'Warehouse teams can track availability before dispatching goods to customers or branches.',
      'Management can review movement history and stock position without chasing manual sheets.',
    ],
    benefits: ['Improve stock visibility', 'Reduce record mismatch', 'Support faster dispatch planning', 'Strengthen reporting across operations'],
    screenshots: ['Inventory dashboard', 'Warehouse stock records', 'Dispatch planning view'],
    faqs: [
      {
        question: 'Can the system support distributor workflows?',
        answer: 'Yes. It is designed specifically for businesses that manage stock movement, warehouse records, and dispatch operations.',
      },
      {
        question: 'Can reports be tailored to business needs?',
        answer: 'Yes. Reporting can be structured around the inventory and operational visibility the business needs most.',
      },
    ],
    featured: true,
  },
  {
    slug: 'logistics-shipping',
    icon: FiPackage,
    name: 'Logistics and Shipping Software',
    category: 'Logistics',
    cardDescription: 'Digitize operations, job tracking, revenue flow, and business visibility.',
    introDescription: 'Software for logistics and shipping businesses that need centralized status tracking, operational control, and revenue visibility.',
    heroTitle: 'Software for logistics and shipping operations that need clarity and control.',
    heroDescription:
      'Replace scattered status updates and disconnected tracking with one operational system for workflow visibility, job monitoring, and business reporting.',
    keywordsTitle: 'Logistics software for shipment tracking and operational visibility',
    keywordsDescription: 'Built for shipping and logistics businesses that need centralized management and cleaner business workflow tracking.',
    problems: [
      'Shipment and job updates are difficult to monitor when information lives across calls, chats, and spreadsheets.',
      'Revenue visibility weakens when operations and billing are not connected clearly.',
      'Managers struggle to see the status of ongoing business activity in one place.',
    ],
    approach: [
      'Centralize operational movement and status tracking in one business system.',
      'Improve management visibility across workflow stages and reporting.',
      'Design clearer interfaces for teams handling day-to-day logistics execution.',
    ],
    features: ['Shipment records', 'Status tracking', 'Revenue visibility', 'Centralized workflow management', 'Operational reporting'],
    useCases: [
      'Operations teams update shipment status in a central system instead of multiple disconnected channels.',
      'Managers review pending, active, and completed work with clearer visibility.',
      'Leadership gets business-level reporting on performance and operational movement.',
    ],
    benefits: ['Reduce communication gaps', 'Improve job tracking', 'Increase management visibility', 'Support stronger operational discipline'],
    screenshots: ['Operations control dashboard', 'Shipment workflow tracker', 'Revenue and activity reports'],
    faqs: [
      {
        question: 'Is this suitable for growing logistics companies?',
        answer: 'Yes. The system is designed for companies that need structure as operational volume increases.',
      },
      {
        question: 'Can it support custom shipping workflows?',
        answer: 'Yes. The workflow structure can be adapted to the business model and operational stages you follow.',
      },
    ],
    featured: true,
  },
  {
    slug: 'port-operations',
    icon: FiArchive,
    name: 'Port Operations Software',
    category: 'Operations',
    cardDescription: 'Streamline movement, coordination, records, and operational monitoring.',
    introDescription: 'Business software for port-related operations that need structured coordination, workflow records, and centralized oversight.',
    heroTitle: 'Digitize complex port operations with structured business software.',
    heroDescription:
      'Bring movement coordination, operational records, and management visibility into a system designed for high-complexity environments.',
    keywordsTitle: 'Port operations software for coordination and oversight',
    keywordsDescription: 'Support movement, records, reporting, and operational control through centralized software.',
    problems: [
      'Complex movement coordination becomes difficult when teams rely on fragmented manual tracking.',
      'Operational records are harder to audit when updates are spread across multiple systems or offline workflows.',
      'Management lacks one unified view of execution and performance.',
    ],
    approach: [
      'Create structured workflows for movement and operational coordination.',
      'Centralize records and monitoring across the activity lifecycle.',
      'Build reporting layers that improve oversight and operational control.',
    ],
    features: ['Movement coordination', 'Operational records', 'Reporting and oversight', 'Workflow monitoring', 'Centralized management'],
    useCases: [
      'Teams coordinate movement updates through one structured system instead of manual follow-up.',
      'Business records are easier to review and audit across operations.',
      'Management can monitor activity status and performance from a central dashboard.',
    ],
    benefits: ['Reduce operational ambiguity', 'Improve oversight', 'Strengthen record keeping', 'Support more scalable coordination'],
    screenshots: ['Operations overview', 'Movement coordination workspace', 'Performance reporting panel'],
    faqs: [
      {
        question: 'Can Qode27 adapt this software to specific port workflows?',
        answer: 'Yes. The system approach is designed to fit the operational model, roles, and reporting needs of the business.',
      },
      {
        question: 'Is this intended only for very large operations?',
        answer: 'No. It can support both focused operational workflows and more complex, multi-team business environments.',
      },
    ],
  },
  {
    slug: 'coaching-management',
    icon: FiBookOpen,
    name: 'Coaching Management App',
    category: 'Education',
    cardDescription: 'Manage students, attendance, fees, batches, and academic workflow.',
    introDescription: 'Software for coaching centers and institutes that need a cleaner system for admissions, fees, attendance, and student administration.',
    heroTitle: 'Simple coaching management software for growing institutes.',
    heroDescription:
      'Bring student records, attendance, fee tracking, batch management, and reporting into one platform that reduces manual admin work.',
    keywordsTitle: 'Coaching management software for institutes and education businesses',
    keywordsDescription: 'Support admissions, attendance, fees, and academic workflows with a cleaner operational system.',
    problems: [
      'Student and fee records become difficult to manage when institutes rely on spreadsheets and manual updates.',
      'Attendance tracking and batch management consume too much administrative effort.',
      'Owners and administrators lack clear reporting on institute operations.',
    ],
    approach: [
      'Centralize student information and fee tracking in one place.',
      'Reduce admin load with cleaner attendance and batch workflows.',
      'Give institute leadership better visibility into day-to-day operations.',
    ],
    features: ['Student management', 'Attendance tracking', 'Fee records', 'Batch management', 'Institute reporting'],
    useCases: [
      'Admissions and student records move into one structured digital workflow.',
      'Attendance and batch activity are tracked daily without manual reconciliation.',
      'Administrators can review dues, admissions, and operational performance quickly.',
    ],
    benefits: ['Reduce admin workload', 'Improve student record visibility', 'Keep fee tracking more organized', 'Make institute operations easier to manage'],
    screenshots: ['Institute dashboard', 'Student and batch records', 'Attendance and fees reports'],
    faqs: [
      {
        question: 'Can this software work for both small and growing institutes?',
        answer: 'Yes. It is designed to support institutes that want a simpler, scalable way to run operations.',
      },
      {
        question: 'Can modules be tailored for the institute workflow?',
        answer: 'Yes. Qode27 can shape the software around the way your institute manages admissions, attendance, and fees.',
      },
    ],
    featured: true,
  },
  {
    slug: 'retail-takeaway',
    icon: FiShoppingBag,
    name: 'Retail and Takeaway Management Software',
    category: 'Retail',
    cardDescription: 'Track orders, sales, revenue, and day-to-day store performance.',
    introDescription: 'Software for retail and takeaway businesses that need stronger daily control over orders, sales, and operational reporting.',
    heroTitle: 'Software for takeaway and retail businesses that need faster daily control.',
    heroDescription:
      'Manage orders, revenue, item records, and operational performance in one clean interface built for fast-moving daily business activity.',
    keywordsTitle: 'Retail and takeaway software for order and revenue tracking',
    keywordsDescription: 'Bring store-level activity, sales visibility, and operational reporting into one system.',
    problems: [
      'Order handling becomes inconsistent when teams rely on disconnected tools or manual tracking.',
      'Owners struggle to review sales and revenue clearly across the day.',
      'Store operations remain reactive when item records and performance data are fragmented.',
    ],
    approach: [
      'Centralize order and revenue visibility in one system.',
      'Make day-to-day store workflows easier for operational teams to manage.',
      'Improve reporting for owners who want clearer performance insight.',
    ],
    features: ['Order management', 'Revenue tracking', 'Daily operations visibility', 'Item records', 'Sales reporting'],
    useCases: [
      'Store teams track orders and daily activity through one operational interface.',
      'Owners monitor revenue and item-level performance more clearly.',
      'Daily sales reporting becomes easier to review without manual compilation.',
    ],
    benefits: ['Improve store visibility', 'Reduce manual reporting effort', 'Support faster daily decisions', 'Strengthen order control'],
    screenshots: ['Store performance dashboard', 'Order operations panel', 'Daily sales summary'],
    faqs: [
      {
        question: 'Is this suitable for multi-outlet retail businesses?',
        answer: 'Yes. The software approach can scale from single-store operations to broader retail workflows.',
      },
      {
        question: 'Can the system match our store process?',
        answer: 'Yes. Qode27 can adapt the workflow around how your retail or takeaway operation actually runs.',
      },
    ],
    featured: true,
  },
  {
    slug: 'healthcare-management',
    icon: FiHeart,
    name: 'Hospital Management Software',
    category: 'Healthcare',
    cardDescription: 'Handle patient workflows, billing, prescriptions, and operational efficiency.',
    introDescription: 'Healthcare software for hospitals and clinics that need better front-desk speed, patient workflow control, and billing accuracy.',
    heroTitle: 'Healthcare software designed to simplify everyday hospital operations.',
    heroDescription:
      'Manage patient records, OPD and IPD workflows, billing, prescriptions, and reports through a system built for daily healthcare operations.',
    keywordsTitle: 'Hospital management software for operational clarity',
    keywordsDescription: 'Support patient records, billing, front desk efficiency, and workflow visibility in one platform.',
    problems: [
      'Front-desk and patient processes slow down when records and billing are handled manually.',
      'Billing errors increase when service flow and finance workflow are disconnected.',
      'Hospital administrators struggle to maintain a clear operational picture across departments.',
    ],
    approach: [
      'Create a structured system for patient movement and billing visibility.',
      'Simplify daily front-desk and administrative workflows.',
      'Provide clearer reports and operational control for management.',
    ],
    features: ['Patient records', 'OPD and IPD workflow', 'Billing management', 'Prescription support', 'Operational reports'],
    useCases: [
      'Front-desk teams register and manage patients with better speed and consistency.',
      'Billing teams can track service-linked amounts more clearly.',
      'Administrators review activity, collections, and workflow performance in one place.',
    ],
    benefits: ['Improve front-desk efficiency', 'Reduce billing confusion', 'Strengthen patient workflow visibility', 'Support better hospital administration'],
    screenshots: ['Patient operations dashboard', 'Billing and collections workspace', 'Hospital performance reports'],
    faqs: [
      {
        question: 'Can this software work for clinics as well as hospitals?',
        answer: 'Yes. The workflow can be adapted to smaller clinical operations as well as broader hospital environments.',
      },
      {
        question: 'Is billing accuracy part of the design focus?',
        answer: 'Yes. Billing visibility and operational alignment are a core part of the healthcare system approach.',
      },
    ],
    featured: true,
  },
  {
    slug: 'hrms',
    icon: FiUsers,
    name: 'HRMS and Internal Operations Software',
    category: 'Business',
    cardDescription: 'Simplify workforce, records, approvals, and organization management.',
    introDescription: 'HRMS software for business teams that need cleaner employee workflows, approvals, attendance, and internal operations control.',
    heroTitle: 'HRMS and internal operations software for modern business teams.',
    heroDescription:
      'Bring employee records, approvals, attendance, and organization workflows into one structured system that supports daily business execution.',
    keywordsTitle: 'HRMS software for internal operations and employee workflows',
    keywordsDescription: 'Support approvals, attendance, records, and business operations with a cleaner HRMS platform.',
    problems: [
      'HR and management teams lose time managing records and approvals across multiple disconnected tools.',
      'Attendance and employee workflow tracking become harder to maintain as teams grow.',
      'Leadership lacks operational clarity over internal process execution.',
    ],
    approach: [
      'Centralize employee records and approval workflow in one system.',
      'Make attendance and internal operations easier to monitor and manage.',
      'Create more visibility for both HR teams and business leadership.',
    ],
    features: ['Employee records', 'Approval workflows', 'Attendance management', 'Internal operations tracking', 'Organization reporting'],
    useCases: [
      'HR teams manage records and approvals through one structured workflow.',
      'Managers can review attendance and team operations with less back-and-forth.',
      'Leadership gets clearer operational reporting across internal processes.',
    ],
    benefits: ['Reduce manual HR effort', 'Improve internal workflow clarity', 'Support better employee record management', 'Create more structured day-to-day operations'],
    screenshots: ['HRMS operations dashboard', 'Employee records and approvals view', 'Attendance and reporting workspace'],
    faqs: [
      {
        question: 'Can this support internal business operations beyond HR?',
        answer: 'Yes. The platform can be extended around broader internal workflows depending on the business need.',
      },
      {
        question: 'Is this suitable for SMB teams?',
        answer: 'Yes. It is especially useful for growing businesses that need more structure without heavy enterprise software complexity.',
      },
    ],
  },
]

export const featuredSolutionSlugs: SolutionSlug[] = [
  'parking-management',
  'inventory-management',
  'logistics-shipping',
  'coaching-management',
  'retail-takeaway',
  'healthcare-management',
]

export const solutionIndustryOptions = [
  'Truck Parking',
  'Inventory / Distribution',
  'Logistics / Shipping',
  'Port Operations',
  'Coaching / Education',
  'Retail / Takeaway',
  'Healthcare',
  'HRMS',
  'Custom Software',
  'Other',
] as const

export function getSolutionBySlug(slug?: string) {
  return solutions.find((solution) => solution.slug === slug)
}

export function buildRequestDemoPath(solutionName?: string) {
  return solutionName ? `/request-demo?industry=${encodeURIComponent(solutionName)}` : '/request-demo'
}
