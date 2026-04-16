import { Suspense, lazy, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { buildDemoRequestPath, buildDemoWhatsAppHref, getDemoAppBySlug } from '../../config/demo-apps'
import Container from '../../components/ui/Container'
import PageSkeleton from '../../components/ui/PageSkeleton'
import Seo from '../../components/ui/Seo'
import Button from '../../components/ui/Button'

export default function DemoAppRoutePage() {
  const { appSlug, section } = useParams()
  const app = getDemoAppBySlug(appSlug)

  const DemoComponent = useMemo(() => {
    if (!app || !app.demoEnabled || app.requestDemoOnly) {
      return null
    }

    return lazy(app.modulePath)
  }, [app])

  if (!app) {
    return <Navigate to="/demo" replace />
  }

  if (!app.demoEnabled || app.requestDemoOnly || !DemoComponent) {
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
              This product is configured in request-only mode. The architecture already supports that path without any extra hosting or backend. Use the actions below to collect qualified leads while keeping the app private.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={buildDemoRequestPath(app.name)}>Request tailored demo</Button>
              <Button href={buildDemoWhatsAppHref(app.name)} variant="secondary">
                WhatsApp Qode27
              </Button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <Suspense fallback={<PageSkeleton />}>
      <DemoComponent app={app} section={section} />
    </Suspense>
  )
}
