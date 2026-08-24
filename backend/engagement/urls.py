from django.urls import path

from .views import InquiryCreateView, NewsletterSubscribeView

urlpatterns = [
    path("inquiries/", InquiryCreateView.as_view(), name="inquiry-create"),
    path(
        "newsletter/subscribe/",
        NewsletterSubscribeView.as_view(),
        name="newsletter-subscribe",
    ),
]
