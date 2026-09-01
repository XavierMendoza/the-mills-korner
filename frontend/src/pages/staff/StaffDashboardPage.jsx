import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth.js'

function StaffDashboardPage() { const { user } = useAuth(); return <section className="staff-dashboard"><p className="page-eyebrow">Dashboard</p><h1>Welcome to the TMK workspace.</h1><p>Signed in with the {user.role} role. This internal space brings content and community operations together.</p><div className="staff-card-grid"><article><h2>Content management</h2><p>Manage public content.</p><Link to="/staff/content">Open content →</Link></article><article><h2>Inquiries</h2><p>Review community inquiries.</p><Link to="/staff/inquiries">Open inquiries →</Link></article><article><h2>Newsletter subscribers</h2><p>Manage subscription status.</p><Link to="/staff/subscribers">Open subscribers →</Link></article></div></section> }
export default StaffDashboardPage
