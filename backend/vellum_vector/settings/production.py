"""
Vellum & Vector — Production Settings
DEBUG=False, PostgreSQL via DATABASE_URL, full security hardening.
Deployed to Railway per the dev strategy spec.
"""

import sentry_sdk
from .base import *  # noqa: F401, F403

DEBUG = False

# ─────────────────────────────────────────────
# Database — PostgreSQL via Railway DATABASE_URL
# ─────────────────────────────────────────────
DATABASES = {
    "default": env.db("DATABASE_URL")  # noqa: F405
}

# ─────────────────────────────────────────────
# Security — per dev strategy spec (Section 10)
# ─────────────────────────────────────────────
SECURE_HSTS_SECONDS = 31536000           # 1 year HSTS
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = "DENY"
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# ─────────────────────────────────────────────
# CORS — restrict to production domain
# ─────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = env.list(  # noqa: F405
    "CORS_ALLOWED_ORIGINS",
    default=[
        "https://vellumandvector.com",
        "https://www.vellumandvector.com",
    ]
)

# ─────────────────────────────────────────────
# Sentry — runtime error tracking
# ─────────────────────────────────────────────
if SENTRY_DSN:  # noqa: F405
    sentry_sdk.init(
        dsn=SENTRY_DSN,  # noqa: F405
        traces_sample_rate=0.1,
        profiles_sample_rate=0.1,
    )
