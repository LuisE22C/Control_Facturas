using System;
using System.Collections.Generic;

namespace ControlFacturasAPI.Models
{
    public class Factura
    {
        public int Id { get; set; }
        public string NumeroFactura { get; set; }
        public string Cliente { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Total { get; set; }

        public List<DetalleFactura> Detalles { get; set; } = new();
    }
}
