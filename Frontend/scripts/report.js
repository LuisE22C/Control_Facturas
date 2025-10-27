
const API_REPORTE = "https://localhost:7036/api/Factura";

// Función principal que se ejecuta al presionar el botón
async function generarReporte() {
  const inicio = document.getElementById("fechaInicio").value;
  const fin = document.getElementById("fechaFin").value;

  const alertDiv = document.getElementById("alert-reporte");
  const statsDiv = document.getElementById("stats-reporte");
  const resultadoDiv = document.getElementById("resultado-reporte");

  // Limpiar resultados anteriores
  alertDiv.innerHTML = "";
  statsDiv.innerHTML = "";
  resultadoDiv.innerHTML = "";

  // Validar fechas
  if (!inicio || !fin) {
    alertDiv.innerHTML = `<div class="alert alert-warning">Por favor selecciona ambas fechas.</div>`;
    return;
  }

  try {
    // Mostrar mensaje de carga
    resultadoDiv.innerHTML = `<div class="alert alert-info">Generando reporte...</div>`;

    // Llamada a la API
    const response = await fetch(`${API_REPORTE}/reporte?inicio=${inicio}&fin=${fin}`);

    if (!response.ok) {
      throw new Error("Error al obtener el reporte");
    }

    const data = await response.json();

    // Validar si hay resultados
    if (!data || data.length === 0) {
      resultadoDiv.innerHTML = "";
      alertDiv.innerHTML = `<div class="alert alert-info">No hay facturas en el rango de fechas seleccionado.</div>`;
      return;
    }

    // Calcular estadísticas
    const totalFacturas = data.length;
    const totalMonto = data.reduce((sum, f) => sum + f.total, 0);

    // Mostrar resumen
    statsDiv.innerHTML = `
      <div class="alert alert-success mt-3">
        <strong>Total de facturas:</strong> ${totalFacturas}<br>
        <strong>Total facturado:</strong> Q${totalMonto.toFixed(2)}
      </div>
    `;

    // Crear tabla con los resultados
    let tablaHTML = `
      <table class="table table-bordered table-striped mt-3">
        <thead class="table-primary">
          <tr>
            <th>#</th>
            <th>Número de Factura</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total (Q)</th>
          </tr>
        </thead>
        <tbody>
    `;

    data.forEach((factura, index) => {
      tablaHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${factura.numeroFactura}</td>
          <td>${factura.cliente}</td>
          <td>${new Date(factura.fecha).toLocaleDateString()}</td>
          <td>${factura.total.toFixed(2)}</td>
        </tr>
      `;
    });

    tablaHTML += `</tbody></table>`;
    resultadoDiv.innerHTML = tablaHTML;

  } catch (error) {
    console.error("Error:", error);
    alertDiv.innerHTML = `<div class="alert alert-danger">Error al conectar con la API: ${error.message}</div>`;
    resultadoDiv.innerHTML = "";
  }

  
}

// ========================================
// DESCARGAR REPORTE EN PDF (VERSIÓN FUNCIONAL)
// ========================================
async function descargarPDF() {
  const resultado = document.getElementById("resultado-reporte");
  const stats = document.getElementById("stats-reporte");

  if (!resultado.innerHTML.trim()) {
    alert("⚠️ Primero genera un reporte antes de descargarlo.");
    return;
  }

  // Crear contenedor temporal con estilos
  const contenedor = document.createElement("div");
  contenedor.style.background = "#fff";
  contenedor.style.padding = "20px";
  contenedor.style.fontFamily = "Arial, sans-serif";
  contenedor.innerHTML = `
    <h2 style="text-align:center; color:#1A5E63;">Reporte de Facturas</h2>
    <p style="text-align:center; color:#666;">Generado el ${new Date().toLocaleString()}</p>
    <hr>
    ${stats.innerHTML}
    ${resultado.innerHTML}
  `;

  // Convertir HTML a canvas
  const canvas = await html2canvas(contenedor, { scale: 2, backgroundColor: "#ffffff" });
  const imgData = canvas.toDataURL("image/png");

  // Crear PDF con jsPDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  // Pie de página
  pdf.setFontSize(10);
  pdf.setTextColor(120);
  pdf.text("Generado automáticamente por el Sistema de Facturación", 10, 290);

  // Descargar archivo
  pdf.save(`Reporte_Facturas_${new Date().toISOString().slice(0, 10)}.pdf`);
}
