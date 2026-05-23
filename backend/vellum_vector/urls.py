"""
Vellum & Vector — Root URL Configuration
Base URL: https://api.vellumandvector.com/
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def health_check(request):
    """BetterUptime health probe — /health/ — per dev strategy spec."""
    return JsonResponse({"status": "ok", "service": "vellum-vector-api"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("health/", health_check),
]
