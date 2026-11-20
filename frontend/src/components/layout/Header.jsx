import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
const navigationItems = [['About', '/about'], ['Impact', '/impact'], ['Opportunity', '/opportunity'], ['Stories', '/stories'], ['Partners', '/partners'], ['Events', '/events'], ['Get Involved', '/get-involved'], ['Kontact', '/contact']]
export default function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  return <header className="tmk-header" onKeyDown={event => {
    if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
  }}>
    <div className="tmk-header-inner">
      <NavLink className="tmk-brand" to="/" aria-label="The Mills Korner home" onClick={() => setOpen(false)}><img src="/images/tmk/tmk-logo.png" srcSet="/images/tmk/brand/tmk-logo-256.png 256w, /images/tmk/tmk-logo.png 1254w" sizes="88px" width="1254" height="1254" alt="The Mills Korner" /><span>The Mills<br /><strong>Korner.</strong></span></NavLink>
      <button ref={toggle} type="button" className="tmk-menu-toggle" aria-expanded={open} aria-controls="tmk-primary-nav" onClick={() => setOpen(value => !value)}>{open ? 'Close ×' : 'Menu ☰'}</button>
      <nav id="tmk-primary-nav" className={open ? 'is-open' : ''} aria-label="Primary navigation">
        {navigationItems.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <NavLink className="tmk-nav-support" to="/donate" onClick={() => setOpen(false)}>Support TMK</NavLink>
      </nav>
    </div>
  </header>
}
