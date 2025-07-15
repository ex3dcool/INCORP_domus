using INCORP_domus.AccesoDatos.Modulos.Configuracion.DbContext;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio.Implementaciones;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using INCORP_domus.AccesoDatos.Modulos.Configuracion;
using INCORP_domus.AccesoDatos.UnidadTrabajo;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// 🔐 Agregar servicios al contenedor
var connectionString = builder.Configuration.GetConnectionString("CadenaConexionDomus");

// DbContext general del sistema
builder.Services.AddDbContext<INCORPDbContext>(options =>
	options.UseSqlServer(connectionString));

// ✅ DbContext específico del módulo Configuracion
builder.Services.AddDbContext<ConfiguracionDbContext>(options =>
	options.UseSqlServer(connectionString));

// Inyección de dependencias
builder.Services.AddScoped<IOrganizacionRepositorio, OrganizacionRepositorio>();
builder.Services.AddScoped<IUnidadTrabajoOrganizacion, UnidadTrabajoConfiguracion>();


builder.Services.AddControllersWithViews()
	.AddRazorRuntimeCompilation(); // Habilita recarga de vistas sin reiniciar la app

builder.Services.AddControllersWithViews()
	.AddRazorRuntimeCompilation();

// 🧭 Expansor de rutas para vistas Razor fuera de Views/
builder.Services.Configure<RazorViewEngineOptions>(options =>
{
	options.ViewLocationExpanders.Add(new CustomViewLocationExpander());
});


// ✅ Configuración de Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// 🌐 Middleware de entorno
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(options =>
	{
		options.SwaggerEndpoint("/swagger/v1/swagger.json", "INCORP_domus API V1");
		options.RoutePrefix = "documentacion/swagger";
	});
	app.UseMigrationsEndPoint();
}
else
{
	app.UseExceptionHandler("/Home/Error");
	app.UseHsts();
}

// 🔐 Middleware base
app.UseHttpsRedirection();
app.UseStaticFiles(); // Habilita archivos estáticos desde wwwroot

// 🎙️ Habilita acceso directo a worklets de voz (como pcm-processor.js)
app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = new PhysicalFileProvider(
		Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "js", "IA", "worklets")),
	RequestPath = "/js/IA/worklets"
});

// 📦 Continuación del pipeline: enrutamiento hacia controladores y acciones
app.UseRouting();


// ✅ Activar autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

//// ✅ Rutas para áreas (como Admin/Organizacion)
//app.MapControllerRoute(
//	name: "areas",
//	pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

//// Ruta por defecto
//app.MapControllerRoute(
//	name: "default",
//	pattern: "{area=Menus}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
	name: "default",
	pattern: "{area=Admin}/{controller=Organizacion}/{action=OrganizacionUpsert}/{id?}");



app.Run();