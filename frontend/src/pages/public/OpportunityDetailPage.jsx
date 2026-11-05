import { Link, useParams } from 'react-router-dom'
import { opportunities } from '../../data/opportunities.js'
import SectionStatus from '../../components/public/SectionStatus.jsx'

function OpportunityDetailPage() {
  const { slug } = useParams()
  const item = opportunities.find((entry) => entry.slug === slug)
  if (!item) return <section className="content-section"><SectionStatus error /></section>
  return <article>{item.featured_image && <img className="detail-hero-image" src={item.featured_image} alt="" />}<header className="detail-header"><p className="page-eyebrow">Opportunity area</p><h1>{item.title}</h1><p>{item.short_description}</p></header><section className="content-section detail-prose"><p>{item.description}</p><div className="button-row"><Link className="button button--secondary" to="/opportunity">All opportunities</Link><Link className="button button--primary" to="/get-involved">Get involved</Link></div></section></article>
}
export default OpportunityDetailPage
