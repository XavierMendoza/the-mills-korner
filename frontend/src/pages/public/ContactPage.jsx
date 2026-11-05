import InquiryForm from '../../components/public/InquiryForm.jsx'
import PageHero from '../../components/public/PageHero.jsx'

function ContactPage() {
  return <><PageHero eyebrow="Contact" title="Start a conversation." intro="Have a question or an idea to share? Send a note and the right person can follow up." /><section className="form-section"><div className="form-intro"><p className="page-eyebrow">Reach out</p><h2>Tell us what’s on your mind.</h2><p>Fields marked with an asterisk are required.</p></div><InquiryForm fixedType="CONTACT" /></section></>
}
export default ContactPage
