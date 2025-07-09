using INCORP_domus.AccesoDatos.Modulos.Configuracion;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio;
using INCORP_domus.Modelos.Modulos.Configuracion;
using INCORP_domus.Modelos.Modulos.Configuracion.Modelos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using System.Threading.Tasks;

namespace INCORP_domus.Areas.Admin.Configuracion.Controllers
{
	[Area("Admin")]
	//[Authorize]
	public class OrganizacionController : Controller
	{
		private readonly IUnidadTrabajoOrganizacion _unidadTrabajo;

		public OrganizacionController(IUnidadTrabajoOrganizacion unidadTrabajo)
		{
			_unidadTrabajo = unidadTrabajo;
		}

		public async Task<IActionResult> OrganizacionIndex()
		{
			var lista = await _unidadTrabajo.Organizacion.ObtenerTodos();

			if (!lista.Any())
			{
				ViewBag.MostrarNotificacion = true;
				ViewBag.TipoNotificacion = "warning";
				ViewBag.TituloNotificacion = "¡Error de Datos!";
				ViewBag.MensajeNotificacion = "La lista está vacía. Posiblemente hay datos nulos o errores en la carga. Por favor, verifique.";
			}

			return View("~/Areas/Admin/Configuracion/Views/OrganizacionIndex.cshtml");
		}

		public async Task<IActionResult> OrganizacionUpsert(int? id)
		{
			// ✅ Reinyectar notificación si viene desde un post fallido
			if (TempData["tipo"] != null)
			{
				ViewBag.TipoNotificacion = TempData["tipo"];
				ViewBag.TituloNotificacion = TempData["titulo"];
				ViewBag.MensajeNotificacion = TempData["mensaje"];
			}

			Organizacion organizacion = new Organizacion();

			if (id == null || id == 0)
			{
				// ⚠️ Generamos el código aquí
				organizacion.codigo = await _unidadTrabajo.Organizacion.GenerarCodigoOrganizacionAsync();

				return View("~/Areas/Admin/Configuracion/Views/OrganizacionUpsert.cshtml", organizacion);
			}

			organizacion = await _unidadTrabajo.Organizacion.Obtener(id.GetValueOrDefault());
			if (organizacion == null)
			{
				return NotFound();
			}

			ModelState.Clear(); // ← Esta línea es clave

			return View("~/Areas/Admin/Configuracion/Views/OrganizacionUpsert.cshtml", organizacion);
		}


		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> OrganizacionUpsert(Organizacion organizacion)
		{
			if (ModelState.IsValid)
			{
				if (organizacion.id_organizacion == 0)
				{
					// ⚠️ Refuerza la generación aquí por si el valor llegó vacío o fue manipulado
					organizacion.codigo = await _unidadTrabajo.Organizacion.GenerarCodigoOrganizacionAsync();
					Console.WriteLine($"Código generado: {organizacion.codigo}");


					await _unidadTrabajo.Organizacion.Agregar(organizacion);
					TempData["tipo"] = "success";
					TempData["titulo"] = "¡Registro exitoso!";
					TempData["mensaje"] = "Organización creada exitosamente.";
				}
				else
				{
					// Si por algún motivo el código está vacío en actualización, lo regeneramos
					if (string.IsNullOrWhiteSpace(organizacion.codigo))
					{
						organizacion.codigo = await _unidadTrabajo.Organizacion.GenerarCodigoOrganizacionAsync();
					}

					_unidadTrabajo.Organizacion.Actualizar(organizacion);
					TempData["tipo"] = "success";
					TempData["titulo"] = "¡Actualización exitosa!";
					TempData["mensaje"] = "Organización actualizada exitosamente.";
				}

				await _unidadTrabajo.Guardar();
				return RedirectToAction(nameof(OrganizacionIndex));
			}

			// ❌ Si hay error en ModelState no redirige (se queda en la vista)
			TempData["tipo"] = "error";
			TempData["titulo"] = "Error al guardar";
			TempData["mensaje"] = "Verifique los datos del formulario antes de continuar.";

			return View("~/Areas/Admin/Configuracion/Views/OrganizacionUpsert.cshtml", organizacion);
		}



		#region API

		[HttpGet]
		public async Task<IActionResult> ObtenerTodos()
		{
			var todos = await _unidadTrabajo.Organizacion.ObtenerTodos();
			//return Json(new { data = todos });
			var jsonString = JsonConvert.SerializeObject(new { data = todos });
			return Content(jsonString);
		}

		[HttpPost]
		public async Task<IActionResult> Delete(int id)
		{
			var organizacionDb = await _unidadTrabajo.Organizacion.Obtener(id);
			if (organizacionDb == null)
			{
				return Json(new { success = false, message = "Error al eliminar la organización." });
			}

			_unidadTrabajo.Organizacion.Remover(organizacionDb);
			await _unidadTrabajo.Guardar();
			return Json(new { success = true, message = "Organización eliminada exitosamente." });
		}

		[ActionName("ValidarCodigo")]
		public async Task<IActionResult> ValidarCodigo(string codigo, int id = 0)
		{
			var lista = await _unidadTrabajo.Organizacion.ObtenerTodos();
			bool existe = id == 0
				? lista.Any(o => o.codigo != null && o.codigo.ToLower().Trim() == codigo.ToLower().Trim())
				: lista.Any(o => o.codigo != null && o.codigo.ToLower().Trim() == codigo.ToLower().Trim() && o.id_organizacion != id);


			return Json(new { data = existe });
		}

		[ActionName("ValidarNombre")]
		public async Task<IActionResult> ValidarNombre(string nombre, int id = 0)
		{
			if (string.IsNullOrWhiteSpace(nombre))
			{
				// 🔐 Si el nombre es null o solo espacios, no se valida duplicado
				return Json(new { data = false });
			}

			var lista = await _unidadTrabajo.Organizacion.ObtenerTodos();

			bool existe = id == 0
				? lista.Any(o => o.nombre != null && o.nombre.ToLower().Trim() == nombre.ToLower().Trim())
				: lista.Any(o => o.nombre != null && o.nombre.ToLower().Trim() == nombre.ToLower().Trim() && o.id_organizacion != id);

			return Json(new { data = existe });
		}




		#endregion
	}
}
