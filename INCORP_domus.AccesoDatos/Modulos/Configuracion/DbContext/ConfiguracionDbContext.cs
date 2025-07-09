using INCORP_domus.Modelos;
using INCORP_domus.Modelos.Modulos.Configuracion;
using INCORP_domus.Modelos.Modulos.Configuracion.Modelos;

//using INCORP_domus.Modelos.Modulos.Configuracion.Modelos;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace INCORP_domus.AccesoDatos.Modulos.Configuracion.DbContext
{
    public class ConfiguracionDbContext : IdentityDbContext
{
	public ConfiguracionDbContext(DbContextOptions<ConfiguracionDbContext> options)
		: base(options)
	{
	}

	public DbSet<Organizacion> organizacion { get; set; }	


	//FLUENT API
	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);
		builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
	}

}
}