import { Link, useParams } from 'react-router-dom'
import { opportunities } from '../../data/opportunities.js'
import { impactMetrics } from '../../data/impactMetrics.js'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import '../../styles/tmk-opportunity-detail.css'

const heroPhotos = {
  'academic-success': 'service',
  'financial-capability': 'supplies',
  'leadership-development': 'huddle',
  mentorship: 'kevin',
}
const academicMetric = impactMetrics.find(metric => metric.id === 'metric-6')
const heroSizes = '(max-width: 768px) 92vw, 48vw'

export default function OpportunityDetailPage() {
  const { slug } = useParams()
  const item = opportunities.find(entry => entry.slug === slug)

  if (!item) {
    return (
      <section className="tmk-opp-detail">
        <div className="tmk-wrap tmk-opp-detail-band">
          <h1>Opportunity Not Found</h1>
          <p>Choose one of TMK’s five opportunity areas.</p>
          <Link to="/opportunity">Explore All TMK Opportunities</Link>
        </div>
      </section>
    )
  }

  const related = opportunities.filter(entry => entry.slug !== slug)

  return (
    <article className="tmk-opp-detail">
      <header className="tmk-opp-detail-dark">
        <div className="tmk-wrap tmk-opp-detail-band tmk-opp-detail-split">
          <div>
            <Link className="tmk-opp-detail-back" to="/opportunity"><span aria-hidden="true">← </span>All TMK Opportunities</Link>
            <h1>{item.title}</h1>
            <p className="tmk-opp-detail-lead">{item.short_description}</p>
          </div>
          {slug === 'wellness' ? (
            <img
              src="/images/tmk/tmk-youth-group-bench-2-web.webp"
              alt="Three young people sitting together on an outdoor bench"
              width={1500}
              height={2000}
              decoding="async"
              fetchPriority="high"
            />
          ) : <TmkPhoto name={heroPhotos[slug]} priority sizes={heroSizes} />}
        </div>
      </header>

      <section className="tmk-wrap tmk-opp-detail-band tmk-opp-detail-split" aria-labelledby="opportunity-overview">
        <h2 id="opportunity-overview">Why It Matters</h2>
        <p className="tmk-opp-detail-lead">{item.description}</p>
      </section>

      {slug === 'academic-success' && (
        <section className="tmk-opp-detail-dark" aria-labelledby="academic-impact">
          <div className="tmk-wrap tmk-opp-detail-band tmk-opp-detail-split">
            <h2 id="academic-impact">TMK’s Academic Impact</h2>
            <div>
              <p className="tmk-opp-detail-metric">{academicMetric.value}{academicMetric.suffix}</p>
              <p>{academicMetric.name}</p>
              <Link to="/impact">See TMK’s Kommunity Impact <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>
      )}

      <section className="tmk-opp-detail-related" aria-labelledby="related-opportunities">
        <div className="tmk-wrap tmk-opp-detail-band">
          <h2 id="related-opportunities">Related Opportunities</h2>
          <ul>
            {related.map(entry => (
              <li key={entry.slug}>
                <Link to={`/opportunity/${entry.slug}`}>{entry.title} <span aria-hidden="true">↗</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tmk-opp-detail-dark">
        <div className="tmk-wrap tmk-opp-detail-band">
          <h2>Support TMK’s Work</h2>
          <div className="tmk-opp-detail-actions">
            <Link className="tmk-opp-detail-button" to="/get-involved">Get Involved With TMK</Link>
            <Link to="/donate">Support TMK Through Giving</Link>
          </div>
        </div>
      </section>
    </article>
  )
}
