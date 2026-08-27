import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <strong>The Mills Korner</strong>
          <p>A headquarters for opportunity, community, and connection.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/about">About</Link><Link to="/impact">Impact</Link>
          <Link to="/events">Events</Link><Link to="/contact">Contact</Link>
        </nav>
        <p className="site-footer__copyright">&copy; {new Date().getFullYear()} The Mills Korner.</p>
      </div>
    </footer>
  )
}

export default Footer
