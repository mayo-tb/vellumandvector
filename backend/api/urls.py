"""
Vellum & Vector — API URL Configuration
Base: /api/

Endpoints (per spec Section 4):
  GET  /api/projects/
  GET  /api/projects/?featured=true
  GET  /api/projects/?industry=<name>
  GET  /api/projects/<slug>/
  GET  /api/testimonials/
  POST /api/contact/
  GET  /api/tech-stack/
"""

from django.urls import path
from .views import (
    ProjectListView,
    ProjectDetailView,
    TestimonialListView,
    ContactSubmissionView,
    TechStackView,
)

urlpatterns = [
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("projects/<slug:slug>/", ProjectDetailView.as_view(), name="project-detail"),
    path("testimonials/", TestimonialListView.as_view(), name="testimonial-list"),
    path("contact/", ContactSubmissionView.as_view(), name="contact-submit"),
    path("tech-stack/", TechStackView.as_view(), name="tech-stack"),
]
