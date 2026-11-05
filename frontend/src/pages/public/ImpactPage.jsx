import DemoPhoto from '../../components/public/DemoPhoto.jsx'
import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { impactMetrics as metrics } from '../../data/impactMetrics.js'

function ImpactPage() {
  return <><PageHero image="community" variant="split" eyebrow="Our impact" title="Evidence before a program catalog." intro="Impact reflects the reach of relationships, opportunity, and sustained community investment." /><section className="content-section">
    <SectionStatus empty={!metrics.length} emptyMessage="Impact updates will be published here." />
    <div className="public-metric-grid">{metrics.map((metric) => <article key={metric.id}><p className="metric__value">{metric.prefix}{metric.value.toLocaleString()}{metric.suffix}</p><h2>{metric.name}</h2>{metric.description && <p>{metric.description}</p>}</article>)}</div>
  </section><section className="content-section editorial-split content-section--tinted"><figure className="editorial-figure"><DemoPhoto image="planning" sizes="(max-width: 880px) 100vw, 50vw" /></figure><div className="editorial-split__copy"><p className="page-eyebrow">Relationships. Skills. Opportunity.</p><h2>Preparing young people for where they can go.</h2><p>Impact reflects the reach of relationships, opportunity, and sustained community investment.</p></div></section></>
}
export default ImpactPage
