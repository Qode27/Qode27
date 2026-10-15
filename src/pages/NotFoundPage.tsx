import { Link, useLocation } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Button from '../components/ui/Button'
import Seo from '../components/ui/Seo'
import { HeroFallback } from '../components/three/HeroVisual'

const suggestions = [
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Interactive demos', href: '/demo' },
  { label: 'Contact', href: '/contact' },
]

export default function NotFoundPage() {
  const { pathname } = useLocation()
  return (
    <>
      <Seo title="Page not found | Qode27" description="The page you are looking for does not exist." canonicalPath={pathname} noindex />
      <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
        <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Error 404</p>
            <h1 className="display-lg mt-6">This page is not part of the system.</h1>
            <p className="lede mt-6 max-w-xl">
              The address <span className="mono break-all text-white">{pathname}</span> does not exist or has moved. These routes will get you back on track.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/">
                Go to homepage <FiArrowRight aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="secondary">
                Talk to Our Team
              </Button>
            </div>
            <ul className="mt-12 flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="chip hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-md opacity-70">
            <HeroFallback className="h-auto w-full" />
          </div>
        </div>
      </section>
    </>
  )
}
