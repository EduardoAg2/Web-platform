/*globals $:false, alert, confirm, console, prompt*/
"use strict";

//Extrae los datos de la tabla de contratistas. El nombre del contratista y el criterio de seleccion.
function get_datos_tabla_contratista() {
    var datos_contratistas = [];

    //La primera variable se llama ignore por jslint
    $("#id-tbl-visible-contratistas tr").each(function (ignore, row) {
        var $row = $(row);
        var $nombre_contratista = $row.find("td[name='nombre-contratista']").html();
        var $criterio_seleccion = $row.find("td[name='criterio-seleccion']").html();
        datos_contratistas.push(
            {
                nombre_contratista: $nombre_contratista,
                criterio_seleccion: $criterio_seleccion
            }
        );
    });

    return datos_contratistas;
}

function get_datos_tabla_riesgos() {
    var datos_riesgos = [];

    //La primera variable se llama ignore por jslint
    $("#id-tbl-visible-riesgos tr").each(function (ignore, row) {
        var $row = $(row);
        var $nombre_riesgo = $row.find("td[name='nombre-riesgo']").html();
        var $probabilidad_ocurrencia_riesgo = $row.find("[name='probabilidad-ocurrencia-riesgo']").html();
        var $impacto_riesgo = $row.find("[name='impacto-riesgo']").html();

        datos_riesgos.push(
            {
                nombre: $nombre_riesgo,
                probabilidad_ocurrencia: $probabilidad_ocurrencia_riesgo,
                impacto: $impacto_riesgo
            }
        );

    });

    return datos_riesgos;
}

function get_datos_tabla_equipo() {
    var datos_equipo_trabajo = [];

    //La primera variable se llama ignore por jslint
    $("#id-tbl-visible-equipo tr").each(function (ignore, row) {
        var $row = $(row);
        var $nombre_empleado = $row.find("td[name='nombre-empleado']").html();
        var $cargo_empleado = $row.find("[name='cargo-empleado']").html();

        datos_equipo_trabajo.push(
            {
                nombre: $nombre_empleado,
                cargo: $cargo_empleado
            }
        );

    });

    return datos_equipo_trabajo;
}

function get_datos_tabla_interesados() {
    var datos_personal_interesado = [];

    //La primera variable se llama ignore por jslint
    $("#id-tbl-visible-interesados tr").each(function (ignore, row) {
        var $row = $(row);
        var $nombre_empleado = $row.find("td[name='nombre-interesado']").html();
        var $unidad_empleado = $row.find("td[name='unidad-interesado']").html();

        datos_personal_interesado.push(
            {
                nombre: $nombre_empleado,
                cargo: $unidad_empleado
            }
        );

    });

    return datos_personal_interesado;
}

function get_datos_tabla_presupuestos() {
    var datos_presupuestos = [];

    //La primera variable se llama ignore por jslint
    $("#id-tbl-visible-presupuesto tr").each(function (ignore, row) {
        var $row = $(row);
        var $revision = $row.find("td[name='presupuesto-revision']").html();
        var $venta = $row.find("td[name='presupuesto-venta-total']").html();

        datos_presupuestos.push(
            {
                descripcion: $revision,
                venta_total: $venta
            }
        );

    });

    return datos_presupuestos;
}

function get_datos_checkboxes_normas() {
    //Extrae los datos de los checkboxes de las normativas

    var datos_checkboxes = [];

    $("input[id^='id-norm-']").each(function (ignore, checkbox) {
        var checkbox_value = $(checkbox).val();
        var checkbox_state = $(checkbox).prop("checked");

        datos_checkboxes.push(
            {
                norma: checkbox_value,
                estado: checkbox_state
            }
        );
    });


    return datos_checkboxes;
}

function get_datos_checkboxes_criterio_tiempo() {
    /* Extrae la informacion de los checboxes del criterio de tiempo */

    var datos_criterios_tiempo = [];

    $("li[id^='id-listgroup-criterio-tiempo-']").each(function (ignore, listgroup) {
        var $checkbox_value = $(listgroup).find("input[type=checkbox]").val();
        var $checkbox_state = $(listgroup).find("input[type=checkbox]").prop("checked");
        var $comentario = $(listgroup).find("textarea").val();


        datos_criterios_tiempo.push(
            {
                criterio: $checkbox_value,
                estado: $checkbox_state,
                comentario: $comentario
            }
        );
    });
    return datos_criterios_tiempo;
}

