using INCORP_domus.Modelos.Modulos.Seguridad;
using System.Collections.Generic;

namespace INCORP_domus.Servicios.Modulos.Seguridad
{
    public interface ISeguridadService
    {
        IEnumerable<Seguridad> GetAll();
        Seguridad GetById(int id);
        void Add(Seguridad seguridad);
        void Update(Seguridad seguridad);
        void Delete(int id);
    }
}
