@echo off
setlocal enabledelayedexpansion

echo ===========================
echo FLUJO COMPLETO IMOC 3.0 + AIDER
echo ===========================
echo.
set /p modulo=Nombre del modulo (sin espacios): 

if "%modulo%"=="" (
    echo ERROR: Debes ingresar un nombre de modulo.
    exit /b
)

echo.
echo Ejecutando crear_modulo_IMOC.ps1...
powershell -ExecutionPolicy Bypass -File ".\INCORP_domus.Utilidades\Scripts\Estructura\crear_modulo_IMOC.ps1" -NombreModulo %modulo%

echo.
echo Ejecutando mover_a_estructura_IMOC.ps1...
powershell -ExecutionPolicy Bypass -File ".\INCORP_domus.Utilidades\Scripts\Estructura\mover_a_estructura_IMOC.ps1" -NombreModulo %modulo%

echo.
echo Ejecutando actualizar_namespaces_IMOC.ps1...
powershell -ExecutionPolicy Bypass -File ".\INCORP_domus.Utilidades\Scripts\Estructura\actualizar_namespaces_IMOC.ps1" -NombreModulo %modulo%

echo.
echo Lanzando Aider...
powershell -ExecutionPolicy Bypass -File ".\INCORP_domus.Utilidades\Scripts\Aider\lanzar_aider.bat"

echo.
echo Todo listo. CRUD generado y Aider en ejecucion.
pause
