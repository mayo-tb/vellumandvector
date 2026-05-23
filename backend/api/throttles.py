"""
Vellum & Vector — Custom DRF Throttles
Contact form: 5 requests per hour per IP (per spec Section 4 & 10).
"""

from rest_framework.throttling import AnonRateThrottle


class SafeAnonRateThrottle(AnonRateThrottle):
    """
    Subclass of AnonRateThrottle that correctly retrieves the client's real IP
    address from HTTP_X_FORWARDED_FOR when configured behind a reverse proxy/CDN/Next.js proxy.
    """
    def get_ident(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR")


class ContactRateThrottle(SafeAnonRateThrottle):
    """
    Stricter throttle applied specifically to POST /api/contact/
    Rate: 5/hour per IP address.
    """
    scope = "contact"

