import { Link } from 'react-router-dom'
import { contentConfigs } from '../../components/staff/contentConfig.js'

function StaffContentPage() { return <section className="staff-dashboard"><p className="page-eyebrow">Content</p><h1>Content management</h1><p>Manage the information published across The Mills Korner.</p><div className="staff-card-grid">{Object.entries(contentConfigs).map(([type, config]) => <article key={type}><h2>{config.label}</h2><p>{config.description}</p><Link to={`/staff/content/${type}`}>Manage {config.label.toLowerCase()} →</Link></article>)}</div></section> }
export default StaffContentPage
