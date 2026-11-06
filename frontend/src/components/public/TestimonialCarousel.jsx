import { Link } from 'react-router-dom'
import useCarousel from '../../hooks/useCarousel.js'
import CarouselControls from './CarouselControls.jsx'
const testimonials = [
  { quote: 'It is never too late to get needed mentorship.', name: 'Chris Hollis' },
  { quote: 'Coach Mills is a real genuine article!', name: 'Arness Ikner' },
  { quote: 'NEVER be afraid of the moment.', name: 'La France Gregory' },
]
export default function TestimonialCarousel() {
  const carousel = useCarousel(testimonials.length, 9000)
  const item = testimonials[carousel.active]
  return <section className="tmk-section tmk-testimonials">
    <div className="tmk-wrap tmk-testimonial-layout">
      <div><p className="tmk-eyebrow">The people. The relationships.</p><h2>Words that<br />stay with us.</h2><Link className="tmk-link" to="/stories">Read More TMK Success Stories →</Link></div>
      <div className="tmk-testimonial-carousel" role="region" aria-label="TMK testimonials" aria-roledescription="carousel" {...carousel.interaction}>
        <div className="tmk-quote" aria-live="off"><span className="tmk-quote-mark" aria-hidden="true">“</span><blockquote><p>{item.quote}</p><footer>— {item.name}</footer></blockquote></div>
        <CarouselControls carousel={carousel} labels={testimonials.map(item => item.name)} name="testimonial" />
      </div>
    </div>
  </section>
}
