import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type HmsPatient = {
  id: string
  name: string
  unit: string
  doctor: string
  status: 'Admitted' | 'Discharged' | 'Waiting'
  bill: string
}

export type HmsAppointment = {
  id: string
  patient: string
  doctor: string
  time: string
  type: string
  status: 'Confirmed' | 'Checked In' | 'Delayed'
}

export type HmsBilling = {
  id: string
  department: string
  amount: string
  paymentMode: string
  status: 'Settled' | 'Pending'
}

export type HmsDoctor = {
  id: string
  name: string
  specialty: string
  opdLoad: string
  room: string
}

export type HmsState = {
  patients: HmsPatient[]
  appointments: HmsAppointment[]
  billings: HmsBilling[]
  doctors: HmsDoctor[]
  collectionsTrend: DemoTrendPoint[]
}

export const hmsUsers: DemoUser[] = [
  { name: 'Dr. Meera Shah', role: 'Medical Superintendent', email: 'meera@demo.qode27', avatar: 'MS' },
  { name: 'Karthik Iyer', role: 'Front Desk Manager', email: 'karthik@demo.qode27', avatar: 'KI' },
  { name: 'Nida Parveen', role: 'Billing Supervisor', email: 'nida@demo.qode27', avatar: 'NP' },
]

export function createHmsState(): HmsState {
  return {
    patients: [
      { id: 'PAT-401', name: 'Mahesh Babu', unit: 'Cardiology', doctor: 'Dr. Varun S', status: 'Admitted', bill: 'Rs 68,400' },
      { id: 'PAT-408', name: 'Rekha Menon', unit: 'Orthopedics', doctor: 'Dr. Swati K', status: 'Waiting', bill: 'Rs 12,800' },
      { id: 'PAT-412', name: 'Faizan Ali', unit: 'General Medicine', doctor: 'Dr. Rhea P', status: 'Admitted', bill: 'Rs 21,400' },
      { id: 'PAT-419', name: 'Sunita Rao', unit: 'Pediatrics', doctor: 'Dr. Amit N', status: 'Discharged', bill: 'Rs 8,600' },
      { id: 'PAT-427', name: 'Joseph Thomas', unit: 'Neurology', doctor: 'Dr. Varun S', status: 'Admitted', bill: 'Rs 92,200' },
    ],
    appointments: [
      { id: 'APT-201', patient: 'Naveen G', doctor: 'Dr. Rhea P', time: '09:15 AM', type: 'OPD Review', status: 'Checked In' },
      { id: 'APT-214', patient: 'Ayesha Khan', doctor: 'Dr. Swati K', time: '10:40 AM', type: 'Radiology Follow-up', status: 'Confirmed' },
      { id: 'APT-225', patient: 'Pooja I', doctor: 'Dr. Amit N', time: '11:20 AM', type: 'Pediatric Review', status: 'Delayed' },
      { id: 'APT-239', patient: 'Girish N', doctor: 'Dr. Varun S', time: '12:05 PM', type: 'Cardiac Consultation', status: 'Confirmed' },
    ],
    billings: [
      { id: 'BIL-01', department: 'Emergency', amount: 'Rs 54,000', paymentMode: 'Insurance', status: 'Pending' },
      { id: 'BIL-07', department: 'Pharmacy', amount: 'Rs 18,600', paymentMode: 'UPI', status: 'Settled' },
      { id: 'BIL-11', department: 'Diagnostics', amount: 'Rs 31,400', paymentMode: 'Card', status: 'Settled' },
      { id: 'BIL-16', department: 'Inpatient', amount: 'Rs 82,000', paymentMode: 'Cashless', status: 'Pending' },
    ],
    doctors: [
      { id: 'DOC-11', name: 'Dr. Varun S', specialty: 'Cardiology', opdLoad: '24 consults', room: '3A' },
      { id: 'DOC-15', name: 'Dr. Rhea P', specialty: 'Internal Medicine', opdLoad: '18 consults', room: '2C' },
      { id: 'DOC-18', name: 'Dr. Amit N', specialty: 'Pediatrics', opdLoad: '16 consults', room: '1B' },
    ],
    collectionsTrend: [
      { label: 'Mon', value: 4.2 },
      { label: 'Tue', value: 4.8 },
      { label: 'Wed', value: 4.5 },
      { label: 'Thu', value: 5.1 },
      { label: 'Fri', value: 4.9 },
      { label: 'Sat', value: 4.4 },
    ],
  }
}
