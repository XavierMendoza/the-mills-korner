from django.contrib import admin

from .models import ImpactMetric


@admin.register(ImpactMetric)
class ImpactMetricAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "value",
        "prefix",
        "suffix",
        "is_featured",
        "is_published",
        "display_order",
    )
    list_filter = ("is_featured", "is_published")
    search_fields = ("name", "description")
    ordering = ("display_order", "name")
    readonly_fields = ("created_at", "updated_at")
