import { useParams } from 'react-router-dom'
import { events } from '../../data/events.js'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { formatDate } from '../../utils/dates.js'

function EventDetailPage() { const { slug } = useParams(); const event = events.find((entry) => entry.slug === slug)
  if (!event) return <section className="content-section"><SectionStatus error /></section>; return <article>{event.featured_image && <img className="detail-hero-image" src={event.featured_image} alt="" />}<header className="detail-header"><p className="page-eyebrow">Event</p><h1>{event.title}</h1><p>{event.summary}</p></header><section className="content-section detail-prose"><dl className="event-details"><div><dt>Starts</dt><dd>{formatDate(event.start_datetime)}</dd></div><div><dt>Ends</dt><dd>{formatDate(event.end_datetime)}</dd></div>{event.location_name && <div><dt>Location</dt><dd>{event.location_name}</dd></div>}{event.address && <div><dt>Address</dt><dd>{event.address}</dd></div>}</dl><p>{event.description}</p>{event.registration_url && <a className="button button--primary" href={event.registration_url} target="_blank" rel="noreferrer">Register for this event</a>}</section></article> }
export default EventDetailPage
