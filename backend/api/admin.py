"""
Vellum & Vector — Django Admin
All three models registered with practical list views for managing
projects, testimonials, and contact enquiries.
"""

from django.contrib import admin
from .models import Project, Testimonial, ContactSubmission


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "industry", "is_featured", "sort_order", "created_at"]
    list_filter = ["is_featured", "industry"]
    search_fields = ["title", "description", "industry"]
    prepopulated_fields = {"slug": ("title",)}
    ordering = ["sort_order", "-created_at"]
    list_editable = ["is_featured", "sort_order"]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["client_name", "business_type", "city", "is_published", "sort_order"]
    list_filter = ["is_published", "city"]
    search_fields = ["client_name", "quote", "business_type"]
    list_editable = ["is_published", "sort_order"]


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "business_type", "budget_range", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["name", "email", "business_type", "message"]
    readonly_fields = [
        "id", "name", "email", "business_type", "budget_range",
        "message", "ip_address", "created_at",
    ]
    list_editable = ["status"]
    ordering = ["-created_at"]
    date_hierarchy = "created_at"

    def has_add_permission(self, request):
        """Submissions come from the contact form only — not manually."""
        return False
