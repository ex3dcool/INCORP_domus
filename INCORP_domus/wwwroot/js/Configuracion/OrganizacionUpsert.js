$(document).ready(function () {
    console.log("✅ OrganizacionUpsert.js cargado correctamente");
    console.log("📋 Valor en input#codigo al cargar:", $('#codigo').val());

    $('#nombre').focus();

    // 🔁 Enter como Tab: pasar foco al siguiente input o select
    $(document).on('keydown', 'input, select, textarea', function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            const focusables = $('input:visible, select:visible, textarea:visible, button:visible')
                .filter(':not([readonly]):not([disabled])');
            const index = focusables.index(this);

            if (index > -1 && index + 1 < focusables.length) {
                focusables.eq(index + 1).focus();
            }
        }
    });
});
