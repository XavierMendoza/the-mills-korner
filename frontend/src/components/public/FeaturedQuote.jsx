import DemoPhoto from './DemoPhoto.jsx'

function FeaturedQuote() {
  return <section className="featured-quote" aria-label="Our philosophy">
    <DemoPhoto image="community" decorative />
    <div><p className="page-eyebrow">Our philosophy</p><blockquote>We don&apos;t define young people by where they begin.<br /><strong>We prepare them for where they can go.</strong></blockquote></div>
  </section>
}
export default FeaturedQuote
