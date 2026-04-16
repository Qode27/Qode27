import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type CaClient = {
  id: string
  name: string
  owner: string
  gstStatus: 'On Track' | 'Pending Docs' | 'Filed'
  receivable: string
}

export type CaAssignment = {
  id: string
  client: string
  workType: string
  dueDate: string
  stage: 'Drafting' | 'Review' | 'Filed'
}

export type CaInvoice = {
  id: string
  client: string
  amount: string
  dueDate: string
  status: 'Paid' | 'Pending' | 'Overdue'
}

export type CaLedgerEntry = {
  id: string
  client: string
  description: string
  amount: string
  kind: 'Debit' | 'Credit'
}

export type CaState = {
  clients: CaClient[]
  assignments: CaAssignment[]
  invoices: CaInvoice[]
  ledger: CaLedgerEntry[]
  collectionTrend: DemoTrendPoint[]
}

export const caUsers: DemoUser[] = [
  { name: 'Pallavi Shah', role: 'Managing Partner', email: 'pallavi@demo.qode27', avatar: 'PS' },
  { name: 'Deepak Rao', role: 'GST Manager', email: 'deepak@demo.qode27', avatar: 'DR' },
  { name: 'Farhan Ali', role: 'Collections Lead', email: 'farhan@demo.qode27', avatar: 'FA' },
]

export function createCaState(): CaState {
  return {
    clients: [
      { id: 'CL-11', name: 'Apex Components', owner: 'Deepak Rao', gstStatus: 'On Track', receivable: 'Rs 1.2L' },
      { id: 'CL-15', name: 'Metro Buildcon', owner: 'Pallavi Shah', gstStatus: 'Pending Docs', receivable: 'Rs 2.8L' },
      { id: 'CL-18', name: 'Seven Seas Exports', owner: 'Farhan Ali', gstStatus: 'Filed', receivable: 'Rs 0.8L' },
      { id: 'CL-23', name: 'Kiran Distributors', owner: 'Deepak Rao', gstStatus: 'On Track', receivable: 'Rs 1.7L' },
    ],
    assignments: [
      { id: 'ASG-01', client: 'Apex Components', workType: 'Monthly GST', dueDate: '20 Apr', stage: 'Review' },
      { id: 'ASG-04', client: 'Metro Buildcon', workType: 'TDS Filing', dueDate: '18 Apr', stage: 'Drafting' },
      { id: 'ASG-08', client: 'Seven Seas Exports', workType: 'Annual Return', dueDate: '27 Apr', stage: 'Filed' },
    ],
    invoices: [
      { id: 'INV-801', client: 'Apex Components', amount: 'Rs 58,000', dueDate: '19 Apr', status: 'Pending' },
      { id: 'INV-806', client: 'Metro Buildcon', amount: 'Rs 1,24,000', dueDate: '14 Apr', status: 'Overdue' },
      { id: 'INV-811', client: 'Kiran Distributors', amount: 'Rs 42,000', dueDate: '24 Apr', status: 'Paid' },
    ],
    ledger: [
      { id: 'LED-01', client: 'Apex Components', description: 'GST advisory retainer', amount: 'Rs 28,000', kind: 'Credit' },
      { id: 'LED-02', client: 'Metro Buildcon', description: 'Notice response drafting', amount: 'Rs 18,000', kind: 'Debit' },
      { id: 'LED-03', client: 'Seven Seas Exports', description: 'Audit documentation', amount: 'Rs 32,000', kind: 'Credit' },
    ],
    collectionTrend: [
      { label: 'W1', value: 2.4 },
      { label: 'W2', value: 1.8 },
      { label: 'W3', value: 3.2 },
      { label: 'W4', value: 2.9 },
    ],
  }
}
