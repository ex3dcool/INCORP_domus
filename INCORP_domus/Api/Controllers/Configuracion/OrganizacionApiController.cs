using Microsoft.AspNetCore.Mvc;
using INCORP_domus.AccesoDatos.Modulos.Configuracion.Repositorio;
using INCORP_domus.Modelos.Modulos.Configuracion.Modelos;
using System.Linq;
using System.Threading.Tasks;
using INCORP_domus.AccesoDatos.Modulos.Configuracion;

namespace INCORP_domus.Api.Controllers.Configuracion
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrganizacionApiController : ControllerBase
	{
		private readonly IUnidadTrabajoOrganizacion _unidadTrabajo;

		public OrganizacionApiController(IUnidadTrabajoOrganizacion unidadTrabajo)
		{
			_unidadTrabajo = unidadTrabajo;
		}

		// GET: api/OrganizacionApi
		[HttpGet]
		public async Task<IActionResult> ObtenerTodos()
		{
			var lista = await _unidadTrabajo.Organizacion.ObtenerTodos();
			return Ok(lista);
		}

		// GET: api/OrganizacionApi/5
		[HttpGet("{id}")]
		public async Task<IActionResult> Obtener(int id)
		{
			var obj = await _unidadTrabajo.Organizacion.Obtener(id);
			if (obj == null)
				return NotFound();

			return Ok(obj);
		}

		// POST: api/OrganizacionApi
		[HttpPost]
		public async Task<IActionResult> Crear([FromBody] Organizacion organizacion)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			// Validación de duplicado por nombre (puedes extender a código)
			var duplicado = (await _unidadTrabajo.Organizacion.ObtenerTodos())
				.Any(o => o.nombre.ToLower().Trim() == organizacion.nombre.ToLower().Trim());

			if (duplicado)
				return Conflict("Ya existe una organización con el mismo nombre.");

			organizacion.codigo = await _unidadTrabajo.Organizacion.GenerarCodigoOrganizacionAsync();
			await _unidadTrabajo.Organizacion.Agregar(organizacion);
			await _unidadTrabajo.Guardar();

			return CreatedAtAction(nameof(Obtener), new { id = organizacion.id_organizacion }, organizacion);
		}

		// PUT: api/OrganizacionApi/5
		[HttpPut("{id}")]
		public async Task<IActionResult> Actualizar(int id, [FromBody] Organizacion organizacion)
		{
			if (id != organizacion.id_organizacion)
				return BadRequest("ID no coincide.");

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			// Si el código viene vacío, lo regeneramos (igual que en MVC)
			if (string.IsNullOrWhiteSpace(organizacion.codigo))
				organizacion.codigo = await _unidadTrabajo.Organizacion.GenerarCodigoOrganizacionAsync();

			_unidadTrabajo.Organizacion.Actualizar(organizacion);
			await _unidadTrabajo.Guardar();

			return NoContent();
		}

		// DELETE: api/OrganizacionApi/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> Eliminar(int id)
		{
			var organizacionDb = await _unidadTrabajo.Organizacion.Obtener(id);
			if (organizacionDb == null)
				return NotFound();

			_unidadTrabajo.Organizacion.Remover(organizacionDb);
			await _unidadTrabajo.Guardar();

			return Ok(new { success = true, message = "Organización eliminada exitosamente." });
		}
	}
}
