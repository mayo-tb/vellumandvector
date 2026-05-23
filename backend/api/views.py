"""
Vellum & Vector — API Views
Implements all endpoints defined in the spec (Section 4):

  GET  /api/projects/              — all projects
  GET  /api/projects/?featured=true
  GET  /api/projects/<slug>/
  GET  /api/projects/?industry=<name>
  GET  /api/testimonials/
  POST /api/contact/               — rate-limited (5/hour per IP)
  GET  /api/tech-stack/            — static data
"""

import logging
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project, Testimonial, ContactSubmission
from .serializers import (
    ProjectSerializer,
    TestimonialSerializer,
    ContactSubmissionSerializer,
)
from .permissions import IsAdminOrReadOnly
from .throttles import ContactRateThrottle
from .utils import send_enquiry_email

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────
# Projects
# ─────────────────────────────────────────────

class ProjectListView(generics.ListAPIView):
    """
    GET /api/projects/
    GET /api/projects/?featured=true
    GET /api/projects/?industry=<name>
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        qs = Project.objects.all()
        featured = self.request.query_params.get("featured")
        industry = self.request.query_params.get("industry")

        if featured and featured.lower() == "true":
            qs = qs.filter(is_featured=True)
        if industry:
            qs = qs.filter(industry__icontains=industry)

        return qs


class ProjectDetailView(generics.RetrieveAPIView):
    """GET /api/projects/<slug>/"""
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = Project.objects.all()
    lookup_field = "slug"


# ─────────────────────────────────────────────
# Testimonials
# ─────────────────────────────────────────────

class TestimonialListView(generics.ListAPIView):
    """GET /api/testimonials/ — only published ones"""
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = Testimonial.objects.filter(is_published=True)


# ─────────────────────────────────────────────
# Contact
# ─────────────────────────────────────────────

@method_decorator(csrf_exempt, name="dispatch")
class ContactSubmissionView(APIView):
    """
    POST /api/contact/
    Rate-limited: 5 requests/hour per IP (ContactRateThrottle).

    Flow:
      1. Validate payload via ContactSubmissionSerializer
      2. Capture IP address
      3. Save Enquiry to DB (always — even if email fails)
      4. Attempt to send Resend notification email
      5. Return 201 with success message
    """
    throttle_classes = [ContactRateThrottle]

    def post(self, request, *args, **kwargs):
        serializer = ContactSubmissionSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"status": "error", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Capture real IP (handles proxy / Cloudflare headers)
        ip_address = self._get_client_ip(request)

        # Save to DB first — never lose a lead
        submission = serializer.save(ip_address=ip_address)

        # Fire email notification (non-blocking)
        email_sent = send_enquiry_email(submission)

        if not email_sent:
            logger.warning(
                "Enquiry %s saved to DB but email notification failed.", submission.id
            )

        return Response(
            {
                "status": "success",
                "message": "Thank you for reaching out. We'll get back to you within 24 hours.",
                "id": str(submission.id),
            },
            status=status.HTTP_201_CREATED,
        )

    @staticmethod
    def _get_client_ip(request) -> str | None:
        """Extract client IP, respecting proxy/CDN headers."""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR")


# ─────────────────────────────────────────────
# Tech Stack (static)
# ─────────────────────────────────────────────

class TechStackView(APIView):
    """
    GET /api/tech-stack/
    Returns static tech stack data. Spec note:
    'can be hardcoded in constants.ts instead' — this endpoint exists
    for completeness and future CMS management.
    """

    TECH_STACK = [
        {"name": "React", "category": "Frontend", "color": "#61DAFB"},
        {"name": "TypeScript", "category": "Frontend", "color": "#3178C6"},
        {"name": "Next.js", "category": "Frontend", "color": "#FFFFFF"},
        {"name": "Tailwind CSS", "category": "Frontend", "color": "#06B6D4"},
        {"name": "Django", "category": "Backend", "color": "#44B78B"},
        {"name": "Django REST Framework", "category": "Backend", "color": "#A30000"},
        {"name": "Python", "category": "Backend", "color": "#FFD43B"},
        {"name": "PostgreSQL", "category": "Infrastructure", "color": "#336791"},
        {"name": "Cloudinary", "category": "Infrastructure", "color": "#3448C5"},
        {"name": "Vercel", "category": "Infrastructure", "color": "#FFFFFF"},
    ]

    def get(self, request, *args, **kwargs):
        return Response(self.TECH_STACK)
