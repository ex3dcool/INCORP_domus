using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio.Implementaciones;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.DbContext;
using INCORP_domus.Modelos.Modulos.Configuracion;
using INCORP_domus.AccesoDatos.Modulos.ConfiguracionImplementaciones;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using INCORP_domus.Modelos.Modulos.Configuracion.Modelos;

namespace INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio.Implementaciones
{
	public class OrganizacionRepositorio : Repositorio<Organizacion>, IOrganizacionRepositorio
	{
		private readonly ConfiguracionDbContext _db;

		public OrganizacionRepositorio(ConfiguracionDbContext db) : base(db)
		{
			_db = db;
		}

		public void Actualizar(Organizacion organizacion)
		{
			var OrganizacionBD = _db.organizacion.FirstOrDefault(b => b.id_organizacion == organizacion.id_organizacion);

			if (OrganizacionBD != null)
			{
				OrganizacionBD.id_organizacion = organizacion.id_organizacion;
				OrganizacionBD.codigo = organizacion.codigo;
				OrganizacionBD.nombre = organizacion.nombre;
				OrganizacionBD.descripcion = organizacion.descripcion;
				OrganizacionBD.direccion = organizacion.direccion;
				OrganizacionBD.estado = organizacion.estado;
				_db.SaveChanges();
			}
		}

		public async Task<string> GenerarCodigoOrganizacionAsync()
		{
			var ultimo = await _db.organizacion
				.OrderByDescending(o => o.id_organizacion)
				.Select(o => o.codigo)
				.FirstOrDefaultAsync();

			if (!string.IsNullOrEmpty(ultimo) && ultimo.StartsWith("ORG-"))
			{
				string numero = ultimo.Substring(4);
				if (int.TryParse(numero, out int n))
				{
					return $"ORG-{(n + 1).ToString("D5")}";
				}
			}

			// Si no existe ninguno aún
			return "ORG-00001";
		}

	}
}

