from django.db import models
from django.contrib.auth.models import User
from administrativa.models import Clientes, Unidades_negocio
from rhumanos.models import Contratistas


class Proyectos(models.Model):
    estado_choices = [
        ("EP", "En proceso"),
        ("F", "Finalizado")
    ]

    cliente = models.ForeignKey(Clientes, on_delete=models.PROTECT, verbose_name="id del cliente")
    user_id = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="id del empleado")
    unidad_id = models.ForeignKey(Unidades_negocio, on_delete=models.PROTECT, verbose_name="id de la unidad de negocios")
    codigo = models.CharField("codigo del proyecto", max_length=50, blank=True, null=True)
    nombre = models.CharField("nombre del proyecto", max_length=100, blank=True, null=True)
    estado = models.CharField("estado del proyecto", max_length=3, choices=estado_choices)

class Criterios_costo(models.Model):
    criterio = models.TextField("criterio de calidad")

class Criterios_calidad(models.Model):
    criterio = models.TextField("nombre del criterio de costo")

class Proyectos_diseño(models.Model):
    categoria_choices = [
        ("DC", "Diseño completo"),
        ("DA", "Diseño abreviado"),
        ("E", "Estudio"),
        ("M", "Mantenimiento")
    ]
    aprobacion_choices = [
        ("T", "Teléfono"),
        ("C", "Correo"),
        ("OC", "Orden Compra"),
        ("I", "Interno")
    ]

    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE, verbose_name="id del proyecto")
    criterio_costo = models.ForeignKey(Criterios_costo, on_delete=models.PROTECT, verbose_name="criterio de costo")
    criterio_calidad = models.ForeignKey(Criterios_calidad, on_delete=models.PROTECT, verbose_name="criterio de calidad")
    fecha_solicitud = models.DateField("fecha de entrega del proyecto")
    tipo_aprobacion = models.CharField("codigo del proyecto", max_length=3, choices=aprobacion_choices)
    direccion_portal = models.CharField("codigo del proyecto", max_length=270)
    fecha_conceptual = models.DateField("fecha de presentacion del diseño conceptual")
    fecha_avance = models.DateField("fecha de presentacion del avance")
    fecha_entrega = models.DateField("fecha de entrega del proyecto")
    horas_ing_proyectadas = models.DecimalField("horas ingeniero proyectadas", max_digits=7, decimal_places=2)
    horas_dib_proyectadas = models.DecimalField("horas ingeniero proyectadas", max_digits=7, decimal_places=2)
    ubicacion_geografica = models.CharField("ubicacion del proyecto", max_length=270)
    categoria_proyecto = models.CharField("categoria del proyecto", max_length=3, choices=categoria_choices)
    nombre_contacto_principal = models.CharField("nombre del contacto principal", max_length=50)
    telefono_contacto_principal = models.CharField("telefono del contacto principal", max_length=25)
    correo_contacto_principal = models.EmailField("correo del contacto principal", max_length=254)
    nombre_contacto_cobro = models.CharField("nombre del contacto para cobro", max_length=50, blank=True, null=True)
    telefono_contacto_cobro = models.CharField("telefono del contacto para cobro", max_length=25, blank=True, null=True)
    correo_contacto_cobro = models.EmailField("correo del contacto para cobro", max_length=254, blank=True, null=True)
    comentario_normativas = models.TextField("comentario de las normativas a cumplir", blank=True, null=True)
    comentario_criterio_costo = models.TextField("comentario de el criterio de costo", blank=True, null=True)
    comentario_criterio_calidad = models.TextField("comentario de el criterio de calidad", blank=True, null=True)
    comentario_entregables_cliente = models.TextField("comentario de los entregables del cliente", blank=True, null=True)
    comentario_entregables_enercom = models.TextField("comentario de los entregables enercom", blank=True, null=True)
    comentario_requisitos_legales = models.TextField("comentario de los requisitos legales", blank=True, null=True)

class Requisitos_legales(models.Model):
    requisito = models.CharField("nombre del requisito legal", max_length=50)

class Requisitos_legales_proyecyo_dis(models.Model):
    proyecto_dis = models.ForeignKey(Proyectos_diseño, on_delete=models.CASCADE, verbose_name="id del proyecto de diseño")
    requisito = models.ForeignKey(Requisitos_legales, on_delete=models.PROTECT, verbose_name="id del requisito legal")

class Criterios_tiempo(models.Model):
    criterio = models.TextField("nombre del criterio de tiempo")

