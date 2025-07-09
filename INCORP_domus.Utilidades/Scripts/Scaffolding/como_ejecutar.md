# 🛠️ Cómo Ejecutar Scaffolding desde Visual Studio 2022

Este archivo describe los pasos para ejecutar el scaffolding del módulo **Configuracion** en el proyecto `INCORP_domus` usando Visual Studio 2022 y PowerShell.

---

## ✅ Requisitos Previos

- Tener Visual Studio 2022 instalado
- Tener habilitada la herramienta `Developer PowerShell for VS 2022`
- Haber colocado los archivos:
  - `scaffold_configuracion.ps1` en: `INCORP_domus.Utilidades\Scripts\Scaffolding\Configuracion\`
  - `ejecutar_scaffold_configuracion.bat` en: `C:\PROSIS\INCORP_domus\`

---

## ▶️ Pasos para Ejecutar

1. Abre **Visual Studio 2022**

2. En la barra superior, ve a:
   ```
   Herramientas → Terminal → Developer PowerShell para VS 2022
   ```

3. Una vez abierta la terminal, asegúrate de estar ubicado en la solución:

   ``` si estás en otra ruta, ingresa este comando
   cd C:\PROSIS\INCORP_domus
   ```

4. Ejecuta el archivo `.bat`:

   ```   
   .\INCORP_domus.Utilidades\Scripts\Scaffolding\Configuracion\ejecutar_scaffold_configuracion.bat 
   ```

5. El proceso mostrará en consola el resultado del scaffolding (gracias al flag `--verbose`).

---

## 📄 Resultado Esperado

Se generarán dos archivos:

- `Organizacion.cs` en:
  ```
  INCORP_domus.Modelos\Modulos\Configuracion\Modelos\
  ```

- `ConfiguracionDbContext.cs` en:
  ```
  INCORP_domus.Modelos\Modulos\Configuracion\DbContext\
  ```

---

## 🔁 Repetir para otros módulos

Puedes copiar y adaptar este procedimiento para generar scaffolding en cualquier otro módulo de `INCORP_domus`.

---

**Fin del instructivo.**