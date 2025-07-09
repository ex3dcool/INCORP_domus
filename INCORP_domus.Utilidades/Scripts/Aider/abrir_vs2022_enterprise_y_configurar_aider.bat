@echo off
REM Abre Visual Studio 2022 Enterprise
start "" "C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\devenv.exe"

REM Pausa para dar tiempo a abrir VS antes de cargar el entorno (opcional)
timeout /t 5 >nul

REM Ejecuta el script de configuración de la API KEY en una nueva ventana de PowerShell
start powershell -NoExit -ExecutionPolicy Bypass -File "configurar_openai_aider.ps1"
