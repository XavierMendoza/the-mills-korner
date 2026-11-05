import { useState } from 'react'

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [notice, setNotice] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    setNotice('Newsletter signup is temporarily unavailable. Your email has not been subscribed.')
  }
  return <div className="newsletter"><h2>Stay connected</h2><form onSubmit={handleSubmit}><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit">Join</button></div></form><p role="status">{notice}</p></div>
}
export default NewsletterSignup
