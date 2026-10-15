import { Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import PageSkeleton from './components/ui/PageSkeleton'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'))
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage'))
const WorkPage = lazy(() => import('./pages/WorkPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const InsightsPage = lazy(() => import('./pages/InsightsPage'))
const InsightArticlePage = lazy(() => import('./pages/InsightArticlePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const DemoCatalogPage = lazy(() => import('./pages/demo/DemoCatalogPage'))
const DemoAppRoutePage = lazy(() => import('./pages/demo/DemoAppRoutePage'))

/** Keeps links to the previous /solutions/:slug URLs working. */
function LegacySolutionRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/products/${slug}` : '/products'} replace />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black focus:translate-y-0"
        >
          Skip to content
        </a>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/demo/:appSlug" element={<DemoAppRoutePage />} />
            <Route path="/demo/:appSlug/:section" element={<DemoAppRoutePage />} />
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/demo" element={<DemoCatalogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/industries/:slug" element={<IndustryDetailPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/request-demo" element={<ContactPage mode="demo" />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<InsightArticlePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Legacy URLs from the previous site structure */}
              <Route path="/solutions" element={<Navigate to="/products" replace />} />
              <Route path="/solutions/:slug" element={<LegacySolutionRedirect />} />
              <Route path="/custom-software" element={<Navigate to="/services/custom-software" replace />} />
              <Route path="/case-studies" element={<Navigate to="/work" replace />} />
              <Route path="/pricing" element={<Navigate to="/contact" replace />} />
              <Route path="/thank-you" element={<Navigate to="/contact" replace />} />
              <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
              <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </MotionConfig>
  )
}
