@echo off
cd /d C:\PROSIS\INCORP_domus\INCORP_domus.Utilidades\IA\Voz
echo Iniciando servidor VOSK con modelo grande (vosk-model-es-0.42)...
python "C:\PROSIS\INCORP_domus\INCORP_domus.Utilidades\IA\Voz\vosk_server_con_selector.py" --modelo modelo/vosk-model-es-0.42
pause
