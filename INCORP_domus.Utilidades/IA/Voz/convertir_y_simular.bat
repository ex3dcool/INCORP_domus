@echo off
echo 🎙 Convirtiendo sonidoPrueba.wav a formato compatible...
ffmpeg -y -i "C:\PROSIS\INCORP_domus\INCORP_domus\DatosPrueba\Audio\sonidoPrueba.wav" -ac 1 -ar 16000 -sample_fmt s16 "C:\PROSIS\INCORP_domus\INCORP_domus\DatosPrueba\Audio\sonidoPrueba_convertido.wav"

if %errorlevel% neq 0 (
    echo ❌ Error al convertir el archivo con ffmpeg.
    pause
    exit /b
)

echo 🧠 Ejecutando simulacion con simular_voz.py...
timeout /t 1 >nul

python simular_voz.py

pause
