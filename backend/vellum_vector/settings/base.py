"""
Vellum & Vector — Django Base Settings
Shared across development and production.
"""

import environ
from pathlib import Path

# ─────────────────────────────────────────────
# Paths
# ─────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# ─────────────────────────────────────────────
# Environment
# ─────────────────────────────────────────────
env = environ.Env(
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ["localhost", "127.0.0.1"]),
    CORS_ALLOWED_ORIGINS=(list, ["http://localhost:3000"]),
    NOTIFY_EMAIL=(str, "oyekanboluwatife6@gmail.com"),
    FROM_EMAIL=(str, "onboarding@resend.dev"),
    RESEND_API_KEY=(str, ""),
    SENTRY_DSN=(str, ""),
)

# Read .env from the backend/ directory
environ.Env.read_env(BASE_DIR / ".env")

# ─────────────────────────────────────────────
# Core
# ─────────────────────────────────────────────
SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG")
ALLOWED_HOSTS = env("ALLOWED_HOSTS")

# ─────────────────────────────────────────────
# Applications
# ─────────────────────────────────────────────
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "corsheaders",
    # Local
    "api.apps.ApiConfig",
]

# ─────────────────────────────────────────────
# Middleware
# ─────────────────────────────────────────────
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Must be before CommonMiddleware
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ─────────────────────────────────────────────
# URLs
# ─────────────────────────────────────────────
ROOT_URLCONF = "vellum_vector.urls"

# ─────────────────────────────────────────────
# Templates
# ─────────────────────────────────────────────
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ─────────────────────────────────────────────
# WSGI / ASGI
# ─────────────────────────────────────────────
WSGI_APPLICATION = "vellum_vector.wsgi.application"

# ─────────────────────────────────────────────
# Password Validation
# ─────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ─────────────────────────────────────────────
# Internationalisation
# ─────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Lagos"
USE_I18N = True
USE_TZ = True

# ─────────────────────────────────────────────
# Static Files
# ─────────────────────────────────────────────
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "backend" / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ─────────────────────────────────────────────
# Default Primary Key
# ─────────────────────────────────────────────
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ─────────────────────────────────────────────
# Django REST Framework
# ─────────────────────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_THROTTLE_CLASSES": [
        "api.throttles.SafeAnonRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "100/hour",     # General API
        "contact": "5/hour",    # Contact form — per spec
    },
}

# ─────────────────────────────────────────────
# CORS — per dev strategy spec
# ─────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = env("CORS_ALLOWED_ORIGINS")
CORS_ALLOW_CREDENTIALS = False  # No cookies across origin

# ─────────────────────────────────────────────
# Email / Resend
# ─────────────────────────────────────────────
RESEND_API_KEY = env("RESEND_API_KEY")
NOTIFY_EMAIL = env("NOTIFY_EMAIL")
FROM_EMAIL = env("FROM_EMAIL")

# ─────────────────────────────────────────────
# Sentry (optional)
# ─────────────────────────────────────────────
SENTRY_DSN = env("SENTRY_DSN")
