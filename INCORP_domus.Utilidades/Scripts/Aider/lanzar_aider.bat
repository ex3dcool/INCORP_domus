@echo off
echo ===========================
echo Lanzando Aider con db INCORP_domus (DashTrans, IMOC 3.0, DB, Layout, Vistas)
echo ===========================

aider ^
  INCORP_domus.Utilidades\Aider\XCA_flujo.md ^
  INCORP_domus.Utilidades\Aider\contexto_domus.md ^
  INCORP_domus.Utilidades\Aider\dashtrans_origen.md ^
  INCORP_domus.Utilidades\Aider\estructura_bd.sql ^
  INCORP_domus.Utilidades\Aider\estructura_resumen.txt ^
  INCORP_domus.Utilidades\Aider\metodologia_IMOC3.md ^
  INCORP_domus.Utilidades\Aider\comando_ejecucion_domus.md ^
  INCORP_domus\Program.cs ^
  INCORP_domus\Views\Shared\_Layout.cshtml ^
  INCORP_domus\Views\Home\Index.cshtml ^
  INCORP_domus\Views\Admin\Dashboard.cshtml