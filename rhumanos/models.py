from django.db import models
from django.contrib.auth.models import User
from administrativa.models import Unidades_negocio

class Contratistas(models.Model):
    nombre = models.CharField("nombre del contratista", max_length=100)
    area = models.CharField("area de trabajo del contratista", max_length=100)
    telefono_celular = models.CharField("numero de telefono celular del contratista", max_length=25)
    telefono_fijo = models.CharField("numero de telefono fijo del contratista", max_length=25, blank=True, null=True)
    activo = models.BooleanField("si el contratista esta activo", default = 1)
    descalificado = models.BooleanField("si el contratista esta descalificado", default = 1)
    comentarios = models.TextField("comentarios sobre el contratista", blank=True, null=True)

class Empleados(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="id del empleado")
    unidad = models.ForeignKey(Unidades_negocio, on_delete=models.PROTECT, verbose_name="id de la unidad")
    telefono_celular = models.CharField("numero de telefono celular del empleado", max_length=25)
    telefono_fijo = models.CharField("numero de telefono fijo del empleado", max_length=25, blank=True, null=True)
    es_gerente = models.BooleanField("si el empleado es gerente", default = 0)
    puesto = models.CharField("puesto que ocupa el empleado en la empresa", max_length=50)

    def get_empleados_complete(self):
        return self.unidades_negocio_set.select_related("user", "unidad")