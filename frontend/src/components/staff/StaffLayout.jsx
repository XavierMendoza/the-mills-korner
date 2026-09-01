import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth.js'

function StaffLayout() { const { user, logout } = useAuth(); const name = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email; return <div className="staff-shell"><aside><strong>The Mills Korner</strong><span>Staff workspace</span><nav><NavLink to="/staff" end>Dashboard</NavLink><NavLink to="/staff/content">Content</NavLink><NavLink to="/staff/inquiries">Inquiries</NavLink><NavLink to="/staff/subscribers">Subscribers</NavLink></nav></aside><div className="staff-workspace"><header><div><strong>{name}</strong><span>{user.role}</span></div><button type="button" onClick={logout}>Log out</button></header><main><Outlet /></main></div></div> }
export default StaffLayout
