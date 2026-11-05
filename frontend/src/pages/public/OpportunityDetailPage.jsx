import { Link, useParams } from 'react-router-dom'
import { opportunities } from '../../data/opportunities.js'
import { opportunityImages } from '../../data/demoImages.js'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import PageHero from '../../components/public/PageHero.jsx'
import DemoPhoto from '../../components/public/DemoPhoto.jsx'

function OpportunityDetailPage() {
  const { slug } = useParams()
  const item = opportunities.find((entry) => entry.slug === slug)
  if (!item) return <section className="content-section"><SectionStatus error /></section>
  return <article>
    <PageHero image={opportunityImages[slug]} eyebrow="Opportunity area" title={item.title} intro={item.short_description} />
    <section className="content-section editorial-split">
      <div className="editorial-split__copy"><p className="page-eyebrow">Opportunity, not programs</p><h2>{item.short_description}</h2><p>{item.description}</p><div className="button-row"><Link className="button button--primary" to="/get-involved">Get involved</Link><Link className="button button--secondary" to="/opportunity">All opportunities</Link></div></div>
      <figure className="editorial-figure"><DemoPhoto image={opportunityImages[slug]} sizes="(max-width: 880px) 100vw, 50vw" /><figcaption>Relationships. Skills. Opportunity.</figcaption></figure>
    </section>
  </article>
}
export default OpportunityDetailPage
