import argparse
import asyncio
import websockets
import json
import vosk

print("🧪 EJECUTANDO EL ARCHIVO CORRECTO")

# Argumentos por línea de comandos
parser = argparse.ArgumentParser(description='Servidor VOSK para reconocimiento de voz.')
parser.add_argument('--modelo', type=str, default='modelo/vosk-model-small-es-0.42',
                    help='Ruta al modelo VOSK (por defecto: modelo/vosk-model-small-es-0.42)')
args = parser.parse_args()

# Cargar el modelo
print(f"📦 Cargando modelo desde: {args.modelo}")
model = vosk.Model(args.modelo)

# Función de reconocimiento compatible con websockets >=13
async def recognize(websocket):
    print("✔️ recognize() DEFINIDO SIN path – Cliente conectado.")
    rec = vosk.KaldiRecognizer(model, 16000)

    while True:
        try:
            data = await websocket.recv()
            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                print(f"✅ Resultado final: {result.get('text', '')}")
                await websocket.send(result.get("text", ""))
            else:
                partial = json.loads(rec.PartialResult())
                print(f"📝 Parcial: {partial.get('partial', '')}")
                await websocket.send(partial.get("partial", ""))
        except websockets.exceptions.ConnectionClosed:
            print("🔌 Cliente desconectado.")
            break

# Lanzamiento del servidor WebSocket
async def main():
    print("🟢 Servidor VOSK listo en ws://localhost:2700")
    async with websockets.serve(recognize, "localhost", 2700):
        await asyncio.Future()  # mantener servidor corriendo

# Ejecutar
asyncio.run(main())
