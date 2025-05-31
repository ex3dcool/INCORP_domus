$readmePath = Resolve-Path "$PSScriptRoot\..\..\..\README.md"

if (Test-Path $readmePath) {
    Write-Host "Abriendo README.md para edición manual..."
    notepad.exe $readmePath
} else {
    Write-Host "No se encontró README.md en la raíz de la solución."
}