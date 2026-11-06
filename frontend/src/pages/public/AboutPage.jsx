import { Link } from 'react-router-dom'
import TmkPhoto from '../../components/public/TmkPhoto.jsx'
import '../../styles/tmk-about.css'

const learningStanzas = [
  'ALL I WANT TO DO IS ...\nLIVE A LIFE WORTH WHILE;\nEVEN, IF AT THE END IT MEANS\nI HAVE NOTHING.',
  'AS LONG AS I CAN SAY\nAT THE END OF ANY\nPARTICULAR YEAR OR DAY\nI DID IT MY WAY ...',
  'ALL I WANT TO DO IS ...\nHELP GUIDE MY CHILDREN AND OTHERS\nTHROUGH THE HUNGRY YEARS ...',
  "SO MUCH IS MADE OF COLOR\nWITHOUT REGARD TO WHAT IS INSIDE;\nWHEN WHAT'S REALLY IMPORTANT IS\nHUMAN LIFE!",
]
const experience = [
  ['Educator', 'Kevin puts the welfare of his students first. His approach brings care, encouragement, and an understanding of the challenges young people face.'],
  ['Coach', 'He helps students and athletes work through obstacles, connecting guidance with the responsibility to keep growing.'],
  ['Mentor', 'Shared life experiences shape how he connects. His aim is to pass on knowledge and motivate others toward excellence.'],
]

export default function AboutPage() {
  return <div className="tmk-about">
    <section className="tmk-about-hero" aria-labelledby="kevin-title">
      <div className="tmk-wrap tmk-about-hero-grid">
        <div className="tmk-about-hero-copy">
          <p className="tmk-about-eyebrow">The person behind The Mills Korner</p>
          <h1 id="kevin-title">Meet<br /><span>Kevin Mills</span></h1>
          <p className="tmk-about-role">Founder. Mentor. Educator. Coach.</p>
          <p className="tmk-about-lead">For Kevin Mills, it starts with a relationship.</p>
          <a className="tmk-about-button" href="#kevins-story">Read Kevin's Story <span aria-hidden="true">↓</span></a>
        </div>
        <figure className="tmk-about-portrait">
          <TmkPhoto name="kevin" priority sizes="(max-width: 768px) 90vw, 40vw" />
          <figcaption>Kevin Mills / Founder of The Mills Korner</figcaption>
        </figure>
      </div>
    </section>

    <section id="kevins-story" className="tmk-about-section">
      <div className="tmk-wrap tmk-about-editorial">
        <div><p className="tmk-about-eyebrow">01 / A personal commitment</p><h2>He sees something<br />of himself.</h2></div>
        <div className="tmk-about-prose">
          <p className="tmk-about-lead">Kevin's commitment to young people comes from his own lived experience.</p>
          <p>He recognizes something of himself in the children he teaches and coaches. That personal connection shapes the way he listens, guides, and helps them overcome obstacles.</p>
          <p>As a teacher, coach, and mentor, he brings a caring, nurturing approach to the work. Relationships give that guidance meaning: a young person knows the adult beside them understands.</p>
        </div>
      </div>
    </section>

    <section className="tmk-about-belief" aria-label="Kevin's belief">
      <div className="tmk-wrap">
        <p className="tmk-about-eyebrow">The belief at the heart of his work</p>
        <figure><blockquote>All children can achieve when given <span>hope and opportunity.</span></blockquote><figcaption>— Kevin Mills</figcaption></figure>
      </div>
    </section>

    <section className="tmk-about-section tmk-about-experience">
      <div className="tmk-wrap">
        <p className="tmk-about-eyebrow">02 / Experience with purpose</p>
        <h2>Different roles.<br />The same commitment.</h2>
        <div className="tmk-about-experience-grid">{experience.map(([title, text], index) => <article key={title}><span className="tmk-about-number" aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="tmk-about-education"><h3>A foundation in learning</h3><p>Kevin holds three master's degrees:</p><ul><li>MBA in Business</li><li>MA in Human Development</li><li>MS in Coaching and Athletic Administration</li></ul></div>
      </div>
    </section>

    <section className="tmk-about-section tmk-about-purpose">
      <div className="tmk-wrap tmk-about-editorial">
        <div><p className="tmk-about-eyebrow">03 / Why The Mills Korner exists</p><h2>Turn a relationship<br />into opportunity.</h2></div>
        <div className="tmk-about-prose"><p className="tmk-about-lead">The Mills Korner carries Kevin's commitment beyond one classroom, one team, or one conversation.</p><p>It connects young people with trusted adults and support as they navigate school, life, work, and personal growth. Guidance becomes practical through academic preparation, financial capability, leadership development, wellness, and mentorship.</p><p>At the center is a supportive relationship: someone who encourages a young person, shares experience, and helps them see the possibilities ahead.</p><Link className="tmk-about-link" to="/opportunity">See How TMK Supports Young People →</Link></div>
      </div>
    </section>

    <section className="tmk-about-section tmk-about-learning" aria-labelledby="learning-title">
      <div className="tmk-wrap">
        <p className="tmk-about-eyebrow">04 / A learning statement · Selected excerpt</p>
        <h2 id="learning-title">All I Want To Do</h2>
        <blockquote className="tmk-about-stanzas">{learningStanzas.map((stanza, index) => <p key={stanza}><span className="tmk-about-stanza-number" aria-hidden="true">0{index + 1} /</span>{stanza}</p>)}</blockquote>
        <p className="tmk-about-learning-credit">From Kevin Mills' legacy learning statement</p>
      </div>
    </section>

    <section className="tmk-about-athletics">
      <TmkPhoto name="huddle" />
      <div className="tmk-about-feature-copy"><p className="tmk-about-eyebrow">05 / Athletics as a pathway</p><h2>Coaching Beyond<br />the Game</h2><p>The huddle is one place to practice leadership. Discipline, character, teamwork, and responsibility carry into life beyond the field.</p><p>Within TMK's Leadership Development area, athletics offers a setting for mentorship and growth. It is one part of a wider commitment to the young person.</p><Link className="tmk-about-button" to="/opportunity/leadership-development">See How TMK Builds Young Leaders <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="tmk-about-section">
      <div className="tmk-wrap tmk-about-service">
        <figure><TmkPhoto name="service" sizes="(max-width: 768px) 90vw, 45vw" /><figcaption>Service and support in the TMK community.</figcaption></figure>
        <div><p className="tmk-about-eyebrow">06 / A heart of service</p><h2>Show up for<br />the whole community.</h2><p>TMK's work reaches beyond athletics. Service, practical help, and support for families are part of the same commitment to young people's futures.</p><p>Mentors and community support help create the relationships and opportunities that young people need to move forward.</p><Link className="tmk-about-link" to="/impact">See TMK's Kommunity Impact →</Link></div>
      </div>
    </section>

    <section className="tmk-about-section tmk-about-closing">
      <div className="tmk-wrap"><p className="tmk-about-eyebrow">Be part of what comes next</p><h2>Help opportunity<br />reach further.</h2><div className="tmk-about-actions"><Link className="tmk-about-button" to="/opportunity">See How TMK Supports Young People <span aria-hidden="true">↗</span></Link><Link className="tmk-about-link" to="/stories">Read TMK Success Stories →</Link><Link className="tmk-about-link" to="/#giving">Support TMK Through Giving →</Link></div></div>
    </section>
  </div>
}
