/*
Ejemplos de datos usados en la documentación Swagger para mostrar cómo luce una factura (singular y en lista)
*/

export const FacturacionSingularExample = {
  id_facturacion: 1,
  numero_factura: 'FAC-2025-001',
  tipo_factura: 'Factura de venta',
  metodo_pago: 'EFECTIVO',
  total: 125000.5,
  fecha_emision: '2025-11-05T15:30:00.000Z',
  venta: { id_venta: 10 },
  usuario: { id_usuario: 5 },
};

export const FacturacionArrayExample = [
  FacturacionSingularExample,
  {
    id_facturacion: 2,
    numero_factura: 'FAC-2025-002',
    tipo_factura: 'Nota de crédito',
    metodo_pago: 'TARJETA',
    total: 50000.0,
    fecha_emision: '2025-11-05T16:00:00.000Z',
    venta: { id_venta: 11 },
    usuario: { id_usuario: 5 },
  },
];
