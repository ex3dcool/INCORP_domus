import wave, asyncio, websockets
import os

async def enviar_audio():
    uri = "ws://localhost:2700"
    ruta_audio = r"C:\PROSIS\INCORP_domus\INCORP_domus\DatosPrueba\Audio\sonidoPrueba_convertido.wav"

    async with websockets.connect(uri) as websocket:
        with wave.open(ruta_audio, "rb") as wf:
            while True:
                data = wf.readframes(4000)
                if len(data) == 0:
                    break
                await websocket.send(data)
                await asyncio.sleep(0.1)
        await asyncio.sleep(1)

asyncio.run(enviar_audio())







