import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { impactMetrics } from '../../data/impactMetrics.js'
import { opportunities } from '../../data/opportunities.js'
import HeroCarousel from '../../components/public/HeroCarousel.jsx'
import TestimonialCarousel from '../../components/public/TestimonialCarousel.jsx'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'

const opportunityCtas = ['Explore Academic Success', 'Explore Financial Capability', 'Explore Leadership Development', 'Explore Wellness Support', 'Explore TMK Mentorship']
function GivingPath({ title, description, number }) {
  return <article className="tmk-giving-card"><span className="tmk-eyebrow">{number}</span><h3>{title}</h3><p>{description}</p><Link className="tmk-button" to="/donate">{title} ↗</Link></article>
}
export default function HomePage() {
  const { hash } = useLocation()
  useEffect(() => { if (hash === '#giving') document.getElementById('giving')?.scrollIntoView() }, [hash])
  return <div className="tmk-home">
    <HeroCarousel />
    <section className="tmk-section tmk-founder"><div className="tmk-wrap tmk-split">
      <div className="tmk-portrait"><TmkPhoto name="kevin" /><span>Kevin Mills / Founder</span></div>
      <div><p className="tmk-eyebrow">Founder. Mentor. Educator. Coach.</p><h2>Meet the Heart<br />Behind TMK</h2><p className="tmk-lead">For Kevin Mills, it starts with a relationship.</p><p>As a teacher, coach, and mentor, Kevin has helped young people prepare for adult life. He founded The Mills Korner to connect young people with guidance, encouragement, and opportunities to grow.</p><Link className="tmk-button" to="/about">Meet Kevin &amp; Read His Full Story ↗</Link></div>
    </div></section>
    <section className="tmk-statement"><div className="tmk-wrap"><p className="tmk-eyebrow">The belief behind everything</p><h2>We don't define young people by where they begin. <span>We prepare them for where they can go.</span></h2></div></section>
    <section className="tmk-section"><div className="tmk-wrap"><p className="tmk-eyebrow">Five areas. A world of possibility.</p><h2>Opportunity starts here.</h2><div className="tmk-opportunities">
      {opportunities.map((item, index) => <article className="tmk-opportunity" key={item.id}><span className="tmk-opportunity-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.short_description}</p><Link to={`/opportunity/${item.slug}`}>{opportunityCtas[index]} <span aria-hidden="true">↗</span></Link></article>)}
    </div></div></section>
    <section className="tmk-athletics"><TmkPhoto name="field-action-turn" /><div><p className="tmk-eyebrow">Leadership development / Athletics</p><h2>Leadership Is Built<br />in the Moment</h2><p>Athletics is one pathway to leadership. Through discipline, responsibility, confidence, teamwork, and character, young people practice what it means to lead.</p><Link className="tmk-button" to="/opportunity/leadership-development">See How TMK Builds Young Leaders ↗</Link></div></section>
    <section className="tmk-section tmk-impact"><div className="tmk-wrap"><div className="tmk-impact-intro"><div><p className="tmk-eyebrow">Service that reaches further</p><h2>TMK's<br />Kommunity Impact</h2><Link className="tmk-link" to="/impact">See TMK's Full Kommunity Impact →</Link></div><TmkPhoto name="supplies" /></div><div className="tmk-metrics">{impactMetrics.map(metric => <article key={metric.id}><p className="tmk-metric-value">{metric.prefix}{metric.value.toLocaleString('en-US')}{metric.suffix}</p><h3>{metric.name}</h3>{metric.description && <p>{metric.description}</p>}</article>)}</div></div></section>
    <section className="tmk-section tmk-pillars-section"><div className="tmk-wrap"><p className="tmk-eyebrow">Rooted in purpose</p><h2>What Guides The Mills Korner</h2><div className="tmk-pillars">
      <article><span aria-hidden="true">01 /</span><h3>Mission</h3><p>To establish and provide a solid fundamental foundation for at-risk and disadvantage youth ages 10-22 to close the achievement gap.</p></article>
      <article><span aria-hidden="true">02 /</span><h3>Vision</h3><p>Every young person must have a supportive relationship needed to nurture, grow and develop into thriving and productive adults.</p></article>
      <article><span aria-hidden="true">03 /</span><h3>Values</h3><p>To serve as leaders through the service of empowering others to become the best versions of themselves while the ultimate function is to impart knowledge and motivate through other mentors and shared life experiences.</p><p>Quality mentoring relationships are proven game changers for young people, especially those who are at-risk of falling off track. Mentoring connects a young person to personal, academic, social, and economic support and opportunities. This is known as The Effective Mentoring Process.</p></article>
    </div><Link className="tmk-link" to="/about">See What Guides The Mills Korner →</Link></div></section>
    <TestimonialCarousel />
    <section className="tmk-section tmk-partners"><div className="tmk-wrap"><p className="tmk-eyebrow">A shared commitment</p><h2>Organizations That<br />Have Stood With TMK</h2><div className="tmk-sponsor-logos"><img src="/images/tmk/brand/verizon.webp" alt="Verizon" width="197" height="125" loading="lazy" decoding="async" /><img src="/images/tmk/brand/cbg.webp" alt="CBG — Reimagining Real Estate Development" width="267" height="186" loading="lazy" decoding="async" /></div><Link className="tmk-link" to="/partners">See Who Has Supported TMK →</Link></div></section>
    <section id="giving" className="tmk-section tmk-giving"><div className="tmk-wrap"><p className="tmk-eyebrow">Put your heart into opportunity</p><h2>Invest in a<br />Young Person's Future</h2><div className="tmk-giving-paths"><GivingPath number="01 / Give once" title="Make a One-Time Donation" description="Make a gift in support of TMK's work with young people." /><GivingPath number="02 / Keep showing up" title="Support TMK Every Month" description="Make ongoing support part of your commitment to young people." /></div><Link className="tmk-link" to="/get-involved">Discover More Ways to Support TMK →</Link></div></section>
  </div>
}
