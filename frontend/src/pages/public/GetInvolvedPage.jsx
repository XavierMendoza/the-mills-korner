import InquiryForm from '../../components/public/InquiryForm.jsx'
import PageHero from '../../components/public/PageHero.jsx'

const types = [{ value: 'MENTOR', label: 'Mentor' }, { value: 'VOLUNTEER', label: 'Volunteer' }, { value: 'PARTNERSHIP', label: 'Partnership' }]

function GetInvolvedPage() {
  return <><PageHero eyebrow="Get involved" title="Invest in Opportunity." intro="Mentors, volunteers, and partners help create the relationships, skills, and opportunities young people need to build successful futures." /><section className="content-section content-section--tinted"><div className="section-heading"><p className="page-eyebrow">What support makes possible</p><h2>Help opportunity reach further.</h2></div><div className="value-grid"><article><h3>Trusted support</h3><p>Mentors and tutors can help young people navigate challenges and prepare for what comes next.</p></article><article><h3>Practical growth</h3><p>Financial education, leadership, and college readiness can strengthen confidence and capability.</p></article><article><h3>Well-being</h3><p>Support for mental wellness can help young people build resilience as they move forward.</p></article></div></section><section className="form-section"><div className="form-intro"><p className="page-eyebrow">Participate</p><h2>Find your place in the work.</h2><p>Choose Mentor, Volunteer, or Partnership and tell us a little about yourself. Fields marked with an asterisk are required.</p></div><InquiryForm typeOptions={types} successMessage="Thank you for stepping forward. Your message has been received." /></section></>
}
export default GetInvolvedPage
