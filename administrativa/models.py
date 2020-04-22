from django.db import models

class Clientes(models.Model):
    rubro_choices = [
        ("instalaciones industriales", "instalaciones industriales"),
        ("instalaciones residenciales", "instalaciones residenciales"),
        ("primarios", "primarios")
    ]

    nombre = models.CharField("nombre del cliente", max_length=100)
    rubro = models.CharField(
        "rubro de trabajo del cliente",
        max_length=100,
        choices=rubro_choices,
        )
    es_base = models.BooleanField("si el cliente es base", default = 0)
    es_duro = models.BooleanField("si el cliente tiene cuentas pendientes", default = 0)

class Unidades_negocio(models.Model):
    unidad = models.CharField("nombre de la unidad de negocio", max_length=100)
