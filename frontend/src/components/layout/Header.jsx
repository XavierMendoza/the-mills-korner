import { NavLink } from 'react-router-dom'

const navigationItems = [
  ['About', '/about'],
  ['Impact', '/impact'],
  ['Opportunity', '/opportunity'],
  ['Stories', '/stories'],
  ['Partners', '/partners'],
  ['Events', '/events'],
  ['Get Involved', '/get-involved', true],
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
            {navigationItems.map(([label, to, isCta]) => (
              <li key={to}>
                <NavLink
                  className={({ isActive }) =>
                    [
                      'site-nav__link',
                      isActive && 'site-nav__link--active',
                      isCta && 'site-nav__link--cta',
                    ].filter(Boolean).join(' ')
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
