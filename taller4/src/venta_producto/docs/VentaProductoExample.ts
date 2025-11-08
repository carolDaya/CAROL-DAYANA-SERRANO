/*
Ejemplos de datos usados en la documentación Swagger para mostrar cómo luce una venta_producto (singular y en lista)
*/
export const VentaProductoSingularExample = {
  id_venta_producto: 1,
  cantidad: 3,
  precio_unitario: 10000.0,
  subtotal: 30000.0,
  venta: { id_venta: 1 },
  producto: { id_producto: 5, nombre: 'Martillo de Forja' },
};

export const VentaProductoArrayExample = [
  {
    id_venta_producto: 1,
    cantidad: 2,
    precio_unitario: 10000.0,
    subtotal: 20000.0,
    venta: { id_venta: 1 },
    producto: { id_producto: 5, nombre: 'Martillo de Forja' },
  },
  {
    id_venta_producto: 2,
    cantidad: 5,
    precio_unitario: 1500.0,
    subtotal: 7500.0,
    venta: { id_venta: 1 },
    producto: { id_producto: 8, nombre: 'Caja de Tornillos A' },
  },
];
