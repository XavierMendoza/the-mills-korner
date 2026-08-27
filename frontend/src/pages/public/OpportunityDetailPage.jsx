import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOpportunityArea } from '../../api/public.js'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { resolveMediaUrl } from '../../utils/media.js'
import { usePublicResource } from '../../utils/usePublicResource.js'

function OpportunityDetailPage() {
  const { slug } = useParams()
  const request = useCallback(() => getOpportunityArea(slug), [slug])
  const state = usePublicResource(request)
  if (state.loading || state.error) return <main className="content-section"><SectionStatus {...state} /></main>
  const item = state.data
  return <article>{item.featured_image && <img className="detail-hero-image" src={resolveMediaUrl(item.featured_image)} alt="" />}<header className="detail-header"><p className="page-eyebrow">Opportunity area</p><h1>{item.title}</h1><p>{item.short_description}</p></header><section className="content-section detail-prose"><p>{item.description}</p><div className="button-row"><Link className="button button--secondary" to="/opportunity">All opportunities</Link><Link className="button button--primary" to="/get-involved">Get involved</Link></div></section></article>
}
export default OpportunityDetailPage
