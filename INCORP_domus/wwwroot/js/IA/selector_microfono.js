
// selector_microfono.js
// Muestra la lista de dispositivos de entrada (micrófonos) y permite seleccionar uno

let dispositivoSeleccionado = null;

async function listarMicrofonos() {
    try {
        const dispositivos = await navigator.mediaDevices.enumerateDevices();
        const microfonos = dispositivos.filter(d => d.kind === 'audioinput');

        const selector = document.getElementById('selectorMicrofono');
        selector.innerHTML = '';

        microfonos.forEach((microfono, index) => {
            const opcion = document.createElement('option');
            opcion.value = microfono.deviceId;
            opcion.text = microfono.label || `Micrófono ${index + 1}`;
            selector.appendChild(opcion);
        });

        if (microfonos.length > 0) {
            dispositivoSeleccionado = microfonos[0].deviceId;
            selector.value = dispositivoSeleccionado;
        }

        selector.addEventListener('change', (event) => {
            dispositivoSeleccionado = event.target.value;
            console.log("🎤 Micrófono seleccionado:", event.target.selectedOptions[0].text);
        });

    } catch (error) {
        console.error("❌ Error al listar los micrófonos:", error);
    }
}

// Llamar automáticamente al cargar
window.addEventListener('DOMContentLoaded', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        listarMicrofonos();
    } else {
        console.warn("⚠️ La API de dispositivos no es compatible con este navegador.");
    }
});
