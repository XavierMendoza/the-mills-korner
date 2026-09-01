import { Route, Routes } from 'react-router-dom'

import PublicLayout from '../components/layout/PublicLayout.jsx'
import StaffLayout from '../components/staff/StaffLayout.jsx'
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
import StaffDashboardPage from '../pages/staff/StaffDashboardPage.jsx'
import StaffContentFormPage from '../pages/staff/StaffContentFormPage.jsx'
import StaffContentListPage from '../pages/staff/StaffContentListPage.jsx'
import StaffContentPage from '../pages/staff/StaffContentPage.jsx'
import StaffLoginPage from '../pages/staff/StaffLoginPage.jsx'
import StaffInquiriesPage from '../pages/staff/StaffInquiriesPage.jsx'
import StaffInquiryDetailPage from '../pages/staff/StaffInquiryDetailPage.jsx'
import StaffSubscribersPage from '../pages/staff/StaffSubscribersPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

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
      <Route path="/staff/login" element={<StaffLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffDashboardPage />} />
          <Route path="content" element={<StaffContentPage />} />
          <Route path="content/:type" element={<StaffContentListPage />} />
          <Route path="content/:type/new" element={<StaffContentFormPage />} />
          <Route path="content/:type/:id/edit" element={<StaffContentFormPage />} />
          <Route path="inquiries" element={<StaffInquiriesPage />} />
          <Route path="inquiries/:id" element={<StaffInquiryDetailPage />} />
          <Route path="subscribers" element={<StaffSubscribersPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
