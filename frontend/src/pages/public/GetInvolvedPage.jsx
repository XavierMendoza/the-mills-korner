import { Link } from 'react-router-dom'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import '../../styles/tmk-involved.css'

const email = 'kevin@themillskorner.org'
const phone = '+18186410190'
const emailHref = `mailto:${email}`

export default function GetInvolvedPage() {
  return (
    <div className="tmk-involved">
      <section className="tmk-involved-band tmk-involved-dark" aria-labelledby="involved-title">
        <div className="tmk-wrap tmk-involved-hero">
          <div>
            <h1 id="involved-title">Be Part of What <span>TMK Is Building</span></h1>
            <p className="tmk-involved-lead">Mentors, volunteers, and partners help create the relationships, skills, and opportunities young people need to build successful futures.</p>
            <p>Talk with us about how you or your organization can support TMK.</p>
            <a className="tmk-involved-button" href="#participate">Get in Touch With TMK <span aria-hidden="true">↓</span></a>
          </div>
          <TmkPhoto name="huddle" priority sizes="(max-width: 768px) 90vw, 46vw" />
        </div>
      </section>

      <section className="tmk-involved-band" aria-labelledby="involved-partnership">
        <div className="tmk-wrap tmk-involved-split">
          <h2 id="involved-partnership">Partner With The Mills Korner</h2>
          <div>
            <p className="tmk-involved-lead">Organizations, community leaders, and supporters can connect with TMK around youth opportunities, events, and community service.</p>
            <p>Get in touch to talk about sharing resources, collaborating on events, or supporting mentorship.</p>
            <div className="tmk-involved-actions">
              <a className="tmk-involved-button" href={emailHref}>Talk With TMK About Partnership Opportunities</a>
              <Link to="/partners">See Who Has Supported TMK</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="tmk-involved-band tmk-involved-giving" id="giving" aria-labelledby="involved-giving-title">
        <div className="tmk-wrap tmk-involved-split">
          <h2 id="involved-giving-title">Invest in a Young Person’s Future</h2>
          <div>
            <p className="tmk-involved-lead">Support the relationships, skills, and opportunities that help young people prepare for what comes next.</p>
            <Link className="tmk-involved-button" to="/donate">Support TMK Through Giving</Link>
          </div>
        </div>
      </section>

      <section className="tmk-involved-band tmk-involved-dark" id="participate" tabIndex={-1} aria-labelledby="involved-contact">
        <div className="tmk-wrap tmk-involved-contact">
          <TmkPhoto name="kevin" sizes="(max-width: 768px) 90vw, 30vw" />
          <div>
            <h2 id="involved-contact">Get in Touch With TMK</h2>
            <p className="tmk-involved-lead"><strong>Kevin Mills</strong><br />Founder / Executive Director</p>
            <address>
              <div>Email <a href={emailHref}>{email}</a></div>
              <div>Phone <a href={`tel:${phone}`}>(818) 641-0190</a></div>
            </address>
            <div className="tmk-involved-actions" role="group" aria-label="Contact TMK">
              <a className="tmk-involved-button" href={emailHref}>Email TMK</a>
              <a className="tmk-involved-button tmk-involved-outline" href={`tel:${phone}`}>Call TMK</a>
              <a className="tmk-involved-button tmk-involved-outline" href={`sms:${phone}`}>Text TMK</a>
            </div>
          </div>
        </div>
      </section>

      <section className="tmk-involved-band" aria-labelledby="involved-support">
        <div className="tmk-wrap tmk-involved-split tmk-involved-support">
          <div>
            <h2 id="involved-support">Why Support Matters</h2>
            <p>Consistent relationships and guidance help young people recognize possibilities and navigate the choices ahead. Community service and practical help extend that support to families.</p>
            <p>Leadership Development gives young people room to build confidence, responsibility, and character.</p>
          </div>
          <TmkPhoto name="bench-two" sizes="(max-width: 768px) 90vw, 44vw" />
        </div>
      </section>

      <section className="tmk-involved-band tmk-involved-closing" aria-labelledby="involved-next">
        <div className="tmk-wrap">
          <h2 id="involved-next">Take the Next Step With TMK</h2>
          <div className="tmk-involved-actions">
            <a className="tmk-involved-button" href={emailHref}>Email TMK Directly</a>
            <Link to="/impact">See TMK’s Kommunity Impact</Link>
            <Link to="/donate">Support TMK Through Giving</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
