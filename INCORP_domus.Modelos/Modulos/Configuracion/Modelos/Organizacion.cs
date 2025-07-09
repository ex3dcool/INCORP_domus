using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace INCORP_domus.Modelos.Modulos.Configuracion.Modelos;

[Table("organizacion")]
public partial class Organizacion
{
    [Key]
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int id_organizacion { get; set; }

	[Required(ErrorMessage = "Campo CODIGO, requerido")]
	[MaxLength(100, ErrorMessage = "Código, máximo 100 Caracteres")]
    public string codigo { get; set; }

	[Required(ErrorMessage = "Campo NOMBRE, requerido")]
	[MaxLength(100, ErrorMessage = "Nombre, máximo 100 Caracteres")]
	public string nombre { get; set; }

	//[Required(ErrorMessage = "Campo descripcion, requerido")]
	[MaxLength(100, ErrorMessage = "Nombre, máximo 100 Caracteres")]
	public string descripcion { get; set; }


	[MaxLength(200, ErrorMessage = "Dirección, máximo 200 Caracteres")]
	public string direccion { get; set; }

    public int estado { get; set; }
}
