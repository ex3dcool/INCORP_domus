$(document).ready(function () {
    console.log("✅ OrganizacionUpsert.js cargado correctamente");

    console.log("📋 Valor en input#codigo al cargar:", $('#codigo').val());

    //// Validación básica de campos requeridos
    //$('#form-upsert').submit(function (e) {
    //    let isValid = true;

    //    // Limpiar mensajes de error previos
    //    $('.text-danger').text('');

    //    const codigo = $('#codigo').val().trim();
    //    const nombre = $('#nombre').val().trim();
    //    const descripcion = $('#descripcion').val().trim();
    //    const direccion = $('#direccion').val().trim();
    //    const estado = $('#estado').val();

    //    console.log("📦 Valores recibidos:", { codigo, nombre, descripcion, direccion, estado });


    //    if (!codigo) {
    //        $('#error-codigo').text('⚠️ Código es requerido');
    //        isValid = false;
    //    }

    //    if (!nombre) {
    //        $('#error-nombre').text('⚠️ Nombre es requerido');
    //        isValid = false;
    //    }

    //    if (!estado || estado === "0") {
    //        $('#error-estado').text('⚠️ Estado debe ser seleccionado');
    //        isValid = false;
    //    }

    //    // Si alguna validación falla, prevenir el submit
    //    if (!isValid) {
    //        e.preventDefault();
    //    }
    //});

    // Opcional: puedes cargar datos dinámicos, combos, etc. aquí

    // otras funciones o eventos...


    $(document).ready(function () {
        console.log("✅ OrganizacionUpsert.js cargado correctamente");
    });


    // 👇 Al final del archivo
    console.log("📋 Valor en input#codigo al cargar:", $('#codigo').val());



});
