
async function crearFactura(event) {
  event.preventDefault();

  const numeroFactura = document.getElementById("numeroFactura").value.trim();
  const fecha = document.getElementById("fecha").value;
  const cliente = document.getElementById("cliente").value.trim();

  const detalles = [];
  document.querySelectorAll(".detalle-item").forEach(detalle => {
    const producto = detalle.querySelector(".producto-input").value.trim();
    const cantidad = parseInt(detalle.querySelector(".cantidad-input").value);
    const precioUnitario = parseFloat(detalle.querySelector(".precio-input").value);
    if (producto && cantidad > 0 && precioUnitario >= 0) {
      detalles.push({ producto, cantidad, precioUnitario });
    }
  });

  if (!numeroFactura || !cliente || detalles.length === 0) {
    mostrarAlerta("crear", "Debes ingresar los datos básicos y al menos un producto.", "error");
    return;
  }

  const data = { numeroFactura, fecha, cliente, detalles };

  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error al crear la factura");

    mostrarAlerta("crear", `✅ Factura ${numeroFactura} creada correctamente.`, "success");

    // Limpiar formulario
    document.getElementById("form-crear").reset();
    document.getElementById("detalles-list").innerHTML = "";
    detalleCount = 0;
    agregarDetalle();
    calcularTotal();

  } catch (error) {
    console.error("Error:", error);
    mostrarAlerta("crear", "Error al conectar con la API: " + error.message, "error");
  }
}


function mostrarAlerta(seccion, mensaje, tipo) {
  const alertDiv = document.getElementById(`alert-${seccion}`);
  alertDiv.innerHTML = `<div class="alert alert-${tipo === "success" ? "success" : "danger"}">${mensaje}</div>`;
  setTimeout(() => (alertDiv.innerHTML = ""), 4000);
}
