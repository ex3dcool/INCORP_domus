using INCORP_domus.AccesoDatos.Modulos.Configuracion.DbContext;
using INCORP_domus.AccesoDatos.Modulos.Configuracion;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace INCORP_domus.AccesoDatos.Modulos.ConfiguracionImplementaciones
{
	public class Repositorio<T> : IRepositorioConfiguracionInteface<T> where T : class
	{
		private readonly ConfiguracionDbContext _db;
		internal DbSet<T> dbSet;

		public Repositorio(ConfiguracionDbContext db)
		{
			_db = db;
			dbSet = _db.Set<T>();
		}

		public async Task Agregar(T entidad)
		{
			await dbSet.AddAsync(entidad);      // equivale a: insert into Table
		}

		public async Task<T> Obtener(int idbod)
		{
			return await dbSet.FindAsync(idbod);  // equivale a : select * from Table where idbod=''
		}

		public async Task<T> ObtenerS(string idbod)
		{
			return await dbSet.FindAsync(idbod);  // equivale a : select * from Table where idbod=''
		}

		public async Task<IEnumerable<T>> ObtenerTodos(Expression<Func<T, bool>> filtro = null,
			Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string incluirPropiedades = null, bool isTracking = true)
		{
			IQueryable<T> query = dbSet;
			if (filtro != null)
			{
				query = query.Where(filtro); // select * from Table where
			}

			if (incluirPropiedades != null)
			{

				foreach (var incluirProp in incluirPropiedades.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
				{
					query = query.Include(incluirProp);     // ejemplo "Categoría, Marca"
				}
			}

			if (orderBy != null)
			{
				query = orderBy(query);
			}

			if (!isTracking)
			{
				query = query.AsNoTracking();
			}

			return await query.ToListAsync();

		}

		public async Task<T> ObtenerPrimero(Expression<Func<T, bool>> filtro = null, string incluirPropiedades = null, bool isTracking = true)
		{
			IQueryable<T> query = dbSet;
			if (filtro != null)
			{
				query = query.Where(filtro); // select * from Table where
			}

			if (incluirPropiedades != null)
			{

				foreach (var incluirProp in incluirPropiedades.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
				{
					query = query.Include(incluirProp);     // ejemplo "Categoría, Marca"
				}
			}

			if (!isTracking)
			{
				query = query.AsNoTracking();
			}

			return await query.FirstOrDefaultAsync();
		}

		public void Remover(T entidad)
		{
			dbSet.Remove(entidad);
		}

		public void RemoverRango(IEnumerable<T> entidad)
		{
			dbSet.RemoveRange(entidad);
		}
	}
}
