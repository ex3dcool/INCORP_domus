// === voz_debug.js ===
// Cliente WebSocket para VOSK + captura de micrófono + debug completo

const socket = new WebSocket("ws://localhost:2700");

socket.onopen = () => {
    console.log("✅ Conectado al servidor VOSK");

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        console.log("🎤 Permiso de micrófono concedido");
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(250);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0 && socket.readyState === 1) {
                console.log("🎧 Blob capturado:", event.data);
                event.data.arrayBuffer().then(buffer => {
                    console.log("📤 Enviando audio al servidor...");
                    socket.send(buffer);
                });
            } else {
                console.warn("⚠️ Blob vacío o socket cerrado");
            }
        };

        mediaRecorder.onerror = (err) => {
            console.error("🚫 Error en MediaRecorder:", err);
        };

        console.log("🔄 MediaRecorder iniciado (cada 250ms)");

    }).catch(err => {
        console.error("🚫 No se pudo acceder al micrófono:", err);
    });
};

socket.onerror = (error) => {
    console.error("❌ Error de WebSocket:", error);
};

socket.onclose = () => {
    console.warn("🔌 WebSocket cerrado");
};

socket.onmessage = function (event) {
    console.log("📩 Mensaje recibido del servidor:", event.data);

    let textoFinal = "";

    try {
        const respuesta = JSON.parse(event.data);
        if (respuesta.partial) {
            console.log("📝 Parcial:", respuesta.partial);
            textoFinal = respuesta.partial;
        }
        if (respuesta.text) {
            console.log("✅ Texto final:", respuesta.text);
            textoFinal = respuesta.text;
        }
    } catch (e) {
        console.warn("⚠️ No se pudo parsear JSON:", event.data);
        textoFinal = event.data;
    }

    const texto = textoFinal.toLowerCase().trim();

    if (texto.length > 0) {
        if (reconocimientoTemporal && campoObjetivo) {
            campoObjetivo.value = texto;
            campoObjetivo = null;
            reconocimientoTemporal = false;
            console.log("✅ Campo específico actualizado por voz.");
            return;
        }

        console.log("🔍 Analizando comando:", texto);
        procesarComando(texto);
    } else {
        console.log("ℹ️ No hay texto útil aún.");
    }
};

// === Diccionario de comandos globales ===
function procesarComando(texto) {
    for (const clave in comandosVoz) {
        if (clave.includes("*")) {
            const base = clave.split("*")[0].trim();
            if (texto.startsWith(base)) {
                const valor = texto.replace(base, "").trim();
                console.log(`🎯 Comando detectado: "${clave}" ➜ Valor: "${valor}"`);
                comandosVoz[clave](valor);
                return;
            }
        } else if (texto === clave) {
            console.log(`🎯 Comando exacto detectado: "${clave}"`);
            comandosVoz[clave]();
            return;
        }
    }
    console.warn("🛑 Comando no reconocido:", texto);
}

// === Variables globales para escucha dirigida ===
let campoObjetivo = null;
let reconocimientoTemporal = false;

// === Activador manual desde botón 🎤 ===
function escucharCampo(idCampo) {
    const input = document.getElementById(idCampo);
    if (!input) {
        console.error(`❌ Campo con id '${idCampo}' no encontrado`);
        return;
    }

    campoObjetivo = input;
    reconocimientoTemporal = true;

    console.log(`🎧 Escuchando para llenar: ${idCampo}`);
}
