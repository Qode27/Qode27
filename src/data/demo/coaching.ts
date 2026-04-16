import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type CoachingStudent = {
  id: string
  name: string
  batch: string
  program: string
  attendance: string
  feeStatus: 'Paid' | 'Partial' | 'Overdue'
}

export type CoachingClass = {
  id: string
  subject: string
  faculty: string
  slot: string
  room: string
  batch: string
}

export type CoachingFee = {
  id: string
  student: string
  amount: string
  dueDate: string
  status: 'Paid' | 'Pending' | 'Overdue'
}

export type CoachingLead = {
  id: string
  student: string
  program: string
  source: string
  stage: 'Inquiry' | 'Counselling' | 'Admitted'
}

export type CoachingState = {
  students: CoachingStudent[]
  timetable: CoachingClass[]
  fees: CoachingFee[]
  leads: CoachingLead[]
  attendanceTrend: DemoTrendPoint[]
}

export const coachingUsers: DemoUser[] = [
  { name: 'Ritika Sen', role: 'Institute Director', email: 'ritika@demo.qode27', avatar: 'RS' },
  { name: 'Vamsi Krish', role: 'Academic Coordinator', email: 'vamsi@demo.qode27', avatar: 'VK' },
  { name: 'Nazia Khan', role: 'Fee Desk', email: 'nazia@demo.qode27', avatar: 'NK' },
]

export function createCoachingState(): CoachingState {
  return {
    students: [
      { id: 'STD-101', name: 'Aarav Sharma', batch: 'NEET Alpha', program: 'NEET', attendance: '93%', feeStatus: 'Paid' },
      { id: 'STD-142', name: 'Hiba Noor', batch: 'JEE Prime', program: 'JEE', attendance: '89%', feeStatus: 'Partial' },
      { id: 'STD-188', name: 'Sai Teja', batch: 'Foundation X', program: 'Foundation', attendance: '96%', feeStatus: 'Paid' },
      { id: 'STD-214', name: 'Manya Goyal', batch: 'NEET Alpha', program: 'NEET', attendance: '84%', feeStatus: 'Overdue' },
      { id: 'STD-225', name: 'Kiran Paul', batch: 'JEE Prime', program: 'JEE', attendance: '91%', feeStatus: 'Paid' },
    ],
    timetable: [
      { id: 'CLS-01', subject: 'Physics Revision', faculty: 'R. Kulkarni', slot: '07:00 AM', room: 'Hall A', batch: 'JEE Prime' },
      { id: 'CLS-02', subject: 'Organic Chemistry', faculty: 'Dr. Leena', slot: '09:00 AM', room: 'Hall B', batch: 'NEET Alpha' },
      { id: 'CLS-03', subject: 'Mathematics Drill', faculty: 'V. Thomas', slot: '11:30 AM', room: 'Lab 1', batch: 'JEE Prime' },
      { id: 'CLS-04', subject: 'Biology Test Review', faculty: 'S. Joseph', slot: '04:00 PM', room: 'Hall C', batch: 'NEET Alpha' },
    ],
    fees: [
      { id: 'FEE-11', student: 'Aarav Sharma', amount: 'Rs 24,000', dueDate: '18 Apr', status: 'Paid' },
      { id: 'FEE-15', student: 'Hiba Noor', amount: 'Rs 18,000', dueDate: '21 Apr', status: 'Pending' },
      { id: 'FEE-19', student: 'Manya Goyal', amount: 'Rs 24,000', dueDate: '13 Apr', status: 'Overdue' },
      { id: 'FEE-23', student: 'Kiran Paul', amount: 'Rs 22,000', dueDate: '24 Apr', status: 'Pending' },
    ],
    leads: [
      { id: 'LD-01', student: 'Rohit Jain', program: 'NEET', source: 'Seminar', stage: 'Counselling' },
      { id: 'LD-05', student: 'Anushka P', program: 'JEE', source: 'Instagram', stage: 'Inquiry' },
      { id: 'LD-07', student: 'Nitin Das', program: 'Foundation', source: 'Referral', stage: 'Admitted' },
    ],
    attendanceTrend: [
      { label: 'Mon', value: 88 },
      { label: 'Tue', value: 91 },
      { label: 'Wed', value: 90 },
      { label: 'Thu', value: 93 },
      { label: 'Fri', value: 92 },
      { label: 'Sat', value: 87 },
    ],
  }
}
