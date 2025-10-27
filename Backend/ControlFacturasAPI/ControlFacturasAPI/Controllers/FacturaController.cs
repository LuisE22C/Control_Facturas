using Microsoft.AspNetCore.Mvc;
using ControlFacturasAPI.Data;
using ControlFacturasAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ControlFacturasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacturaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FacturaController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/factura
        [HttpPost]
        public async Task<IActionResult> CrearFactura([FromBody] Factura factura)
        {
            if (factura == null || factura.Detalles == null || factura.Detalles.Count == 0)
                return BadRequest("Debe incluir al menos un detalle.");

            factura.Total = factura.Detalles.Sum(d => d.Cantidad * d.PrecioUnitario);

            _context.Facturas.Add(factura);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Factura guardada", numero = factura.NumeroFactura, total = factura.Total });
        }

        // GET: api/factura/{numero}
        [HttpGet("{numero}")]
        public async Task<IActionResult> ObtenerFactura(string numero)
        {
            var factura = await _context.Facturas
                .Include(f => f.Detalles)
                .FirstOrDefaultAsync(f => f.NumeroFactura == numero);

            if (factura == null)
                return NotFound("Factura no encontrada.");

            return Ok(factura);
        }

        // GET: api/factura/reporte?inicio=2025-10-01&fin=2025-10-31
        [HttpGet("reporte")]
        public async Task<IActionResult> Reporte([FromQuery] DateTime inicio, [FromQuery] DateTime fin)
        {
            var facturas = await _context.Facturas
                .Where(f => f.Fecha >= inicio && f.Fecha <= fin)
                .Include(f => f.Detalles)
                .ToListAsync();

            return Ok(facturas);
        }
    }
}
