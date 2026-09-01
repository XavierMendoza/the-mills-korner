import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth.js'

function StaffLoginPage() {
  const { login, isAuthenticated } = useAuth(); const navigate = useNavigate(); const location = useLocation()
  const [fields, setFields] = useState({ email: '', password: '' }); const [submitting, setSubmitting] = useState(false); const [error, setError] = useState('')
  if (isAuthenticated) return <Navigate to="/staff" replace />
  const submit = async (event) => { event.preventDefault(); setSubmitting(true); setError(''); try { await login(fields.email, fields.password); navigate(location.state?.from?.pathname || '/staff', { replace: true }) } catch (requestError) { setError(requestError.response?.status === 401 ? 'Email or password is incorrect.' : requestError.response?.status === 429 ? 'Too many login attempts. Please wait a moment and try again.' : 'Login is temporarily unavailable. Please try again.') } finally { setSubmitting(false) } }
  return <main className="staff-login"><section><p className="page-eyebrow">TMK Staff</p><h1>Welcome back.</h1><p>Sign in to access the internal workspace.</p><form onSubmit={submit}><label>Email<input required type="email" autoComplete="username" value={fields.email} onChange={(event) => setFields({ ...fields, email: event.target.value })} /></label><label>Password<input required type="password" autoComplete="current-password" value={fields.password} onChange={(event) => setFields({ ...fields, password: event.target.value })} /></label>{error && <p role="alert">{error}</p>}<button className="button button--gold" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button></form></section></main>
}
export default StaffLoginPage
