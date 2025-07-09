using System;
using System.Threading.Tasks;

namespace INCORP_domus.AccesoDatos.UnidadTrabajo
{
	public interface IUnidadTrabajo : IDisposable
	{
		// Ejemplo: IOrganizacionRepositorio Organizacion { get; }

		Task Guardar();
	}
}
