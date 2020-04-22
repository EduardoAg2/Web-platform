/*globals $, alert, confirm, console, prompt, contratistas_url*/
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

var form_fields = {
    //Datos generales
    nombre_proyecto: [$("#id-nombre-proyecto"), "input"],
    codigo_proyecto: [$("#id-codigo-proyecto"), "input"],
    ingeniero_lider: [$("#id-ingeniero-lider"), "input"],
    fecha_solicitud: [$("#id-fecha-solicitud"), "input"],
    tipo_aprobacion: [$("#id-tipo-aprobacion"), "input"],
    presento_cotizacion: [$("#id-cotizacion-presente"), "input"],
    direccion_portal: [$("#id-direccion-electronica"), "input"],
    estado_proyecto: [$("#id-estado-proyecto"), "input"],

    //Cronogrma de ejecucion
    fecha_conceptual: [$("#id-fecha-conceptual"), "input"],
    fecha_avance: [$("#id-fecha-avance"), "input"],
    fecha_final: [$("#id-fecha-final"), "input"],
    fecha_entrega: [$("#id-fecha-entrega"), "input"],
    horas_ingeniero_proyectadas: [$("#id-horas-proyectadas-ing"), "input"],
    horas_dibujante_proyectadas: [$("#id-horas-proyectadas-dib"), "input"],

    //Alcance del proyecto
    descripcion_trabajo: [$("#id-descripcion-trabajo"), "input"],
    ubicacion_geografica: [$("#id-ubicacion-geografica"), "input"],
    categoria_proyecto: [$("#id-categoria-proyecto"), "input"],

    //Datos del cliente
    nombre_cliente: [$("#id-nombre-cliente"), "input"],
    nombre_contacto_principal: [$("#id-nombre-contacto-principal"), "input"],
    telefono_contacto_principal: [$("#id-telefono-contacto-principal"), "input"],
    correo_contacto_principal: [$("#id-email-contacto-principal"), "input"],
    nombre_contacto_cobro: [$("#id-nombre-contacto-cobro"), "input"],
    telefono_contacto_cobro: [$("#id-telefono-contacto-cobro"), "input"],
    correo_contacto_cobro: [$("#id-email-contacto-cobro"), "input"],

    //Tabla de contratistas
    tabla_visible_contratistas: [$("#id-tbl-visible-contratistas"), "tablerow"],

    //Checkboxes con listados de normas y el comentario
    checkboxes_normativas: [$("input[id^='id-norm-']"), "input"],
    comentario_normativas: [$("#id-comentario-normativas"), "input"],

    //El radiobox con el criterio de costo seleccionado y el comentario
    criterio_costo: [$("input[name='criterio-costo']"), "input"],
    comentario_criterio_costo: [$("#id-comentario-criterio-costo"), "input"],

    //El radiobox con el criterio de calidad y el comentario
    criterio_calidad: [$("input[name='criterio-calidad'"), "input"],
    comentario_criterio_calidad: [$("#id-comentario-criterio-calidad"), "input"],

    //Criterios de tiempo
    checkboxes_criterios_tiempo: [$("input[id^='id-criterio-tiempo-']"), "input"],
    comentarios_criterios_tiempo: [$("textarea[id^='id-comentario-criterio-tiempo-']"), "input"],

    //Matriz de riesgos
    tabla_visible_riesgos: [$("#id-tbl-visible-riesgos tr"), "tablerow"],

    //Entregables por parte del cliente. Son necesarias las fechas?
    checkboxes_entregables_cliente: [$("input[id^='id-entregables-cliente-']"), "input"],
    fechas_entregables_cliente: [$("input[id^='id-fecha-entregable-']"), "input"],
    comentario_entregable_cliente: [$("#id-comentario-entregables-cliente"), "input"],

    //Entregables por parte de enercom
    entregables_enercom: [$("[id^='id-entregable-enercom-']"), "input"],
    comentario_entregables_enercom: [$("#id-comentario-entregables-enercom"), "input"],

    //Requisitos legales del diseño
    requisito_legales: [$("[id^='id-requisitos-legales-']"), "input"],
    comentario_requisito_legales: [$("#id-comentario-requisitos-legales"), "input"],

    //Tabla equipo de trabajo
    tabla_visible_equipo: [$("#id-tbl-visible-equipo tr"), "tablerow"],

    //Tabla personal interesado
    tabla_visible_interesados: [$("#id-tbl-visible-interesados tr"), "tablerow"],

    //Tabla de presupuestos
    tabla_visible_presupuesto: [$("#id-tbl-visible-presupuesto tr"), "tablerow"]
};

