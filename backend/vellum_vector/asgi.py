"""
ASGI config for Vellum & Vector Django project.
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vellum_vector.settings.production")

application = get_asgi_application()
