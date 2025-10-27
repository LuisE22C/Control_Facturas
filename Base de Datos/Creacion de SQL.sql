
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ControlFacturas')
BEGIN
    CREATE DATABASE ControlFacturas;
END
GO

USE ControlFacturas;
GO


IF OBJECT_ID('dbo.DetalleFactura', 'U') IS NOT NULL DROP TABLE dbo.DetalleFactura;
IF OBJECT_ID('dbo.Factura', 'U') IS NOT NULL DROP TABLE dbo.Factura;
GO



-- Tabla principal: Factura
CREATE TABLE Factura (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    NumeroFactura VARCHAR(20) NOT NULL,
    Fecha DATE NOT NULL,
    Cliente NVARCHAR(100) NOT NULL,
    Total DECIMAL(10,2) NOT NULL
);
GO

--  Tabla detalle: DetalleFactura
CREATE TABLE DetalleFactura (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FacturaId INT NOT NULL,
    Producto NVARCHAR(100) NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    Subtotal AS (Cantidad * PrecioUnitario) PERSISTED,
    CONSTRAINT FK_FacturaDetalle FOREIGN KEY (FacturaId) REFERENCES Factura(Id) ON DELETE CASCADE
);
GO



INSERT INTO Factura (NumeroFactura, Fecha, Cliente, Total)
VALUES
('FAC-001', '2025-10-25', 'Supermercado La Perla', 35.00),
('FAC-002', '2025-10-26', 'Restaurante El Buen Sabor', 120.00),
('FAC-003', '2025-10-27', 'Ferretería El Tornillo', 250.00);
GO

INSERT INTO DetalleFactura (FacturaId, Producto, Cantidad, PrecioUnitario)
VALUES
(1, 'Leche entera', 2, 8.50),
(1, 'Pan dulce', 3, 6.00),
(2, 'Pollo rostizado', 1, 85.00),
(2, 'Gaseosa 2L', 2, 17.50),
(3, 'Caja de clavos', 4, 10.00),
(3, 'Martillo', 2, 35.00),
(3, 'Cinta métrica', 1, 25.00);
GO



--  Ver facturas con totales
SELECT * FROM Factura;

--  Ver detalles con sus subtotales
SELECT f.NumeroFactura, d.Producto, d.Cantidad, d.PrecioUnitario, d.Subtotal
FROM Factura f
INNER JOIN DetalleFactura d ON f.Id = d.FacturaId
ORDER BY f.Id;


PRINT ' Base de datos ControlFacturas creada e inicializada correctamente.';
