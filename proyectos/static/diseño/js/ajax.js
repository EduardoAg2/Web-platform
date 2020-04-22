/*globals $, contratistas_url*/


function get_data_contratista() {
    //Extrae la informacion del contratista
    var id_contratista = $('#id-select-listado-contratistas').val();
    var area_contratista = $('#id-tipo-contratista');

    $.ajax({
        url: contratistas_url,
        data: {
            'id_contratista': id_contratista
        },
        dataType: 'json',
        success: function (datos_contratista) {
            area_contratista.val(datos_contratista.area);
        }
    });
}

//AJAX request de la data del contratista
$('#id-select-listado-contratistas').change(function () {
    get_data_contratista();
});
