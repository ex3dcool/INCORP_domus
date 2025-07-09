using INCORP_domus.Modelos.Modulos.Configuracion;
using INCORP_domus.Modelos.Modulos.Configuracion.Modelos;

//using INCORP_domus.Modelos.Modulos.Configuracion.Modelos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace INCORP_domus.AccesoDatos.Modulos.Configuracion.Configuracion
{
    /// <summary>
    /// Configuración de la organizacionBD Organizacion para EF Core
    /// </summary>
    public class OrganizacionConfiguracion : IEntityTypeConfiguration<Organizacion>
    {
        public void Configure(EntityTypeBuilder<Organizacion> x)
        {
            x.ToTable("organizacion");

            x.HasKey(o => o.id_organizacion);

            x.Property(o => o.id_organizacion).HasColumnName("id_organizacion");

            x.Property(o => o.codigo)
                .HasColumnName("codigo")
                .HasMaxLength(100)
                .IsRequired();

            x.Property(o => o.nombre)
                .HasColumnName("nombre")
                .HasMaxLength(100)
                .IsRequired();

            x.Property(o => o.descripcion)
                .HasColumnName("descripcion")
                .HasMaxLength(255);

            x.Property(o => o.direccion)
                .HasColumnName("direccion")
                .HasMaxLength(200);

            x.Property(o => o.estado)
                .HasColumnName("estado");
        }
    }
}