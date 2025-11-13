from rest_framework import routers
from .api_views import RoomViewSet, ReservationViewSet

router = routers.DefaultRouter()
router.register(r"rooms", RoomViewSet, basename="rooms")
router.register(r"reservations", ReservationViewSet, basename="reservations")

urlpatterns = router.urls
