import { Outlet } from 'react-router-dom'

import Footer from './Footer.jsx'
import Header from './Header.jsx'

function PublicLayout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main className="site-main" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
