import { Route, Routes } from 'react-router-dom'

import PublicLayout from '../components/layout/PublicLayout.jsx'
import HomePage from '../pages/public/HomePage.jsx'
import PublicPlaceholderPage from '../pages/public/PublicPlaceholderPage.jsx'
import StaffPlaceholderPage from '../pages/staff/StaffPlaceholderPage.jsx'

const publicRoutes = [
  ['/about', 'About', 'Learn about our mission and community.'],
  ['/impact', 'Our Impact', 'See the difference our community is making.'],
  ['/opportunity', 'Opportunity Areas', 'Explore the areas where we serve and invest.'],
  ['/opportunity/:slug', 'Opportunity Area', 'Opportunity details will appear here.'],
  ['/stories', 'Stories', 'Meet the people and stories behind the impact.'],
  ['/stories/:slug', 'Community Story', 'Story details will appear here.'],
  ['/partners', 'Partners', 'Discover the organizations working alongside us.'],
  ['/events', 'Events', 'Find upcoming ways to connect with the community.'],
  ['/events/:slug', 'Event', 'Event details will appear here.'],
  ['/get-involved', 'Get Involved', 'Find a meaningful way to participate.'],
  ['/contact', 'Contact', 'Connect with The Mills Korner team.'],
]

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        {publicRoutes.map(([path, title, description]) => (
          <Route
            key={path}
            path={path}
            element={<PublicPlaceholderPage title={title} description={description} />}
          />
        ))}
      </Route>
      <Route path="/staff/login" element={<StaffPlaceholderPage login />} />
      <Route path="/staff" element={<StaffPlaceholderPage />} />
    </Routes>
  )
}

export default AppRoutes
