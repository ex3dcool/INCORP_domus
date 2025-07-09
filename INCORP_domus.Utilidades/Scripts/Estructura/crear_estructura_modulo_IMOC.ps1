param (
    [Parameter(Mandatory = $true)]
    [string]$Modulo
)

$baseModelos = "C:\PROSIS\INCORP_domus\INCORP_domus.Modelos\Modulos\$Modulo"
$baseDatos = "C:\PROSIS\INCORP_domus\INCORP_domus.AccesoDatos\Modulos\$Modulo"

$paths = @(
    "$baseModelos\Modelos",
    "$baseModelos\Validaciones",
    "$baseModelos\ViewModels",
    "$baseDatos\DbContext",
    "$baseDatos\Repositorio\Interfaces",
    "$baseDatos\Repositorio\Implementaciones"
)

foreach ($path in $paths) {
    if (-Not (Test-Path -Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
        Write-Output "Carpeta creada: $path"
    } else {
        Write-Output "Carpeta ya existe: $path"
    }
}

Write-Host ""
Write-Host "**************************************"
Write-Host "Recuerde incluir manualmente las carpetas generadas en los proyectos INCORP_domus.Modelos e INCORP_domus.AccesoDatos desde Visual Studio si aun no aparecen."
Write-Host "**************************************"
