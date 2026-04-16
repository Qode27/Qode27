import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type PortVessel = {
  id: string
  vessel: string
  berth: string
  cargo: string
  eta: string
  status: 'Docked' | 'Approaching' | 'Loading' | 'Cleared'
}

export type PortDock = {
  id: string
  crane: string
  occupancy: string
  status: 'Busy' | 'Available' | 'Maintenance'
}

export type PortCargo = {
  id: string
  lot: string
  commodity: string
  tonnage: string
  state: 'Queued' | 'Handling' | 'Released'
}

export type PortState = {
  vessels: PortVessel[]
  docks: PortDock[]
  cargo: PortCargo[]
  throughputTrend: DemoTrendPoint[]
}

export const portUsers: DemoUser[] = [
  { name: 'Capt. Neeraj D', role: 'Harbor Master', email: 'neeraj@demo.qode27', avatar: 'ND' },
  { name: 'Alisha Thomas', role: 'Berth Planner', email: 'alisha@demo.qode27', avatar: 'AT' },
  { name: 'Iqbal Khan', role: 'Cargo Desk', email: 'iqbal@demo.qode27', avatar: 'IK' },
]

export function createPortState(): PortState {
  return {
    vessels: [
      { id: 'VES-01', vessel: 'MV Eastern Crown', berth: 'B-3', cargo: 'Containers', eta: 'Docked 06:40', status: 'Docked' },
      { id: 'VES-02', vessel: 'MT Blue Delta', berth: 'B-6', cargo: 'Liquid Bulk', eta: 'ETA 02:15 PM', status: 'Approaching' },
      { id: 'VES-03', vessel: 'MV Harbor Dawn', berth: 'B-1', cargo: 'Steel Coil', eta: 'Loading in progress', status: 'Loading' },
      { id: 'VES-04', vessel: 'MV Coral Ridge', berth: 'B-8', cargo: 'Agri Bulk', eta: 'Cleared 09:20', status: 'Cleared' },
    ],
    docks: [
      { id: 'B-1', crane: 'CR-11', occupancy: '92%', status: 'Busy' },
      { id: 'B-3', crane: 'CR-08', occupancy: '88%', status: 'Busy' },
      { id: 'B-6', crane: 'CR-14', occupancy: '42%', status: 'Available' },
      { id: 'B-8', crane: 'CR-02', occupancy: '0%', status: 'Maintenance' },
    ],
    cargo: [
      { id: 'CG-01', lot: 'LOT-18A', commodity: 'Steel Coil', tonnage: '2,400 MT', state: 'Handling' },
      { id: 'CG-04', lot: 'LOT-22C', commodity: 'Machinery Parts', tonnage: '620 MT', state: 'Queued' },
      { id: 'CG-08', lot: 'LOT-31F', commodity: 'Food Grain', tonnage: '3,800 MT', state: 'Released' },
    ],
    throughputTrend: [
      { label: '06:00', value: 2.4 },
      { label: '09:00', value: 4.1 },
      { label: '12:00', value: 3.8 },
      { label: '15:00', value: 4.5 },
      { label: '18:00', value: 3.1 },
    ],
  }
}
