import { Link } from 'react-router-dom'
import { events as items } from '../../data/events.js'
import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { formatDate } from '../../utils/dates.js'

function EventsListPage() { return <><PageHero eyebrow="Events" title="Gather around what matters." intro="Event details and registration information will be published here as they become available." /><section className="content-section"><SectionStatus empty={!items.length} emptyMessage="Upcoming events will be announced here." /><div className="resource-grid">{items.map((event) => <article className="resource-card" key={event.id}>{event.featured_image && <img src={event.featured_image} alt="" />}<div><time dateTime={event.start_datetime}>{formatDate(event.start_datetime)}</time><h2>{event.title}</h2><p>{event.summary}</p>{event.location_name && <p>{event.location_name}</p>}<Link to={`/events/${event.slug}`}>View event →</Link></div></article>)}</div></section></> }
export default EventsListPage
