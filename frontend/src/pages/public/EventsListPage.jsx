import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '../../data/events.js'
import { formatDate } from '../../utils/dates.js'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import '../../styles/tmk-events.css'

const gatheringThemes = [
  ['Connection', 'Young people, families, mentors, volunteers, and community supporters coming together.'],
  ['Mentorship & leadership', 'Guidance, encouragement, and opportunities to grow.'],
  ['Service & community', 'Practical help, shared participation, and a heart of service.'],
]

function EventSchedule({ items }) {
  return <div className="tmk-events-schedule">{items.map(event => {
    const hasDate = event.start_datetime && Number.isFinite(Date.parse(event.start_datetime))
    return <article className="tmk-events-row" key={event.id}>
      {hasDate && <time dateTime={event.start_datetime}><span className="tmk-events-date">{new Date(event.start_datetime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span><span>{formatDate(event.start_datetime)}</span></time>}
      <div className="tmk-events-row-copy"><h3>{event.title}</h3>{event.summary && <p>{event.summary}</p>}{event.location_name && <p className="tmk-events-location">{event.location_name}</p>}<div className="tmk-events-row-actions">{event.slug && <Link className="tmk-events-link" to={`/events/${event.slug}`}>View Event Details <span aria-hidden="true">↗</span></Link>}{event.registration_url && <a className="tmk-events-link" href={event.registration_url} target="_blank" rel="noopener noreferrer">See Registration Information <span aria-hidden="true">↗</span></a>}</div></div>
    </article>
  })}</div>
}

export default function EventsListPage() {
  const [now] = useState(Date.now)
  const isPast = event => {
    const end = Date.parse(event.end_datetime || event.start_datetime)
    return Number.isFinite(end) && end < now
  }
  const upcomingEvents = events.filter(event => !isPast(event))
  const pastEvents = events.filter(isPast)

  return <div className="tmk-events-page">
    <section className="tmk-events-hero" aria-labelledby="events-title">
      <div className="tmk-wrap tmk-events-hero-grid"><div><p className="tmk-events-eyebrow">Gather. Serve. Grow.</p><h1 id="events-title">Where TMK<br /><span>Shows Up</span></h1><p className="tmk-events-lead">TMK events bring young people, families, mentors, volunteers, and community supporters together.</p><a className="tmk-events-link" href="#tmk-event-updates">See TMK Event Updates <span aria-hidden="true">↓</span></a></div><figure><img src="/images/tmk/tmk-event-booth-web.webp" width="1892" height="2000" alt="The Mills Korner event booth with a branded table, banner, and canopy" loading="eager" fetchPriority="high" decoding="async" /><figcaption>The Mills Korner in the community.</figcaption></figure></div>
    </section>

    <section id="tmk-event-updates" tabIndex={-1} className="tmk-events-section tmk-events-upcoming" aria-labelledby="upcoming-title">
      <div className="tmk-wrap">
        {upcomingEvents.length > 0 ? <><p className="tmk-events-eyebrow">Gather around what matters</p><h2 id="upcoming-title">Upcoming TMK Events</h2><EventSchedule items={upcomingEvents} /></> : <div className="tmk-events-empty-grid"><div><p className="tmk-events-eyebrow">Upcoming events</p><h2 id="upcoming-title">More TMK Events<br />Are Coming</h2><p className="tmk-events-lead">Upcoming events will be announced here.</p><p>Event details and registration information will be published as they become available.</p><div className="tmk-events-empty-actions"><a className="tmk-events-button" href="#newsletter-email">Join the TMK Newsletter <span aria-hidden="true">↓</span></a><Link className="tmk-events-link" to="/opportunity">Explore TMK Opportunities →</Link><Link className="tmk-events-link" to="/impact">See TMK's Kommunity Impact →</Link></div></div><figure><img src="/images/tmk/tmk-community-event-portrait-web.webp" width="2000" height="1333" alt="Two people together at a community gathering" loading="lazy" decoding="async" /><figcaption>From TMK's community photography.</figcaption></figure></div>}
      </div>
    </section>

    <section className="tmk-events-section tmk-events-purpose">
      <div className="tmk-wrap"><p className="tmk-events-eyebrow">People at the center</p><h2>More Than a Date<br />on the Calendar</h2><div className="tmk-events-theme-grid">{gatheringThemes.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div>
    </section>

    <section className="tmk-events-section tmk-events-community" aria-labelledby="community-title">
      <div className="tmk-wrap"><p className="tmk-events-eyebrow">A heart of service</p><h2 id="community-title">TMK in the<br />Kommunity</h2><div className="tmk-events-community-photos"><figure><TmkPhoto name="service" sizes="(max-width: 640px) 90vw, 45vw" /><figcaption>TMK community service photography.</figcaption></figure><figure><img src="/images/tmk/tmk-evening-gathering-web.webp" width="1500" height="2000" alt="Three people posing together at an evening gathering" loading="lazy" decoding="async" /><figcaption>From TMK's community photography.</figcaption></figure></div></div>
    </section>

    <section className="tmk-events-section tmk-events-participate">
      <div className="tmk-wrap"><p className="tmk-events-eyebrow">Stay connected. Get involved.</p><h2>Be Part of<br />What Comes Next</h2><div className="tmk-events-actions"><Link className="tmk-events-button" to="/get-involved">Become a TMK Mentor <span aria-hidden="true">↗</span></Link><Link className="tmk-events-link" to="/partners">Partner With The Mills Korner →</Link><a className="tmk-events-link" href="#newsletter-email">Join the TMK Newsletter →</a><Link className="tmk-events-link" to="/donate">Support TMK Through Giving →</Link></div></div>
    </section>

    {pastEvents.length > 0 && <section className="tmk-events-section tmk-events-archive" aria-labelledby="archive-title"><div className="tmk-wrap"><p className="tmk-events-eyebrow">Past gatherings</p><h2 id="archive-title">Past TMK Events</h2><EventSchedule items={pastEvents} /></div></section>}
  </div>
}
