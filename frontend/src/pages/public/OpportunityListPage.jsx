import OpportunityCard from '../../components/public/OpportunityCard.jsx'
import { opportunities as items } from '../../data/opportunities.js'
import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'

function OpportunityListPage() {
  return <><PageHero image="study" variant="wide" eyebrow="Opportunity areas" title="Opportunity, not programs." intro="TMK creates pathways that help young people build the relationships, skills, and confidence needed for successful futures." /><section className="content-section"><SectionStatus empty={!items.length} emptyMessage="Opportunity areas will be shared soon." /><div className="opportunity-grid">{items.map((item, index) => <OpportunityCard key={item.id} item={item} index={index} />)}</div></section></>
}
export default OpportunityListPage
