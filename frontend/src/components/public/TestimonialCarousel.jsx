import { Link } from 'react-router-dom'
import useCarousel from '../../hooks/useCarousel.js'
import CarouselControls from './CarouselControls.jsx'
import { testimonials } from '../../data/testimonials.js'

export default function TestimonialCarousel() {
  const carousel = useCarousel(testimonials.length, 9000)
  const item = testimonials[carousel.active]
  return <section className="tmk-section tmk-testimonials">
    <div className="tmk-wrap tmk-testimonial-layout">
      <div><p className="tmk-eyebrow">The people. The relationships.</p><h2>Words that<br />stay with us.</h2><Link className="tmk-link" to="/stories">Read More TMK Success Stories →</Link></div>
      <div className="tmk-testimonial-carousel" role="region" aria-label="TMK testimonials" aria-roledescription="carousel" {...carousel.interaction}>
        <div className="tmk-quote" aria-live="off"><span className="tmk-quote-mark" aria-hidden="true">“</span><blockquote><p>{item.excerpt}</p><footer>— {item.name}</footer></blockquote></div>
        <CarouselControls carousel={carousel} name="testimonial" />
      </div>
    </div>
  </section>
}
