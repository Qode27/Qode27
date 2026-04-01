import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SiteLayout from './components/layout/SiteLayout'
import PageSkeleton from './components/ui/PageSkeleton'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'))
const CustomSoftwarePage = lazy(() => import('./pages/CustomSoftwarePage'))
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const RequestDemoPage = lazy(() => import('./pages/RequestDemoPage'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage'))

export default function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-[var(--color-page)] text-[var(--color-copy)]">
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-[80] -translate-y-20 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      >
        Skip to content
      </a>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,_rgba(20,131,181,0.12),transparent_30%)]" />
      <Suspense fallback={<PageSkeleton />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
              <Route path="/custom-software" element={<CustomSoftwarePage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/request-demo" element={<RequestDemoPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
              <Route path="/products" element={<Navigate to="/solutions" replace />} />
              <Route path="/products/:slug" element={<Navigate to="/solutions" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  )
}
