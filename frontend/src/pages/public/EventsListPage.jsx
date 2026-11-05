import { Link } from 'react-router-dom'
import { events as items } from '../../data/events.js'
import PageHero from '../../components/public/PageHero.jsx'
import EditorialEmptyState from '../../components/public/EditorialEmptyState.jsx'
import { formatDate } from '../../utils/dates.js'

function EventsListPage() { return <><PageHero image="community" variant="wide" eyebrow="Events" title="Gather around what matters." intro="Event details and registration information will be published here as they become available." /><section className="content-section">{!items.length && <EditorialEmptyState image="teamwork" eyebrow="Upcoming events" title="Gather around what matters.">Upcoming events will be announced here. Event details and registration information will be published as they become available.</EditorialEmptyState>}<div className="resource-grid">{items.map((event) => <article className="resource-card" key={event.id}>{event.featured_image && <img loading="lazy" decoding="async" src={event.featured_image} alt="" />}<div><time dateTime={event.start_datetime}>{formatDate(event.start_datetime)}</time><h2>{event.title}</h2><p>{event.summary}</p>{event.location_name && <p>{event.location_name}</p>}<Link to={`/events/${event.slug}`}>View event →</Link></div></article>)}</div></section></> }
export default EventsListPage
