import { Test } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { Proveedor } from '../proveedor/proveedor.entity';
import { Categoria } from '../categoria/categoria.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

describe('ProductoService', () => {
  let service: ProductoService;
  let productoRepo: jest.Mocked<Repository<Producto>>;
  let proveedorRepo: jest.Mocked<Repository<Proveedor>>;
  let categoriaRepo: jest.Mocked<Repository<Categoria>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductoService,
        { provide: 'ProductoRepository', useValue: { find: jest.fn(), findOne: jest.fn(), create: jest.fn(), save: jest.fn(), remove: jest.fn() } },
        { provide: 'ProveedorRepository', useValue: { findOne: jest.fn() } },
        { provide: 'CategoriaRepository', useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    service = moduleRef.get<ProductoService>(ProductoService);
    productoRepo = moduleRef.get('ProductoRepository');
    proveedorRepo = moduleRef.get('ProveedorRepository');
    categoriaRepo = moduleRef.get('CategoriaRepository');

    jest.clearAllMocks();
  });

  it('findAll debería retornar todos los productos', async () => {
    const mockProductos = [{ id_producto: 1, nombre: 'Producto1' }] as Producto[];
    productoRepo.find.mockResolvedValue(mockProductos);

    const result = await service.findAll();

    expect(result).toBe(mockProductos);
    expect(productoRepo.find).toHaveBeenCalledWith({ relations: ['proveedor', 'categoria'] });
  });

  it('findOne debería retornar un producto por ID', async () => {
    const mockProducto = { id_producto: 1, nombre: 'Producto1' } as Producto;
    productoRepo.findOne.mockResolvedValue(mockProducto);

    const result = await service.findOne(1);

    expect(result).toBe(mockProducto);
    expect(productoRepo.findOne).toHaveBeenCalledWith({ where: { id_producto: 1 }, relations: ['proveedor', 'categoria'] });
  });

  it('findOne debería lanzar NotFoundException si no existe', async () => {
    productoRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('create debería crear un nuevo producto', async () => {
    const dto: CreateProductoDto = {
      nombre: 'Taladro',
      descripcion: 'Taladro Bosch',
      precio: 100,
      stock: 10,
      proveedorId: 1,
      categoriaId: 2,
    };

    const mockProveedor = { id_proveedor: 1 } as Proveedor;
    const mockCategoria = { id_categoria: 2 } as Categoria;
    const mockProducto: Producto = {
  id_producto: 1,
  nombre: dto.nombre,
  descripcion: dto.descripcion,
  precio: dto.precio,
  stock: dto.stock,
  proveedor: mockProveedor,
  categoria: mockCategoria,
  ventaProductos: [], // 👈 si existe en la entidad
} as Producto;


    proveedorRepo.findOne.mockResolvedValue(mockProveedor);
    categoriaRepo.findOne.mockResolvedValue(mockCategoria);
    productoRepo.create.mockReturnValue(mockProducto);
    productoRepo.save.mockResolvedValue(mockProducto);

    const result = await service.create(dto);

    expect(result).toBe(mockProducto);
    expect(productoRepo.create).toHaveBeenCalledWith({ nombre: dto.nombre, descripcion: dto.descripcion, precio: dto.precio, stock: dto.stock, proveedor: mockProveedor, categoria: mockCategoria });
    expect(productoRepo.save).toHaveBeenCalledWith(mockProducto);
  });

  it('update debería actualizar un producto existente', async () => {
    const dto: UpdateProductoDto = { nombre: 'Nuevo Nombre', precio: 200 };
    const mockProducto = { id_producto: 1, nombre: 'Antiguo', precio: 100, proveedor: {}, categoria: {} } as Producto;

    productoRepo.findOne.mockResolvedValue(mockProducto);
    productoRepo.save.mockResolvedValue({ ...mockProducto, ...dto });

    const result = await service.update(1, dto);

    expect(result.nombre).toBe('Nuevo Nombre');
    expect(result.precio).toBe(200);
  });

  it('remove debería eliminar un producto existente', async () => {
    const mockProducto = { id_producto: 1 } as Producto;
    productoRepo.findOne.mockResolvedValue(mockProducto);
    productoRepo.remove.mockResolvedValue(mockProducto);

    await service.remove(1);

    expect(productoRepo.remove).toHaveBeenCalledWith(mockProducto);
  });

  it('remove debería lanzar NotFoundException si no existe', async () => {
    productoRepo.findOne.mockResolvedValue(null);
    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });
});
