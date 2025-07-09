using INCORP_domus.AccesoDatos.UnidadTrabajo;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.DbContext;
using INCORP_domus.Modelos.Modulos.Configuracion;
using INCORP_domus.AccesoDatos;
using INCORP_domus.AccesoDatos.Modulos.Configuracion;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio.Implementaciones;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INCORP_domus.AccesoDatos.Modulos.Configuracion
{
	public class UnidadTrabajoConfiguracion : IUnidadTrabajoOrganizacion
	{

		private readonly ConfiguracionDbContext _db;
		public IOrganizacionRepositorio Organizacion { get; private set; }
		

		//IRepositorio.Diseno.ICategoriasRepositorio IUnidadTrabajoDiseno.Categorias => throw new NotImplementedException();

		public UnidadTrabajoConfiguracion(ConfiguracionDbContext db)
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

