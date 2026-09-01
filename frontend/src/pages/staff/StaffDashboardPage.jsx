import { useAuth } from '../../auth/useAuth.js'

function StaffDashboardPage() { const { user } = useAuth(); return <section className="staff-dashboard"><p className="page-eyebrow">Dashboard</p><h1>Welcome to the TMK workspace.</h1><p>Signed in with the {user.role} role. This internal space will bring content and community operations together.</p><div className="staff-card-grid"><article><h2>Content management</h2><p>Public content tools will appear here.</p></article><article><h2>Inquiries</h2><p>Community inquiry tools will appear here.</p></article><article><h2>Newsletter subscribers</h2><p>Subscriber tools will appear here.</p></article></div></section> }
export default StaffDashboardPage
