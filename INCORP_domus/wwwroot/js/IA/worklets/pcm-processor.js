class PCMProcessor extends AudioWorkletProcessor {
    process(inputs) {
        const input = inputs[0];
        if (input.length > 0) {
            const channel = input[0];
            const out = new Int16Array(channel.length);
            for (let i = 0; i < channel.length; i++) {
                const sample = Math.max(-1, Math.min(1, channel[i]));
                out[i] = sample * 32767;
            }

            // ✅ DEBUG: muestra longitud del buffer (solo para testeo)
            this.port.postMessage(out.buffer, [out.buffer]);
            console.log("📦 Enviado desde AudioWorklet - bytes:", out.byteLength);
        } else {
            // 🔴 DEBUG opcional (elimina si no lo querés ver mucho)
            this.port.postMessage("SIN_AUDIO");
        }
        return true;
    }
}

registerProcessor('pcm-processor', PCMProcessor);