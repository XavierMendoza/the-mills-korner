import { Link, useLocation } from 'react-router-dom'
import NewsletterSignup from '../public/NewsletterSignup.jsx'
export default function Footer() {
  const { pathname } = useLocation()
  return <footer className="tmk-footer">
    <section className="tmk-newsletter-band" aria-label="TMK newsletter"><NewsletterSignup /></section>
    <div className="tmk-wrap tmk-footer-grid">
      <div className="tmk-footer-brand"><Link to="/" aria-label="The Mills Korner home"><img src="/images/tmk/tmk-logo.png" srcSet="/images/tmk/brand/tmk-logo-256.png 256w, /images/tmk/tmk-logo.png 1254w" sizes="120px" width="1254" height="1254" loading="lazy" decoding="async" alt="The Mills Korner" /></Link><h2>The Mills Korner</h2><p>Transforming Each Life With a Heart of Service</p></div>
      <nav aria-label="Footer navigation"><Link to="/about">Meet Kevin &amp; Read His Story</Link><Link to="/opportunity">Find Your TMK Opportunity</Link><Link to="/impact">See TMK's Kommunity Impact</Link><Link to="/stories">Read TMK Success Stories</Link><Link to="/partners">Meet TMK's Partners</Link><Link to="/events">View Upcoming TMK Events</Link></nav>
      <div className="tmk-footer-connect"><h3>Stay Connected With TMK.</h3><Link to="/contact">Get Kevin's Kontact Information →</Link><Link to="/get-involved">Get Involved With TMK →</Link><Link to="/#giving">Support TMK Through Giving →</Link></div>
    </div>
    <div className="tmk-wrap tmk-footer-bottom"><p>© {new Date().getFullYear()} The Mills Korner.</p>{!['/', '/about'].includes(pathname) && <p>Interior-page photography is representative and does not depict TMK participants.</p>}</div>
  </footer>
}
