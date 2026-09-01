import { useState } from 'react'
import { subscribeNewsletter } from '../../api/engagement.js'
import { publicFormError } from '../../utils/apiErrors.js'

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ submitting: false, success: '', error: '' })
  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ submitting: true, success: '', error: '' })
    try {
      await subscribeNewsletter(email)
      setEmail('')
      setStatus({ submitting: false, success: 'You’re subscribed.', error: '' })
    } catch (error) {
      setStatus({ submitting: false, success: '', error: publicFormError(error) })
    }
  }
  return <div className="newsletter"><h2>Stay connected</h2><form onSubmit={handleSubmit}><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" disabled={status.submitting}>{status.submitting ? 'Joining…' : 'Join'}</button></div></form>{status.success && <p role="status">{status.success}</p>}{status.error && <p role="alert">{status.error}</p>}</div>
}
export default NewsletterSignup
