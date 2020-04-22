/*globals $, */
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^_" }]*/

$(document).ready(function () { 
    $('#id-btn-guardar-usuario-1').click(function () {
        var form = $('#id-form-nuevo-empleado');
        form.submit();
        form.reset();
    });
});
