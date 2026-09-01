import { Route, Routes } from 'react-router-dom'

import PublicLayout from '../components/layout/PublicLayout.jsx'
import AboutPage from '../pages/public/AboutPage.jsx'
import ContactPage from '../pages/public/ContactPage.jsx'
import EventDetailPage from '../pages/public/EventDetailPage.jsx'
import EventsListPage from '../pages/public/EventsListPage.jsx'
import HomePage from '../pages/public/HomePage.jsx'
import GetInvolvedPage from '../pages/public/GetInvolvedPage.jsx'
import ImpactPage from '../pages/public/ImpactPage.jsx'
import OpportunityDetailPage from '../pages/public/OpportunityDetailPage.jsx'
import OpportunityListPage from '../pages/public/OpportunityListPage.jsx'
import PartnersPage from '../pages/public/PartnersPage.jsx'
import StoriesListPage from '../pages/public/StoriesListPage.jsx'
import StoryDetailPage from '../pages/public/StoryDetailPage.jsx'
import StaffPlaceholderPage from '../pages/staff/StaffPlaceholderPage.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/opportunity" element={<OpportunityListPage />} />
        <Route path="/opportunity/:slug" element={<OpportunityDetailPage />} />
        <Route path="/stories" element={<StoriesListPage />} />
        <Route path="/stories/:slug" element={<StoryDetailPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/events" element={<EventsListPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="/staff/login" element={<StaffPlaceholderPage login />} />
      <Route path="/staff" element={<StaffPlaceholderPage />} />
    </Routes>
  )
}

export default AppRoutes
