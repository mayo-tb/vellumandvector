"""
Vellum & Vector — Development Settings
DEBUG=True, SQLite database (easy setup, no PostgreSQL required locally).
"""

from .base import *  # noqa: F401, F403

DEBUG = True

# SQLite for development — zero config, swap to DATABASE_URL for prod
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",  # noqa: F405
    }
}

# Show browsable API in dev
REST_FRAMEWORK = {
    **REST_FRAMEWORK,  # noqa: F405
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
}
