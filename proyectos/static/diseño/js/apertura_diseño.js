/*globals $, enable_tooltips, get_data_contratista*/
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^_" }]*/


function _clean_contratistas_modal() {
    //Limpia el modal de con    tratistas de lo que contiene
    $('#id-porcentaje-evaluacion').val('');
    $('#id-tipo-contratista').val('');
    $('#id-criterio-selecccion-contratista').val('');
    $('#id-select-listado-contratistas').val(-1);
    $('#id-select-listado-contratistas').attr('data-row-number', '');
}

function _clean_riesgos_modal() {
    //Limpia el modal de riesgos de lo que contiene
    $('#id-descripcion-breve-riesgo').val('');
    $('#id-descripcion-detallada-riesgo').val('');
    $('#id-causas-riesgo').val('');
    $('#id-respuesta-riesgo').val('');
    $('#id-medidas-preventivas-riesgo').val('');
    $('#id-descripcion-breve-riesgo').attr('data-row-number', '');
}

function calcular_severidad(probabilidad, impacto) {
    //Calcula un valor numerico para la severidad de un riesgo
    var valor_probabilidad = {
        'Baja': 1,
        'Media': 2,
        'Alta': 3
    };

    var valor_impacto = {
        'Bajo': 1,
        'Medio': 2,
        'Alto': 3
    };
    return valor_probabilidad[probabilidad] * valor_impacto[impacto];
}

function _agregar_editar_equipo_trabajo() {
    //Agrega a la tabla de equipo de trabajo o edita
    var nombre = $('#id-select-equipo-trabajo option:selected').text();
    var id = $('#id-select-equipo-trabajo option:selected').val();
    var puesto = $('#id-select-equipo-trabajo option:selected').attr('data-puesto');
    var row_number = $('#id-select-equipo-trabajo').attr('data-row-number');


    if (row_number === '') {
        var cell_nombre = '<td name="nombre-empleado" data-id-empleado = "' + id + '">' + nombre + '</td>';
        var cell_cargo = '<td name="cargo-empleado">' + puesto + '</td>';
        var cell_acciones = '<td class="text-center"><span class="table-icons"><i data-toggle="tooltip" class="fa fa-edit editar-personal" data-placement="left" title="Editar"></i>&nbsp;&nbsp;<i data-toggle="tooltip" class="fa fa-remove remover-fila-tabla" title="Eliminar" data-placement="left"></i></span></td>';

        $('#id-tbl-visible-equipo').append(
            `<tr>${cell_nombre}${cell_cargo}${cell_acciones}</tr>`
        );

        var rowCount = $('#id-tbl-visible-equipo tr').length.toString();
        $('#id-tbl-visible-equipo tr').last().attr('data-row-number', rowCount);

    } else {
        var table_row = $('#id-tbl-visible-equipo tr[data-row-number=\'' + row_number + '\']');
        $(table_row).children('td').eq(0).text(nombre);
        $(table_row).children('td').eq(0).attr('data-id-empleado', id);
        $(table_row).children('td').eq(1).text(puesto);
    }

    enable_tooltips();
}

function _agregar_editar_personal_interesado() {
    //Agrega o edita a la tabla de personal interesado
    var nombre = $('#id-select-personal-interesado option:selected').text();
    var id = $('#id-select-personal-interesado option:selected').val();
    var puesto = $('#id-select-personal-interesado option:selected').attr('data-unidad');
    var row_number = $('#id-select-personal-interesado').attr('data-row-number');


    if (row_number === '') {
        var cell_nombre = '<td name="nombre-interesado" data-id-empleado = "' + id + '">' + nombre + '</td>';
        var cell_cargo = '<td name="unidad-interesado">' + puesto + '</td>';
        var cell_acciones = '<td class="text-center"><span class="table-icons"><i data-toggle="tooltip" class="fa fa-edit editar-interesado" data-placement="left" title="Editar"></i>&nbsp;&nbsp;<i data-toggle="tooltip" class="fa fa-remove remover-fila-tabla" title="Eliminar" data-placement="left"></i></span></td>';

        $('#id-tbl-visible-interesados').append(
            `<tr>${cell_nombre}${cell_cargo}${cell_acciones}</tr>`
        );

        var rowCount = $('#id-tbl-visible-interesados tr').length.toString();
        $('#id-tbl-visible-interesados tr').last().attr('data-row-number', rowCount);

    } else {
        var table_row = $('#id-tbl-visible-interesados tr[data-row-number=\'' + row_number + '\']');
        $(table_row).children('td').eq(0).text(nombre);
        $(table_row).children('td').eq(0).attr('data-id-interesado', id);
        $(table_row).children('td').eq(1).text(puesto);
    }

    enable_tooltips();
}