class Criterios_tiempo_proyecto_dis(models.Model):
    proyecto_dis = models.ForeignKey(Proyectos_diseño, on_delete=models.CASCADE, verbose_name="id del proyecto de diseño")
    criterio_tiempo = models.ForeignKey(Criterios_tiempo, on_delete=models.PROTECT, verbose_name="id del criterio de tiempo")
    comentario = models.TextField("comentario del criterio de tiempo", null=True)
    
class Normativas(models.Model):
    normativa = models.CharField("nombre la normativa", max_length=20)

class Normativas_proyecto_dis(models.Model):
    proyect_dis = models.ForeignKey(Proyectos_diseño, on_delete=models.CASCADE, verbose_name="id del proyecto de diseño")
    normativa = models.ForeignKey(Normativas, on_delete=models.PROTECT, verbose_name="id de la normativa")

class Entregables(models.Model):
    entregable = models.CharField("nombre del entregable", max_length=50)

class Entregables_cliente_proyecto_dis(models.Model):
    proyecto_dis = models.ForeignKey(Proyectos_diseño, on_delete=models.CASCADE, verbose_name="id del proyecto de diseño")
    entregable = models.ForeignKey(Entregables, on_delete=models.PROTECT, verbose_name="id del entregable")
    fecha = models.DateField("fecha de entrega del entregable", blank=True, null=True)

class Entregables_enercom_proyecto_dis(models.Model):
    proyecto_dis = models.ForeignKey(Proyectos_diseño, on_delete=models.CASCADE, verbose_name="id del proyecto de diseño")
    entregable = models.ForeignKey(Entregables, on_delete=models.PROTECT, verbose_name="id del entregable")

class riesgos_proyecto_dis(models.Model):
    impacto_choices = [
        ("A", "Alto"),
        ("M", "Medio"),
        ("B", "Bajo")
    ]

    probabilidad_choices = [
        ("A", "Alta"),
        ("M", "Media"),
        ("B", "Baja")
    ]

    tipo_choices = [
        ("TEC", "Riesgo tecnico"),
        ("ADMIN", "Riesgo administrativo"),
        ("EXT", "Riesgo externo")
    ]

    proyecto_dis = models.ForeignKey(Proyectos_diseño, on_delete=models.CASCADE, verbose_name="id del proyecto de diseño")
    proceso_detecta = models.ForeignKey(Unidades_negocio, on_delete=models.PROTECT, verbose_name="id de la unidad de negocios")
    resumen_riesgo = models.CharField("resumen del riesgo", max_length=255)
    tipo_riesgo = models.CharField("tipo de riesgo", max_length=10, choices=tipo_choices)
    impacto = models.CharField("impacto del riesgo", max_length=3, choices=impacto_choices)
    probabilidad = models.CharField("probabilidad de ocurrencia del riesgo", max_length=3, choices=probabilidad_choices)
    severidad = models.IntegerField("nivel de severidad del riesgo")
    descripcion_detallada = models.TextField("descripcion detallada del riesgo", blank=True, null=True)
    respuesta_inicial = models.TextField("respuesta inicial ante el riesgo")
    medidas_preventivas = models.TextField("medidas preventivas ante el riesgo")

class contratistas_proyecto(models.Model):
    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE, verbose_name="id del proyecto")
    contratista = models.ForeignKey(Contratistas, on_delete=models.PROTECT, verbose_name="id del contratista")
    criterio = models.TextField("criterio de seleccion contratista", blank=True, null=True)

class equipo_trabajo(models.Model):
    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE, verbose_name="id del proyecto")
    user = models.ForeignKey(Contratistas, on_delete=models.PROTECT, verbose_name="id del usuario")

class interesados(models.Model):
    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE, verbose_name="id del proyecto")
    user = models.ForeignKey(Contratistas, on_delete=models.PROTECT, verbose_name="id del usuario")

class presupuestos(models.Model):
    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE, verbose_name="id del proyecto")
    venta_total = models.DecimalField("venta total", max_digits=19, decimal_places=10)
    target_material = models.DecimalField("target de materiales", max_digits=19, decimal_places=10)
    target_mo = models.DecimalField("target de mano de obra", max_digits=19, decimal_places=10)
    administrativos = models.DecimalField("target administrativo", max_digits=19, decimal_places=10)
    utilidad_neta = models.DecimalField("utilidad neta", max_digits=19, decimal_places=10)
    porcentaje_utilidad = models.DecimalField("porcentaje de utilidad", max_digits=19, decimal_places=10)
    moneda = models.CharField("moneda", max_length=3, default="HNL")











