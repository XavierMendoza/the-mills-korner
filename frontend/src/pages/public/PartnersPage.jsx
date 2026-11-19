import { Link } from 'react-router-dom'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import { impactMetrics } from '../../data/impactMetrics.js'
import '../../styles/tmk-partners.css'

// Approved legacy supporters and existing logo assets; provenance is recorded in
// docs/TMK_BRAND_REDESIGN.md. This is not a list of current sponsorship contracts.
const legacySupporters = [
  { name: 'Verizon', logo: '/images/tmk/brand/verizon.webp', width: 197, height: 125 },
  { name: 'CBG', logo: '/images/tmk/brand/cbg.webp', width: 267, height: 186 },
]
const supportWays = ['Community partnership', 'Volunteer support', 'Mentorship', 'Program collaboration', 'Event support', 'Charitable giving']
const partnershipMetric = impactMetrics.find(metric => metric.id === 'metric-5')

export default function PartnersPage() {
  return <div className="tmk-partners-page">
    <section className="tmk-partners-hero" aria-labelledby="partners-title">
      <div className="tmk-wrap">
        <div className="tmk-partners-hero-heading"><div><p className="tmk-partners-eyebrow">Relationships. Resources. Shared purpose.</p><h1 id="partners-title">Partnership Makes<br /><span>More Possible</span></h1></div><div><p className="tmk-partners-lead">Mentors, volunteers, and partners help create the relationships, skills, and opportunities young people need to build successful futures.</p><a className="tmk-partners-link" href="#tmk-supporters">See Who Has Supported TMK <span aria-hidden="true">↓</span></a></div></div>
        <figure className="tmk-partners-hero-photo"><TmkPhoto name="service" priority sizes="(max-width: 640px) 90vw, 90vw" /><figcaption>TMK community service photography.</figcaption></figure>
      </div>
    </section>

    <section id="tmk-supporters" className="tmk-partners-section tmk-partners-supporters" aria-labelledby="supporters-title">
      <div className="tmk-wrap tmk-partners-supporter-layout"><div><p className="tmk-partners-eyebrow">With appreciation</p><h2 id="supporters-title">Organizations That Have Supported TMK</h2><p>Legacy supporters recognized on TMK's previous website.</p></div><div className="tmk-partners-logos">{legacySupporters.map(supporter => <figure key={supporter.name}><div><img src={supporter.logo} width={supporter.width} height={supporter.height} loading="lazy" decoding="async" alt={`${supporter.name} logo`} /></div><figcaption>{supporter.name}</figcaption></figure>)}</div></div>
    </section>

    <section className="tmk-partners-section tmk-partners-why">
      <div className="tmk-wrap tmk-partners-editorial"><div><p className="tmk-partners-eyebrow">Why partnerships matter</p><h2>Opportunity Grows<br />Through Collaboration</h2><p className="tmk-partners-lead">Shared investment in young people starts with relationships.</p><p>Partnerships with schools, foundations, businesses, cities, and faith communities are part of TMK's institutional model.</p><p>Mentoring, community service, and resources can help expand opportunity for young people.</p></div><figure><img src="/images/tmk/tmk-community-event-portrait-web.webp" width="2000" height="1333" loading="lazy" decoding="async" alt="Two people together at a community gathering" /><figcaption>From TMK's community photography.</figcaption></figure></div>
    </section>

    <section className="tmk-partners-section tmk-partners-reach" aria-labelledby="partnership-metric-title">
      <div className="tmk-wrap tmk-partners-reach-grid"><div><p className="tmk-partners-eyebrow">Community collaboration</p><p className="tmk-partners-metric-value">{partnershipMetric.prefix}{partnershipMetric.value.toLocaleString('en-US')}{partnershipMetric.suffix}</p><h2 id="partnership-metric-title">{partnershipMetric.name}</h2><p className="tmk-partners-metric-period">{partnershipMetric.description}</p><Link className="tmk-partners-link" to="/impact">See TMK's Kommunity Impact →</Link></div><figure><TmkPhoto name="supplies" sizes="(max-width: 768px) 90vw, 40vw" /><figcaption>Service and practical community support.</figcaption></figure></div>
    </section>

    <section className="tmk-partners-action">
      <figure><img src="/images/tmk/tmk-event-booth-web.webp" width="1892" height="2000" loading="lazy" decoding="async" alt="The Mills Korner event booth with a branded table, banner, and canopy" /><figcaption>TMK in the community.</figcaption></figure><div className="tmk-partners-feature-copy"><p className="tmk-partners-eyebrow">Partnership in action</p><h2>Service.<br />Presence.<br />Connection.</h2><p className="tmk-partners-lead">TMK's work reaches beyond athletics.</p><p>Service, practical help, and support for families are part of the same commitment to young people's futures.</p></div>
    </section>

    <section className="tmk-partners-section tmk-partners-invitation" aria-labelledby="support-ways-title">
      <div className="tmk-wrap"><p className="tmk-partners-eyebrow">Start a conversation</p><h2 id="support-ways-title">Build Something<br />Meaningful With TMK</h2><p className="tmk-partners-lead">Connect with TMK about how your organization can support young people.</p><ul className="tmk-partners-support-ways">{supportWays.map(way => <li key={way}>{way}</li>)}</ul></div>
    </section>

    <section className="tmk-partners-section tmk-partners-closing">
      <div className="tmk-wrap"><p className="tmk-partners-eyebrow">Shared work. Greater reach.</p><h2>Bring Your Organization<br />Into the Conversation</h2><div className="tmk-partners-actions"><Link className="tmk-partners-button" to="/contact">Kontact The Mills Korner <span aria-hidden="true">↗</span></Link><Link className="tmk-partners-link" to="/impact">See TMK's Kommunity Impact →</Link><Link className="tmk-partners-link" to="/donate">Support TMK Through Giving →</Link></div></div>
    </section>
  </div>
}
