/**
 * Operational scenarios Qode27 designs for. These are illustrative engagement
 * patterns — not client case studies — and are labelled as such on the site.
 * Add verified, client-approved case studies to `caseStudies` when available.
 */
export const scenarios = [
  {
    scenario: 'Truck parking site with high daily vehicle movement',
    problem: 'Entries, exits, slot usage, and billing tracked manually, creating disputes and weak revenue visibility.',
    approach: 'One live system for movement records, bay allocation, duration-based billing, and site reporting.',
    product: 'parking-management',
  },
  {
    scenario: 'Distributor managing stock across warehouse and dispatch',
    problem: 'Inventory figures drift when inward, outward, and dispatch activity are updated in separate sheets or by phone.',
    approach: 'Stock position, movement history, and dispatch planning kept aligned in a single inventory platform.',
    product: 'inventory-management',
  },
  {
    scenario: 'Logistics business coordinating active jobs',
    problem: 'Status updates, billing, and operational progress sit across chats, calls, and spreadsheets.',
    approach: 'One operating view for movement, status, and revenue, reducing follow-up effort.',
    product: 'logistics-shipping',
  },
  {
    scenario: 'Coaching institute managing admissions, attendance, and fees',
    problem: 'Admin teams spend too much time reconciling records and chasing updates across manual tools.',
    approach: 'Structured student operations with clear fee tracking and batch management.',
    product: 'coaching-management',
  },
  {
    scenario: 'Restaurant or takeaway with high daily order volume',
    problem: 'Orders, item records, and daily sales reporting are fragmented.',
    approach: 'Day-level control over orders, preparation, dispatch, and revenue from one interface.',
    product: 'retail-takeaway',
  },
  {
    scenario: 'Hospital or clinic coordinating front desk, care, and billing',
    problem: 'Manual coordination slows patient intake and makes billing accuracy harder across departments.',
    approach: 'Structured patient flow from registration to billing with administrative visibility.',
    product: 'healthcare-management',
  },
] as const

export type CaseStudy = {
  slug: string
  client: string
  problem: string
  objectives: string[]
  solution: string
  technology: string[]
  outcome: string
}

/** Verified, client-approved case studies. Intentionally empty until approved material is available. */
export const caseStudies: CaseStudy[] = []