function get_datos_entregables_cliente() {
    /* Extrae la informacion de los checboxes de los entregables del cliente y las fechas de entrega */

    var datos_entregables = [];

    $("[id^='id-formgroup-entregable-cliente-']").each(function (ignore, item) {
        var $entregable = $(item).find("input[type=checkbox]").val();
        var $estado = $(item).find("input[type=checkbox]").prop("checked");
        var $fecha_entregable = $(item).find("input[type=date]").val();

        datos_entregables.push(
            {
                entregable: $entregable,
                estado: $estado,
                fecha: $fecha_entregable
            }
        );
    });

    return datos_entregables;
}

function get_datos_entregables_enercom() {
    /* Extrae la informacion de los checboxes de los entregables de enercom */

    var datos_entregables = [];

    $("[id^='id-entregable-enercom-']").each(function (ignore, item) {
        var $entregable = $(item).val();
        var $estado = $(item).prop("checked");

        datos_entregables.push(
            {
                entregable: $entregable,
                estado: $estado
            }
        );
    });

    return datos_entregables;
}

function get_datos_requisitos_legales() {
    /* Extrae la informacion de los checboxes de los entregables de enercom */

    var datos_ = [];

    $("[id^='id-requisitos-legales-']").each(function (ignore, item) {
        var $requisito_legal = $(item).val();
        var $estado = $(item).prop("checked");

        datos_.push(
            {
                requisito_legal: $requisito_legal,
                estado: $estado
            }
        );
    });

    return datos_;
}

