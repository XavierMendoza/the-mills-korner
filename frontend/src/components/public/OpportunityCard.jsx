import { Link } from 'react-router-dom'
import { opportunityImages } from '../../data/demoImages.js'
import DemoPhoto from './DemoPhoto.jsx'

function OpportunityCard({ item, index = 0, heading: Heading = 'h2' }) {
  return <article className="opportunity-card">
    <div className="opportunity-card__image"><DemoPhoto image={opportunityImages[item.slug]} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /><span aria-hidden="true">0{index + 1}</span></div>
    <div className="opportunity-card__body"><p className="card-kicker">Opportunity area</p><Heading>{item.title}</Heading><p>{item.short_description}</p><Link to={`/opportunity/${item.slug}`}>Explore {item.title} <span aria-hidden="true">↗</span></Link></div>
  </article>
}
export default OpportunityCard
