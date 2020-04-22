from django.shortcuts import render
from administrativa.models import Clientes, Unidades_negocio
from rhumanos.models import Empleados, Contratistas
from django.contrib.auth.models import User

def test_view(request):
    # Eduardo, delete this afterwards, you dont need it.

    clientes = Clientes.objects.all()
    empleados = Empleados.objects.select_related("user", "unidad").all()
    contratistas = Contratistas.objects.all()
    unidades = Unidades_negocio.objects.all()

    return render(request, 'proyectos/diseño/apertura_diseño.html', {
        "clientes": clientes,
        "empleados": empleados,
        "contratistas": contratistas,
        "unidades_negocio": unidades
    })