function _agregar_editar_riesgo() {
    //Agrega o edita a la tabla de riesgos
    var descripcion_breve = $('#id-descripcion-breve-riesgo').val().trim();
    var tipo_riesgo = $('#id-tipo-riesgo option:selected').val();
    var id_proceso_detecta = $('#id-proceso-detecta option:selected').val();
    var probabilidad = $('#id-probabilidad-ocurrencia option:selected').val();
    var impacto = $('#id-impacto-riesgo option:selected').val();
    var descripcion_detallada = $('#id-descripcion-detallada-riesgo').val().trim();
    var causas_principales = $('#id-causas-riesgo').val().trim();
    var respuesta_inicial = $('#id-respuesta-riesgo').val().trim();
    var medidas_preventivas = $('#id-medidas-preventivas-riesgo').val().trim();
    var severidad = calcular_severidad(probabilidad, impacto);
    var row_number = $('#id-descripcion-breve-riesgo').attr('data-row-number');

    //Las classes para agregar a los pills del riesgo
    var pill_classes = {
        Alto: 'badge-danger',
        Medio: 'badge-warning',
        Bajo: 'badge-success',
        Alta: 'badge-danger',
        Media: 'badge-warning',
        Baja: 'badge-success'
    };

    //Determina la class para el boton del riesgo
    var dot_class;
    if (severidad <= 2) {
        dot_class = 'risk-dot-green';
    } else if (severidad <= 3) {
        dot_class = 'risk-dot-yellow';
    } else {
        dot_class = 'risk-dot-red';
    }

    if (descripcion_breve === '' || respuesta_inicial === '' || medidas_preventivas === '' || causas_principales === '') {
        alert('Porfavor llenar todos los espacios. Todos son obligatorios a excepcion de la descripcion detallada.');
        return;
    }

    if (row_number === '') {

        var cell_riesgo = '<td name="nombre-riesgo"><span><i class="fa fa-dot-circle-o ' + dot_class + '"></i> ' + descripcion_breve + '</span></td>';
        var cell_probabilidad = '<td class="text-center"><span class="badge badge-pill ' + pill_classes[probabilidad] + ' text-center" name="probabilidad-ocurrencia-riesgo">' + probabilidad + '</span></td>';
        var cell_impacto = '<td class="text-center"><span class="badge badge-pill ' + pill_classes[impacto] + '" name="impacto-riesgo">' + impacto + '</span></td>';
        var cell_icons = '<td class="text-center"><span class="table-icons"><i data-toggle="tooltip" class="fa fa-eye" title="Ver detalle"  data-placement="left"></i>&nbsp;&nbsp;<i data-toggle="tooltip" class="fa fa-edit editar-riesgo" title="Editar"  data-placement="left"></i>&nbsp;&nbsp;<i data-toggle="tooltip" class="fa fa-remove remover-fila-tabla" title="Eliminar"  data-placement="left"></i>&nbsp;&nbsp;</span></td>';

        //Agrega la fila al final de la tabla
        $('#id-tbl-visible-riesgos').append(
            `<tr>${cell_riesgo}${cell_probabilidad}${cell_impacto}${cell_icons}</tr>`
        );

        //Cuenta el numero de rows y lo añade al atributo de la ultima fila
        var rowCount = $('#id-tbl-visible-riesgos tr').length.toString();
        $('#id-tbl-visible-riesgos tr').last().attr('data-row-number', rowCount);
        $('#id-tbl-visible-riesgos tr').last().attr('data-tipo-riesgo', tipo_riesgo);
        $('#id-tbl-visible-riesgos tr').last().attr('data-id-proceso-detecta', id_proceso_detecta);
        $('#id-tbl-visible-riesgos tr').last().attr('data-descripcion-detallada', descripcion_detallada);
        $('#id-tbl-visible-riesgos tr').last().attr('data-causas-principales', causas_principales);
        $('#id-tbl-visible-riesgos tr').last().attr('data-medidas-preventivas', medidas_preventivas);
        $('#id-tbl-visible-riesgos tr').last().attr('data-respuesta-inicial', respuesta_inicial);

        //Habilita los tooltips para la fila recien agregada
        enable_tooltips();
    } else {
        //Agrega los nuevos valores a la tabla existente

        //El row de la tabla que estamos editando
        var table_row = $('#id-tbl-visible-riesgos tr[data-row-number="' + row_number + '"]');

        //Remueve las classes de los pills y del boton
        $(table_row).children('td').eq(1).find('span').removeClass('badge-danger');
        $(table_row).children('td').eq(1).find('span').removeClass('badge-warning');
        $(table_row).children('td').eq(1).find('span').removeClass('badge-success');
        $(table_row).children('td').eq(2).find('span').removeClass('badge-danger');
        $(table_row).children('td').eq(2).find('span').removeClass('badge-warning');
        $(table_row).children('td').eq(2).find('span').removeClass('badge-success');
        $(table_row).children('td').eq(0).find('i').removeClass('risk-dot-green');
        $(table_row).children('td').eq(0).find('i').removeClass('risk-dot-yellow');
        $(table_row).children('td').eq(0).find('i').removeClass('risk-dot-red');

        //Agrega la class adecuada a los pills y al boton
        $(table_row).children('td').eq(0).find('i').addClass(dot_class);
        $(table_row).children('td').eq(1).find('span').addClass(pill_classes[probabilidad]);
        $(table_row).children('td').eq(2).find('span').addClass(pill_classes[impacto]);

        //Guarda la informacion necesaria
        $(table_row).attr('data-tipo-riesgo', tipo_riesgo);
        $(table_row).attr('data-id-proceso-detecta', id_proceso_detecta);
        $(table_row).attr('data-descripcion-detallada', descripcion_detallada);
        $(table_row).attr('data-causas-principales', causas_principales);
        $(table_row).attr('data-medidas-preventivas', medidas_preventivas);
        $(table_row).attr('data-respuesta-inicial', respuesta_inicial);
        $(table_row).children('td').eq(0).contents().eq(1).text(descripcion_breve);
        $(table_row).children('td').eq(1).find('span').text(probabilidad);
        $(table_row).children('td').eq(2).find('span').text(impacto);

    }
    //Limpia el modal
    _clean_riesgos_modal();
}

