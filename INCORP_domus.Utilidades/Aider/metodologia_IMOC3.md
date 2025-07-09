# IMOC 3.0

Estandar de desarrollo modular:

I – Identificacion: Definir modelo, funcionalidad y flujo.
M – Modelado: Generar entidades, relaciones y DbContext.
O – Optimizacion: Limpieza de codigo, estructura y uso de servicios.
C – Control: Validaciones, seguridad, autorizacion y documentacion.

Cada modulo debe tener su propia estructura en las carpetas:
- Modelos/Modulos/{Modulo}
- AccesoDatos/Modulos/{Modulo}
- Servicios/Modulos/{Modulo}
- Areas/Admin/{Modulo}
- wwwroot/js/{Modulo}