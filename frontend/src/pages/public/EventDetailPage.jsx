import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getEvent } from '../../api/public.js'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { resolveMediaUrl } from '../../utils/media.js'
import { usePublicResource } from '../../utils/usePublicResource.js'
import { formatDate } from '../../utils/dates.js'

function EventDetailPage() { const { slug } = useParams(); const request = useCallback(() => getEvent(slug), [slug]); const state = usePublicResource(request); if (state.loading || state.error) return <main className="content-section"><SectionStatus {...state} /></main>; const event = state.data; return <article>{event.featured_image && <img className="detail-hero-image" src={resolveMediaUrl(event.featured_image)} alt="" />}<header className="detail-header"><p className="page-eyebrow">Event</p><h1>{event.title}</h1><p>{event.summary}</p></header><section className="content-section detail-prose"><dl className="event-details"><div><dt>Starts</dt><dd>{formatDate(event.start_datetime)}</dd></div><div><dt>Ends</dt><dd>{formatDate(event.end_datetime)}</dd></div>{event.location && <div><dt>Location</dt><dd>{event.location}</dd></div>}{event.address && <div><dt>Address</dt><dd>{event.address}</dd></div>}</dl><p>{event.description}</p>{event.registration_url && <a className="button button--primary" href={event.registration_url} target="_blank" rel="noreferrer">Register for this event</a>}</section></article> }
export default EventDetailPage
