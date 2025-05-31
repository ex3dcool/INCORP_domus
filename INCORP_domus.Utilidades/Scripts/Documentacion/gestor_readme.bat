@echo off
setlocal

echo ===========================
echo GESTOR DE README.md - IMOC 3.0
echo ===========================
echo.
echo 1. Editar README.md
echo 2. Agregar modulo a README.md
echo.

set /p opcion=Selecciona una opcion (1-2): 

if "%opcion%"=="1" (
    powershell -ExecutionPolicy Bypass -File "%~dp0editar_readme.ps1"
    exit /b
)

if "%opcion%"=="2" (
    set /p usermod=Nombre del modulo a agregar: 
    powershell -ExecutionPolicy Bypass -Command "& { . \"%~dp0agregar_modulo_readme.ps1\" \"%usermod%\" }"
    exit /b
)

echo Opcion no valida.