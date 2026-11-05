import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DemoPhoto from './DemoPhoto.jsx'
import DonateLink from './DonateLink.jsx'

const slides = [
  { image: 'mentorship', label: 'Mentorship & connection' },
  { image: 'study', label: 'Academic preparation' },
  { image: 'teamwork', label: 'Leadership & community' },
]
const autoplayDelay = 5000

function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [timerReset, setTimerReset] = useState(0)
  const paused = hovered || focused || reducedMotion

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slides.length)
    }, autoplayDelay)
    return () => window.clearTimeout(timer)
  }, [active, paused, timerReset])

  const selectSlide = (next) => {
    setActive(next)
    // Restart even when the user selects the already-active indicator.
    setTimerReset((current) => current + 1)
  }
  const change = (direction) => selectSlide((current) => (current + direction + slides.length) % slides.length)
  return <section className="hero-carousel" aria-label="TMK opportunity themes" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
    }}
  >
    <div className="hero-carousel__photos" aria-hidden="true">
      {slides.map((slide, index) => <div className={`hero-carousel__slide${index === active ? ' is-active' : ''}`} key={slide.image}>
        <DemoPhoto image={slide.image} decorative priority={index === 0} />
      </div>)}
    </div>
    <div className="hero-carousel__content">
      <p className="page-eyebrow">The Mills Korner</p>
      <h1>Developing Leaders.<br />Expanding Opportunity.<br />Strengthening Communities.</h1>
      <p className="hero-carousel__lead">The Mills Korner equips young people ages 10–22 with the relationships, skills, and opportunities they need to build successful futures.</p>
      <div className="button-row">
        <Link className="button button--gold" to="/get-involved">Become a Mentor</Link>
        <Link className="button button--light" to="/get-involved">Partner With Us</Link>
        <DonateLink className="button button--light" label="Invest in a Future" />
      </div>
    </div>
    <div className="hero-carousel__bottom">
      <p className="hero-carousel__theme" aria-live={paused ? 'polite' : 'off'} aria-atomic="true"><span>0{active + 1} / 03</span>{slides[active].label}</p>
      <div className="carousel-controls" role="group" aria-label="Choose hero image" onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          change(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}>
        <button type="button" onClick={() => change(-1)} aria-label="Previous hero image">←</button>
        {slides.map((slide, index) => <button className="carousel-dot" type="button" key={slide.image} aria-label={`Show slide ${index + 1}: ${slide.label}`} aria-pressed={index === active} onClick={() => selectSlide(index)}><span /></button>)}
        <button type="button" onClick={() => change(1)} aria-label="Next hero image">→</button>
      </div>
    </div>
    <p className="hero-carousel__disclosure">Representative photography</p>
  </section>
}
export default HeroCarousel
