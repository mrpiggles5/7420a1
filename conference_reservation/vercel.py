# vercel.py — entrypoint for Vercel
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conference_reservation.settings')

from django.core.wsgi import get_wsgi_application
app = get_wsgi_application()
