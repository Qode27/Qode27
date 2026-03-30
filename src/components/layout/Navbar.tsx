import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import { navigation } from '../../data/site'
import { useScrolled } from '../../hooks/useScrolled'
import BrandLogo from '../ui/BrandLogo'
import Button from '../ui/Button'
import Container from '../ui/Container'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  const handleMobileLinkKeyDown = (event: ReactKeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closeMenu()
    }
  }

  return (
    <header className="sticky top-0 z-50 pt-4">
      <Motion.div
        animate={{ y: scrolled ? 0 : 4, scale: scrolled ? 0.988 : 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Container
          className={`rounded-2xl border px-4 transition-all duration-300 ${
            scrolled
              ? 'border-white/70 bg-white/90 py-2 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl'
              : 'border-white/60 bg-white/72 py-3 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <NavLink to="/" className="flex items-center" aria-label="Qode27 home" onClick={closeMenu}>
              <BrandLogo className="h-11 max-w-[11rem] sm:h-12 sm:max-w-[12rem]" />
            </NavLink>

            <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) => `nav-link ${isActive ? 'active text-black' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Button href="/pricing" variant="ghost" size="sm">
                Get Pricing
              </Button>
              <Button href="/demo/hms" size="sm">
                View Demo
                <FiArrowUpRight />
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/90 text-black shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)] lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
            >
              {open ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </button>
          </div>
        </Container>
      </Motion.div>

      <AnimatePresence>
        {open ? (
          <>
            <Motion.button
              type="button"
              aria-label="Close navigation overlay"
              className="fixed inset-0 bg-black/25 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            <Motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative lg:hidden"
            >
              <Container className="mt-3 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_24px_55px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {navigation.map((item, index) => (
                    <Motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: 0.04 * index, duration: 0.2 }}
                    >
                      <NavLink
                        to={item.href}
                        onClick={closeMenu}
                        onKeyDown={handleMobileLinkKeyDown}
                        className={({ isActive }) =>
                          `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                            isActive
                              ? 'bg-black text-white'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </Motion.div>
                  ))}
                  <div className="mt-2 grid gap-2">
                    <Button href="/demo/hms" className="w-full justify-center" size="sm" onClick={closeMenu}>
                      View Demo
                    </Button>
                    <Button
                      href="/pricing"
                      className="w-full justify-center"
                      variant="secondary"
                      size="sm"
                      onClick={closeMenu}
                    >
                      Get Pricing
                    </Button>
                  </div>
                </nav>
              </Container>
            </Motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
