@echo off
setlocal

echo ===========================
echo FLUJO COMPLETO IMOC 3.0 + SCAFFOLD + AIDER
echo ===========================

REM Solicitar nombre del modulo
set /p NOMBRE_MODULO=Ingrese el nombre del modulo (PascalCase): 

REM Validar que se ingreso un nombre
if "%NOMBRE_MODULO%"=="" (
    echo ERROR: Debes ingresar un nombre de modulo.
    exit /b
)

REM Ejecutar scripts del flujo IMOC
echo.
echo ► Creando estructura base del modulo...
powershell -ExecutionPolicy Bypass -File "INCORP_domus.Utilidades\Scripts\Estructura\crear_modulo_IMOC.ps1" -NombreModulo %NOMBRE_MODULO%

echo.
echo ► Moviendo archivos si existen...
powershell -ExecutionPolicy Bypass -File "INCORP_domus.Utilidades\Scripts\Estructura\mover_a_estructura_IMOC.ps1" -NombreModulo %NOMBRE_MODULO%

echo.
echo ► Actualizando namespaces...
powershell -ExecutionPolicy Bypass -File "INCORP_domus.Utilidades\Scripts\Estructura\actualizar_namespaces_IMOC.ps1" -NombreModulo %NOMBRE_MODULO%

REM Ejecutar scaffolding
echo.
echo ► Ejecutando Scaffolding para el modulo...
powershell -ExecutionPolicy Bypass -File "INCORP_domus.Utilidades\Scripts\Scaffolding\scaffold_modulo_imoc3_20250603.ps1" -NombreModulo %NOMBRE_MODULO%

REM Lanzar Aider
echo.
echo ► Lanzando Aider...
call "INCORP_domus.Utilidades\Scripts\Aider\lanzar_aider.bat"

endlocal
pause
