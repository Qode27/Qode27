import { FiActivity, FiBox, FiHeart, FiTruck } from 'react-icons/fi'
import type { SolutionSlug } from '../data/solutions'
import { buildWhatsAppHref } from '../lib/demo/mock'
import type { DemoAppConfig, DemoAppSlug } from '../lib/demo/types'

export const demoApps: DemoAppConfig[] = [
  {
    slug: 'hrms',
    solutionSlug: 'hrms',
    name: 'HRMS Demo',
    shortName: 'HRMS',
    category: 'Internal Operations',
    tagline: 'People operations, attendance, payroll, and hiring in one polished walkthrough.',
    summary: 'Show workforce visibility, approvals, payroll health, and hiring momentum with safe in-browser mock state.',
    accent: {
      primary: '#0f766e',
      secondary: '#14b8a6',
      surface: 'rgba(15, 118, 110, 0.12)',
      gradient: 'linear-gradient(135deg, #062925 0%, #0f3d39 42%, #0f766e 100%)',
    },
    icon: FiActivity,
    heroMetrics: [
      { label: 'Employees', value: '248', change: '+12 this quarter', tone: 'positive' },
      { label: 'Attendance', value: '96.4%', change: '+1.8% vs last month', tone: 'positive' },
      { label: 'Payroll Health', value: 'On track', change: 'Zero pending approvals', tone: 'neutral' },
    ],
    demoEnabled: true,
    requestDemoOnly: false,
    modulePath: () => import('../pages/demo/apps/HrmsDemoPage'),
  },
  {
    slug: 'hms',
    solutionSlug: 'healthcare-management',
    name: 'Hospital Management Demo',
    shortName: 'HMS',
    category: 'Healthcare',
    tagline: 'Front desk, appointments, billing, and ward operations with a client-ready hospital flow.',
    summary: 'Demonstrate patient movement, doctor schedules, collections, and occupancy without touching live records.',
    accent: {
      primary: '#1d4ed8',
      secondary: '#60a5fa',
      surface: 'rgba(29, 78, 216, 0.12)',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
    },
    icon: FiHeart,
    heroMetrics: [
      { label: 'Today Appointments', value: '126', change: '14 walk-ins added', tone: 'neutral' },
      { label: 'Collections', value: 'Rs 4.8L', change: '+9% vs yesterday', tone: 'positive' },
      { label: 'Ward Occupancy', value: '82%', change: '12 beds available', tone: 'warning' },
    ],
    demoEnabled: true,
    requestDemoOnly: false,
    modulePath: () => import('../pages/demo/apps/HmsDemoPage'),
  },
  {
    slug: 'inventory',
    solutionSlug: 'inventory-management',
    name: 'Inventory Demo',
    shortName: 'Inventory',
    category: 'Distribution',
    tagline: 'Warehouse visibility, vendor coordination, and order control from one demo workspace.',
    summary: 'Demonstrate stock accuracy, purchase flow, vendor SLAs, and sample exports with static data and local state.',
    accent: {
      primary: '#9333ea',
      secondary: '#c084fc',
      surface: 'rgba(147, 51, 234, 0.12)',
      gradient: 'linear-gradient(135deg, #24053a 0%, #581c87 52%, #9333ea 100%)',
    },
    icon: FiBox,
    heroMetrics: [
      { label: 'Active SKUs', value: '1,486', change: '98 flagged for reorder', tone: 'warning' },
      { label: 'Order Fill Rate', value: '97.1%', change: '+2.1% this week', tone: 'positive' },
      { label: 'Warehouse Value', value: 'Rs 2.7Cr', change: 'Across 4 storage zones', tone: 'neutral' },
    ],
    demoEnabled: true,
    requestDemoOnly: false,
    modulePath: () => import('../pages/demo/apps/InventoryDemoPage'),
  },
  {
    slug: 'truck-parking',
    solutionSlug: 'parking-management',
    name: 'Truck Parking Demo',
    shortName: 'Parking',
    category: 'Operations',
    tagline: 'Live bay occupancy, entries, exits, and revenue flow in a premium operations shell.',
    summary: 'Show parking movement, bay allocation, occupancy, and billing with realistic local-only datasets.',
    accent: {
      primary: '#ea580c',
      secondary: '#fb923c',
      surface: 'rgba(234, 88, 12, 0.12)',
      gradient: 'linear-gradient(135deg, #271105 0%, #7c2d12 52%, #ea580c 100%)',
    },
    icon: FiTruck,
    heroMetrics: [
      { label: 'Current Occupancy', value: '78%', change: '52 of 67 bays used', tone: 'warning' },
      { label: 'Daily Revenue', value: 'Rs 1.46L', change: '+11% vs avg day', tone: 'positive' },
      { label: 'Average Turnaround', value: '6h 12m', change: '2 fast-lane exits pending', tone: 'neutral' },
    ],
    demoEnabled: true,
    requestDemoOnly: false,
    modulePath: () => import('../pages/demo/apps/TruckParkingDemoPage'),
  },
]

export function getDemoAppBySlug(slug?: string) {
  return demoApps.find((app) => app.slug === slug)
}

export function getDemoAppBySolutionSlug(solutionSlug?: SolutionSlug) {
  return demoApps.find((app) => app.solutionSlug === solutionSlug)
}

export function getDemoRoute(slug: DemoAppSlug) {
  return `/demo/${slug}`
}

export function buildDemoRequestPath(appName?: string) {
  return appName ? `/request-demo?industry=${encodeURIComponent(appName)}&source=interactive-demo` : '/request-demo'
}

export function buildDemoWhatsAppHref(appName: string) {
  return buildWhatsAppHref(`Hi Qode27, I would like a tailored walkthrough for the ${appName} demo.`)
}
