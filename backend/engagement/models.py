from django.conf import settings
from django.db import models


class Inquiry(models.Model):
    class InquiryType(models.TextChoices):
        CONTACT = "CONTACT", "Contact"
        MENTOR = "MENTOR", "Mentor"
        VOLUNTEER = "VOLUNTEER", "Volunteer"
        PARTNERSHIP = "PARTNERSHIP", "Partnership"

    class Status(models.TextChoices):
        NEW = "NEW", "New"
        IN_REVIEW = "IN_REVIEW", "In Review"
        CONTACTED = "CONTACTED", "Contacted"
        CLOSED = "CLOSED", "Closed"

    inquiry_type = models.CharField(max_length=20, choices=InquiryType.choices)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    organization = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW,
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_inquiries",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.get_inquiry_type_display()}: {self.email}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-subscribed_at"]

    def __str__(self):
        return self.email
