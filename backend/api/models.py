"""
Vellum & Vector — API Models
Three independent tables per the database schema spec:
  - Project
  - Testimonial
  - ContactSubmission
"""

import uuid
from django.db import models


class Project(models.Model):
    """
    Portfolio project entry — managed via Django admin.
    Maps to the `projects` table in the spec.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    industry = models.CharField(max_length=100)
    # JSONB in PostgreSQL, JSON in SQLite — stores ["React", "TypeScript", ...]
    tech_stack = models.JSONField(default=list, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    live_url = models.URLField(max_length=500, blank=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["is_featured"]),
        ]

    def __str__(self) -> str:
        return self.title


class Testimonial(models.Model):
    """
    Client testimonial — must be approved (is_published=True) to appear on site.
    Maps to the `testimonials` table in the spec.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100)
    city = models.CharField(max_length=100, blank=True)
    quote = models.TextField()
    is_published = models.BooleanField(
        default=False, help_text="Only published testimonials appear on the site."
    )
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]

    def __str__(self) -> str:
        return f"{self.client_name} — {self.business_type}"


class ContactSubmission(models.Model):
    """
    Contact form lead — every submission is persisted to DB even if email fails.
    Maps to the `contact_submissions` table in the spec.
    """

    STATUS_PENDING = "pending"
    STATUS_REPLIED = "replied"
    STATUS_ARCHIVED = "archived"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_REPLIED, "Replied"),
        (STATUS_ARCHIVED, "Archived"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    business_type = models.CharField(max_length=100, blank=True)
    budget_range = models.CharField(max_length=50, blank=True)
    message = models.TextField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING, db_index=True
    )
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["-created_at"]),
        ]
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"

    def __str__(self) -> str:
        return f"{self.name} <{self.email}> — {self.created_at:%Y-%m-%d %H:%M}"
