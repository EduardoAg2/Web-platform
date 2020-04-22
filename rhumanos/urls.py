from django.contrib import admin
from django.urls import path, include
from proyectos.views import test_view
from rhumanos.views import get_datos_contratista, get_nuevo_empleado_form, get_user_exito

urlpatterns = [
    path('rhumanos/contratistas/ajax/datos/', get_datos_contratista, name='datos_contratista'),
    path('rhumanos/empleados/nuevo/', get_nuevo_empleado_form, name='nuevo_empleado_form'),
    path('rhumanos/empleados/nuevo/exito/', get_user_exito, name='user_agregado_exito')
]
