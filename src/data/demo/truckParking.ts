import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type ParkingBay = {
  id: string
  zone: string
  truckType: string
  status: 'Occupied' | 'Reserved' | 'Available'
  eta: string
}

export type ParkingMovement = {
  id: string
  truckNumber: string
  transporter: string
  bay: string
  duration: string
  status: 'Parked' | 'Exiting' | 'Queued'
}

export type ParkingInvoice = {
  id: string
  transporter: string
  amount: string
  mode: string
  status: 'Paid' | 'Pending'
}

export type ParkingState = {
  bays: ParkingBay[]
  movements: ParkingMovement[]
  invoices: ParkingInvoice[]
  occupancyTrend: DemoTrendPoint[]
}

export const truckParkingUsers: DemoUser[] = [
  { name: 'Rohit Kulkarni', role: 'Site Manager', email: 'rohit@demo.qode27', avatar: 'RK' },
  { name: 'Farah Ahmed', role: 'Revenue Desk', email: 'farah@demo.qode27', avatar: 'FA' },
  { name: 'Siddhant Rao', role: 'Operations Supervisor', email: 'sid@demo.qode27', avatar: 'SR' },
]

export function createTruckParkingState(): ParkingState {
  return {
    bays: [
      { id: 'B-01', zone: 'North Yard', truckType: 'Trailer', status: 'Occupied', eta: '02:10 PM exit' },
      { id: 'B-07', zone: 'North Yard', truckType: 'Tanker', status: 'Reserved', eta: '01:25 PM arrival' },
      { id: 'B-12', zone: 'Central Lane', truckType: 'Container', status: 'Available', eta: 'Open now' },
      { id: 'B-19', zone: 'Central Lane', truckType: 'Trailer', status: 'Occupied', eta: '04:40 PM exit' },
      { id: 'B-24', zone: 'South Yard', truckType: 'Mini Truck', status: 'Available', eta: 'Open now' },
    ],
    movements: [
      { id: 'MOV-501', truckNumber: 'TS09AB4381', transporter: 'BluePeak Logistics', bay: 'B-01', duration: '05h 22m', status: 'Parked' },
      { id: 'MOV-506', truckNumber: 'KA13Q9912', transporter: 'RoadAxis Freight', bay: 'B-19', duration: '02h 08m', status: 'Parked' },
      { id: 'MOV-511', truckNumber: 'MH04TR1118', transporter: 'Metro Haul', bay: 'Exit Gate', duration: '07h 12m', status: 'Exiting' },
      { id: 'MOV-518', truckNumber: 'AP39XZ7100', transporter: 'North Cargo', bay: 'Queue', duration: '00h 34m', status: 'Queued' },
    ],
    invoices: [
      { id: 'PK-781', transporter: 'BluePeak Logistics', amount: 'Rs 12,800', mode: 'FASTag', status: 'Paid' },
      { id: 'PK-783', transporter: 'Metro Haul', amount: 'Rs 18,400', mode: 'UPI', status: 'Paid' },
      { id: 'PK-788', transporter: 'North Cargo', amount: 'Rs 6,200', mode: 'Cash', status: 'Pending' },
    ],
    occupancyTrend: [
      { label: '06:00', value: 31 },
      { label: '09:00', value: 48 },
      { label: '12:00', value: 52 },
      { label: '15:00', value: 57 },
      { label: '18:00', value: 49 },
      { label: '21:00', value: 38 },
    ],
  }
}
