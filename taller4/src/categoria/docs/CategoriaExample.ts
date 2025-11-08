/*
Ejemplos de datos usados en la documentación Swagger para mostrar cómo luce una categoria (singular y en lista)
*/
export const CategoriaSingularExample = {
  id_categoria: 10,
  nombre: 'Tornillos',
  descripcion: 'Artículo de Ferreteria',
  activo: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const CategoriaArrayExample = [
  {
    id_categoria: 10,
    nombre: 'Tornillo',
    descripcion: 'Artículo de Ferreteria',
    activo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id_categoria: 11,
    nombre: 'Martillo',
    descripcion: 'Artículo de Ferreteria',
    activo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
