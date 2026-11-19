import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DonateLink from '../../components/public/DonateLink.jsx'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import { monthlyDonationOptions, oneTimeDonationUrl } from '../../config/donations.js'
import { impactMetrics } from '../../data/impactMetrics.js'
import '../../styles/tmk-donate.css'

const monthlyOptions = monthlyDonationOptions.filter(option => option.url)
const previewMetrics = impactMetrics.filter(metric => ['metric-1', 'metric-2', 'metric-3'].includes(metric.id))

export default function DonatePage() {
  const { hash, key } = useLocation()
  const onceHeading = useRef(null)
  const monthlyHeading = useRef(null)

  useEffect(() => {
    const heading = hash === '#monthly' ? monthlyHeading.current : hash === '#give-once' ? onceHeading.current : null
    if (heading) {
      heading.focus({ preventScroll: true })
      heading.scrollIntoView({ block: 'start', behavior: 'instant' })
    } else if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [hash, key])

  return (
    <div className="tmk-donate">
      <section className="tmk-donate-band tmk-donate-dark" aria-labelledby="donate-title">
        <div className="tmk-wrap tmk-donate-split tmk-donate-hero">
          <div>
            <h1 id="donate-title">Invest in a <span>Young Person's Future</span></h1>
            <p className="tmk-donate-lead">Help TMK build mentoring relationships, expand opportunity, and support young people as they grow into leaders in their communities.</p>
            <div className="tmk-donate-actions">
              {oneTimeDonationUrl && <Link className="tmk-donate-button" to="#give-once">Give Once</Link>}
              {monthlyOptions.length > 0 && <Link to="#monthly">Explore Monthly Giving</Link>}
            </div>
          </div>
          <TmkPhoto name="service" priority sizes="(max-width: 768px) 92vw, 45vw" />
        </div>
      </section>

      <section className="tmk-donate-band tmk-donate-once" aria-labelledby="give-once">
        <div className="tmk-wrap tmk-donate-split">
          <div>
            <p className="tmk-donate-kicker">01 / Give Once</p>
            <h2 id="give-once" ref={onceHeading} tabIndex={-1}>Make a One-Time Donation</h2>
          </div>
          <div>
            <p className="tmk-donate-lead">Choose the amount that feels right for you and make a one-time gift in support of TMK's work with young people.</p>
            <DonateLink label="Choose Your Donation Amount" className="tmk-donate-button" />
            <p className="tmk-donate-checkout">Donation checkout opens on Stripe in a new tab.</p>
          </div>
        </div>
      </section>

      <section className="tmk-donate-band" aria-labelledby="monthly">
        <div className="tmk-wrap">
          <h2 id="monthly" ref={monthlyHeading} tabIndex={-1}>Keep Showing Up</h2>
          <p className="tmk-donate-lead">Give monthly to make ongoing support part of your commitment to TMK's work with young people.</p>
          <p className="tmk-donate-checkout">Each option opens Stripe checkout in a new tab.</p>
          <ul className="tmk-donate-monthly">
            {monthlyOptions.map(({ amount, label, url }) => (
              <li key={amount}>
                <p className="tmk-donate-amount">${amount}</p>
                <p>per month</p>
                <DonateLink label={`Give ${label}`} url={url} className="tmk-donate-button" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tmk-donate-band tmk-donate-dark">
        <div className="tmk-wrap tmk-donate-split">
          <div>
            <h2>Support That Reaches Further</h2>
            <p className="tmk-donate-lead">TMK connects young people with trusted adults and opportunities to grow. Our work spans academic support, leadership development, mentoring, and community service that extends to families.</p>
          </div>
          <TmkPhoto name="supplies" sizes="(max-width: 768px) 92vw, 45vw" />
        </div>
      </section>

      <section className="tmk-donate-band tmk-donate-impact">
        <div className="tmk-wrap">
          <h2>TMK’s Kommunity Impact</h2>
          <ul className="tmk-donate-metrics">
            {previewMetrics.map(metric => (
              <li key={metric.id}>
                <p className="tmk-donate-amount">{metric.prefix}{metric.value.toLocaleString('en-US')}{metric.suffix}</p>
                <strong>{metric.name}</strong>
                <p>{metric.description}</p>
              </li>
            ))}
          </ul>
          <Link className="tmk-donate-button" to="/impact">See TMK's Full Kommunity Impact</Link>
        </div>
      </section>

      <section className="tmk-donate-band">
        <div className="tmk-wrap">
          <h2>Other Ways to Support TMK</h2>
          <div className="tmk-donate-actions">
            <Link to="/contact">Kontact The Mills Korner</Link>
            <Link to="/partners">Talk With TMK About Partnership Opportunities</Link>
            <Link to="/opportunity">See How TMK Supports Young People</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
