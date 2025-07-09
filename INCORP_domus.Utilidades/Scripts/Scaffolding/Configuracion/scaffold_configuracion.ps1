# Script PowerShell para ejecutar scaffolding del módulo Configuracion - INCORP_domus (FINAL)

Set-Location -Path "C:\\PROSIS\\INCORP_domus"

dotnet ef dbcontext scaffold "Server=LENOVO;Database=INCORP_domus;User Id=incDadmin;Password=Sis.Info!;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer --use-database-names --force --table organizacion --context ConfiguracionDbContext --startup-project .\\INCORP_domus.AccesoDatos --verbose -o "..\\INCORP_domus.Modelos\\Modulos\\Configuracion\\Modelos" --context-dir "..\\INCORP_domus.AccesoDatos\\Modulos\\Configuracion\\DbContext" --data-annotations

