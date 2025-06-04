using Microsoft.AspNetCore.Mvc;
using INCORP_domus.Modelos.Modulos.Seguridad;
using INCORP_domus.Servicios.Modulos.Seguridad;

namespace INCORP_domus.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class SeguridadController : Controller
    {
        private readonly ISeguridadService _seguridadService;

        public SeguridadController(ISeguridadService seguridadService)
        {
            _seguridadService = seguridadService;
        }

        public IActionResult Index()
        {
            var seguridades = _seguridadService.GetAll();
            return View(seguridades);
        }

        public IActionResult Create()
        {
            return View();
        }

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

        public IActionResult Delete(int id)
        {
            var seguridad = _seguridadService.GetById(id);
            if (seguridad == null)
            {
                return NotFound();
            }
            return View(seguridad);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            _seguridadService.Delete(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
