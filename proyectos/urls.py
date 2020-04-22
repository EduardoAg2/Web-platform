from django.contrib import admin
from django.urls import path, include
from proyectos.views import test_view

urlpatterns = [
    path('diseño/apertura/', test_view, name='apertura_diseño'),
]
