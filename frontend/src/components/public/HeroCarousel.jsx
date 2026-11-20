import { Link } from 'react-router-dom'
import useCarousel from '../../hooks/useCarousel.js'
import CarouselControls from './CarouselControls.jsx'
import TmkPhoto from './TmkPhoto.jsx'

const slides = [
  { image: 'service', label: 'A heart of service' },
  { image: 'football-field-group', label: 'On the field' },
  { image: 'champions', label: 'Growing stronger together' },
]
export default function HeroCarousel() {
  const carousel = useCarousel(slides.length, 5000)
  return <section className="tmk-hero">
    <div className="tmk-hero-copy">
      <p className="tmk-eyebrow">The Mills Korner · A heart of service</p>
      <h1>Developing Leaders.<br />Expanding Opportunity.<br /><span>Strengthening Communities.</span></h1>
      <p className="tmk-lead">The Mills Korner equips young people ages 10–22 with the relationships, skills, and opportunities they need to build successful futures.</p>
      <div className="tmk-actions"><Link className="tmk-button tmk-hero-primary" to="/about">Meet Kevin &amp; Read His Story <span aria-hidden="true">↗</span></Link><Link className="tmk-button tmk-button--outline" to="/opportunity">See How TMK Supports Young People →</Link><Link className="tmk-link tmk-hero-tertiary" to="/donate">Support TMK Through Giving →</Link></div>
    </div>
    <div className="tmk-hero-carousel" role="region" aria-label="TMK in action" aria-roledescription="carousel" {...carousel.interaction}>
      <div className="tmk-hero-photos">
        {slides.map((slide, index) => <div key={slide.image} className={`tmk-hero-slide${index === carousel.active ? ' is-active' : ''}`} aria-hidden={index !== carousel.active}>
          <TmkPhoto name={slide.image} priority={index === 0} />
        </div>)}
        <p className="tmk-photo-caption" aria-live="off">{slides[carousel.active].label}</p>
      </div>
      <CarouselControls carousel={carousel} name="hero image" />
    </div>
  </section>
}
