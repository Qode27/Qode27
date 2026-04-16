import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type HrmsEmployee = {
  id: string
  name: string
  department: string
  role: string
  location: string
  status: 'Active' | 'On Leave' | 'Probation'
  attendance: string
  leaveBalance: number
  salaryBand: string
}

export type HrmsLeaveRequest = {
  id: string
  employee: string
  type: string
  duration: string
  status: 'Pending' | 'Approved' | 'Escalated'
}

export type HrmsCandidate = {
  id: string
  name: string
  role: string
  stage: string
  score: string
  owner: string
}

export type HrmsPayrollRun = {
  month: string
  total: string
  variance: string
  status: string
}

export type HrmsState = {
  employees: HrmsEmployee[]
  leaveRequests: HrmsLeaveRequest[]
  candidates: HrmsCandidate[]
  payrollRuns: HrmsPayrollRun[]
  attendanceTrend: DemoTrendPoint[]
}

export const hrmsUsers: DemoUser[] = [
  { name: 'Ananya Rao', role: 'HR Director', email: 'ananya@demo.qode27', avatar: 'AR' },
  { name: 'Rahul Verma', role: 'Payroll Lead', email: 'rahul@demo.qode27', avatar: 'RV' },
  { name: 'Kiran Das', role: 'Talent Partner', email: 'kiran@demo.qode27', avatar: 'KD' },
]

export function createHrmsState(): HrmsState {
  return {
    employees: [
      { id: 'EMP-001', name: 'Arun Nair', department: 'Engineering', role: 'Platform Lead', location: 'Hyderabad', status: 'Active', attendance: '98%', leaveBalance: 8, salaryBand: 'L4' },
      { id: 'EMP-014', name: 'Sana Fatima', department: 'People Ops', role: 'HR Executive', location: 'Bengaluru', status: 'Active', attendance: '97%', leaveBalance: 11, salaryBand: 'L2' },
      { id: 'EMP-026', name: 'Nikhil Jain', department: 'Sales', role: 'Enterprise AE', location: 'Mumbai', status: 'On Leave', attendance: '93%', leaveBalance: 2, salaryBand: 'L3' },
      { id: 'EMP-031', name: 'Divya Reddy', department: 'Finance', role: 'Accounts Manager', location: 'Hyderabad', status: 'Active', attendance: '99%', leaveBalance: 7, salaryBand: 'L3' },
      { id: 'EMP-044', name: 'Harsha Patel', department: 'Operations', role: 'Implementation Manager', location: 'Pune', status: 'Probation', attendance: '95%', leaveBalance: 4, salaryBand: 'L2' },
      { id: 'EMP-057', name: 'Mubeen Khan', department: 'Support', role: 'Support Lead', location: 'Chennai', status: 'Active', attendance: '96%', leaveBalance: 6, salaryBand: 'L2' },
    ],
    leaveRequests: [
      { id: 'LEV-118', employee: 'Nikhil Jain', type: 'Annual Leave', duration: '3 days', status: 'Pending' },
      { id: 'LEV-122', employee: 'Harsha Patel', type: 'Sick Leave', duration: '1 day', status: 'Approved' },
      { id: 'LEV-128', employee: 'Sana Fatima', type: 'Work From Home', duration: '2 days', status: 'Escalated' },
    ],
    candidates: [
      { id: 'CAN-01', name: 'Neha Kulkarni', role: 'UI Engineer', stage: 'Panel Interview', score: '8.7/10', owner: 'Kiran Das' },
      { id: 'CAN-08', name: 'Pradeep S', role: 'Ops Analyst', stage: 'Assignment Review', score: '7.9/10', owner: 'Ananya Rao' },
      { id: 'CAN-14', name: 'Zoya Mirza', role: 'Finance Associate', stage: 'Offer Discussion', score: '9.1/10', owner: 'Rahul Verma' },
    ],
    payrollRuns: [
      { month: 'Jan 2026', total: 'Rs 48.2L', variance: '+2.1%', status: 'Closed' },
      { month: 'Feb 2026', total: 'Rs 48.9L', variance: '+1.4%', status: 'Closed' },
      { month: 'Mar 2026', total: 'Rs 49.6L', variance: '+1.5%', status: 'Closed' },
      { month: 'Apr 2026', total: 'Rs 50.1L', variance: '+1.0%', status: 'Processing' },
    ],
    attendanceTrend: [
      { label: 'Mon', value: 95 },
      { label: 'Tue', value: 96 },
      { label: 'Wed', value: 94 },
      { label: 'Thu', value: 97 },
      { label: 'Fri', value: 96 },
      { label: 'Sat', value: 91 },
    ],
  }
}
