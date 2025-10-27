namespace ControlFacturasAPI.Models
{
    public class DetalleFactura
    {
        public int Id { get; set; }
        public string Producto { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }

        // Relación con Factura
        public int FacturaId { get; set; }
        public Factura? Factura { get; set; }

        // Propiedad calculada
        public decimal Subtotal => Cantidad * PrecioUnitario;
    }
}
