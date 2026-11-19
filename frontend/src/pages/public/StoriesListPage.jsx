import { Link } from 'react-router-dom'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import { testimonials } from '../../data/testimonials.js'
import '../../styles/tmk-stories.css'

const [featured, ...collection] = testimonials
const themes = [
  ['Mentorship', 'The value of guidance, whenever it is needed.'],
  ['Authenticity', 'A personal appreciation of Coach Mills.'],
  ['Courage', 'Encouragement to face the moment.'],
]

function TestimonialQuote({ testimonial }) {
  return <figure className="tmk-story-quote">
    <span className="tmk-story-quote-mark" aria-hidden="true">“</span>
    <blockquote><p>{testimonial.quote}</p></blockquote>
    <figcaption>— {testimonial.name}</figcaption>
  </figure>
}

export default function StoriesListPage() {
  return <div className="tmk-stories-page">
    <section className="tmk-stories-hero" aria-labelledby="stories-title">
      <div className="tmk-wrap tmk-stories-hero-grid">
        <div><p className="tmk-stories-eyebrow">The people. The relationships.</p><h1 id="stories-title">Stories That Show<br /><span>What TMK Means</span></h1><p className="tmk-stories-lead">In their own words: reflections on Kevin Mills and mentorship.</p><a className="tmk-stories-link" href="#tmk-testimonials">Read the TMK Testimonials <span aria-hidden="true">↓</span></a></div>
        <figure className="tmk-stories-hero-photo"><img src="/images/tmk/tmk-community-event-portrait-web.webp" width="2000" height="1333" alt="Two people together at a community gathering" loading="eager" fetchPriority="high" decoding="async" /><figcaption>From TMK's community photography.</figcaption></figure>
      </div>
    </section>

    <section id="tmk-testimonials" className="tmk-stories-section tmk-stories-featured" aria-labelledby="featured-title">
      <div className="tmk-wrap">
        <p className="tmk-stories-eyebrow">In their own words / Featured excerpt</p>
        <h2 id="featured-title">A Voice on Mentorship</h2>
        <div className="tmk-stories-featured-grid"><figure className="tmk-stories-context-photo"><TmkPhoto name="service" sizes="(max-width: 768px) 90vw, 40vw" /><figcaption>TMK community service photography.</figcaption></figure><TestimonialQuote testimonial={featured} /></div>
      </div>
    </section>

    <section className="tmk-stories-section tmk-stories-collection" aria-labelledby="collection-title">
      <div className="tmk-wrap"><p className="tmk-stories-eyebrow">More voices / Selected excerpts</p><h2 id="collection-title">Words That<br />Stay With Us</h2><div className="tmk-stories-quotes">{collection.map(item => <article className={`tmk-stories-quote-panel tmk-stories-quote-panel--${item.id}`} key={item.id}><TestimonialQuote testimonial={item} /></article>)}</div></div>
    </section>

    <section className="tmk-stories-section tmk-stories-themes" aria-labelledby="themes-title">
      <div className="tmk-wrap"><p className="tmk-stories-eyebrow">Reflections on the words above</p><h2 id="themes-title">What People Remember<br />About TMK</h2><div className="tmk-stories-theme-grid">{themes.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div>
    </section>

    <section className="tmk-stories-section tmk-stories-relationships">
      <div className="tmk-wrap tmk-stories-relationships-grid"><div><p className="tmk-stories-eyebrow">Guidance. Trust. Connection.</p><h2>More Than Programs.<br />Real Relationships.</h2><p className="tmk-stories-lead">For Kevin Mills, it starts with a relationship.</p><p>Mentorship is grounded in consistent relationships with trusted adults. Guidance and encouragement can help young people recognize possibilities and navigate the choices ahead.</p><Link className="tmk-stories-link" to="/about">Meet Kevin &amp; Read His Story →</Link></div><figure><TmkPhoto name="kevin" sizes="(max-width: 640px) 90vw, 35vw" /><figcaption>Kevin Mills / Founder of The Mills Korner</figcaption></figure></div>
    </section>

    <section className="tmk-stories-section tmk-stories-closing">
      <div className="tmk-wrap"><p className="tmk-stories-eyebrow">Meet the people behind the work</p><h2>Get to Know<br />The Mills Korner</h2><div className="tmk-stories-actions"><Link className="tmk-stories-button" to="/about">Meet Kevin &amp; Read His Story <span aria-hidden="true">↗</span></Link><Link className="tmk-stories-link" to="/impact">See TMK's Kommunity Impact →</Link><Link className="tmk-stories-link" to="/opportunity">Explore TMK Opportunities →</Link><Link className="tmk-stories-link" to="/donate">Support TMK Through Giving →</Link></div></div>
    </section>
  </div>
}
