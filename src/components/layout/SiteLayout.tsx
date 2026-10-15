import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

function useScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
}

export default function SiteLayout() {
  useScrollToTopOnNavigate()
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
