using INCORP_domus.Modelos.Modulos.Seguridad;
using System.Collections.Generic;
using System.Linq;

namespace INCORP_domus.Servicios.Modulos.Seguridad
{
    public class SeguridadService : ISeguridadService
    {
        private readonly List<Seguridad> _seguridades = new List<Seguridad>();

        public IEnumerable<Seguridad> GetAll()
        {
            return _seguridades;
        }

        public Seguridad GetById(int id)
        {
            return _seguridades.FirstOrDefault(s => s.Id == id);
        }

        public void Add(Seguridad seguridad)
        {
            seguridad.Id = _seguridades.Count + 1;
            _seguridades.Add(seguridad);
        }

        public void Update(Seguridad seguridad)
        {
            var existing = GetById(seguridad.Id);
            if (existing != null)
            {
                existing.Nombre = seguridad.Nombre;
                existing.Descripcion = seguridad.Descripcion;
            }
        }

        public void Delete(int id)
        {
            var seguridad = GetById(id);
            if (seguridad != null)
            {
                _seguridades.Remove(seguridad);
            }
        }
    }
}
