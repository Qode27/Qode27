import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { company } from '../../data/company'
import { industries } from '../../data/industries'
import { legalLinks } from '../../data/navigation'
import { products, productHref } from '../../data/products'
import { services } from '../../data/services'
import BrandMark from '../ui/BrandMark'

const columns = [
  { title: 'Services', links: services.map((item) => ({ label: item.shortName, href: `/services/${item.slug}` })) },
  { title: 'Products', links: products.slice(0, 7).map((item) => ({ label: item.label, href: productHref(item.slug) })).concat([{ label: 'All products', href: '/products' }]) },
  { title: 'Industries', links: industries.map((item) => ({ label: item.name, href: `/industries/${item.slug}` })) },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work' },
      { label: 'Insights', href: '/insights' },
      { label: 'Interactive demos', href: '/demo' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-[var(--color-line)] bg-[var(--color-bg-raised)]">
      <div className="section-shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <Link to="/" aria-label="Qode27 home" className="inline-flex rounded-lg">
              <BrandMark />
            </Link>
            <p className="mt-5 text-[0.95rem] leading-7 text-[var(--color-muted)]">
              Business software, SaaS platforms, and custom systems for organizations that need operational clarity.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a href={company.emailHref} className="inline-flex items-center gap-3 text-[var(--color-muted)] hover:text-white">
                  <FiMail aria-hidden="true" /> {company.email}
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className="inline-flex items-center gap-3 text-[var(--color-muted)] hover:text-white">
                  <FiPhone aria-hidden="true" /> {company.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-[var(--color-muted)]">
                <FiMapPin aria-hidden="true" /> {company.location}
              </li>
            </ul>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-subtle)]">{column.title}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className="text-sm text-[var(--color-muted)] transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Qode27. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="inline-flex items-center gap-1 text-white">
                Discuss your project <FiArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
