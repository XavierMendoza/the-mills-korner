from django.contrib import admin

from .models import Inquiry, NewsletterSubscriber


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("email", "inquiry_type", "status", "assigned_to", "created_at")
    list_filter = ("inquiry_type", "status", "created_at")
    search_fields = ("first_name", "last_name", "email", "organization", "message")
    autocomplete_fields = ("assigned_to",)
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "is_active", "subscribed_at", "unsubscribed_at")
    list_filter = ("is_active", "subscribed_at")
    search_fields = ("email",)
    readonly_fields = ("subscribed_at",)
    ordering = ("-subscribed_at",)
