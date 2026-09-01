import { useState } from 'react'

import { submitInquiry } from '../../api/engagement.js'
import { publicFormError } from '../../utils/apiErrors.js'

const emptyFields = { first_name: '', last_name: '', email: '', phone: '', organization: '', message: '' }

function InquiryForm({ fixedType, typeOptions = [], successMessage }) {
  const [fields, setFields] = useState(emptyFields)
  const [inquiryType, setInquiryType] = useState(fixedType || typeOptions[0]?.value || '')
  const [status, setStatus] = useState({ submitting: false, success: '', error: '' })

  const updateField = ({ target }) => setFields((current) => ({ ...current, [target.name]: target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ submitting: true, success: '', error: '' })
    try {
      await submitInquiry({ inquiry_type: fixedType || inquiryType, ...fields })
      setFields(emptyFields)
      if (!fixedType) setInquiryType(typeOptions[0].value)
      setStatus({ submitting: false, success: successMessage, error: '' })
    } catch (error) {
      setStatus({ submitting: false, success: '', error: publicFormError(error) })
    }
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
    {status.success && <p className="form-message form-message--success" role="status">{status.success}</p>}
    {status.error && <p className="form-message form-message--error" role="alert">{status.error}</p>}
    <button className="button button--primary" type="submit" disabled={status.submitting}>{status.submitting ? 'Sending…' : 'Send message'}</button>
  </form>
}

export default InquiryForm
