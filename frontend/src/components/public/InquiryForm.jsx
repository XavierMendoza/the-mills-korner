import { useState } from 'react'

const emptyFields = { first_name: '', last_name: '', email: '', phone: '', organization: '', message: '' }

function InquiryForm({ fixedType, typeOptions = [] }) {
  const [fields, setFields] = useState(emptyFields)
  const [inquiryType, setInquiryType] = useState(fixedType || typeOptions[0]?.value || '')
  const [notice, setNotice] = useState('')

  const updateField = ({ target }) => setFields((current) => ({ ...current, [target.name]: target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setNotice('Online messages are temporarily unavailable. Your message has not been sent.')
  }

  return <form className="engagement-form" onSubmit={handleSubmit}>
    {!fixedType && <fieldset><legend>How would you like to get involved? <span aria-hidden="true">*</span></legend><div className="choice-grid">{typeOptions.map((option) => <label key={option.value}><input type="radio" name="inquiry_type" value={option.value} checked={inquiryType === option.value} onChange={() => setInquiryType(option.value)} /> <span>{option.label}</span></label>)}</div></fieldset>}
    <div className="form-grid">
      <label>First name <span aria-hidden="true">*</span><input required name="first_name" value={fields.first_name} onChange={updateField} /></label>
      <label>Last name <span aria-hidden="true">*</span><input required name="last_name" value={fields.last_name} onChange={updateField} /></label>
      <label>Email <span aria-hidden="true">*</span><input required type="email" name="email" value={fields.email} onChange={updateField} /></label>
      <label>Phone <span className="optional">Optional</span><input type="tel" name="phone" value={fields.phone} onChange={updateField} /></label>
      <label className="form-grid__wide">Organization <span className="optional">Optional</span><input name="organization" value={fields.organization} onChange={updateField} /></label>
      <label className="form-grid__wide">Message <span aria-hidden="true">*</span><textarea required name="message" rows="7" value={fields.message} onChange={updateField} /></label>
    </div>
    <p className="form-message" role="status">{notice}</p>
    <button className="button button--primary" type="submit">Send message</button>
  </form>
}

export default InquiryForm
