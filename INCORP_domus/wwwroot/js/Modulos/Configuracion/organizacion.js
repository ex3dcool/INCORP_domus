let datatable;

function inicializarTabla() {
    const tabla = document.getElementById("tblDatos");
    if (tabla) {
        loadDataTable();
    } else {
        console.warn("⚠️ No se encontró #tblDatos al cargar DataTable.");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarTabla);
} else {
    inicializarTabla();
}

function loadDataTable() {
    datatable = $('#tblDatos').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ Registros por Página",
            "zeroRecords": "Ningún Registro",
            "info": "Mostrar página _PAGE_ de _PAGES_",
            "infoEmpty": "no hay registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },

        "ajax": {
            "url": "/Admin/Organizacion/ObtenerTodos",
            "type": "GET",
            "dataSrc": function (json) {
                console.log("🔍 Datos recibidos del servidor:", json);
                return json.data;
            }
        },

        "columns": [
            { "data": "id_organizacion", "visible": false },
            { "data": "codigo", "width": "10%" },
            { "data": "nombre", "width": "30%" },
            { "data": "descripcion", "width": "30%" },
            {
                "data": "estado",
                "render": function (data) {
                    return (data == 1 || data === true) ? "Activo" : "Inactivo";
                },
                "width": "10%"
            },
            {
                "data": "id_organizacion",
                "render": function (data) {
                    return `
                    <div class="d-flex order-actions">
                        <a href="/Admin/Organizacion/OrganizacionUpsert?id=${data}" class="me-2">
                            <i class='bx bxs-edit' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Editar"></i>
                        </a>
                        <a onclick=Delete("/Admin/Organizacion/Delete/${data}")>
                            <i class='bx bxs-trash' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Eliminar"></i>
                        </a>
                    </div>
                    `;
                },
                "width": "15%"
            }
        ],

        // ✅ ORDENACIÓN por código ascendente
        "order": [[0, "desc"]],

        "drawCallback": function () {
            inicializarTooltips();
        }
    });
}


function Delete(url) {
    swal({
        title: "¿Realmente está seguro de eliminar esta Organización?",
        text: "Este registro no se podrá recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((borrar) => {
        if (borrar) {
            $.ajax({
                type: "POST",
                url: url,
                success: function (data) {
                    if (data.success) {
                        Lobibox.notify('error', {
                            pauseDelayOnHover: true,
                            continueDelayOnInactiveTab: false,
                            position: 'top right',
                            icon: 'bx bx-trash',
                            size: 'mini',
                            rounded: true,
                            delay: 7000,
                            msg: data.message,
                            title: '¡Organización eliminada!'
                        });

                        datatable.ajax.reload();
                    } else {
                        Lobibox.notify('error', {
                            position: 'top right',
                            icon: 'bx bx-x-circle',
                            msg: data.message,
                            title: 'Error al eliminar',
                            delay: 7000,
                            size: 'mini',
                            rounded: true
                        });
                    }
                }
            })
        }
    });
}


function inicializarTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