function get_form_data() {

    //Extra los datos del formulario de la apertura
    var form_data = {

        nombre_proyecto: form_fields.nombre_proyecto[0].val(),
        codigo_proyecto: form_fields.codigo_proyecto[0].val(),
        ingeniero_lider: form_fields.ingeniero_lider[0].val(),
        fecha_solicitud: form_fields.fecha_solicitud[0].val(),
        tipo_aprobacion: form_fields.tipo_aprobacion[0].val(),
        presento_cotizacion: form_fields.presento_cotizacion[0].val(),
        direccion_portal: form_fields.direccion_portal[0].val(),
        estado_proyecto: form_fields.estado_proyecto[0].val(),
        fecha_conceptual: form_fields.fecha_conceptual[0].val(),
        fecha_avance: form_fields.fecha_avance[0].val(),
        fecha_final: form_fields.fecha_final[0].val(),
        fecha_entrega: form_fields.fecha_entrega[0].val(),
        horas_ingeniero_proyectadas: form_fields.horas_ingeniero_proyectadas[0].val(),
        horas_dibujante_proyectadas: form_fields.horas_dibujante_proyectadas[0].val(),
        descripcion_trabajo: form_fields.descripcion_trabajo[0].val(),
        ubicacion_geografica: form_fields.ubicacion_geografica[0].val(),
        categoria_proyecto: form_fields.categoria_proyecto[0].val(),
        //ID DEL CLIENTE EN VEZ DEL NOMBRE
        nombre_cliente: form_fields.nombre_cliente[0].val(),
        nombre_contacto_principal: form_fields.nombre_contacto_principal[0].val(),
        telefono_contacto_principal: form_fields.telefono_contacto_principal[0].val(),
        correo_contacto_principal: form_fields.correo_contacto_principal[0].val(),
        nombre_contacto_cobro: form_fields.nombre_contacto_cobro[0].val(),
        telefono_contacto_cobro: form_fields.telefono_contacto_cobro[0].val(),
        correo_contacto_cobro: form_fields.correo_contacto_cobro[0].val(),
        //id_contratista, criterio_seleccion
        datos_contratistas: get_datos_tabla_contratista(),
        //id normativa
        checkboxes_normativas: get_datos_checkboxes_normas(),
        comentario_normativas: form_fields.comentario_normativas[0].val(),
        criterio_costo: $(form_fields.criterio_costo[0]).find(":checked").val(),
        comentario_criterio_costo: form_fields.comentario_criterio_costo[0].val(),
        criterio_calidad: $(form_fields.criterio_calidad[0]).find(":checked").val(),
        comentario_criterio_calidad: form_fields.comentario_criterio_calidad[0].val(),
        criterios_tiempo: get_datos_checkboxes_criterio_tiempo(),
        riesgos_proyecto: get_datos_tabla_riesgos(),
        entregables_cliente: get_datos_entregables_cliente(),
        comentario_entregable_cliente: form_fields.comentario_entregable_cliente[0].val(),
        entregables_enercom: get_datos_entregables_enercom(),
        comentario_entregables_enercom: form_fields.comentario_entregables_enercom[0].val(),
        requisito_legales: get_datos_requisitos_legales(),
        comentario_requisito_legales: form_fields.comentario_requisito_legales[0].val(),
        equipo_trabajo: get_datos_tabla_equipo(),
        interesados: get_datos_tabla_interesados(),
        tabla_visible_presupuesto: get_datos_tabla_presupuestos()
    };

    return form_data;
}

