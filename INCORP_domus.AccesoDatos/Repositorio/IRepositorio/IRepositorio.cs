using System.Linq.Expressions;
using static System.Runtime.InteropServices.JavaScript.JSType;
          
namespace INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio.IRepositorio
{
	public interface IRepositorio<T> where T : class
	{
		Task<T> Obtener(int id);

		Task<IEnumerable<T>> ObtenerTodos(
			Expression<Func<T, bool>> filtro = null,
			Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
			string incluirPropiedades = null,
			bool isTracking = true
		);

		Task<T> ObtenerPrimero(
			Expression<Func<T, bool>> filtro = null,
			string incluirPropiedades = null,
			bool isTracking = true
		);

		Task Agregar(T organizacionBD);

		void Remover(T organizacionBD);

		void RemoverRango(IEnumerable<T> organizacionBD);
	}
	
}

namespace INCORP_domus.AccesoDatos.Modulos.Configuracion
{

	public interface IRepositorioConfiguracionInteface<T> where T : class
	{
		Task<T> Obtener(int id);

		Task<IEnumerable<T>> ObtenerTodos(
			Expression<Func<T, bool>> filtro = null,
			Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
			string incluirPropiedades = null,
			bool isTracking = true
		);

		Task<T> ObtenerPrimero(
			Expression<Func<T, bool>> filtro = null,
			string incluirPropiedades = null,
			bool isTracking = true
		);

		Task Agregar(T organizacionBD);

		void Remover(T organizacionBD);

		void RemoverRango(IEnumerable<T> organizacionBD);
	}
}
