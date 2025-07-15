// === Conexión al WebSocket de VOSK ===
const socket = new WebSocket("ws://localhost:2700");

let mediaRecorder = null;
let audioChunks = [];
let recordingInterval = null;

let campoObjetivo = null;
let reconocimientoTemporal = false;

document.addEventListener("DOMContentLoaded", () => {
    cargarDispositivosEntrada();
});

// === Cargar lista de micrófonos disponibles ===
function cargarDispositivosEntrada() {
    navigator.mediaDevices.enumerateDevices()
        .then(dispositivos => {
            const selector = document.getElementById("selectorMicrofono");
            if (!selector) {
                console.warn("⚠️ No se encontró el elemento 'selectorMicrofono'.");
                return;
            }

            selector.innerHTML = ""; // Limpia opciones anteriores

            dispositivos
                .filter(dispositivo => dispositivo.kind === "audioinput")
                .forEach(dispositivo => {
                    const opcion = document.createElement("option");
                    opcion.value = dispositivo.deviceId;
                    opcion.textContent = dispositivo.label || `Micrófono ${selector.length + 1}`;
                    selector.appendChild(opcion);
                });

            console.log("🎙️ Micrófonos disponibles:", selector.length);
        })
        .catch(error => {
            console.error("🚫 Error al obtener dispositivos de entrada:", error);
        });
}

// === Iniciar grabación con micrófono seleccionado ===
function iniciarGrabacion() {
    const selector = document.getElementById("selectorMicrofono");
    const deviceId = selector?.value;

    if (!deviceId) {
        console.warn("⚠️ No se seleccionó un micrófono.");
        return;
    }

    navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } }
    }).then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0 && socket.readyState === 1) {
                event.data.arrayBuffer().then(buffer => {
                    socket.send(buffer);
                });
            }
        };

        console.log("🎤 Grabación iniciada con dispositivo:", deviceId);

        recordingInterval = setInterval(() => {
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.requestData();
            }
        }, 1000);
    }).catch(err => {
        console.error("🚫 Error accediendo al micrófono:", err);
    });
}

// === Escuchar texto y actualizar campo ===
function escucharCampo(idCampo) {
    const input = document.getElementById(idCampo);
    if (!input) {
        console.error(`❌ Campo con id '${idCampo}' no encontrado`);
        return;
    }

    campoObjetivo = input;
    reconocimientoTemporal = true;

    console.log(`🎧 Escuchando valor para el campo: ${idCampo}...`);
}

// === Diccionario de comandos de voz ===
const comandosVoz = {
    "hola sistema": () => alert("Hola humano 👋"),
    "limpiar campo": () => {
        if (campoObjetivo) campoObjetivo.value = "";
    },
    // Puedes seguir agregando...
};

// === Procesamiento del texto reconocido ===
function procesarComando(texto) {
    for (const clave in comandosVoz) {
        if (clave.includes("*")) {
            const base = clave.split("*")[0].trim();
            if (texto.startsWith(base)) {
                const valor = texto.replace(base, "").trim();
                comandosVoz[clave](valor);
                return;
            }
        } else if (texto === clave) {
            comandosVoz[clave]();
            return;
        }
    }
    console.warn("⚠️ Comando no reconocido:", texto);
}

// === Recepción de datos desde VOSK ===
socket.onopen = () => {
    console.log("🎙️ Conectado a VOSK en ws://localhost:2700");
    iniciarGrabacion();
};

socket.onerror = (error) => {
    console.error("❌ Error de conexión con VOSK:", error);
};

socket.onmessage = function (event) {
    let json = {};
    try {
        json = JSON.parse(event.data);
    } catch (e) {
        return;
    }

    if (json.text) {
        const texto = json.text.toLowerCase().trim();
        console.log("🗣️ Texto reconocido:", texto);

        if (reconocimientoTemporal && campoObjetivo) {
            campoObjetivo.value = texto;
            campoObjetivo = null;
            reconocimientoTemporal = false;
            console.log("✅ Campo actualizado con voz.");
            return;
        }

        procesarComando(texto);
    }
};
