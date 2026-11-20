import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Footer from './Footer.jsx'
import Header from './Header.jsx'

function PublicLayout() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const main = useRef(null)

  useLayoutEffect(() => {
    const restoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = restoration }
  }, [])

  useLayoutEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    main.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main ref={main} className="site-main" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
