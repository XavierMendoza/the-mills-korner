from django.urls import path

from .views import InquiryCreateView, NewsletterSubscribeView, StaffInquiryViewSet

staff_inquiry_list = StaffInquiryViewSet.as_view({"get": "list"})
staff_inquiry_detail = StaffInquiryViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
    }
)

urlpatterns = [
    path("inquiries/", InquiryCreateView.as_view(), name="inquiry-create"),
    path(
        "newsletter/subscribe/",
        NewsletterSubscribeView.as_view(),
        name="newsletter-subscribe",
    ),
]

staff_urlpatterns = [
    path("inquiries/", staff_inquiry_list, name="staff-inquiry-list"),
    path("inquiries/<int:pk>/", staff_inquiry_detail, name="staff-inquiry-detail"),
]
