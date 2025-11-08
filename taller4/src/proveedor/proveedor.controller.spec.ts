import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './proveedor.entity';

describe('ProveedorController', () => {
  let controller: ProveedorController;
  let service: ProveedorService;

  //Objeto simulado de proveedor, usando la entidad como base
  const mockProveedor: Proveedor = {
    id_proveedor: 1,
    nombre: 'Distribuciones La Española',
    telefono: '3004567890',
    correo: 'proveedor@gmail.com',
    productos: [],
    encryptEmail: jest.fn(), //Métodos para no ejecutar lógica real
    getDecryptedEmail: jest.fn(),
  } as any;

  //Se define un mock con métodos
  const mockProveedorService = {
    findAll: jest.fn().mockResolvedValue([mockProveedor]),
    findOne: jest.fn().mockResolvedValue(mockProveedor),
    create: jest.fn().mockResolvedValue(mockProveedor),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockProveedor, nombre: 'Actualizado' }),
    remove: jest
      .fn()
      .mockResolvedValue({ message: 'Proveedor eliminado correctamente' }),
  };

  //Configurar un módulo de testing con el controlador y el mock del servicio
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProveedorController],
      providers: [
        {
          provide: ProveedorService,
          useValue: mockProveedorService, // Se reemplaza el servicio real por el simulado
        },
      ],
    }).compile();

    //Se obtienen instancias del controlador y del servicio mockeado
    controller = module.get<ProveedorController>(ProveedorController);
    service = module.get<ProveedorService>(ProveedorService);
  });

  //Verifica que el controlador exista correctamente
  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  //Prueba el método findAll
  it('debería retornar todos los proveedores', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockProveedor]); // Espera que devuelva la lista mock
    expect(service.findAll).toHaveBeenCalled(); // Verifica que el servicio fue llamado
  });

  //Prueba el método findOne
  it('debería retornar un proveedor por ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockProveedor);
    expect(service.findOne).toHaveBeenCalledWith(1); // Se verifica que se llamó con el ID correcto
  });

  //Prueba el método create
  it('debería crear un proveedor', async () => {
    const result = await controller.create(mockProveedor);
    expect(result).toEqual(mockProveedor);
    expect(service.create).toHaveBeenCalledWith(mockProveedor); // Se espera que use el proveedor dado
  });

  //Prueba el método update
  it('debería actualizar un proveedor', async () => {
    const updated = await controller.update(1, mockProveedor);
    expect(updated!).not.toBeNull(); // Asegura que el resultado no sea nulo
    expect(updated!.nombre).toBe('Actualizado'); // Comprueba el cambio esperado
    expect(service.update).toHaveBeenCalledWith(1, mockProveedor); // Verifica que se llamó correctamente
  });

  //Prueba el método remove
  it('debería eliminar un proveedor', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ message: 'Proveedor eliminado correctamente' });
    expect(service.remove).toHaveBeenCalledWith(1); // Confirma que se pasó el ID correcto
  });
});
