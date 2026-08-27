import { NavLink } from 'react-router-dom'

const navigationItems = [
  ['About', '/about'],
  ['Impact', '/impact'],
  ['Opportunity', '/opportunity'],
  ['Stories', '/stories'],
  ['Partners', '/partners'],
  ['Events', '/events'],
  ['Get Involved', '/get-involved'],
  ['Contact', '/contact'],
]

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="site-brand" to="/" aria-label="The Mills Korner home">
          The Mills Korner
        </NavLink>
        <nav aria-label="Primary navigation">
          <ul className="site-nav">
            {navigationItems.map(([label, to]) => (
              <li key={to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
                  }
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
