import { industries } from './industries'
import { products, productHref } from './products'
import { services } from './services'

export type NavLinkItem = { label: string; href: string; description?: string }
export type NavGroup = {
  id: string
  label: string
  href: string
  intro: { title: string; text: string }
  links: NavLinkItem[]
  footerLinks?: NavLinkItem[]
}

export const navGroups: NavGroup[] = [
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    intro: { title: 'Services', text: 'Engineering and design capabilities for business-critical software.' },
    links: services.map((service) => ({ label: service.name, href: `/services/${service.slug}`, description: service.outcome })),
    footerLinks: [{ label: 'All services', href: '/services' }],
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    intro: { title: 'Products', text: 'Industry platforms with live interactive demos.' },
    links: products.map((product) => ({ label: product.label, href: productHref(product.slug), description: product.category })),
    footerLinks: [
      { label: 'All products', href: '/products' },
      { label: 'Interactive demos', href: '/demo' },
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    href: '/industries',
    intro: { title: 'Industries', text: 'Software shaped around how each sector operates.' },
    links: industries.map((industry) => ({ label: industry.name, href: `/industries/${industry.slug}`, description: industry.tagline })),
    footerLinks: [{ label: 'All industries', href: '/industries' }],
  },
  {
    id: 'company',
    label: 'Company',
    href: '/about',
    intro: { title: 'Company', text: 'How Qode27 thinks, builds, and delivers.' },
    links: [
      { label: 'About Qode27', href: '/about', description: 'Philosophy, principles, and approach' },
      { label: 'Work', href: '/work', description: 'Products and capabilities in practice' },
      { label: 'Contact', href: '/contact', description: 'Discuss a project or request a demo' },
    ],
  },
]

export const primaryLinks: NavLinkItem[] = [{ label: 'Insights', href: '/insights' }]

export const legalLinks: NavLinkItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]
