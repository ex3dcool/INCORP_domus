using INCORP_domus.AccesoDatos.Modulos.Configuracion.DbContext;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio.Implementaciones;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio;
using INCORP_domus.AccesoDatos.UnidadTrabajo;

namespace INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio.Implementaciones
{
	public class UnidadTrabajoOrganizacion : IUnidadTrabajoOrganizacion
	{
		private readonly ConfiguracionDbContext _db;
		public IOrganizacionRepositorio Organizacion { get; private set; }

		public UnidadTrabajoOrganizacion(ConfiguracionDbContext db)
		{
			_db = db;
			Organizacion = new OrganizacionRepositorio(_db);
		}

		public void Dispose()
		{
			_db.Dispose();
		}

		public async Task Guardar()
		{
			await _db.SaveChangesAsync();
		}
	}
}
