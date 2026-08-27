import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getEvents,
  getImpactMetrics,
  getOpportunityAreas,
  getPartners,
  getStories,
} from '../../api/public.js'
import { resolveMediaUrl } from '../../utils/media.js'

const services = {
  metrics: getImpactMetrics,
  opportunities: getOpportunityAreas,
  stories: getStories,
  partners: getPartners,
  events: getEvents,
}

const initialData = Object.fromEntries(
  Object.keys(services).map((key) => [key, { items: [], loading: true, error: false }]),
)

function EmptyState({ state, emptyMessage }) {
  if (state.loading) return <p className="section-status">Loading…</p>
  if (state.error) return <p className="section-status">This information is temporarily unavailable.</p>
  if (!state.items.length) return <p className="section-status">{emptyMessage}</p>
  return null
}

function HomePage() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    let active = true

    Promise.allSettled(Object.entries(services).map(async ([key, request]) => [key, await request()]))
      .then((results) => {
        if (!active) return
        setData((current) => {
          const next = { ...current }
          results.forEach((result, index) => {
            const key = Object.keys(services)[index]
            next[key] = result.status === 'fulfilled'
              ? { items: result.value[1], loading: false, error: false }
              : { items: [], loading: false, error: true }
          })
          return next
        })
      })

    return () => { active = false }
  }, [])

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="page-eyebrow">Community begins at the corner</p>
          <h1>Opportunity changes everything.</h1>
          <p className="home-hero__lead">
            The Mills Korner connects people to pathways for growth, meaningful relationships,
            and the collective strength of community.
          </p>
          <div className="button-row">
            <Link className="button button--primary" to="/opportunity">Explore opportunities</Link>
            <Link className="button button--secondary" to="/get-involved">Get involved</Link>
          </div>
        </div>
        <aside className="home-hero__statement" aria-label="Our purpose">
          <span>One place.</span>
          <strong>Many paths forward.</strong>
        </aside>
      </section>

      <section className="home-section home-section--forest">
        <div className="section-heading">
          <p className="page-eyebrow">Impact in motion</p>
          <h2>Progress made visible.</h2>
        </div>
        <EmptyState state={data.metrics} emptyMessage="Impact updates are coming soon." />
        {!!data.metrics.items.length && (
          <div className="metric-grid">
            {data.metrics.items.map((metric) => (
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
          <div><p className="page-eyebrow">Where possibility grows</p><h2>Opportunity areas</h2></div>
          <Link className="text-link" to="/opportunity">View all opportunities →</Link>
        </div>
        <EmptyState state={data.opportunities} emptyMessage="Opportunity areas will be shared soon." />
        <div className="editorial-grid">
          {data.opportunities.items.slice(0, 3).map((item) => (
            <article className="feature-card" key={item.id}>
              {item.featured_image && <img src={resolveMediaUrl(item.featured_image)} alt="" />}
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
        <EmptyState state={data.stories} emptyMessage="Community stories are being gathered." />
        <div className="story-grid">
          {data.stories.items.slice(0, 3).map((story) => (
            <article className="story-card" key={story.id}>
              {story.featured_image && <img src={resolveMediaUrl(story.featured_image)} alt="" />}
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
        <EmptyState state={data.partners} emptyMessage="Partner profiles will be available soon." />
        <div className="partner-grid">
          {data.partners.items.slice(0, 6).map((partner) => (
            <div className="partner" key={partner.id}>
              {partner.logo && <img src={resolveMediaUrl(partner.logo)} alt={`${partner.name} logo`} />}
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
        <EmptyState state={data.events} emptyMessage="New events will be announced here." />
        <div className="event-list">
          {data.events.items.slice(0, 3).map((event) => (
            <article className="event-row" key={event.id}>
              <time dateTime={event.start_datetime}>{new Date(event.start_datetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</time>
              <div><h3>{event.title}</h3><p>{event.summary}</p></div>
              <Link to={`/events/${event.slug}`} aria-label={`View ${event.title}`}>View event →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div><p className="page-eyebrow">Your place is here</p><h2>Help opportunity reach further.</h2></div>
        <Link className="button button--gold" to="/get-involved">Find your way to participate</Link>
      </section>
    </>
  )
}

export default HomePage
