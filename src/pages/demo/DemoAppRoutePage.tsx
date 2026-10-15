import { Suspense, lazy } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { buildDemoRequestPath, buildDemoWhatsAppHref, getDemoAppBySlug } from '../../config/demo-apps'
import Container from '../../components/ui/Container'
import PageSkeleton from '../../components/ui/PageSkeleton'
import Seo from '../../components/ui/Seo'
import Button from '../../components/ui/Button'

const demoComponents = {
  hrms: lazy(() => import('./apps/HrmsDemoPage')),
  hms: lazy(() => import('./apps/HmsDemoPage')),
  inventory: lazy(() => import('./apps/InventoryDemoPage')),
  parking: lazy(() => import('./apps/TruckParkingDemoPage')),
  coaching: lazy(() => import('./apps/CoachingDemoPage')),
  ca: lazy(() => import('./apps/CaDemoPage')),
  restaurant: lazy(() => import('./apps/RestaurantDemoPage')),
  shipping: lazy(() => import('./apps/ShippingDemoPage')),
  port: lazy(() => import('./apps/PortDemoPage')),
  crm: lazy(() => import('./apps/CrmDemoPage')),
} as const

export default function DemoAppRoutePage() {
  const { appSlug, section } = useParams()
  const app = getDemoAppBySlug(appSlug)

  if (!app) {
    return <Navigate to="/demo" replace />
  }

  if (!app.demoEnabled || app.requestDemoOnly) {
    return (
      <div className="min-h-screen bg-[var(--color-page)] py-10">
        <Seo
          title={`${app.name} | Qode27`}
          description={`${app.name} is available as a guided Qode27 walkthrough.`}
          canonicalPath={`/demo/${app.slug}`}
        />
        <Container>
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_28px_70px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Guided Demo</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">{app.name}</h1>
            <p className="mt-4 text-base leading-8 text-slate-600">
              This product is shown through a guided walkthrough rather than a public demo. Request a session and we will take you through it with your workflow in mind.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={buildDemoRequestPath(app.name)} variant="light">Request tailored demo</Button>
              <Button href={buildDemoWhatsAppHref(app.name)} variant="outline-light">
                WhatsApp Qode27
              </Button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  const DemoComponent = demoComponents[app.slug]

  return (
    <Suspense fallback={<PageSkeleton />}>
      <DemoComponent app={app} section={section} />
    </Suspense>
  )
}
