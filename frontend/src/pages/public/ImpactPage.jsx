import { Link } from 'react-router-dom'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import { impactMetrics } from '../../data/impactMetrics.js'
import '../../styles/tmk-impact.css'

const metricsById = Object.fromEntries(impactMetrics.map(metric => [metric.id, metric]))

function MetricFigure({ metric, heading: Heading = 'p' }) {
  return <div className="tmk-impact-figure">
    <p className="tmk-impact-value">{metric.prefix}{metric.value.toLocaleString('en-US')}{metric.suffix}</p>
    <Heading className="tmk-impact-label">{metric.name}</Heading>
    {metric.description && <p className="tmk-impact-period">{metric.description}</p>}
  </div>
}

export default function ImpactPage() {
  const academic = metricsById['metric-6']
  return <div className="tmk-impact-page">
    <section className="tmk-impact-hero" aria-labelledby="impact-title">
      <div className="tmk-wrap tmk-impact-hero-grid">
        <div><p className="tmk-impact-eyebrow">Relationships. Service. Opportunity.</p><h1 id="impact-title">TMK's<br /><span>Kommunity<br />Impact</span></h1><p className="tmk-impact-lead">Impact reflects the reach of relationships, opportunity, and sustained community investment.</p><a className="tmk-impact-link" href="#verified-impact">See TMK's Verified Impact <span aria-hidden="true">↓</span></a></div>
        <figure><TmkPhoto name="supplies" priority sizes="(max-width: 768px) 90vw, 45vw" /><figcaption>A heart of service, in the community.</figcaption></figure>
      </div>
    </section>

    <section id="verified-impact" tabIndex={-1} className="tmk-impact-section tmk-impact-evidence" aria-labelledby="evidence-title">
      <div className="tmk-wrap"><p className="tmk-impact-eyebrow">Youth. Families. Volunteers. Leaders. Partnerships.</p><h2 id="evidence-title">Reach made visible.</h2><div className="tmk-impact-metric-grid">{impactMetrics.map(metric => <article key={metric.id}><MetricFigure metric={metric} heading="h3" /></article>)}</div></div>
    </section>

    <section className="tmk-impact-section tmk-impact-action" aria-labelledby="action-title">
      <div className="tmk-wrap">
        <div className="tmk-impact-editorial"><div><p className="tmk-impact-eyebrow">A heart of service</p><h2 id="action-title">Impact You<br />Can See</h2></div><p className="tmk-impact-lead">TMK's work reaches beyond athletics. Service, practical help, and support for families are part of the same commitment to young people's futures.</p></div>
        <div className="tmk-impact-action-photos"><figure><TmkPhoto name="bench-two" sizes="(max-width: 640px) 90vw, 45vw" /><figcaption>From the TMK photo collection.</figcaption></figure><figure><TmkPhoto name="evening-gathering" sizes="(max-width: 768px) 90vw, 45vw" /><figcaption>A moment of community connection.</figcaption></figure></div>
      </div>
    </section>

    <section className="tmk-impact-section tmk-impact-young-people">
      <div className="tmk-wrap tmk-impact-editorial">
        <div><p className="tmk-impact-eyebrow">Youth + families</p><h2>Support Around<br />a Young Person</h2><p>TMK equips young people ages 10–22 with relationships, skills, and opportunities that help prepare them for successful futures.</p><p>Mentorship is grounded in consistent relationships with trusted adults.</p><Link className="tmk-impact-link" to="/opportunity">Explore TMK Opportunities →</Link></div>
        <div className="tmk-impact-support-metrics"><MetricFigure metric={metricsById['metric-1']} /><MetricFigure metric={metricsById['metric-2']} /></div>
      </div>
    </section>

    <section className="tmk-impact-volunteers">
      <div className="tmk-impact-volunteer-copy"><p className="tmk-impact-eyebrow">Volunteers + leaders</p><h2>People Who<br />Show Up</h2><p>Service, leadership, mentorship, and community participation are part of TMK's work.</p><div className="tmk-impact-volunteer-metrics"><MetricFigure metric={metricsById['metric-3']} /><MetricFigure metric={metricsById['metric-4']} /></div></div>
      <figure><TmkPhoto name="service" sizes="(max-width: 768px) 90vw, 45vw" /><figcaption>TMK in the community.</figcaption></figure>
    </section>

    <section className="tmk-impact-section tmk-impact-partnerships">
      <div className="tmk-wrap tmk-impact-partnership-grid"><MetricFigure metric={metricsById['metric-5']} /><div><p className="tmk-impact-eyebrow">Community collaboration</p><h2>Shared Work.<br />Greater Reach.</h2><p>Partnerships with schools, foundations, businesses, cities, and faith communities are part of TMK's institutional model.</p><Link className="tmk-impact-link" to="/partners">See Who Has Supported TMK →</Link></div></div>
    </section>

    <section className="tmk-impact-section tmk-impact-academic" aria-labelledby="academic-title">
      <div className="tmk-wrap tmk-impact-academic-grid"><p className="tmk-impact-academic-value">{academic.prefix}{academic.value.toLocaleString('en-US')}{academic.suffix}</p><div><p className="tmk-impact-eyebrow">Academic outcome</p><h2 id="academic-title">{academic.name}</h2><Link className="tmk-impact-link" to="/opportunity/academic-success">Explore Academic Success →</Link></div></div>
    </section>

    <section className="tmk-impact-section tmk-impact-closing">
      <div className="tmk-wrap"><p className="tmk-impact-eyebrow">Help opportunity reach further</p><h2>Be part of<br />what comes next.</h2><div className="tmk-impact-actions"><Link className="tmk-impact-button" to="/opportunity">Explore TMK Opportunities <span aria-hidden="true">↗</span></Link><Link className="tmk-impact-link" to="/stories">Read TMK Success Stories →</Link><Link className="tmk-impact-link" to="/donate">Support TMK Through Giving →</Link><Link className="tmk-impact-link" to="/get-involved">Partner With The Mills Korner →</Link></div></div>
    </section>
  </div>
}
