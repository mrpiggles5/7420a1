from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView  # add this import

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("reservations.api_urls")),  # your API endpoints
    path("", TemplateView.as_view(template_name="index.html")),  # React frontend
]
