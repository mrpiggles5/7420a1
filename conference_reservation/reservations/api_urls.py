from rest_framework import routers
from .api_views import RoomViewSet, ReservationViewSet

router = routers.DefaultRouter()
router.register(r"rooms", RoomViewSet)
router.register(r"reservations", ReservationViewSet)

urlpatterns = router.urls
