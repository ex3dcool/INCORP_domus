let audioCtx;
let socket;
let pcmNode;
let source;

async function inicializarMotorVoz() {
    try {
        audioCtx = new AudioContext();

        if (!socket || socket.readyState !== WebSocket.OPEN) {
            socket = new WebSocket("ws://localhost:2700");

            socket.onopen = () => console.log("🟢 WebSocket conectado a VOSK");
            socket.onerror = (e) => console.error("❌ Error en WebSocket:", e);
            socket.onclose = () => console.warn("⚠️ WebSocket cerrado.");
        }

        await audioCtx.audioWorklet.addModule('/js/IA/worklets/pcm-processor.js');
        console.log("✅ AudioWorklet cargado desde /js/IA/worklets/pcm-processor.js");
    } catch (error) {
        console.error("❌ Error al inicializar motor de voz:", error);
    }
}

async function escucharCampo(idCampo) {
    console.log("🎙️ escuchandoCampo:", idCampo);

    try {
        if (!audioCtx || !socket || socket.readyState !== WebSocket.OPEN) {
            console.warn("🔁 Re-inicializando motor de voz...");
            await inicializarMotorVoz();
        }

        const campo = document.getElementById(idCampo);
        if (!campo) {
            console.error("❌ Campo no encontrado:", idCampo);
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("🎤 Micrófono activado correctamente");

        source = audioCtx.createMediaStreamSource(stream);
        pcmNode = new AudioWorkletNode(audioCtx, 'pcm-processor');

        pcmNode.port.onmessage = (event) => {
            if (typeof event.data === "string") {
                console.warn("🔇 AudioWorklet: sin audio capturado");
            } else if (event.data instanceof ArrayBuffer) {
                console.log("📤 Enviando a VOSK: ", event.data.byteLength, "bytes");
                socket.send(event.data);
            }
        };

        socket.onmessage = (msg) => {
            console.log("📩 Respuesta de VOSK:", msg.data);
            const data = JSON.parse(msg.data);
            if (data.text) {
                campo.value = data.text;
                console.log("✍️ Transcripción recibida:", data.text);

                // Detener captura
                stream.getTracks().forEach(t => t.stop());
                pcmNode.disconnect();
                source.disconnect();

                cambiarIconoEscucha(idCampo, false);
            }
        };

        source.connect(pcmNode);

        // 🧠 Creamos destino silencioso para forzar ejecución del process()
        const dummyGain = new GainNode(audioCtx, { gain: 0 });
        pcmNode.connect(dummyGain).connect(audioCtx.destination);

        cambiarIconoEscucha(idCampo, true);

    } catch (err) {
        console.error("❌ Error al escuchar campo:", err);
        cambiarIconoEscucha(idCampo, false);
    }
}
