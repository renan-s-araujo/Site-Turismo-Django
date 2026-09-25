from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('galeria/', views.galeria, name='galeria'),
    path('historia/', views.historia, name='historia'),
    path('atracoes/', views.atracoes, name='atracoes'),
]