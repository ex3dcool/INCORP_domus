using Microsoft.EntityFrameworkCore;

public class INCORPDbContext : DbContext
{
	public INCORPDbContext(DbContextOptions<INCORPDbContext> options) : base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		// Aplica todas las configuraciones que estén en este ensamblado
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(INCORPDbContext).Assembly);
	}
}
