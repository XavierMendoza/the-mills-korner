from django.contrib import admin

from .models import OpportunityArea, Partner, Story


@admin.register(OpportunityArea)
class OpportunityAreaAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_published",
        "display_order",
        "created_at",
        "updated_at",
    )
    list_filter = ("is_published",)
    search_fields = ("title", "short_description", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("display_order", "title")


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "person_name",
        "is_featured",
        "is_published",
        "published_at",
        "created_at",
    )
    list_filter = ("is_featured", "is_published", "published_at")
    search_fields = ("title", "person_name", "summary", "transformation_story")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("created_by", "updated_by")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "partner_type",
        "is_featured",
        "is_published",
        "display_order",
    )
    list_filter = ("partner_type", "is_featured", "is_published")
    search_fields = ("name", "description")
    ordering = ("display_order", "name")
