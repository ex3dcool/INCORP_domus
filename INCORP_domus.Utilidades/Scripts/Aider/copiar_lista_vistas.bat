@echo off
echo ===========================
echo Generando lista de vistas...
echo ===========================
powershell -ExecutionPolicy Bypass -File "%~dp0listar_vistas_para_aider.ps1" | clip
echo.
echo ✅ Lista de vistas copiada al portapapeles.
echo Puedes pegarla directamente en tu lanzar_aider.bat
pause
