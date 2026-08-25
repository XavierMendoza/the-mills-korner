from rest_framework.permissions import BasePermission

from .models import User


class IsSuperAdmin(BasePermission):
    message = "Super administrator access is required."

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(
            user
            and user.is_authenticated
            and user.role == User.Role.SUPER_ADMIN
        )


class IsContentManagerOrSuperAdmin(BasePermission):
    message = "Content manager access is required."

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(
            user
            and user.is_authenticated
            and user.role
            in (
                User.Role.SUPER_ADMIN,
                User.Role.CONTENT_MANAGER,
            )
        )


class IsStaffUser(BasePermission):
    message = "Staff access is required."

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(
            user
            and user.is_authenticated
            and user.role
            in (
                User.Role.SUPER_ADMIN,
                User.Role.CONTENT_MANAGER,
                User.Role.STAFF,
            )
        )


class IsInternalUser(BasePermission):
    message = "Authenticated internal access is required."

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(
            user
            and user.is_authenticated
            and user.role
            in (
                User.Role.SUPER_ADMIN,
                User.Role.CONTENT_MANAGER,
                User.Role.STAFF,
                User.Role.VIEWER,
            )
        )