function _agregar_editar_contratista() {
    //Agrega o edita la tabla de contratistas
    var nombre_contratista = $('#id-select-listado-contratistas option:selected').text();
    var id_contratista = $('#id-select-listado-contratistas').val();
    var porcentaje_evaluacion = $('#id-porcentaje-evaluacion').val();
    var criterio_seleccion = ($('#id-criterio-selecccion-contratista').val()).trim();
    var tipo_contratista = $('#id-tipo-contratista').val();
    var row_number = $('#id-select-listado-contratistas').attr('data-row-number');

    if (nombre_contratista === '') {
        alert('Porfavor elegir un contratista');
        return;
    }

    if (row_number === '') {
        var cell_nombre_contratista = '<td name="nombre-contratista" data-id-contratista=' + id_contratista + '>' + nombre_contratista + '</td>';
        var cell_porcentaje = '<td>' + porcentaje_evaluacion + '</td>';
        var cell_tipo_contratista = '<td>' + tipo_contratista + '</td>';
        var cell_criterio = '<td name="criterio-seleccion">' + criterio_seleccion + '</td>';
        var cell_icons = '<td class="text-center"><span class="table-icons"><i class="fa fa-edit editar-contratistas" data-toggle="tooltip" data-placement="left" title="Editar"></i>&nbsp;&nbsp;<i class="fa fa-remove remover-fila-tabla" data-toggle="tooltip" title="Eliminar" data-placement="left"></i></span></td>';

        //Agrega la fila al final de la tabla
        $('#id-tbl-visible-contratistas').append(
            '<tr>' + cell_nombre_contratista + cell_porcentaje + cell_tipo_contratista + cell_criterio + cell_icons + '</tr>'
        );

        //Cuenta el numero de rows y lo añade al atributo de la ultima fila
        var rowCount = $('#id-tbl-visible-contratistas tr').length.toString();
        $('#id-tbl-visible-contratistas tr').last().attr('data-row-number', rowCount);

        //Habilita los tooltips para la fila recien agregada
        enable_tooltips();

    } else {
        var table_row = $('#id-tbl-visible-contratistas tr[data-row-number=\'' + row_number + '\']');
        $(table_row).children('td').eq(0).attr('data-id-contratista', id_contratista);
        $(table_row).children('td').eq(0).text(nombre_contratista);
        $(table_row).children('td').eq(1).text(porcentaje_evaluacion);
        $(table_row).children('td').eq(2).text(tipo_contratista);
        $(table_row).children('td').eq(3).text(criterio_seleccion);
    }

    _clean_contratistas_modal();
    $('#modal-contratistas').modal('toggle');
}

