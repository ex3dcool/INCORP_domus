using INCORP_domus.Modelos.Modulos.Configuracion;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using INCORP_domus.Modelos.Modulos.Configuracion.Modelos;

namespace INCORP_domus.AccesoDatos.Modulos.Configuracion
{
	public interface IOrganizacionRepositorio : IRepositorioConfiguracionInteface<Organizacion>
	{

		void Actualizar(Organizacion organizacion);


		// ✅ Nuevo método para generar código único
		Task<string> GenerarCodigoOrganizacionAsync();

	}
}
