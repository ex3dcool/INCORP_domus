
@echo off
cd /d %~dp0
echo Instalando dependencias de VOSK...
powershell -ExecutionPolicy Bypass -File instalar_dependencias.ps1
pause
