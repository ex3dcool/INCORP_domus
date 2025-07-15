
// comandosVoz_domotica.js
// Comandos avanzados para control domótico por voz en INCORP_domus

const comandosVoz = {
    "encender *": (dispositivo) => {
        console.log("💡 Encendiendo:", dispositivo);
        // Aquí se llamaría a un endpoint o función para encender el dispositivo
        ejecutarAccionDomotica("encender", dispositivo);
    },
    "apagar *": (dispositivo) => {
        console.log("🔌 Apagando:", dispositivo);
        ejecutarAccionDomotica("apagar", dispositivo);
    },
    "subir volumen": () => {
        console.log("🔊 Subiendo volumen");
        ejecutarAccionDomotica("subir_volumen");
    },
    "bajar volumen": () => {
        console.log("🔉 Bajando volumen");
        ejecutarAccionDomotica("bajar_volumen");
    },
    "activar alarma": () => {
        console.log("🚨 Activando alarma");
        ejecutarAccionDomotica("activar_alarma");
    },
    "desactivar alarma": () => {
        console.log("🔕 Desactivando alarma");
        ejecutarAccionDomotica("desactivar_alarma");
    },
    "temperatura *": (valor) => {
        console.log("🌡️ Ajustando temperatura a:", valor);
        ejecutarAccionDomotica("ajustar_temperatura", valor);
    }
};

// Función dummy (se debe reemplazar con la lógica real de integración)
function ejecutarAccionDomotica(accion, parametro = null) {
    console.log(`🛠️ Ejecutando acción: ${accion}` + (parametro ? ` con parámetro: ${parametro}` : ""));
    // Aquí podría ir una llamada fetch/axios/etc.
}
