// ========================================
const API_BASE_URL = "https://localhost:7036/api/Factura";

let detalleCount = 0;

// ========================================

document.addEventListener("DOMContentLoaded", function () {
  agregarDetalle(); // Agrega la primera línea vacía
  document.getElementById("fecha").valueAsDate = new Date();
});

// ========================================
function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById("tab-" + tabName).classList.add("active");
  event.target.classList.add("active");
}

// ========================================
function agregarDetalle() {
  detalleCount++;
  const detallesList = document.getElementById("detalles-list");

  const detalleHTML = `
    <div class="detalle-item" id="detalle-${detalleCount}">
      <div class="form-group">
        <label>Producto</label>
        <input type="text" class="producto-input" placeholder="Nombre del producto" required>
      </div>
      <div class="form-group">
        <label>Cantidad</label>
        <input type="number" class="cantidad-input" min="1" value="1" onchange="calcularTotal()" required>
      </div>
      <div class="form-group">
        <label>Precio Unit.</label>
        <input type="number" class="precio-input" step="0.01" min="0" value="0" onchange="calcularTotal()" required>
      </div>
      <div class="form-group">
        <label>Subtotal</label>
        <input type="number" class="subtotal-input" step="0.01" readonly value="0">
      </div>
      <button type="button" class="btn-remove" onclick="eliminarDetalle(${detalleCount})">🗑️</button>
    </div>
  `;
  detallesList.insertAdjacentHTML("beforeend", detalleHTML);
}

function eliminarDetalle(detalleId) {
  document.getElementById(`detalle-${detalleId}`).remove();
  calcularTotal();
}

function calcularTotal() {
  let total = 0;
  document.querySelectorAll(".detalle-item").forEach(detalle => {
    const cantidad = parseFloat(detalle.querySelector(".cantidad-input").value) || 0;
    const precio = parseFloat(detalle.querySelector(".precio-input").value) || 0;
    const subtotal = cantidad * precio;
    detalle.querySelector(".subtotal-input").value = subtotal.toFixed(2);
    total += subtotal;
  });
  document.getElementById("total-display").textContent = total.toFixed(2);
}
