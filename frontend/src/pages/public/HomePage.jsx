import { Link } from 'react-router-dom'
import { impactMetrics } from '../../data/impactMetrics.js'
import { opportunities } from '../../data/opportunities.js'
import { stories } from '../../data/stories.js'
import { partners } from '../../data/partners.js'
import { events } from '../../data/events.js'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import HeroCarousel from '../../components/public/HeroCarousel.jsx'
import OpportunityCard from '../../components/public/OpportunityCard.jsx'
import FeaturedQuote from '../../components/public/FeaturedQuote.jsx'
import EditorialEmptyState from '../../components/public/EditorialEmptyState.jsx'

function HomePage() {
  return (
    <>
      <HeroCarousel />

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
        <div className="opportunity-grid">
          {opportunities.map((item, index) => <OpportunityCard key={item.id} item={item} index={index} heading="h3" />)}
        </div>
      </section>

      <FeaturedQuote />

      <section className="home-section home-section--tinted">
        <div className="section-heading section-heading--split">
          <div><p className="page-eyebrow">Community voices</p><h2>Stories of forward motion</h2></div>
          <Link className="text-link" to="/stories">All stories →</Link>
        </div>
        {!stories.length && <EditorialEmptyState image="wellness" eyebrow="Stories of growth" title="Before. Transformation. Where they are now.">Transformation stories will be shared with participant permission as they become available.</EditorialEmptyState>}
        <div className="story-grid">
          {stories.slice(0, 3).map((story) => (
            <article className="story-card" key={story.id}>
              {story.featured_image && <img loading="lazy" decoding="async" src={story.featured_image} alt="" />}
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
        {!partners.length && <><div className="partner-categories">{['Schools', 'Foundations', 'Businesses', 'Cities', 'Faith Communities'].map((category) => <p key={category}>{category}</p>)}</div><p className="section-status">Partner profiles will be shared here soon.</p></>}
        <div className="partner-grid">
          {partners.slice(0, 6).map((partner) => (
            <div className="partner" key={partner.id}>
              {partner.logo && <img loading="lazy" decoding="async" src={partner.logo} alt={`${partner.name} logo`} />}
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
        {!events.length && <EditorialEmptyState image="community" eyebrow="Gather with purpose" title="Gather around what matters.">Upcoming events will be announced here.</EditorialEmptyState>}
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
