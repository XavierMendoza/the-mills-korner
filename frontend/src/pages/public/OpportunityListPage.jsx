import { Link } from 'react-router-dom'
import { getOpportunityAreas } from '../../api/public.js'
import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { resolveMediaUrl } from '../../utils/media.js'
import { usePublicResource } from '../../utils/usePublicResource.js'

function OpportunityListPage() {
  const state = usePublicResource(getOpportunityAreas)
  const items = state.data || []
  return <><PageHero eyebrow="Opportunity areas" title="Paths built for forward motion." intro="Explore the places where connection, growth, and community action meet." /><section className="content-section"><SectionStatus {...state} empty={!items.length} emptyMessage="Opportunity areas will be shared soon." /><div className="resource-grid">{items.map((item) => <article className="resource-card" key={item.id}>{item.featured_image && <img src={resolveMediaUrl(item.featured_image)} alt="" />}<div><h2>{item.title}</h2><p>{item.short_description}</p><Link to={`/opportunity/${item.slug}`}>Explore {item.title} →</Link></div></article>)}</div></section></>
}
export default OpportunityListPage
