import type { CSSProperties, ComponentType } from 'react'
import type { IconType } from 'react-icons'
import type { SolutionSlug } from '../../data/solutions'

export type DemoAppSlug =
  | 'hrms'
  | 'hms'
  | 'inventory'
  | 'parking'
  | 'coaching'
  | 'ca'
  | 'restaurant'
  | 'shipping'
  | 'port'
  | 'crm'

export type DemoUser = {
  name: string
  role: string
  email: string
  avatar: string
}

export type DemoNavItem = {
  slug: string
  label: string
  icon: IconType
  description: string
}

export type DemoMetric = {
  label: string
  value: string
  change: string
  tone?: 'positive' | 'neutral' | 'warning'
}

export type DemoTrendPoint = {
  label: string
  value: number
}

export type DemoToastTone = 'info' | 'success' | 'warning'

export type DemoToast = {
  id: number
  title: string
  message: string
  tone: DemoToastTone
}

export type DemoToastInput = Omit<DemoToast, 'id'>

export type DemoActionItem = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export type DemoChromeStyle =
  | 'enterprise-sidebar'
  | 'workflow-topbar'
  | 'operations-rail'
  | 'command-center'
  | 'campus-hub'
  | 'ledger-desk'
  | 'kitchen-board'
  | 'shipment-atlas'
  | 'harbor-ops'
  | 'pipeline-studio'

export type DemoDensityMode = 'comfortable' | 'compact' | 'dense' | 'live' | 'calendar' | 'ledger' | 'service' | 'tracking' | 'marine' | 'pipeline'

export type DemoCardStyle = 'soft' | 'clinical' | 'industrial' | 'tactical' | 'academic' | 'ledger' | 'hospitality' | 'tracking' | 'marine' | 'sales'

export type DemoTableStyle = 'clean' | 'clinical' | 'warehouse' | 'board' | 'roster' | 'ledger' | 'kitchen' | 'manifest' | 'dock' | 'pipeline'

export type DemoPreviewVariant = 'hrms' | 'hms' | 'inventory' | 'parking' | 'coaching' | 'ca' | 'restaurant' | 'shipping' | 'port' | 'crm'

export type DemoAppIdentity = {
  navStyle: DemoChromeStyle
  densityMode: DemoDensityMode
  cardStyle: DemoCardStyle
  tableStyle: DemoTableStyle
  previewVariant: DemoPreviewVariant
  typography: 'corporate' | 'clinical' | 'operational' | 'command' | 'campus' | 'finance' | 'hospitality' | 'logistics' | 'marine' | 'sales'
  dashboardLabel: string
  motionStyle: 'calm' | 'precise' | 'mechanical' | 'urgent' | 'rhythmic' | 'methodical' | 'snappy' | 'gliding' | 'tidal' | 'energetic'
  productHint: string
}

export type DemoAppConfig = {
  slug: DemoAppSlug
  solutionSlug: SolutionSlug
  name: string
  shortName: string
  category: string
  tagline: string
  summary: string
  accent: {
    primary: string
    secondary: string
    surface: string
    gradient: string
    ink: string
    page: string
    panel: string
    line: string
  }
  icon: IconType
  identity: DemoAppIdentity
  heroMetrics: DemoMetric[]
  demoEnabled: boolean
  requestDemoOnly: boolean
  modulePath: () => Promise<{ default: ComponentType<DemoAppRouteProps> }>
}

export type DemoAppRouteProps = {
  app: DemoAppConfig
  section?: string
}

export type DemoShellProps = {
  app: DemoAppConfig
  sections: DemoNavItem[]
  activeSection: string
  title: string
  subtitle: string
  currentUser: DemoUser
  onSwitchUser: (email: string) => void
  users: DemoUser[]
  onReset: () => void
  onRefresh: () => void
  isRefreshing: boolean
  actions: DemoActionItem[]
  children: React.ReactNode
}

export type DemoTableColumn<Row> = {
  key: string
  header: string
  className?: string
  render: (row: Row) => React.ReactNode
}

export type DemoThemeStyle = CSSProperties & {
  '--demo-primary'?: string
  '--demo-secondary'?: string
  '--demo-surface'?: string
  '--demo-gradient'?: string
  '--demo-ink'?: string
  '--demo-page'?: string
  '--demo-panel'?: string
  '--demo-line'?: string
}
