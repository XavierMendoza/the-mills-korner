import { Link } from 'react-router-dom'

function StaffPlaceholderPage({ login = false }) {
  return (
    <main className="staff-page">
      <section className="staff-panel">
        <p className="page-eyebrow">TMK Staff</p>
        <h1>{login ? 'Staff login' : 'Staff workspace'}</h1>
        <p>
          {login
            ? 'Authentication UI will be added in a future milestone.'
            : 'Staff tools will be added here incrementally.'}
        </p>
        <Link to={login ? '/' : '/staff/login'}>
          {login ? 'Return to the public site' : 'Go to staff login'}
        </Link>
      </section>
    </main>
  )
}

export default StaffPlaceholderPage
