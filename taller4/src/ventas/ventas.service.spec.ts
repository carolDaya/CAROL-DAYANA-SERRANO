import { Test } from '@nestjs/testing';
import { VentasService } from './ventas.service';
import { Repository } from 'typeorm';
import { Ventas } from './ventas.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Facturacion } from '../facturacion/facturacion.entity';

describe('VentasService', () => {
  let service: VentasService;
  let ventaRepo: jest.Mocked<Repository<Ventas>>;
  let usuarioRepo: jest.Mocked<Repository<Usuario>>;
  let facturacionRepo: jest.Mocked<Repository<Facturacion>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        VentasService,
        {
          provide: 'VentasRepository',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: 'UsuarioRepository',
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: 'FacturacionRepository',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<VentasService>(VentasService);

    ventaRepo = moduleRef.get('VentasRepository');
    usuarioRepo = moduleRef.get('UsuarioRepository');
    facturacionRepo = moduleRef.get('FacturacionRepository');

    jest.clearAllMocks();
  });

  it('debería crear una venta y su facturación', async () => {
    const mockUsuario: Usuario = {
      id_usuario: 1,
      nombre: 'Erika',
      apellido: 'Pesca',
      correo: 'erika@test.com',
      contrasena: '12345678',
      rol: 'empleado', // si usas enum, pon Roles.EMPLEADO
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const mockVenta: Ventas = {
  id_venta: 1,
  total: 100,
  usuario: mockUsuario,
  facturacion: null, 
  fecha: new Date(), 
  ventaProductos: [], 
};


    usuarioRepo.findOne.mockResolvedValue(mockUsuario as any);
    ventaRepo.create.mockReturnValue(mockVenta as any);
    ventaRepo.save.mockResolvedValue(mockVenta as any);
    facturacionRepo.create.mockReturnValue({} as any);
    facturacionRepo.save.mockResolvedValue({} as any);
    ventaRepo.findOne.mockResolvedValue(mockVenta as any);

    const result = await service.createVenta({ total: 100, id_usuario: 1 });

    expect(usuarioRepo.findOne).toHaveBeenCalledWith({ where: { id_usuario: 1 } });
    expect(ventaRepo.create).toHaveBeenCalledWith({ total: 100, usuario: mockUsuario });
    expect(ventaRepo.save).toHaveBeenCalledWith(mockVenta);
    expect(facturacionRepo.create).toHaveBeenCalled();
    expect(facturacionRepo.save).toHaveBeenCalled();
    expect(ventaRepo.findOne).toHaveBeenCalledWith({
      where: { id_venta: mockVenta.id_venta },
      relations: ['usuario', 'facturacion'],
    });
    expect(result).toBe(mockVenta);
  });

  it('debería lanzar error si el usuario no existe', async () => {
    usuarioRepo.findOne.mockResolvedValue(null);

    await expect(service.createVenta({ total: 100, id_usuario: 999 })).rejects.toThrow(
      'Usuario no encontrado',
    );
  });
});
