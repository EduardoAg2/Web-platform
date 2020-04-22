from django.shortcuts import render
from rhumanos.models import Contratistas
from django.http import JsonResponse
from django.shortcuts import redirect
from django.core import serializers
from administrativa.models import Unidades_negocio
from rhumanos.models import Empleados
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from datetime import datetime
from django.urls import reverse

def get_datos_contratista(request):
    id_contratista = request.GET.get('id_contratista', None)
    area = Contratistas.objects.filter(id__iexact=id_contratista).all()[0].area
    datos_contratista = {
        "area": area
    }
    return JsonResponse(datos_contratista, safe=False)

def get_user_exito(request):
    return render(request, "rhumanos/exito_agregado.html")

def get_nuevo_empleado_form(request):
    if request.method == "POST":
        nombre = request.POST.get('nombres')
        apellidos = request.POST.get('apellidos')
        usuario = request.POST.get('usuario')
        pwd = make_password(request.POST.get('password'))
        cargo = request.POST.get('cargo')
        _unidad_id = request.POST.get('unidad')
        tel_cel = request.POST.get('tel_celular')
        tel_fijo = request.POST.get('tel_fijo')
        _es_gerente = request.POST.get('es_gerente')
        correo = request.POST.get('correo')

        if tel_fijo == "":
            tel_fijo = None

        if _es_gerente:
            _es_gerente = 1
        else:
            _es_gerente = 0

        user = User(
            password = pwd,
            is_superuser = 0,
            username = usuario,
            first_name = nombre,
            last_name = apellidos,
            email = correo,
            is_staff = 1,
            is_active = 1,
            date_joined = datetime.now(),
        )
        user.save()

        empleado = Empleados(
            telefono_celular = tel_cel,
            telefono_fijo = tel_fijo,
            es_gerente = _es_gerente,
            puesto = cargo,
            unidad_id = _unidad_id,
            user_id = User.objects.latest("id").id
        )

        empleado.save()

        return redirect(reverse("user_agregado_exito"))
    else:
        unidades = Unidades_negocio.objects.all()

        #Regresa el website para agregar un nuevo empleado
        return render(request, 'rhumanos/nuevo_empleado.html', {
        "unidades_negocio": unidades
    })

