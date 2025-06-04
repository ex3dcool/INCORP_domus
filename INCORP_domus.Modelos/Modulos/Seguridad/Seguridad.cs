using System.ComponentModel.DataAnnotations;

namespace INCORP_domus.Modelos.Modulos.Seguridad
{
    public class Seguridad
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100, ErrorMessage = "El nombre no puede exceder los 100 caracteres")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "La descripción es obligatoria")]
        [StringLength(255, ErrorMessage = "La descripción no puede exceder los 255 caracteres")]
        public string Descripcion { get; set; }
    }
}
