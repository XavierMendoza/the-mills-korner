import { Link } from 'react-router-dom'
import DemoPhoto from '../../components/public/DemoPhoto.jsx'

function NewsletterThankYouPage() {
  return (
    <section className="newsletter-confirmation" aria-labelledby="newsletter-confirmation-title">
      <div className="newsletter-confirmation__copy">
        <p className="page-eyebrow">Stay Connected</p>
        <span className="newsletter-confirmation__mark" aria-hidden="true">✓</span>
        <h1 id="newsletter-confirmation-title">Thanks for staying connected.</h1>
        <p className="newsletter-confirmation__message">Your newsletter signup has been received. Watch your inbox for updates from The Mills Korner.</p>
        <div className="newsletter-confirmation__actions">
          <Link className="button button--primary" to="/">Return Home</Link>
          <Link className="text-link" to="/opportunity">Explore Opportunities</Link>
        </div>
      </div>
      <div className="newsletter-confirmation__image">
        <DemoPhoto image="wellness" priority sizes="(max-width: 880px) 100vw, 45vw" />
      </div>
    </section>
  )
}

export default NewsletterThankYouPage
