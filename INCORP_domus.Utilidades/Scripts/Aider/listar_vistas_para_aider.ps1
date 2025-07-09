# listar_vistas_para_aider.ps1
# ---------------------------------------------
# Script de utilidad para listar automáticamente
# todos los archivos .cshtml dentro de la carpeta Views/
# del proyecto INCORP_domus, siguiendo la estructura IMOC 3.0
# ---------------------------------------------

# Ruta base (ajusta si cambias la estructura del proyecto)
$basePath = "..\..\..\INCORP_domus\Views"

# Buscar todos los archivos .cshtml en Views y subcarpetas
Get-ChildItem -Path $basePath -Recurse -Filter *.cshtml | ForEach-Object {
    $_.FullName.Replace((Resolve-Path "$basePath\..\..\..").Path + "\", "") + " ^"
}
