using Microsoft.AspNetCore.Mvc;
using INCORP_domus.Modelos.Modulos.Seguridad;
using INCORP_domus.Servicios.Modulos.Seguridad;

namespace INCORP_domus.Areas.Admin.Controllers
{
    [Area("Admin")]
    /// <summary>
    /// Controlador para gestionar las operaciones CRUD del módulo Seguridad.
    /// </summary>
    public class SeguridadController : Controller
    {
        private readonly ISeguridadService _seguridadService;

        public SeguridadController(ISeguridadService seguridadService)
        {
            _seguridadService = seguridadService;
        }

        /// <summary>
        /// Obtiene la lista de todas las seguridades.
        /// </summary>
        /// <returns>Vista con la lista de seguridades.</returns>
        public IActionResult Index()
        {
            var seguridades = _seguridadService.GetAll();
            return View(seguridades);
        }

        /// <summary>
        /// Muestra el formulario para crear una nueva seguridad.
        /// </summary>
        /// <returns>Vista del formulario de creación.</returns>
        public IActionResult Create()
        {
            return View();
        }

        /// <summary>
        /// Crea una nueva seguridad.
        /// </summary>
        /// <param name="seguridad">Objeto seguridad a crear.</param>
        /// <returns>Redirecciona a la vista de índice si es exitoso, de lo contrario, muestra el formulario de creación con errores.</returns>
        /// <summary>
        /// Actualiza una seguridad existente.
        /// </summary>
        /// <param name="id">ID de la seguridad a actualizar.</param>
        /// <param name="seguridad">Objeto seguridad con los nuevos datos.</param>
        /// <returns>Redirecciona a la vista de índice si es exitoso, de lo contrario, muestra el formulario de edición con errores.</returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Seguridad seguridad)
        {
            if (!ModelState.IsValid)
            {
                return View(seguridad);
            }

            _seguridadService.Add(seguridad);
            TempData["SuccessMessage"] = "Seguridad creada exitosamente.";
            return RedirectToAction(nameof(Index));
        }

        /// <summary>
        /// Muestra el formulario para editar una seguridad existente.
        /// </summary>
        /// <param name="id">ID de la seguridad a editar.</param>
        /// <returns>Vista del formulario de edición.</returns>
        public IActionResult Edit(int id)
        {
            var seguridad = _seguridadService.GetById(id);
            if (seguridad == null)
            {
                return NotFound();
            }
            return View(seguridad);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Seguridad seguridad)
        {
            if (id != seguridad.Id)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return View(seguridad);
            }

            _seguridadService.Update(seguridad);
            TempData["SuccessMessage"] = "Seguridad actualizada exitosamente.";
            return RedirectToAction(nameof(Index));
        }

        /// <summary>
        /// Muestra la vista para confirmar la eliminación de una seguridad.
        /// </summary>
        /// <param name="id">ID de la seguridad a eliminar.</param>
        /// <returns>Vista de confirmación de eliminación.</returns>
        public IActionResult Delete(int id)
        {
            var seguridad = _seguridadService.GetById(id);
            if (seguridad == null)
            {
                return NotFound();
            }
            return View(seguridad);
        }

        /// <summary>
        /// Elimina una seguridad existente.
        /// </summary>
        /// <param name="id">ID de la seguridad a eliminar.</param>
        /// <returns>Redirecciona a la vista de índice.</returns>
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            _seguridadService.Delete(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
