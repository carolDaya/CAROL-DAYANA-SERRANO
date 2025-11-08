import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './proveedor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProveedorService', () => {
  let service: ProveedorService;
  let repository: jest.Mocked<Repository<Proveedor>>;

  //Mock de un proveedor para usar en las pruebas
  const mockProveedor: Proveedor = {
    id_proveedor: 1,
    nombre: 'Distribuciones Colombia',
    telefono: '3004567890',
    correo: 'proveedor@gmail.com',
    productos: [],
    encryptEmail: jest.fn(),
    getDecryptedEmail: jest.fn().mockReturnValue('proveedor@gmail.com'),
  } as any;

  //Se crea un mock del repositorio de TypeORM
  const mockProveedorRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProveedorService,
        {
          provide: getRepositoryToken(Proveedor),
          useValue: mockProveedorRepository,
        },
      ],
    }).compile();

    service = module.get<ProveedorService>(ProveedorService);
    repository = module.get(getRepositoryToken(Proveedor));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //Verifica que el servicio esté definido
  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  //Prueba findAll todos los proveedores
  it('debería retornar todos los proveedores con correos desencriptados', async () => {
    repository.find.mockResolvedValue([mockProveedor]);
    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalledWith({ relations: ['productos'] });
    expect(result[0].correo).toBe('proveedor@gmail.com');
  });

  //Prueba findOne cuando existe el proveedor
  it('debería retornar un proveedor por ID', async () => {
    repository.findOne.mockResolvedValue(mockProveedor);

    const result = await service.findOne(1);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id_proveedor: 1 },
      relations: ['productos'],
    });
    expect(result).toEqual({ ...mockProveedor, correo: 'proveedor@gmail.com' });
  });

  //Prueba findOne cuando el proveedor no existe
  it('debería retornar null si el proveedor no existe', async () => {
    repository.findOne.mockResolvedValue(null);
    const result = await service.findOne(99);
    expect(result).toBeNull();
  });

  //Prueba create un proveedor
  it('debería crear un nuevo proveedor', async () => {
    repository.save.mockResolvedValue(mockProveedor);
    const result = await service.create(mockProveedor);

    expect(repository.save).toHaveBeenCalledWith(mockProveedor);
    expect(result).toEqual(mockProveedor);
  });

  //Prueba update cuando el proveedor existe
  it('debería actualizar un proveedor existente', async () => {
    repository.update.mockResolvedValue(undefined as any);
    repository.findOneBy.mockResolvedValue(mockProveedor);

    const result = await service.update(1, mockProveedor);

    expect(repository.update).toHaveBeenCalledWith(1, mockProveedor);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id_proveedor: 1 });
    expect(result!.correo).toBe('proveedor@gmail.com');
  });

  //Prueba update cuando el proveedor no existe
  it('debería retornar null si el proveedor no existe al actualizar', async () => {
    repository.update.mockResolvedValue(undefined as any);
    repository.findOneBy.mockResolvedValue(null);

    const result = await service.update(99, mockProveedor);
    expect(result).toBeNull();
  });

  //Prueba remove
  it('debería eliminar un proveedor por ID', async () => {
    repository.delete.mockResolvedValue(undefined as any);
    await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
