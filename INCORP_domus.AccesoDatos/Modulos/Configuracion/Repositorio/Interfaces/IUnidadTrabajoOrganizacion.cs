using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


//namespace INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio.Interfaces
//{
//	public interface IUnidadTrabajoOrganizacion : IUnidadTrabajo
//	{
//		OrganizacionRepositorio Organizacion { get; }
//		Task Guardar();
//	}
//}


namespace INCORP_domus.AccesoDatos.Modulos.Configuracion
{
	public interface IUnidadTrabajoOrganizacion : IDisposable
	{

		IOrganizacionRepositorio Organizacion { get; }

		Task Guardar();

	}
}