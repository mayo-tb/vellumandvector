"""
Vellum & Vector — API Permissions
Public endpoints are read-only for everyone.
Admin-only write access for project/testimonial management.
"""

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    Public: GET, HEAD, OPTIONS (safe methods)
    Admin only: POST, PUT, PATCH, DELETE
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
