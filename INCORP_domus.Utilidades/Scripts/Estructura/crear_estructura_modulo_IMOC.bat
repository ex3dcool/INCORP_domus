@echo off
set /p modulo=Ingrese el nombre del modulo:
powershell -ExecutionPolicy Bypass -File "C:\PROSIS\INCORP_domus\INCORP_domus.Utilidades\Scripts\Estructura\crear_estructura_modulo_IMOC.ps1" -Modulo %modulo%
pause
