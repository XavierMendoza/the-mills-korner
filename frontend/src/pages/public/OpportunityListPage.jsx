import { Link } from 'react-router-dom'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import { opportunities } from '../../data/opportunities.js'
import '../../styles/tmk-opportunities.css'

const areaLinks = {
  'academic-success': 'Explore Academic Success',
  'financial-capability': 'Explore Financial Capability',
  'leadership-development': 'Explore Leadership Development',
  wellness: 'Explore Wellness Support',
  mentorship: 'Explore TMK Mentorship',
}

export default function OpportunityListPage() {
  return <div className="tmk-opportunities-page">
    <section className="tmk-op-hero" aria-labelledby="opportunity-title">
      <div className="tmk-wrap">
        <div className="tmk-op-hero-heading">
          <div><p className="tmk-op-eyebrow">The Mills Korner / Opportunity areas</p><h1 id="opportunity-title">Creating Opportunity<br />That Moves<br /><span>Young People Forward</span></h1></div>
          <div className="tmk-op-hero-intro"><p className="tmk-op-lead">TMK creates pathways that help young people build the relationships, skills, and confidence needed for successful futures.</p><a className="tmk-op-link" href="#opportunity-areas">Find Your TMK Opportunity <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="tmk-op-hero-photos">
          <TmkPhoto name="service" priority sizes="(max-width: 640px) 90vw, 60vw" />
          <img src="/images/tmk/tmk-youth-group-bench-2-web.webp" width="1500" height="2000" alt="Three young people sitting together on an outdoor bench" loading="lazy" decoding="async" sizes="(max-width: 640px) 90vw, 35vw" />
        </div>
        <p className="tmk-op-photo-note">Relationships. Skills. Opportunity.</p>
      </div>
    </section>

    <section id="opportunity-areas" className="tmk-op-section" aria-labelledby="areas-title">
      <div className="tmk-wrap">
        <p className="tmk-op-eyebrow">Five areas of opportunity</p>
        <h2 id="areas-title">Different paths.<br />Room to grow.</h2>
        <div className="tmk-op-areas">
          {opportunities.map((item, index) => <article className={`tmk-op-area tmk-op-area--${item.slug}`} key={item.id}>
            <div className="tmk-op-area-copy"><span className="tmk-op-number" aria-hidden="true">0{index + 1} /</span><h3>{item.title}</h3><p className="tmk-op-area-short">{item.short_description}</p><p className="tmk-op-area-description">{item.description}</p><Link className="tmk-op-area-link" to={`/opportunity/${item.slug}`}>{areaLinks[item.slug]} <span aria-hidden="true">↗</span></Link></div>
            {item.slug === 'leadership-development' && <TmkPhoto name="champions" sizes="(max-width: 768px) 90vw, 50vw" />}
          </article>)}
        </div>
      </div>
    </section>

    <section className="tmk-op-section tmk-op-connected" aria-labelledby="connected-title">
      <div className="tmk-wrap">
        <div className="tmk-op-connected-heading"><div><p className="tmk-op-eyebrow">The whole young person</p><h2 id="connected-title">Support That<br />Works Together</h2></div><p className="tmk-op-lead">Academics, financial readiness, leadership, wellness, and mentorship connect. Relationships, skills, and opportunities help young people prepare for what comes next.</p></div>
        <ul className="tmk-op-connections">{opportunities.map((item, index) => <li key={item.id}><span aria-hidden="true">0{index + 1}</span>{item.title}</li>)}</ul>
      </div>
    </section>

    <section className="tmk-op-athletics">
      <TmkPhoto name="huddle" />
      <div className="tmk-op-feature-copy"><p className="tmk-op-eyebrow">A pathway within Leadership Development</p><h2>Leadership Is Built<br />in the Moment</h2><p className="tmk-op-lead">Athletics is one setting where young people practice the qualities of leadership.</p><p>Discipline. Responsibility. Teamwork. Confidence. Character.</p><Link className="tmk-op-button" to="/opportunity/leadership-development">Explore Leadership Development <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="tmk-op-section tmk-op-mentorship">
      <div className="tmk-wrap tmk-op-mentorship-grid">
        <div><p className="tmk-op-eyebrow">Trust. Consistency. Connection.</p><h2>Relationships Change What Young People Believe Is Possible</h2><p className="tmk-op-lead">For Kevin Mills, it starts with a relationship.</p><p>Consistent connection and trusted support help young people move forward. Guidance and encouragement can help young people recognize possibilities and navigate the choices ahead.</p><Link className="tmk-op-button" to="/opportunity/mentorship">Explore TMK Mentorship <span aria-hidden="true">↗</span></Link></div>
        <figure><TmkPhoto name="kevin" sizes="(max-width: 640px) 90vw, 35vw" /><figcaption>Kevin Mills / Founder. Mentor. Educator. Coach.</figcaption></figure>
      </div>
    </section>

    <section className="tmk-op-section tmk-op-closing">
      <div className="tmk-wrap"><p className="tmk-op-eyebrow">Help opportunity reach further</p><h2>Find your place<br />in the work.</h2><div className="tmk-op-actions"><Link className="tmk-op-button" to="/get-involved">Become a TMK Mentor <span aria-hidden="true">↗</span></Link><Link className="tmk-op-link" to="/impact">See TMK's Kommunity Impact →</Link><Link className="tmk-op-link" to="/stories">Read TMK Success Stories →</Link></div></div>
    </section>
  </div>
}
