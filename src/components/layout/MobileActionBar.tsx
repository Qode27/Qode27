import { Link, useLocation } from 'react-router-dom'
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi'
import { company } from '../../data/company'
import { useScrolled } from '../../hooks/useScrolled'

/** Persistent contact actions on small screens, shown after the visitor starts scrolling. */
export default function MobileActionBar() {
  const scrolled = useScrolled(480)
  const { pathname } = useLocation()
  if (pathname === '/contact' || pathname === '/request-demo') return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-line)] bg-[rgba(5,7,12,0.92)] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 sm:hidden ${
        scrolled ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!scrolled}
      inert={!scrolled}
    >
      <div className="flex gap-2">
        <Link to="/contact" className="btn btn-primary btn-sm flex-1">
          Discuss Your Project <FiArrowRight aria-hidden="true" />
        </Link>
        <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" aria-label="Message Qode27 on WhatsApp">
          <FiMessageCircle aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </div>
  )
}
