using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using INCORP_domus.Data;

var builder = WebApplication.CreateBuilder(args);

// Configuracion de servicios
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
	.AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();


builder.Services.AddEndpointsApiExplorer(); // Habilitar exploradores de endpoint
builder.Services.AddSwaggerGen(); // Habilitar Swagger

var app = builder.Build();

// Middleware de desarrollo
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(options =>
	{
		options.SwaggerEndpoint("/swagger/v1/swagger.json", "INCORP_domus API v1");
		options.RoutePrefix = "documentacion/swagger"; // acceso: /documentacion/swagger
	});

	app.UseMigrationsEndPoint();
}
else
{
	app.UseExceptionHandler("/Home/Error");
	app.UseHsts();
}

// Middleware general
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Rutas por defecto
app.MapControllerRoute(
	name: "default",
	//pattern: "{area=Admin}/{controller=Home}/{action=Index}/{id?}");
	pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

app.Run();