using Microsoft.EntityFrameworkCore;
using ControlFacturasAPI.Models;

namespace ControlFacturasAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Factura> Facturas { get; set; }
        public DbSet<DetalleFactura> DetallesFactura { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Factura>().ToTable("Factura");
            modelBuilder.Entity<DetalleFactura>().ToTable("DetalleFactura");
        }
    }
}