function _borrar_fila(e) {
    var table_cell = e.target;
    var table_row = $(table_cell).closest('tr');
    $(table_cell).tooltip('dispose');
    $(table_row).remove();
}

function _editar_contratista(e) {
    //Abre el modal de contratistas con los valores de la tabla.
    var table_cell = e.target;
    var table_row = $(table_cell).closest('tr');
    var real_table_row = $(table_row).data('row-number');

    //Guarda el id y el criterio de la fila
    var contratista_id = $(table_row).children('td').eq(0).attr('data-id-contratista');
    var criterio = $(table_row).children().eq(3).text();

    //Guarda el data row que se esta editando en un atributo
    $('#id-select-listado-contratistas').attr('data-row-number', real_table_row);

    //Llena el modal con los datos de la fila y hace el AJAX call para actualizar el tipo de contratista
    $('#id-select-listado-contratistas').val(contratista_id);
    $('#id-criterio-selecccion-contratista').val(criterio);
    get_data_contratista();

    //Muestra el modal
    $('#modal-contratistas').modal();
}


function _editar_equipo_trabajo(e){
    //Abre el modal del equipo de trabajo con los valores de la tabla.
    var table_cell = e.target;
    var table_row = $(table_cell).closest('tr');
    var real_table_row = $(table_row).data('row-number');

    //Guarda el id y el criterio de la fila
    var empleado_id = $(table_row).children('td').eq(0).attr('data-id-empleado');

    //Guarda el data row que se esta editando en un atributo
    $('#id-select-equipo-trabajo').attr('data-row-number', real_table_row);

    //Llena el modal con los datos de la fila
    $('#id-select-equipo-trabajo').val(empleado_id);

    //Muestra el modal
    $('#modal-equipo').modal();
}

function _editar_interesados(e) {
    //Abre el modal del equipo de trabajo con los valores de la tabla.
    var table_cell = e.target;
    var table_row = $(table_cell).closest('tr');
    var real_table_row = $(table_row).data('row-number');

    //Guarda el id y el criterio de la fila
    var empleado_id = $(table_row).children('td').eq(0).attr('data-id-intereado');

    //Guarda el data row que se esta editando en un atributo
    $('#id-select-personal-interesado').attr('data-row-number', real_table_row);

    //Llena el modal con los datos de la fila
    $('#id-select-personal-interesado option:selected').val(empleado_id);

    //Muestra el modal
    $('#modal-interesados').modal();
}


function _editar_riesgos(e) {
    //Abre el modal del equipo de trabajo con los valores de la tabla.
    var table_cell = e.target;
    var table_row = $(table_cell).closest('tr');

    //La informacion de la tabla que va a ser trasladada al modal.
    var descripcion_breve = $(table_row).children('td').eq(0).text();
    var tipo_riesgo = $(table_row).attr('data-tipo-riesgo');
    var id_proceso_detecta = $(table_row).attr('data-id-proceso-detecta');
    var probabilidad = $(table_row).children('td').eq(1).text();
    var impacto = $(table_row).children('td').eq(2).text();
    var descripcion_detallada = $(table_row).attr('data-descripcion-detallada');
    var causas_principales = $(table_row).attr('data-causas-principales');
    var respuesta_inicial = $(table_row).attr('data-medidas-preventivas');
    var medidas_preventivas = $(table_row).attr('data-respuesta-inicial');
    var real_table_row = $(table_row).data('row-number');

    //Guarda el data row que se esta editando en un atributo
    $('#id-descripcion-breve-riesgo').attr('data-row-number', real_table_row);
    $('#id-descripcion-breve-riesgo').val(descripcion_breve);
    $('#id-tipo-riesgo').val(tipo_riesgo);
    $('#id-proceso-detecta').val(id_proceso_detecta);
    $('#id-probabilidad-ocurrencia').val(probabilidad);
    $('#id-impacto-riesgo').val(impacto);
    $('#id-descripcion-detallada-riesgo').val(descripcion_detallada);
    $('#id-causas-riesgo').val(causas_principales);
    $('#id-respuesta-riesgo').val(respuesta_inicial);
    $('#id-medidas-preventivas-riesgo').val(medidas_preventivas);

    //Muestra el modal
    $('#modal-agregar-riesgos').modal();
}

  