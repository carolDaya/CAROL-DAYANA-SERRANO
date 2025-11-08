import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './producto.entity';

describe('ProductoController', () => {
  let controller: ProductoController;

  // Mock del servicio
  const mockProductoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const createProductoDto: CreateProductoDto = {
    nombre: 'Taladro Bosch',
    descripcion: 'Taladro percutor profesional 550W',
    precio: 249900,
    stock: 30,
    proveedorId: 5,
    categoriaId: 2,
  };

  // Mock de producto devuelto por el servicio
  const mockProducto: Partial<Producto> = {
    nombre: createProductoDto.nombre,
    descripcion: createProductoDto.descripcion,
    precio: createProductoDto.precio,
    stock: createProductoDto.stock,
    proveedor: { id: createProductoDto.proveedorId } as any,
    categoria: { id: createProductoDto.categoriaId } as any,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductoController],
      providers: [
        {
          provide: ProductoService,
          useValue: mockProductoService,
        },
      ],
    }).compile();

    controller = moduleRef.get<ProductoController>(ProductoController);
    jest.clearAllMocks();
  });

  it('Should create a product', async () => {
    mockProductoService.create.mockResolvedValue(mockProducto);

    const result = await controller.create(createProductoDto);

    expect(mockProductoService.create).toHaveBeenCalledTimes(1);
    expect(mockProductoService.create).toHaveBeenCalledWith(createProductoDto);
    expect(result).toBe(mockProducto);
  });

  it('Should return all products', async () => {
    mockProductoService.findAll.mockResolvedValue([mockProducto, mockProducto]);

    const result = await controller.findAll();

    expect(mockProductoService.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockProducto, mockProducto]);
    expect(result.length).toBe(2);
  });

  it('Should return a product by ID', async () => {
    mockProductoService.findOne.mockResolvedValue(mockProducto);

    const result = await controller.findOne(1); // El ID no importa aquí

    expect(mockProductoService.findOne).toHaveBeenCalledTimes(1);
    expect(mockProductoService.findOne).toHaveBeenCalledWith(1);
    expect(result).toBe(mockProducto);
  });

  it('Should update a product', async () => {
    const updateDto: UpdateProductoDto = {
      nombre: 'Taladro Bosch GSB 550',
      precio: 259900,
    };

    mockProductoService.update.mockResolvedValue(mockProducto);

    const result = await controller.update(1, updateDto);

    expect(mockProductoService.update).toHaveBeenCalledTimes(1);
    expect(mockProductoService.update).toHaveBeenCalledWith(1, updateDto);
    expect(result).toBe(mockProducto);
  });

  it('Should delete a product', async () => {
    mockProductoService.remove.mockResolvedValue(undefined);

    const result = await controller.remove(1);

    expect(mockProductoService.remove).toHaveBeenCalledTimes(1);
    expect(mockProductoService.remove).toHaveBeenCalledWith(1);
    expect(result).toBeUndefined();
  });
});
