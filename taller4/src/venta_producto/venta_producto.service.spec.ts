import { Test, TestingModule } from '@nestjs/testing';
import { VentaProductoService } from './venta_producto.service';
import { Repository } from 'typeorm';
import { VentaProducto } from './venta_producto.entity';
import { Ventas } from '../ventas/ventas.entity';
import { Producto } from '../producto/producto.entity';
import { Categoria } from '../categoria/categoria.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Facturacion } from '../facturacion/facturacion.entity';
import { Proveedor } from '../proveedor/proveedor.entity';
import { NotFoundException } from '@nestjs/common';

// Tests unitarios para VentaProductoService
describe('VentaProductoService', () => {
  let service: VentaProductoService;
  let ventaProductoRepo: Partial<
    Record<keyof Repository<VentaProducto>, jest.Mock>
  >;
  let ventaRepo: Partial<Record<keyof Repository<Ventas>, jest.Mock>>;
  let productoRepo: Partial<Record<keyof Repository<Producto>, jest.Mock>>;

  beforeEach(async () => {
    // Mock de los repositorios
    ventaProductoRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };
    ventaRepo = { findOne: jest.fn() };
    productoRepo = { findOne: jest.fn(), save: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VentaProductoService,
        { provide: 'VentaProductoRepository', useValue: ventaProductoRepo },
        { provide: 'VentasRepository', useValue: ventaRepo },
        { provide: 'ProductoRepository', useValue: productoRepo },
      ],
    }).compile();

    // Se instancia el servicio con los mocks
    service = new VentaProductoService(
      ventaProductoRepo as any,
      ventaRepo as any,
      productoRepo as any,
    );
  });

  // Mocks de entidades para pruebas
  const usuarioMock: Usuario = {
    id_usuario: 1,
    nombre: 'Usuario Test',
    correo: 'usuario@test.com',
    contrasena: '123456',
    rol: 'empleado',
    ventas: [],
    facturas: [],
    updatedAt: new Date(),
    deletedAt: new Date(),
  };

  const facturacionMock: Facturacion = {
    id_facturacion: 1,
    fecha_emision: new Date(),
    total: 100,
    venta: {} as Ventas,
    usuario: usuarioMock,
  };

  const categoriaMock: Categoria = {
    id_categoria: 1,
    nombre: 'Categoria Test',
    descripcion: 'Descripcion Categoria',
    productos: [],
  };

  const proveedorMock: Partial<Proveedor> = {
    id_proveedor: 1,
    nombre: 'Proveedor Test',
    telefono: '3001234567',
    correo: 'proveedor@test.com',
    productos: [],
    encryptEmail: jest.fn(),
    getDecryptedEmail: jest.fn().mockReturnValue('proveedor@test.com'),
  };

  const productoMock: Producto = {
    id_producto: 1,
    nombre: 'Producto Test',
    descripcion: 'Descripcion Producto',
    precio: 100,
    stock: 10,
    proveedor: proveedorMock as Proveedor,
    categoria: categoriaMock,
    ventaProductos: [],
  };

  const ventaMock: Ventas = {
    id_venta: 1,
    fecha: new Date(),
    total: 100,
    usuario: usuarioMock,
    facturacion: facturacionMock,
    ventaProductos: [],
  };

  // Test para agregar productos a una venta
  describe('agregarProductoAVenta', () => {
    it('lanza NotFoundException si la venta no existe', async () => {
      ventaRepo.findOne!.mockResolvedValue(null);
      await expect(service.addProductToSale(1, 1, 1)).rejects.toThrow(
        new NotFoundException('Venta no encontrada'),
      );
    });

    it('lanza NotFoundException si el producto no existe', async () => {
      ventaRepo.findOne!.mockResolvedValue(ventaMock);
      productoRepo.findOne!.mockResolvedValue(null);
      await expect(service.addProductToSale(1, 1, 1)).rejects.toThrow(
        new NotFoundException('Producto no encontrado'),
      );
    });

    it('lanza NotFoundException si la cantidad supera el stock', async () => {
      ventaRepo.findOne!.mockResolvedValue(ventaMock);
      productoRepo.findOne!.mockResolvedValue({ ...productoMock, stock: 5 });
      await expect(service.addProductToSale(1, 1, 10)).rejects.toThrow(
        new NotFoundException('Stock insuficiente. Disponible: 5'),
      );
    });

    it('crea un nuevo VentaProducto y actualiza stock correctamente', async () => {
      ventaRepo.findOne!.mockResolvedValue(ventaMock);
      productoRepo.findOne!.mockResolvedValue({ ...productoMock, stock: 10 });
      ventaProductoRepo.create!.mockImplementation((dto) => dto);
      ventaProductoRepo.save!.mockImplementation(async (dto) => dto);
      productoRepo.save!.mockResolvedValue(true);

      const result = await service.addProductToSale(1, 1, 5);

      expect(result.subtotal).toBe(500);
      expect(result.cantidad).toBe(5);
      expect(result.precio_unitario).toBe(100);
    });
  });

  // Test para listar productos por venta
  describe('listarPorVenta', () => {
    it('retorna los productos de una venta', async () => {
      ventaProductoRepo.find!.mockResolvedValue([productoMock]);
      const result = await service.findBySale(1);
      expect(result).toEqual([productoMock]);
    });
  });

  // Test para eliminar un producto de la venta
  describe('eliminar', () => {
    it('lanza NotFoundException si el registro no existe', async () => {
      ventaProductoRepo.findOne!.mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Registro no encontrado'),
      );
    });

    it('elimina el registro si existe', async () => {
      ventaProductoRepo.findOne!.mockResolvedValue({ id_venta_producto: 1 });
      ventaProductoRepo.delete!.mockResolvedValue({ affected: 1 });
      const result = await service.remove(1);
      expect(result).toEqual({ affected: 1 });
    });
  });
});