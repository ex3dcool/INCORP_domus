# 🚀 INCORP_domus – Proyecto con Estructura IMOC 3.0

Sistema modular desarrollado bajo el estándar IMOC 3.0 para soluciones domóticas profesionales.

## 📌 Descripción
`INCORP_domus` es un sistema modular que integra interfaces web modernas (DashTrans), comandos de voz, APIs REST y control de dispositivos inteligentes.

## 🧱 Estructura IMOC 3.0
El sistema sigue la arquitectura IMOC 3.0 basada en:
- **I**dentificación: definición de lógica y propósito de cada módulo.
- **M**odelado: estructuras de datos y entidades base.
- **O**ptimización: buenas prácticas de eficiencia y escalabilidad.
- **C**ontrol: validaciones, seguridad y consistencia en datos.

## 🔧 Instalación

### Requisitos:
- Visual Studio 2022
- .NET 9 SDK
- PowerShell habilitado
- SQL Server / PostgreSQL

### Scripts iniciales:
```bash
# Crear estructura del módulo
.\crear_modulo_IMOC.ps1 -NombreModulo Organizacion

# Mover archivos antiguos a la nueva estructura
.\mover_a_estructura_IMOC.ps1 -NombreModulo Organizacion

# Actualizar namespaces automáticamente
.ctualizar_namespaces_IMOC.ps1

# Instalar paquetes NuGet
.\ejecutar_instaladores_IMOC3.bat
```

## 🛠️ Scripts útiles
| Archivo | Descripción |
|--------|-------------|
| `crear_modulo_IMOC.ps1` | Genera carpetas base IMOC 3.0 para un nuevo módulo |
| `mover_a_estructura_IMOC.ps1` | Reubica archivos de módulos antiguos al esquema IMOC |
| `actualizar_namespaces_IMOC.ps1` | Corrige todos los namespaces tras mover archivos |
| `editar_readme.ps1` | Abre este archivo para editarlo |
| `agregar_modulo_readme.ps1 -NombreModulo X` | Agrega un nuevo módulo a la lista de avances |
| `ejecutar_instaladores_IMOC3.bat` | Ejecuta instalación de dependencias NuGet automáticamente |

## ▶️ Ejecución
Puedes iniciar el sistema desde Visual Studio (`Ctrl+F5`) o desde terminal:

```bash
dotnet run --project INCORP_domus
```

## 📁 Organización de carpetas
```
INCORP_domus/
├── INCORP_domus.sln
├── INCORP_domus/                  # Proyecto web MVC (DashTrans)
├── INCORP_domus.Modelos/          # Entidades, ViewModels, Validaciones
├── INCORP_domus.AccesoDatos/      # DbContexts, Repos, UnidadTrabajo
├── INCORP_domus.Servicios/        # Lógica de negocio modular
├── INCORP_domus.Utilidades/       # Scripts IMOC
├── wwwroot/assets/                # DashTrans frontend
└── README.md                      # Este documento
```

## 🚀 Avances
- ✅ Organizacion
- ⬜ Usuarios
- ⬜ Dispositivos