"""
WSGI config for Vellum & Vector Django project.
Exposed as vellum_vector.wsgi:application — used by gunicorn in Procfile.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vellum_vector.settings.production")

application = get_wsgi_application()
