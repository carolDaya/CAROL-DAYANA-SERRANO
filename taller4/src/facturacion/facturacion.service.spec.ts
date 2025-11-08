import { Test, TestingModule } from '@nestjs/testing';
import { FacturacionService } from './facturacion.service';
import { Facturacion } from './facturacion.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateFacturacionDto } from './dto/create-facturacion.dto';
import { UpdateFacturacionDto } from './dto/update-facturacion.dto';
import { MetodoPago } from './enums/metodo-pago.enum';
import { Ventas } from '../ventas/ventas.entity';
import { Usuario } from '../usuario/usuario.entity';

describe('FacturacionService', () => {
  let service: FacturacionService;
  let repo: Partial<Record<keyof Repository<Facturacion>, jest.Mock>>;

  // Se ejecuta antes de cada test para inicializar el módulo y el mock del repositorio
  beforeEach(async () => {
    // Se define un mock del repositorio con métodos jest.fn() para simular su comportamiento
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      merge: jest.fn(),
      remove: jest.fn(),
    };

    // Creación del módulo de testing de NestJS
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacturacionService,
        { provide: getRepositoryToken(Facturacion), useValue: repo }, // Se inyecta el mock del repositorio
      ],
    }).compile();

    service = module.get<FacturacionService>(FacturacionService);
    jest.clearAllMocks(); // Se limpian los mocks antes de cada test
  });

  // Mock de usuario
  const usuarioMock: Usuario = {
    id_usuario: 1,
    nombre: 'Erika',
    correo: 'erika@example.com',
    contrasena: 'hashedpassword',
    rol: 'empleado',
    ventas: [],
    facturas: [],
    updatedAt: new Date(),
    deletedAt: new Date(),
  };

  // Mock de venta asociada a un usuario
  const ventaMock: Ventas = {
    id_venta: 1,
    fecha: new Date(),
    total: 100,
    usuario: usuarioMock,
    facturacion: null as any,
    ventaProductos: [],
  };

  // Mock de factura asociada a un usuario y a una venta
  const facturaMock: Facturacion = {
    id_facturacion: 1,
    fecha_emision: new Date(),
    total: 100,
    venta: ventaMock,
    usuario: usuarioMock,
  };

  // Test del método create
  describe('create', () => {
    it('debe crear una factura correctamente', async () => {
      const dto: CreateFacturacionDto = {
        numero_factura: 'FAC-2025-001',
        tipo_factura: 'Factura de venta',
        metodo_pago: MetodoPago.EFECTIVO,
        total: 100,
        id_venta: 1,
        id_usuario: 1,
      };

      repo.create!.mockReturnValue(facturaMock); // Simula el método create
      repo.save!.mockResolvedValue(facturaMock); // Simula el método save

      const result = await service.create(dto);

      // Verifica que los métodos del repositorio fueron llamados correctamente
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(facturaMock);
      expect(result).toEqual(facturaMock); // Verifica el resultado final
    });
  });

  // Test del método findAll
  describe('findAll', () => {
    it('debe retornar todas las facturas', async () => {
      repo.find!.mockResolvedValue([facturaMock]); // Simula find
      const result = await service.findAll();
      expect(result).toEqual([facturaMock]);
      expect(repo.find).toHaveBeenCalledWith({ relations: ['venta'] }); // Verifica que se llamen las relaciones correctas
    });
  });

  // Test del método findOne
  describe('findOne', () => {
    it('debe retornar la factura si existe', async () => {
      repo.findOne!.mockResolvedValue(facturaMock); // Simula que encuentra la factura
      const result = await service.findOne(1);
      expect(result).toEqual(facturaMock);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repo.findOne!.mockResolvedValue(null); // Simula que no encuentra la factura
      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Factura no encontrada'),
      );
    });
  });

  // Test del método update
  describe('update', () => {
    it('debe actualizar una factura existente', async () => {
      const dto: UpdateFacturacionDto = { total: 200 };
      repo.findOne!.mockResolvedValue(facturaMock); // Encuentra la factura existente
      repo.save!.mockResolvedValue({ ...facturaMock, ...dto }); // Devuelve la factura actualizada

      const result = await service.update(1, dto);

      expect(repo.merge).toHaveBeenCalledWith(facturaMock, dto); // Verifica que merge se llame correctamente
      expect(repo.save).toHaveBeenCalledWith(facturaMock); // Verifica que save se llame correctamente
      expect(result.total).toBe(200); // Verifica el valor actualizado
    });
  });

  // Test del método remove
  describe('remove', () => {
    it('debe eliminar una factura existente', async () => {
      repo.findOne!.mockResolvedValue(facturaMock); // Encuentra la factura
      repo.remove!.mockResolvedValue(facturaMock); // Simula la eliminación

      const result = await service.remove(1);

      expect(repo.remove).toHaveBeenCalledWith(facturaMock); // Verifica que remove se llame correctamente
      expect(result).toEqual(facturaMock); // Verifica que devuelva la factura eliminada
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repo.findOne!.mockResolvedValue(null); // Simula que no encuentra la factura
      await expect(service.remove(999)).rejects.toThrow(
        new NotFoundException('Factura no encontrada'),
      );
    });
  });
});
