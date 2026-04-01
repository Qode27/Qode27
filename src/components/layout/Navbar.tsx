import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
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

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <Motion.div
        animate={{
          y: scrolled ? 0 : 2,
          scale: scrolled ? 0.992 : 1,
        }}
        transition={{ duration: 0.22 }}
      >
        <Container>
          <div
            className={`flex min-h-[4.6rem] items-center justify-between gap-4 rounded-2xl border px-4 sm:px-5 ${
              scrolled
                ? 'border-slate-200/80 bg-white/86 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-2xl'
                : 'border-white/80 bg-white/78 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl'
            }`}
          >
            <NavLink to="/" className="flex items-center" aria-label="Qode27 home" onClick={closeMenu}>
              <BrandLogo className="h-10 max-w-[10rem] sm:h-11 sm:max-w-[11rem]" />
            </NavLink>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) => `nav-link ${isActive ? 'active text-slate-950' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Button
                href="/request-demo"
                size="sm"
                className="shadow-[0_18px_36px_rgba(20,131,181,0.22)] hover:scale-[1.02]"
              >
                Request Demo
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] lg:hidden"
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
              className="fixed inset-0 bg-slate-950/30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <Motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative lg:hidden"
            >
              <Container className="pb-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_55px_rgba(15,23,42,0.16)]">
                  <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.href}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                            isActive ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                    <div className="mt-2">
                      <Button href="/request-demo" className="w-full justify-center" size="sm">
                        Request Demo
                      </Button>
                    </div>
                  </nav>
                </div>
              </Container>
            </Motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
