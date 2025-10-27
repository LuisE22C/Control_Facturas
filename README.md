💼 Sistema de Control de Facturas
Proyecto completo desarrollado por Joshua Cirilo Alegría como parte de su examen técnico. El sistema permite gestionar facturas con sus detalles, consultar información específica y generar reportes descargables en PDF.
🧩 Estructura del Proyecto

ControlFacturas/
├── Backend_API/      → API REST creada con ASP.NET Core y Entity Framework
├── Frontend/         → Interfaz en HTML, CSS, JS y Bootstrap
└── BaseDeDatos/      → Script SQL para crear la base de datos y cargar datos de ejemplo

🚀 Funcionalidades Principales
1️⃣ Gestión de Facturas
- Crear nuevas facturas con fecha, cliente y productos.
- Calcular subtotales y total de forma automática.
- Validar datos antes del envío.
- Guardar las facturas en SQL Server mediante la API.

2️⃣ Consulta de Facturas
- Buscar facturas por número.
- Mostrar todos los detalles (cliente, fecha, total y productos).

3️⃣ Reportes
- Generar reportes de facturas en un rango de fechas.
- Calcular totales y promedio general.
- Descargar el reporte en PDF con formato visual (usando jsPDF y html2canvas).
⚙️ Tecnologías Utilizadas
Backend: C#, ASP.NET Core 8, Entity Framework Core, SQL Server, Swagger.
Frontend: HTML5, CSS3, JavaScript, Bootstrap 5, jsPDF, html2canvas.
🗄️ Base de Datos
Base de datos: ControlFacturas (SQL Server)
Tablas: Factura y DetalleFactura.
Incluye Script_Creacion.sql con las tablas y datos de ejemplo.
🔌 Endpoints Principales de la API

POST    /api/Factura                → Crear nueva factura
GET     /api/Factura/{numero}       → Consultar factura específica
GET     /api/Factura/reporte        → Reporte por rango de fechas
Swagger: https://localhost:7036/swagger

🧩 Instalación y Configuración
1️⃣ Restaurar la Base de Datos con el script SQL.
2️⃣ Configurar la cadena de conexión en appsettings.json.
3️⃣ Ejecutar la API desde Visual Studio o consola con dotnet run.
4️⃣ Abrir Frontend/index.html en el navegador.
💾 Archivos Importantes

Program.cs             → Configuración principal y CORS
FacturaController.cs    → Controlador de facturas
AppDbContext.cs         → Contexto de Entity Framework
js/reporte.js           → Genera reportes y PDFs
js/consulta.js          → Lógica de consulta
js/factura.js           → Creación de facturas

🧑‍💻 Autor
Luis Emilio Cirilo Alegría
Proyecto presentado como parte de la Prueba Técnica – Control de Facturas
Guatemala, Octubre 2025
