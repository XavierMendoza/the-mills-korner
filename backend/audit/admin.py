from django.contrib import admin

from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "user",
        "action",
        "resource_type",
        "resource_name",
        "ip_address",
    )
    list_filter = ("action", "resource_type", "created_at")
    search_fields = (
        "user__email",
        "resource_type",
        "resource_id",
        "resource_name",
        "ip_address",
    )
    ordering = ("-created_at",)
    readonly_fields = (
        "user",
        "action",
        "resource_type",
        "resource_id",
        "resource_name",
        "old_values",
        "new_values",
        "ip_address",
        "created_at",
    )

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
