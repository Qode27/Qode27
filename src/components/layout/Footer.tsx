import { createElement } from 'react'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { footerLegalLinks, footerQuickLinks, contactMethods } from '../../data/site'
import { solutions } from '../../data/solutions'
import BrandLogo from '../ui/BrandLogo'
import Container from '../ui/Container'

const socialLinks = [
  { label: 'LinkedIn', icon: FiLinkedin, href: '#' },
  { label: 'Twitter', icon: FiTwitter, href: '#' },
  { label: 'Instagram', icon: FiInstagram, href: '#' },
  { label: 'Facebook', icon: FiFacebook, href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr]">
          <div className="max-w-md">
            <NavLink to="/" className="inline-flex items-center" aria-label="Qode27 home">
              <BrandLogo className="h-12 max-w-[12rem] sm:h-14 sm:max-w-[14rem]" />
            </NavLink>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Qode27 builds software systems for businesses that need stronger operations, cleaner workflows, and better control.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-3">
              {footerQuickLinks.map((link) => (
                <NavLink key={link.label} to={link.href} className="text-sm text-slate-600 hover:text-slate-950">
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Solutions</h3>
            <div className="mt-5 flex flex-col gap-3">
              {solutions.map((solution) => (
                <NavLink key={solution.slug} to={`/solutions/${solution.slug}`} className="text-sm text-slate-600 hover:text-slate-950">
                  {solution.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('https://') ? '_blank' : undefined}
                  rel={method.href.startsWith('https://') ? 'noreferrer' : undefined}
                  className="flex items-center gap-3 hover:text-slate-950"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[var(--color-accent)]">
                    {createElement(method.icon)}
                  </span>
                  <span>{method.value}</span>
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6">
              {footerLegalLinks.map((link) => (
                <NavLink key={link.label} to={link.href} className="text-sm text-slate-500 hover:text-slate-950">
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          Copyright {new Date().getFullYear()} Qode27. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
