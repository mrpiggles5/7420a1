from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name='home'),
    path('view_rooms/', views.view_rooms, name='view_rooms'),
    path('book_room/', views.book_room, name='book_room'),
    path('my_reservations/', views.my_reservations, name='my_reservations'),
    path('edit_reservation/<int:reservation_id>/', views.edit_reservation, name='edit_reservation'),
    path('delete_reservation/<int:reservation_id>/', views.delete_reservation, name='delete_reservation'),
    path('login/', auth_views.LoginView.as_view(template_name='reservations/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='home'), name='logout'),
    path('register/', views.register, name='register'),
]
