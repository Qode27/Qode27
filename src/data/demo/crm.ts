import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type CrmLead = {
  id: string
  company: string
  contact: string
  value: string
  stage: 'Prospect' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won'
  score: number
  owner: string
}

export type CrmActivity = {
  id: string
  company: string
  note: string
  due: string
  owner: string
}

export type CrmForecast = {
  id: string
  segment: string
  target: string
  committed: string
  confidence: string
}

export type CrmState = {
  leads: CrmLead[]
  activities: CrmActivity[]
  forecast: CrmForecast[]
  pipelineTrend: DemoTrendPoint[]
}

export const crmUsers: DemoUser[] = [
  { name: 'Niharika Rao', role: 'Sales Director', email: 'niharika@demo.qode27', avatar: 'NR' },
  { name: 'Sourav Paul', role: 'Account Executive', email: 'sourav@demo.qode27', avatar: 'SP' },
  { name: 'Mina Joseph', role: 'RevOps', email: 'mina@demo.qode27', avatar: 'MJ' },
]

export function createCrmState(): CrmState {
  return {
    leads: [
      { id: 'LD-101', company: 'Apex Retail', contact: 'Rohan Mehta', value: 'Rs 42L', stage: 'Proposal', score: 86, owner: 'Sourav Paul' },
      { id: 'LD-108', company: 'BluePeak Logistics', contact: 'Sana Karim', value: 'Rs 58L', stage: 'Negotiation', score: 92, owner: 'Niharika Rao' },
      { id: 'LD-114', company: 'Kiran Distributors', contact: 'Amit Shah', value: 'Rs 18L', stage: 'Qualified', score: 73, owner: 'Sourav Paul' },
      { id: 'LD-127', company: 'Metro Health', contact: 'Priya Thomas', value: 'Rs 64L', stage: 'Prospect', score: 68, owner: 'Mina Joseph' },
      { id: 'LD-134', company: 'Northline Foods', contact: 'Joel Mathew', value: 'Rs 23L', stage: 'Won', score: 95, owner: 'Niharika Rao' },
    ],
    activities: [
      { id: 'ACT-01', company: 'Apex Retail', note: 'Review proposal redlines', due: 'Today 4:30 PM', owner: 'Sourav Paul' },
      { id: 'ACT-02', company: 'BluePeak Logistics', note: 'Confirm pilot rollout timeline', due: 'Tomorrow 11:00 AM', owner: 'Niharika Rao' },
      { id: 'ACT-03', company: 'Metro Health', note: 'Discovery call follow-up', due: 'Today 6:00 PM', owner: 'Mina Joseph' },
    ],
    forecast: [
      { id: 'FC-01', segment: 'Enterprise', target: 'Rs 2.2Cr', committed: 'Rs 1.4Cr', confidence: '64%' },
      { id: 'FC-02', segment: 'SMB', target: 'Rs 80L', committed: 'Rs 52L', confidence: '65%' },
      { id: 'FC-03', segment: 'Channel', target: 'Rs 40L', committed: 'Rs 18L', confidence: '45%' },
    ],
    pipelineTrend: [
      { label: 'Jan', value: 1.8 },
      { label: 'Feb', value: 2.1 },
      { label: 'Mar', value: 2.6 },
      { label: 'Apr', value: 3.1 },
    ],
  }
}
