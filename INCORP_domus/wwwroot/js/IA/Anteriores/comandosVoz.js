// Diccionario de comandos de voz para OrganizacionUpsert

const comandosVoz = {
    "guardar": () => {
        const boton = document.getElementById("btnGuardar");
        if (boton) {
            console.log("🖱 Ejecutando botón guardar");
            boton.click();
        } else {
            console.warn("⚠️ No se encontró el botón con id 'btnGuardar'");
        }
    },
    "nombre *": (valor) => {
        document.getElementById("nombre").value = valor;
        console.log("📝 Nombre:", valor);
    },
    "dirección *": (valor) => {
        document.getElementById("direccion").value = valor;
        console.log("📝 Dirección:", valor);
    },
    "descripción *": (valor) => {
        document.getElementById("descripcion").value = valor;
        console.log("📝 Descripción:", valor);
    }
};
