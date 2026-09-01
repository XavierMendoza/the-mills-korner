import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { getImpactMetrics } from '../../api/public.js'
import { usePublicResource } from '../../utils/usePublicResource.js'

function ImpactPage() {
  const state = usePublicResource(getImpactMetrics)
  const metrics = state.data || []
  return <><PageHero eyebrow="Our impact" title="Evidence before a program catalog." intro="Impact reflects the reach of relationships, opportunity, and sustained community investment." /><section className="content-section">
    <SectionStatus {...state} empty={!metrics.length} emptyMessage="Impact updates will be published here." />
    <div className="public-metric-grid">{metrics.map((metric) => <article key={metric.id}><p className="metric__value">{metric.prefix}{metric.value.toLocaleString()}{metric.suffix}</p><h2>{metric.name}</h2>{metric.description && <p>{metric.description}</p>}</article>)}</div>
  </section></>
}
export default ImpactPage
