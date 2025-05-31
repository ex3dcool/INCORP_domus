$NombreModulo = $args[0]

if (-not $NombreModulo) {
    Write-Host "ERROR: Debes ingresar un nombre de modulo."
    exit 1
}

$readmePath = Resolve-Path "$PSScriptRoot\..\..\..\README.md"

if (-not (Test-Path $readmePath)) {
    Write-Host "README.md no fue encontrado en la raiz del proyecto."
    exit
}

$content = Get-Content $readmePath

$indice = $content.FindIndex({ $_ -match "## Avances" })
if ($indice -ge 0) {
    $content.Insert($indice + 1, "- [ ] $NombreModulo")
    $content | Set-Content $readmePath -Encoding UTF8
    Write-Host "Modulo agregado: $NombreModulo"
} else {
    Write-Host "No se encontro la seccion de avances en README.md"
}