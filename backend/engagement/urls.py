from django.urls import path

from .views import (
    InquiryCreateView,
    NewsletterSubscribeView,
    StaffInquiryViewSet,
    StaffNewsletterSubscriberViewSet,
)

staff_inquiry_list = StaffInquiryViewSet.as_view({"get": "list"})
staff_inquiry_detail = StaffInquiryViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
    }
)
staff_newsletter_subscriber_list = StaffNewsletterSubscriberViewSet.as_view(
    {"get": "list"}
)
staff_newsletter_subscriber_detail = StaffNewsletterSubscriberViewSet.as_view(
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
    path(
        "newsletter-subscribers/",
        staff_newsletter_subscriber_list,
        name="staff-newsletter-subscriber-list",
    ),
    path(
        "newsletter-subscribers/<int:pk>/",
        staff_newsletter_subscriber_detail,
        name="staff-newsletter-subscriber-detail",
    ),
]
