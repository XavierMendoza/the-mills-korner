import { Link } from 'react-router-dom'
import { opportunities as items } from '../../data/opportunities.js'
import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'

function OpportunityListPage() {
  return <><PageHero eyebrow="Opportunity areas" title="Opportunity, not programs." intro="TMK creates pathways that help young people build the relationships, skills, and confidence needed for successful futures." /><section className="content-section"><SectionStatus empty={!items.length} emptyMessage="Opportunity areas will be shared soon." /><div className="resource-grid">{items.map((item) => <article className="resource-card" key={item.id}>{item.featured_image && <img src={item.featured_image} alt="" />}<div><h2>{item.title}</h2><p>{item.short_description}</p><Link to={`/opportunity/${item.slug}`}>Explore {item.title} →</Link></div></article>)}</div></section></>
}
export default OpportunityListPage
