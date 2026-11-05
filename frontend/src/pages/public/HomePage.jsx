import { Link } from 'react-router-dom'
import { impactMetrics } from '../../data/impactMetrics.js'
import { opportunities } from '../../data/opportunities.js'
import { stories } from '../../data/stories.js'
import { partners } from '../../data/partners.js'
import { events } from '../../data/events.js'
import SectionStatus from '../../components/public/SectionStatus.jsx'

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="page-eyebrow">The Mills Korner</p>
          <h1>
            Developing Leaders.<br />
            Expanding Opportunity.<br />
            Strengthening Communities.
          </h1>
          <p className="home-hero__lead">
            The Mills Korner equips young people ages 10–22 with the relationships, skills,
            and opportunities they need to build successful futures.
          </p>
          <div className="button-row">
            <Link className="button button--primary" to="/get-involved">Become a Mentor</Link>
            <Link className="button button--secondary" to="/get-involved">Partner With Us</Link>
            <Link className="button button--secondary" to="/get-involved">Invest in a Future</Link>
          </div>
        </div>
        <aside className="home-hero__statement" aria-label="Our purpose">
          <span>We don&apos;t define young people by where they begin.</span>
          <strong>We prepare them for where they can go.</strong>
        </aside>
      </section>

      <section className="home-section home-section--forest">
        <div className="section-heading">
          <p className="page-eyebrow">Impact in motion</p>
          <h2>Progress made visible.</h2>
        </div>
        <SectionStatus empty={!impactMetrics.length} emptyMessage="Impact updates are coming soon." />
        {!!impactMetrics.length && (
          <div className="metric-grid">
            {impactMetrics.map((metric) => (
              <article className="metric" key={metric.id}>
                <p className="metric__value">{metric.prefix}{metric.value.toLocaleString()}{metric.suffix}</p>
                <h3>{metric.name}</h3>
                {metric.description && <p>{metric.description}</p>}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="home-section">
        <div className="section-heading section-heading--split">
          <div><p className="page-eyebrow">Where possibility grows</p><h2>Opportunity, not programs.</h2></div>
          <Link className="text-link" to="/opportunity">View all opportunities →</Link>
        </div>
        <SectionStatus empty={!opportunities.length} emptyMessage="Opportunity areas will be shared soon." />
        <div className="editorial-grid">
          {opportunities.slice(0, 3).map((item) => (
            <article className="feature-card" key={item.id}>
              {item.featured_image && <img src={item.featured_image} alt="" />}
              <div className="feature-card__body">
                <h3>{item.title}</h3><p>{item.short_description}</p>
                <Link to={`/opportunity/${item.slug}`}>Explore this area →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-section--tinted">
        <div className="section-heading section-heading--split">
          <div><p className="page-eyebrow">Community voices</p><h2>Stories of forward motion</h2></div>
          <Link className="text-link" to="/stories">All stories →</Link>
        </div>
        <SectionStatus empty={!stories.length} emptyMessage="Transformation stories will be shared with participant permission as they become available." />
        <div className="story-grid">
          {stories.slice(0, 3).map((story) => (
            <article className="story-card" key={story.id}>
              {story.featured_image && <img src={story.featured_image} alt="" />}
              <div><p className="card-kicker">{story.person_name || 'A TMK story'}</p><h3>{story.title}</h3>
                <p>{story.summary}</p><Link to={`/stories/${story.slug}`}>Read the story →</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading section-heading--split">
          <div><p className="page-eyebrow">Stronger together</p><h2>Community partners</h2></div>
          <Link className="text-link" to="/partners">Meet our partners →</Link>
        </div>
        <SectionStatus empty={!partners.length} emptyMessage="Partner profiles will be shared here soon." />
        <div className="partner-grid">
          {partners.slice(0, 6).map((partner) => (
            <div className="partner" key={partner.id}>
              {partner.logo && <img src={partner.logo} alt={`${partner.name} logo`} />}
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section home-section--bordered">
        <div className="section-heading section-heading--split">
          <div><p className="page-eyebrow">Gather with purpose</p><h2>Upcoming events</h2></div>
          <Link className="text-link" to="/events">View all events →</Link>
        </div>
        <SectionStatus empty={!events.length} emptyMessage="Upcoming events will be announced here." />
        <div className="event-list">
          {events.slice(0, 3).map((event) => (
            <article className="event-row" key={event.id}>
              <time dateTime={event.start_datetime}>{new Date(event.start_datetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</time>
              <div><h3>{event.title}</h3><p>{event.summary}</p></div>
              <Link to={`/events/${event.slug}`} aria-label={`View ${event.title}`}>View event →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div><p className="page-eyebrow">Invest in Opportunity</p><h2>Help young people build successful futures.</h2></div>
        <Link className="button button--gold" to="/get-involved">Find your way to participate</Link>
      </section>
    </>
  )
}

export default HomePage
