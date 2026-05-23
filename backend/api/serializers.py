"""
Vellum & Vector — DRF Serializers
Read serializers for public API responses.
Write serializer for contact form submissions.
"""

from rest_framework import serializers
from .models import Project, Testimonial, ContactSubmission


# ─────────────────────────────────────────────
# Project
# ─────────────────────────────────────────────

class ProjectSerializer(serializers.ModelSerializer):
    """
    Read-only serializer for project listing and detail views.
    Sample response matches the spec:
      GET /api/projects/?featured=true
    """

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "industry",
            "tech_stack",
            "image_url",
            "live_url",
            "is_featured",
            "sort_order",
            "created_at",
        ]
        read_only_fields = fields


# ─────────────────────────────────────────────
# Testimonial
# ─────────────────────────────────────────────

class TestimonialSerializer(serializers.ModelSerializer):
    """
    Read-only serializer for published testimonials.
    GET /api/testimonials/
    """

    class Meta:
        model = Testimonial
        fields = [
            "id",
            "client_name",
            "business_type",
            "city",
            "quote",
            "sort_order",
        ]
        read_only_fields = fields


# ─────────────────────────────────────────────
# Contact Submission
# ─────────────────────────────────────────────

class ContactSubmissionSerializer(serializers.ModelSerializer):
    """
    Write serializer for POST /api/contact/
    Maps frontend field names to model fields.

    Expected payload (from Contact.tsx):
      { name, email, businessType, budget, message }
    """

    # Map camelCase frontend names → snake_case model fields
    businessType = serializers.CharField(
        source="business_type",
        required=False,
        allow_blank=True,
        max_length=100,
    )
    budget = serializers.CharField(
        source="budget_range",
        required=False,
        allow_blank=True,
        max_length=50,
    )

    class Meta:
        model = ContactSubmission
        fields = ["name", "email", "businessType", "budget", "message"]

    def validate_name(self, value: str) -> str:
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters.")
        return value.strip()

    def validate_message(self, value: str) -> str:
        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                "Please provide more detail (at least 10 characters)."
            )
        return value.strip()
