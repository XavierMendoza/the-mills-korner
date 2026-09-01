import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.js'

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()
  const location = useLocation()
  if (loading) return <main className="auth-loading" role="status">Loading staff workspace…</main>
  if (!isAuthenticated) return <Navigate to="/staff/login" replace state={{ from: location }} />
  return <Outlet />
}
export default ProtectedRoute
