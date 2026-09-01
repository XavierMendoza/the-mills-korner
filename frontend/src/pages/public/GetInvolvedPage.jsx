import InquiryForm from '../../components/public/InquiryForm.jsx'
import PageHero from '../../components/public/PageHero.jsx'

const types = [{ value: 'MENTOR', label: 'Mentor' }, { value: 'VOLUNTEER', label: 'Volunteer' }, { value: 'PARTNERSHIP', label: 'Partnership' }]

function GetInvolvedPage() {
  return <><PageHero eyebrow="Get involved" title="Bring what you have. Build what comes next." intro="Choose a path that fits how you want to contribute, then tell us a little about yourself." /><section className="form-section"><div className="form-intro"><p className="page-eyebrow">Participate</p><h2>Find your place in the work.</h2><p>Fields marked with an asterisk are required.</p></div><InquiryForm typeOptions={types} successMessage="Thank you for stepping forward. Your message has been received." /></section></>
}
export default GetInvolvedPage
