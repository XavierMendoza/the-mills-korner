import { Link } from 'react-router-dom'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import '../../styles/tmk-kontact.css'

const email = 'kevin@themillskorner.org'
const phoneNumber = '+18186410190'
const pathways = [
  ['Talk With TMK About Partnership Opportunities', '/partners'],
  ['Explore TMK Opportunities', '/opportunity'],
  ['Support TMK Through Giving', '/donate'],
  ["See TMK's Kommunity Impact", '/impact'],
]

export default function ContactPage() {
  return (
    <div className="tmk-kontact">
      <section className="tmk-kontact-band tmk-kontact-dark" aria-labelledby="kontact-title">
        <div className="tmk-wrap tmk-kontact-hero">
          <div>
            <h1 id="kontact-title">Kontact <span>The Mills Korner</span></h1>
            <p className="tmk-kontact-lead">Have a question, a partnership idea, or an interest in supporting the work? Get in touch with TMK directly.</p>
            <a className="tmk-kontact-button" href="#tmk-contact-details">Get in Touch With TMK <span aria-hidden="true">↓</span></a>
          </div>
          <TmkPhoto name="service" priority sizes="(max-width: 768px) 92vw, 45vw" />
        </div>
      </section>

      <section className="tmk-kontact-band" aria-labelledby="tmk-contact-details">
        <div className="tmk-wrap tmk-kontact-direct">
          <div>
            <h2 id="tmk-contact-details" tabIndex={-1}>Get in Touch With TMK</h2>
            <p className="tmk-kontact-lead"><strong>Kevin Mills</strong><br />Founder / Executive Director</p>
          </div>
          <div>
            <dl className="tmk-kontact-details">
              <div><dt>Email</dt><dd>{email}</dd></div>
              <div><dt>Phone</dt><dd>(818) 641-0190</dd></div>
            </dl>
            <div className="tmk-kontact-actions">
              <a className="tmk-kontact-button" href={`mailto:${email}`}>Email TMK</a>
              <a className="tmk-kontact-button" href={`tel:${phoneNumber}`}>Call TMK</a>
              <a className="tmk-kontact-button" href={`sms:${phoneNumber}`}>Text TMK</a>
            </div>
          </div>
        </div>
      </section>

      <section className="tmk-kontact-band tmk-kontact-addresses" aria-labelledby="tmk-address-title">
        <div className="tmk-wrap">
          <h2 id="tmk-address-title">Office and Mailing Addresses</h2>
          <div className="tmk-kontact-address-grid">
            <div>
              <h3>Office</h3>
              <address>773 N. Orange Grove Blvd.<br />Pasadena, CA 91103</address>
            </div>
            <div>
              <h3>Mailing</h3>
              <address>P.O. Box 39873<br />Pasadena, CA 91109</address>
            </div>
          </div>
        </div>
      </section>

      <section className="tmk-kontact-band" aria-labelledby="tmk-help-title">
        <div className="tmk-wrap">
          <h2 id="tmk-help-title">What Can We Help With?</h2>
          <ul className="tmk-kontact-pathways">
            {pathways.map(([label, to]) => (
              <li key={to}><Link to={to}>{label} <span aria-hidden="true">↗</span></Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tmk-kontact-band tmk-kontact-dark" aria-labelledby="tmk-connection-title">
        <div className="tmk-wrap tmk-kontact-feature">
          <TmkPhoto name="kevin" sizes="(max-width: 768px) 65vw, 280px" />
          <div>
            <h2 id="tmk-connection-title">A Personal Connection</h2>
            <p className="tmk-kontact-lead">Kevin Mills is TMK’s public point of contact. Reach out to talk about youth opportunities, mentorship, or ways to work together.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
