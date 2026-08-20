from django.contrib import admin

from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "start_datetime",
        "end_datetime",
        "location_name",
        "is_featured",
        "is_published",
    )
    list_filter = ("is_featured", "is_published", "start_datetime")
    search_fields = ("title", "summary", "description", "location_name", "address")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("created_by", "updated_by")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("start_datetime", "title")
