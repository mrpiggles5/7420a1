from django import forms
from .models import Reservation
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ['room', 'date', 'start_time', 'end_time']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['room'].queryset = Reservation.objects.model.room.field.related_model.objects.all()


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=50, required=True)
    last_name = forms.CharField(max_length=50, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password1', 'password2']
