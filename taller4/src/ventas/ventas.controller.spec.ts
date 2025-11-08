import { Test, TestingModule } from '@nestjs/testing';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Ventas } from './ventas.entity';
import { DeleteResult } from 'typeorm';

describe('VentasController', () => {
  let controller: VentasController;
  let service: VentasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VentasController],
      providers: [
        {
          provide: VentasService,
          useValue: {
            createVenta: jest.fn(),
            findAll: jest.fn(),
            getVenta: jest.fn(),
            updateVenta: jest.fn(),
            deleteVenta: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VentasController>(VentasController);
    service = module.get<VentasService>(VentasService);
  });

  it('debería estar definido el controlador', () => {
    expect(controller).toBeDefined();
  });

  describe('createVenta', () => {
    it('debería crear una venta y devolverla', async () => {
      const dto: CreateVentaDto = {
        total: 150000,
        id_usuario: 1,
      };

      const ventaEsperada: Ventas = {
        id_venta: 1,
        total: 150000,
        usuario: { id_usuario: 1, nombre: 'Erika' } as any,
        facturacion: { id_factura: 1, total: 150000 } as any,
      } as Ventas;

      (service.createVenta as jest.Mock).mockResolvedValue(ventaEsperada);

      const result = await controller.create(dto);
      expect(result).toEqual(ventaEsperada);
      expect(service.createVenta).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('debería devolver un arreglo de ventas', async () => {
      const ventas: Ventas[] = [
        { id_venta: 1, total: 100000 } as Ventas,
        { id_venta: 2, total: 200000 } as Ventas,
      ];
      (service.findAll as jest.Mock).mockResolvedValue(ventas);

      const result = await controller.list();
      expect(result).toEqual(ventas);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getVenta', () => {
    it('debería devolver una venta por ID', async () => {
      const venta: Ventas = { id_venta: 1, total: 50000 } as Ventas;
      (service.getVenta as jest.Mock).mockResolvedValue(venta);

      const result = await controller.get(1);
      expect(result).toEqual(venta);
      expect(service.getVenta).toHaveBeenCalledWith(1);
    });
  });

  describe('updateVenta', () => {
    it('debería actualizar una venta existente', async () => {
      const dto: UpdateVentaDto = { total: 180000 };
      const ventaActualizada: Ventas = { id_venta: 1, total: 180000 } as Ventas;

      (service.updateVenta as jest.Mock).mockResolvedValue(ventaActualizada);

      const result = await controller.allowUpdate(1, dto);
      expect(result).toEqual(ventaActualizada);
      expect(service.updateVenta).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('deleteVenta', () => {
    it('debería eliminar una venta y devolver el resultado', async () => {
      const ventaId = 1;
      (service.deleteVenta as jest.Mock).mockResolvedValue({
        affected: 1,
        raw: [],
      }); // Mock the service to return a DeleteResult

      const result = await controller.delete(ventaId);
      expect(result).toEqual({
        message: `Venta ${ventaId} eliminada correctamente`,
      }); // Expect the controller's custom message
      expect(service.deleteVenta).toHaveBeenCalledWith(ventaId);
    });
  });
});
