import { getPartners } from '../../api/public.js'
import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { resolveMediaUrl } from '../../utils/media.js'
import { usePublicResource } from '../../utils/usePublicResource.js'

function PartnersPage() { const state = usePublicResource(getPartners); const items = state.data || []; return <><PageHero eyebrow="Our partners" title="Shared work. Greater reach." intro="Partnerships with schools, foundations, businesses, cities, and faith communities are part of TMK’s institutional model." /><section className="content-section"><SectionStatus {...state} empty={!items.length} emptyMessage="Partner profiles will be shared here soon." /><div className="partner-page-grid">{items.map((partner) => <article key={partner.id}>{partner.logo && <img src={resolveMediaUrl(partner.logo)} alt={`${partner.name} logo`} />}<p className="card-kicker">{partner.partner_type}</p><h2>{partner.name}</h2>{partner.description && <p>{partner.description}</p>}{partner.website_url && <a href={partner.website_url} target="_blank" rel="noreferrer">Visit partner website →</a>}</article>)}</div></section></> }
export default PartnersPage
