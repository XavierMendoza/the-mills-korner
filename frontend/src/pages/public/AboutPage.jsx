import { Link } from 'react-router-dom'

import PageHero from '../../components/public/PageHero.jsx'

function AboutPage() {
  return <>
    <PageHero eyebrow="About The Mills Korner" title="Opportunity changes everything." intro="The Mills Korner creates opportunities for young people to become who they are capable of becoming." />
    <section className="content-section prose-layout">
      <div><p className="page-eyebrow">Why we exist</p><h2>Preparing young people for where they can go.</h2></div>
      <div className="prose"><p>The Mills Korner equips young people ages 10–22 with relationships, skills, and opportunities that help prepare them for successful futures.</p><p>We don&apos;t define young people by where they begin. We prepare them for where they can go.</p></div>
    </section>
    <section className="content-section content-section--tinted"><div className="section-heading"><p className="page-eyebrow">What guides us</p><h2>Relationships. Skills. Opportunity.</h2></div><div className="value-grid">
      <article><h3>Relationships</h3><p>Consistent connection and trusted support help young people move forward.</p></article>
      <article><h3>Skills</h3><p>Practical growth prepares young people to meet greater responsibility with confidence.</p></article>
      <article><h3>Opportunity</h3><p>Visible pathways allow potential to become progress.</p></article>
    </div></section>
    <section className="page-cta"><h2>Help expand what is possible.</h2><div className="button-row"><Link className="button button--primary" to="/opportunity">Explore opportunities</Link><Link className="button button--secondary" to="/get-involved">Get involved</Link></div></section>
  </>
}
export default AboutPage