function get_form_data() {
    /*Extrae la informacion del formulario y lo guarda en un objeto. Despues regresa el objeto.*/

    //Los HTML elements que contienen toda la informacion del formulario.

    //Datos generales del formulario
    var nombre_proyecto = $("#id-nombre-proyecto");
    var codigo_proyecto = $("#id-codigo-proyecto");
    var ingeniero_lider = $("#id-ingeniero-lider");
    var fecha_solicitud = $("#id-fecha-solicitud");
    var tipo_aprobacion = $("#id-tipo-aprobacion");
    var presento_cotizacion = $("#id-cotizacion-presente");
    var direccion_electronica = $("#id-direccion-electronica");
    var estado_proyecto = $("#id-estado-proyecto");

    //Cronogrma de ejecucion
    var fecha_conceptual = $("#id-fecha-conceptual");
    var fecha_avance = $("#id-fecha-avance");
    var fecha_final = $("#id-fecha-final");
    var fecha_entrega = $("#id-fecha-entrega");
    var horas_ingeniero_proyectadas = $("#id-horas-proyectadas-ing");
    var horas_dibujante_proyectadas = $("#id-horas-proyectadas-dib");

    //Alcance del proyecto
    var descripcion_trabajo = $("#id-descripcion-trabajo");
    var ubicacion_geografica = $("#id-ubicacion-geografica");
    var categoria_proyecto = $("#id-categoria-proyecto");

    //Datos del cliente
    var nombre_cliente = $("#id-nombre-cliente");
    var nombre_contacto_principal = $("#id-nombre-contacto-principal");
    var telefono_contacto_principal = $("#id-telefono-contacto-principal");
    var correo_contacto_principal = $("#id-email-contacto-principal");
    var nombre_contacto_cobro = $("#id-nombre-contacto-cobro");
    var telefono_contacto_cobro = $("#id-telefono-contacto-cobro");
    var correo_contacto_cobro = $("#id-email-contacto-cobro");

    //Tabla de contratistas
    var tabla_visible_contratistas = get_datos_tabla_contratista();

    //Checkboxes con listados de normas y el comentario
    var checkboxes_normativas = get_datos_checkboxes_normas();
    var comentario_normativas = $("#id-comentario-normativas");

    //El radiobox con el criterio de costo seleccionado y el comentario
    var criterio_costo = $("input[name='criterio-costo']:checked");
    var comentario_criterio_costo = $("#id-comentario-criterio-costo");

    //El radiobox con el criterio de calidad y el comentario
    var criterio_calidad = $("input[name='criterio-calidad']:checked");
    var comentario_criterio_calidad = $("#id-comentario-criterio-calidad");

    //Criterios de tiempo
    var criterios_tiempo = get_datos_checkboxes_criterio_tiempo();

    //Matriz de riesgos
    var tabla_visible_riesgos = get_datos_tabla_riesgos();

    //Entregables por parte del cliente. Son necesarias las fechas?
    var entregables_cliente = get_datos_entregables_cliente();
    var comentario_entregable_cliente = $("#id-comentario-entregables-cliente");

    //Entregables por parte de enercom
    var entregables_enercom = get_datos_entregables_enercom();
    var comentario_entregables_enercom = $("#id-comentario-entregables-enercom");

    //Requisitos legales del diseño
    var requisito_legales = get_datos_requisitos_legales();
    var comentario_requisito_legales = $("#id-comentario-requisitos-legales");

    //Tabla equipo de trabajo
    var tabla_visible_equipo = get_datos_tabla_equipo();

    //Tabla personal interesado
    var tabla_visible_interesados = get_datos_tabla_interesados();

    //Tabla de presupuestos
    var tabla_visible_presupuesto = get_datos_tabla_presupuestos();


    var form_data = {

        nombre_proyecto: nombre_proyecto.val(),
        codigo_proyecto: codigo_proyecto.val(),
        ingeniero_lider: ingeniero_lider.val(),
        fecha_solicitud: fecha_solicitud.val(),
        tipo_aprobacion: tipo_aprobacion.val(),
        presento_cotizacion: presento_cotizacion.val(),
        direccion_electronica: direccion_electronica.val(),
        estado_proyecto: estado_proyecto.val(),
        fecha_conceptual: fecha_conceptual.val(),
        fecha_avance: fecha_avance.val(),
        fecha_final: fecha_final.val(),
        fecha_entrega: fecha_entrega.val(),
        horas_ingeniero_proyectadas: horas_ingeniero_proyectadas.val(),
        horas_dibujante_proyectadas: horas_dibujante_proyectadas.val(),
        descripcion_trabajo: descripcion_trabajo.val(),
        ubicacion_geografica: ubicacion_geografica.val(),
        categoria_proyecto: categoria_proyecto.val(),
        nombre_cliente: nombre_cliente.val(),
        nombre_contacto_principal: nombre_contacto_principal.val(),
        telefono_contacto_principal: telefono_contacto_principal.val(),
        correo_contacto_principal: correo_contacto_principal.val(),
        nombre_contacto_cobro: nombre_contacto_cobro.val(),
        telefono_contacto_cobro: telefono_contacto_cobro.val(),
        correo_contacto_cobro: correo_contacto_cobro.val(),
        datos_contratistas: tabla_visible_contratistas,
        checkboxes_normativas: checkboxes_normativas,
        comentario_normativas: comentario_normativas.val(),
        criterio_costo: criterio_costo.val(),
        comentario_criterio_costo: comentario_criterio_costo.val(),
        criterio_calidad: criterio_calidad.val(),
        comentario_criterio_calidad: comentario_criterio_calidad.val(),
        criterios_tiempo: criterios_tiempo,
        riesgos_proyecto: tabla_visible_riesgos,
        entregables_cliente: entregables_cliente,
        comentario_entregable_cliente: comentario_entregable_cliente.val(),
        entregables_enercom: entregables_enercom,
        comentario_entregables_enercom: comentario_entregables_enercom.val(),
        requisito_legales: requisito_legales,
        comentario_requisito_legales: comentario_requisito_legales.val(),
        equipo_trabajo: tabla_visible_equipo,
        interesados: tabla_visible_interesados,
        tabla_visible_presupuesto: tabla_visible_presupuesto
    };

    return form_data;
}



$("#id-btn-prueba").click(function () {
    console.log(get_form_data());
});
