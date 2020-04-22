/*globals $, _editar_contratista, _editar_equipo_trabajo, _editar_interesados
_editar_riesgos, _clean_contratistas_modal, _clean_riesgos_modal, _agregar_editar_contratista, _agregar_editar_riesgo
_agregar_editar_equipo_trabajo, _agregar_editar_personal_interesado, _borrar_fila*/

$(document).ready(function () {
    //Quita el contratista default
    $('#id-select-listado-contratistas').val(-1);

    //Evento para editar una fila de los contratistas
    $('#id-tbl-visible-contratistas').on('click', '.editar-contratistas', _editar_contratista);

    //Evento para editar una fila del equipo de trabajo
    $('#id-tbl-visible-equipo').on('click', '.editar-personal', _editar_equipo_trabajo);

    //Evento para editar una fila de los interesados
    $('#id-tbl-visible-interesados').on('click', '.editar-interesado', _editar_interesados);

    //Evento para editar una fila de los riesgos
    $('#id-tbl-visible-riesgos').on('click', '.editar-riesgo', _editar_riesgos);

    //Evento para limpiar el modal de contratistas cuando se cierra
    $('#modal-contratistas').on('hidden.bs.modal', function () {
        _clean_contratistas_modal();
    });

    $('#modal-agregar-riesgos').on('hidden.bs.modal', function () {
        _clean_riesgos_modal();
    });

    //Evento para agregar un contratista
    $(document).on('click', '#id-btn-agregar-contratista-tabla', function () {
        _agregar_editar_contratista();
    });

    //Evento para agregar un riesgo
    $(document).on('click', '#id-btn-agregar-riesgo-tabla', function () {
        _agregar_editar_riesgo();
    });

    //Evento para agregar al equipo de trabajo
    $(document).on('click', '#id-btn-agregar-equipo-tabla', function () {
        _agregar_editar_equipo_trabajo();
    });

    //Evento para agregar al equipo de trabajo
    $(document).on('click', '#id-btn-agregar-interesado-tabla', function () {
        _agregar_editar_personal_interesado();
    });

    //Evento para borrar la fila del riesgo
    $(document).on('click', '.remover-fila-tabla', _borrar_fila);
});