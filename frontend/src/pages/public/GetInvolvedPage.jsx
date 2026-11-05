import DemoPhoto from '../../components/public/DemoPhoto.jsx'
import DonateLink from '../../components/public/DonateLink.jsx'
import InquiryForm from '../../components/public/InquiryForm.jsx'
import PageHero from '../../components/public/PageHero.jsx'

const types = [{ value: 'MENTOR', label: 'Mentor' }, { value: 'VOLUNTEER', label: 'Volunteer' }, { value: 'PARTNERSHIP', label: 'Partnership' }]

function GetInvolvedPage() {
  return <><PageHero image="mentorship" variant="wide" eyebrow="Get involved" title="Invest in Opportunity." intro="Mentors, volunteers, and partners help create the relationships, skills, and opportunities young people need to build successful futures." /><section className="content-section"><div className="section-heading"><p className="page-eyebrow">Get involved</p><h2>Find your place in the work.</h2></div><div className="pathway-grid">
      <article className="pathway-card"><DemoPhoto image="mentorship" sizes="(max-width: 880px) 100vw, 33vw" /><div><p className="page-eyebrow">Relationships</p><h2>Mentor</h2><p>Connecting every young person with trusted adults.</p><a className="button button--light" href="#participate">Become a Mentor</a></div></article>
      <article className="pathway-card"><DemoPhoto image="teamwork" sizes="(max-width: 880px) 100vw, 33vw" /><div><p className="page-eyebrow">Community</p><h2>Partner</h2><p>Shared work. Greater reach.</p><a className="button button--light" href="#participate">Partner With Us</a></div></article>
      <article className="pathway-card"><DemoPhoto image="study" sizes="(max-width: 880px) 100vw, 33vw" /><div><p className="page-eyebrow">Opportunity</p><h2>Invest in a Future</h2><p>Help young people build successful futures.</p><DonateLink className="button button--gold" /></div></article>
    </div></section><section className="content-section content-section--tinted"><div className="section-heading"><p className="page-eyebrow">What support makes possible</p><h2>Help opportunity reach further.</h2></div><div className="value-grid"><article><h3>Trusted support</h3><p>Mentors and tutors can help young people navigate challenges and prepare for what comes next.</p></article><article><h3>Practical growth</h3><p>Financial education, leadership, and college readiness can strengthen confidence and capability.</p></article><article><h3>Well-being</h3><p>Support for mental wellness can help young people build resilience as they move forward.</p></article></div></section><section className="form-section" id="participate"><div className="form-intro"><p className="page-eyebrow">Participate</p><h2>Find your place in the work.</h2><p>Choose Mentor, Volunteer, or Partnership and tell us a little about yourself. Fields marked with an asterisk are required.</p></div><InquiryForm typeOptions={types} /></section></>
}
export default GetInvolvedPage
