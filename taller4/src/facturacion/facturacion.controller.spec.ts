import { Test, TestingModule } from '@nestjs/testing';
import { FacturacionController } from './facturacion.controller';
import { FacturacionService } from './facturacion.service';
import { CreateFacturacionDto } from './dto/create-facturacion.dto';
import { UpdateFacturacionDto } from './dto/update-facturacion.dto';
import { MetodoPago } from './enums/metodo-pago.enum';
import { Facturacion } from './facturacion.entity';

describe('FacturacionController', () => {
  let controller: FacturacionController;
  let service: FacturacionService;

  beforeEach(async () => {
    // Crea un servicio simulado (mock) con las funciones básicas
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    // Crea el módulo de prueba con el controlador y el mock del servicio
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturacionController],
      providers: [{ provide: FacturacionService, useValue: mockService }],
    }).compile();

    controller = module.get<FacturacionController>(FacturacionController);
    service = module.get<FacturacionService>(FacturacionService);
  });

  // Verifica que el controlador esté definido
  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  // Prueba la creación de una factura
  it('debería crear una factura', async () => {
    const dto: CreateFacturacionDto = {
      numero_factura: 'FAC-2025-001',
      tipo_factura: 'Factura de venta',
      metodo_pago: MetodoPago.EFECTIVO,
      total: 125000.5,
      id_venta: 10,
      id_usuario: 5,
    };

    const mockFactura: Facturacion = {
      id_facturacion: 1,
      fecha_emision: new Date(),
      total: dto.total,
      venta: { id_venta: 10 } as any,
      usuario: { id_usuario: 5, nombre: 'Carlos' } as any,
    };

    jest.spyOn(service, 'create').mockResolvedValue(mockFactura);

    const result = await controller.create(dto);
    expect(result).toEqual(mockFactura);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  // Prueba la obtención de todas las facturas
  it('debería listar todas las facturas', async () => {
    const mockList: Facturacion[] = [
      {
        id_facturacion: 1,
        fecha_emision: new Date(),
        total: 125000.5,
        venta: { id_venta: 1 } as any,
        usuario: { id_usuario: 5 } as any,
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(mockList);

    const result = await controller.findAll();
    expect(result).toEqual(mockList);
    expect(service.findAll).toHaveBeenCalled();
  });

  // Prueba la obtención de una factura por ID
  it('debería obtener una factura por ID', async () => {
    const id = 1;
    const mockFactura: Facturacion = {
      id_facturacion: id,
      total: 12000,
      fecha_emision: new Date(),
      venta: { id_venta: 2 } as any,
      usuario: { id_usuario: 3 } as any,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(mockFactura);

    const result = await controller.findOne(id);
    expect(result).toEqual(mockFactura);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  // Prueba la actualización de una factura
  it('debería actualizar una factura', async () => {
    const id = 1;
    const dto: UpdateFacturacionDto = {
      total: 200000,
      metodo_pago: MetodoPago.TARJETA,
    };

    const mockUpdatedFactura: Facturacion = {
      id_facturacion: id,
      fecha_emision: new Date(),
      total: 200000,
      venta: { id_venta: 1 } as any,
      usuario: { id_usuario: 5 } as any,
    };

    jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedFactura);

    const result = await controller.update(id, dto);
    expect(result).toEqual(mockUpdatedFactura);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  // Prueba la eliminación de una factura
  it('debería eliminar una factura', async () => {
    const id = 1;
    const mockResponse = undefined;

    jest.spyOn(service, 'remove').mockResolvedValue({} as Facturacion);

    const result = await controller.remove(id);
    expect(result).toEqual({} as Facturacion);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
