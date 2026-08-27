import { Link } from 'react-router-dom'

import PageHero from '../../components/public/PageHero.jsx'

function AboutPage() {
  return <>
    <PageHero eyebrow="About The Mills Korner" title="A central place for possibility." intro="We bring opportunity, community, and connection into one shared space—so people can find meaningful paths forward." />
    <section className="content-section prose-layout">
      <div><p className="page-eyebrow">Why we exist</p><h2>Potential grows when access meets belonging.</h2></div>
      <div className="prose"><p>The Mills Korner exists to make opportunity easier to find and community easier to enter. We believe people thrive when pathways are visible, relationships are strong, and participation feels possible.</p><p>Our role is to help create that point of connection: a place where people, ideas, and resources can move toward shared progress.</p></div>
    </section>
    <section className="content-section content-section--tinted"><div className="section-heading"><p className="page-eyebrow">What guides us</p><h2>Community-centered by design.</h2></div><div className="value-grid">
      <article><h3>Access</h3><p>Opportunity should be clear, welcoming, and within reach.</p></article>
      <article><h3>Connection</h3><p>Durable progress is built through relationships and shared effort.</p></article>
      <article><h3>Growth</h3><p>Every person and community holds capacity worth investing in.</p></article>
    </div></section>
    <section className="page-cta"><h2>Find your next point of connection.</h2><div className="button-row"><Link className="button button--primary" to="/opportunity">Explore opportunities</Link><Link className="button button--secondary" to="/get-involved">Get involved</Link></div></section>
  </>
}
export default AboutPage
