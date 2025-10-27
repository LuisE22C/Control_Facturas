
const API_CONSULTA = "https://localhost:7036/api/Factura";

// Función principal que se ejecuta al presionar "Buscar"
async function consultarFactura() {
  const numeroFactura = document.getElementById("buscar-numero").value.trim();
  const alertDiv = document.getElementById("alert-consultar");
  const resultadoDiv = document.getElementById("resultado-consulta");

  // Limpiar alertas y resultados anteriores
  alertDiv.innerHTML = "";
  resultadoDiv.innerHTML = "";

  // Validar campo vacío
  if (!numeroFactura) {
    alertDiv.innerHTML = `<div class="alert alert-warning">Ingresa un número de factura.</div>`;
    return;
  }

  // Mostrar mensaje de carga
  resultadoDiv.innerHTML = `<div class="alert alert-info">Buscando factura...</div>`;

  try {
    // LLamando al api
    const response = await fetch(`${API_CONSULTA}/${numeroFactura}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Factura no encontrada.");
      } else {
        throw new Error("Error al consultar la factura.");
      }
    }

    const factura = await response.json();
    mostrarFactura(factura); // Mostrar datos en el HTML

  } catch (error) {
    console.error("Error:", error);
    alertDiv.innerHTML = `<div class="alert alert-danger"> ${error.message}</div>`;
    resultadoDiv.innerHTML = "";
  }
}

// Función para mostrar los datos de la factura en el HTML
function mostrarFactura(factura) {
  const resultadoDiv = document.getElementById("resultado-consulta");

  let detallesHTML = "";
  if (factura.detalles && factura.detalles.length > 0) {
    factura.detalles.forEach(detalle => {
      detallesHTML += `
        <tr>
          <td>${detalle.producto}</td>
          <td>${detalle.cantidad}</td>
          <td>Q${detalle.precioUnitario.toFixed(2)}</td>
          <td>Q${(detalle.cantidad * detalle.precioUnitario).toFixed(2)}</td>
        </tr>
      `;
    });
  } else {
    detallesHTML = `<tr><td colspan="4" class="text-center">Sin detalles registrados</td></tr>`;
  }

  resultadoDiv.innerHTML = `
    <div class="card mt-3 p-3">
      <h4>Detalle de Factura</h4>
      <p><strong>Número:</strong> ${factura.numeroFactura}</p>
      <p><strong>Cliente:</strong> ${factura.cliente}</p>
      <p><strong>Fecha:</strong> ${new Date(factura.fecha).toLocaleDateString()}</p>
      <p><strong>Total:</strong> Q${factura.total.toFixed(2)}</p>

      <h5>Productos:</h5>
      <table class="table table-bordered table-striped">
        <thead class="table-primary">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${detallesHTML}
        </tbody>
      </table>
    </div>
  `;
}
