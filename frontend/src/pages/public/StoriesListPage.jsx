import { Link } from 'react-router-dom'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import { testimonials } from '../../data/testimonials.js'
import '../../styles/tmk-stories.css'

const editorialPhotos = {
  'chris-hollis': 'football-team-group',
  'chris-bryant': 'football-field-group',
  'la-france-gregory': 'football-number-39',
}

function Testimonial({ testimonial, featured }) {
  const { id, name, paragraphs, excerpt, epigraph } = testimonial
  const photo = editorialPhotos[id]

  return (
    <article
      id={id}
      tabIndex={-1}
      className={`tmk-stories-section tmk-story${featured ? ' tmk-story-featured' : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="tmk-wrap tmk-story-layout">
        <div className="tmk-story-aside">
          {featured && <p className="tmk-stories-eyebrow">Featured Testimonial</p>}
          <h2 id={`${id}-title`}>{name}</h2>
          <p className="tmk-story-pull" aria-hidden="true">“{excerpt}”</p>
          {photo && (
            <figure className="tmk-story-photo">
              <TmkPhoto name={photo} />
              <figcaption>Editorial photograph from the TMK collection.</figcaption>
            </figure>
          )}
        </div>
        <div className="tmk-story-full">
          {epigraph && (
            <figure className="tmk-story-epigraph">
              <blockquote><p>{epigraph.quote}</p></blockquote>
              <figcaption>— {epigraph.name}</figcaption>
            </figure>
          )}
          <blockquote aria-labelledby={`${id}-title`}>
            {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </blockquote>
        </div>
      </div>
    </article>
  )
}

export default function StoriesListPage() {
  return (
    <div className="tmk-stories-page">
      <section className="tmk-stories-hero" aria-labelledby="stories-title">
        <div className="tmk-wrap tmk-stories-hero-grid">
          <div>
            <h1 id="stories-title">Stories That <span>Stay With Us</span></h1>
            <p className="tmk-stories-lead">Eight testimonials reflect on Kevin Mills, mentorship, and relationships that span years.</p>
            <a href="#tmk-testimonials">Explore the TMK Testimonials <span aria-hidden="true">↓</span></a>
          </div>
          <figure className="tmk-story-photo">
            <TmkPhoto name="community-evening-group" priority />
            <figcaption>Editorial photograph from the TMK collection.</figcaption>
          </figure>
        </div>
      </section>

      <nav id="tmk-testimonials" className="tmk-stories-index tmk-wrap" aria-labelledby="testimonials-index-title" tabIndex={-1}>
        <h2 id="testimonials-index-title">In Their Own Words</h2>
        <ul>
          {testimonials.map(({ id, name }) => <li key={id}><a href={`#${id}`}>{name}</a></li>)}
        </ul>
      </nav>

      <div className="tmk-stories-collection">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={testimonial.id} testimonial={testimonial} featured={index === 0} />
        ))}
      </div>

      <section className="tmk-stories-section tmk-stories-closing" aria-labelledby="more-tmk">
        <div className="tmk-wrap">
          <h2 id="more-tmk">Get to Know The Mills Korner</h2>
          <div className="tmk-stories-actions">
            <Link to="/impact">See TMK's Kommunity Impact</Link>
            <Link to="/opportunity">Explore TMK Opportunities</Link>
            <Link to="/donate">Support TMK Through Giving</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
