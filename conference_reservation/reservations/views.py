from django.shortcuts import render, redirect, get_object_or_404
from .models import Room, Reservation
from django.contrib.auth.decorators import login_required
from .forms import ReservationForm, UserRegisterForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

# Home page for all users
def home(request):
    return render(request, 'reservations/home.html')


# View all rooms (no login required)
def view_rooms(request):
    rooms = Room.objects.all()
    return render(request, 'reservations/view_rooms.html', {'rooms': rooms})


# Book a room (login required)
@login_required
def book_room(request):
    room_id = request.GET.get('room_id')  # check if room selected from View Rooms
    rooms = Room.objects.all()
    selected_room = None

    if room_id:
        selected_room = get_object_or_404(Room, id=room_id)

    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            reservation = form.save(commit=False)
            reservation.user = request.user
            reservation.save()
            messages.success(request, f'Room "{reservation.room}" booked successfully for {reservation.date}!')
            return redirect('my_reservations')
    else:
        if selected_room:
            form = ReservationForm(initial={'room': selected_room})
        else:
            form = ReservationForm()

    return render(request, 'reservations/book_room.html', {
        'rooms': rooms,
        'form': form,
        'selected_room': selected_room
    })


# View user's reservations
@login_required
def my_reservations(request):
    reservations = Reservation.objects.filter(user=request.user)
    return render(request, 'reservations/my_reservations.html', {'reservations': reservations})


# Edit a reservation
@login_required
def edit_reservation(request, reservation_id):
    reservation = get_object_or_404(Reservation, id=reservation_id, user=request.user)
    if request.method == 'POST':
        form = ReservationForm(request.POST, instance=reservation)
        if form.is_valid():
            form.save()
            messages.success(request, 'Reservation updated successfully!')
            return redirect('my_reservations')
    else:
        form = ReservationForm(instance=reservation)
    return render(request, 'reservations/edit_reservation.html', {'form': form})


# Delete a reservation (with confirmation)
@login_required
def delete_reservation(request, reservation_id):
    reservation = get_object_or_404(Reservation, id=reservation_id, user=request.user)
    if request.method == 'POST':
        reservation.delete()
        messages.success(request, 'Reservation deleted successfully!')
        return redirect('my_reservations')
    return render(request, 'reservations/delete_reservation.html', {'reservation': reservation})


# Register new user
def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created successfully! You can now log in.')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'reservations/register.html', {'form': form})


# Login user
def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Logged in successfully!')
            return redirect('home')
        else:
            messages.error(request, 'Invalid email or password.')
    return render(request, 'reservations/login.html')


# Logout user
@login_required
def logout_view(request):
    logout(request)
    messages.success(request, 'Logged out successfully!')
    return redirect('home')
