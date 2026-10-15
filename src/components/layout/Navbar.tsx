import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiArrowRight, FiChevronDown, FiMenu, FiX } from 'react-icons/fi'
import { navGroups, primaryLinks, type NavGroup } from '../../data/navigation'
import { useScrolled } from '../../hooks/useScrolled'
import BrandMark from '../ui/BrandMark'

function isGroupActive(group: NavGroup, pathname: string) {
  if (pathname.startsWith(group.href) && group.href !== '/') return true
  return group.links.some((link) => pathname === link.href || pathname.startsWith(`${link.href}/`))
}

function MegaPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const reduce = useReducedMotion()
  const dense = group.links.length > 6
  return (
    <Motion.div
      id={`mega-${group.id}`}
      initial={reduce ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-full pt-3"
    >
      <div className="section-shell">
        <div className="grid gap-8 rounded-[1.4rem] border border-[var(--color-line)] bg-[#0a0e18] p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] lg:grid-cols-[15rem_1fr] lg:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-[var(--color-line)] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            <div>
              <p className="eyebrow eyebrow--plain">{group.intro.title}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{group.intro.text}</p>
            </div>
            <div className="flex flex-col gap-2">
              {(group.footerLinks ?? [{ label: `Explore ${group.label.toLowerCase()}`, href: group.href }]).map((link) => (
                <Link key={link.href} to={link.href} onClick={onNavigate} className="link-arrow text-sm">
                  {link.label} <FiArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <ul className={`grid gap-1 ${dense ? 'sm:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {group.links.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `group block rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.04] ${isActive ? 'bg-white/[0.05]' : ''}`
                  }
                >
                  <span className="flex items-center justify-between gap-3 text-[0.95rem] font-medium text-white">
                    {link.label}
                    <FiArrowRight aria-hidden="true" className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  {link.description ? <span className="mt-1 block text-[0.82rem] leading-5 text-[var(--color-subtle)]">{link.description}</span> : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Motion.div>
  )
}

function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(() => navGroups.find((group) => isGroupActive(group, pathname))?.id ?? null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>('button, a')?.focus()
  }, [])

  return (
    <Motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-[var(--color-bg)] lg:hidden"
    >
      <nav aria-label="Mobile" className="section-shell flex min-h-full flex-col pb-10 pt-4">
        <ul className="divide-y divide-[var(--color-line)] border-b border-[var(--color-line)]">
          {navGroups.map((group) => {
            const open = expanded === group.id
            return (
              <li key={group.id}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`m-${group.id}`}
                  onClick={() => setExpanded(open ? null : group.id)}
                  className="flex w-full items-center justify-between py-5 text-left font-display text-2xl font-semibold tracking-[-0.03em]"
                >
                  {group.label}
                  <FiChevronDown aria-hidden="true" className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                <ul id={`m-${group.id}`} hidden={!open} className="grid gap-1 pb-5">
                  {[...group.links, ...(group.footerLinks ?? [])].map((link) => (
                    <li key={link.href}>
                      <NavLink
                        to={link.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2.5 text-base ${isActive ? 'bg-white/[0.06] text-white' : 'text-[var(--color-muted)]'}`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <NavLink to={link.href} onClick={onClose} className="block py-5 font-display text-2xl font-semibold tracking-[-0.03em]">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-3 pt-10">
          <Link to="/contact" onClick={onClose} className="btn btn-primary w-full">
            Discuss Your Project <FiArrowRight aria-hidden="true" />
          </Link>
          <Link to="/products" onClick={onClose} className="btn btn-secondary w-full">
            Explore Our Products
          </Link>
        </div>
      </nav>
    </Motion.div>
  )
}

export default function Navbar() {
  const scrolled = useScrolled(12)
  const { pathname } = useLocation()
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const [lastPath, setLastPath] = useState(pathname)

  // Close menus on navigation.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpenGroup(null)
    setMobileOpen(false)
  }

  // Lock page scroll only while the mobile menu is open (released immediately on close, not after the exit animation).
  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  const closeAll = useCallback(() => {
    setOpenGroup(null)
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (openGroup) {
        headerRef.current?.querySelector<HTMLButtonElement>(`[data-trigger="${openGroup}"]`)?.focus()
      }
      if (mobileOpen) {
        headerRef.current?.querySelector<HTMLButtonElement>('[data-mobile-trigger]')?.focus()
      }
      closeAll()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenGroup(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [openGroup, mobileOpen, closeAll])

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140)
  }
  const cancelClose = () => window.clearTimeout(closeTimer.current)

  const solid = scrolled || openGroup !== null || mobileOpen
  const active = navGroups.find((group) => group.id === openGroup)

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      {/* Blur lives on its own layer: a backdrop-filter ancestor breaks the mega panel's compositing in Chromium. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 -z-10 h-[4.5rem] border-b transition-[background-color,border-color] duration-300 ${
          solid ? 'border-[var(--color-line)] bg-[rgba(5,7,12,0.82)] backdrop-blur-xl' : 'border-transparent'
        }`}
      />
      <div className="section-shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" className="rounded-lg" aria-label="Qode27 home">
          <BrandMark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navGroups.map((group) => {
              const isOpen = openGroup === group.id
              const isActive = isGroupActive(group, pathname)
              return (
                <li key={group.id} onMouseEnter={() => setOpenGroup(group.id)}>
                  <button
                    type="button"
                    data-trigger={group.id}
                    aria-expanded={isOpen}
                    aria-controls={`mega-${group.id}`}
                    onClick={() => setOpenGroup(isOpen ? null : group.id)}
                    className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                      isOpen || isActive ? 'text-white' : 'text-[var(--color-muted)] hover:text-white'
                    }`}
                  >
                    {group.label}
                    <FiChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    {isActive ? <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-px bg-[var(--color-accent)]" /> : null}
                    {isActive ? <span className="sr-only">(current section)</span> : null}
                  </button>
                </li>
              )
            })}
            {primaryLinks.map((link) => (
              <li key={link.href} onMouseEnter={() => setOpenGroup(null)}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `relative inline-flex rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-[var(--color-muted)] hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive ? <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-px bg-[var(--color-accent)]" /> : null}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Discuss Your Project <FiArrowRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            data-mobile-trigger
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-white lg:hidden"
          >
            {mobileOpen ? <FiX aria-hidden="true" className="h-5 w-5" /> : <FiMenu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>{active ? <MegaPanel key={active.id} group={active} onNavigate={closeAll} /> : null}</AnimatePresence>
      <AnimatePresence>{mobileOpen ? <MobileMenu onClose={closeAll} pathname={pathname} /> : null}</AnimatePresence>
    </header>
  )
}
