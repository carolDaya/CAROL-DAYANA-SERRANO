// abstrae utiliza la base de datos
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // decorador que inyecta repositorios genericos de typeORM
import { Repository } from 'typeorm';
import { Facturacion } from '../../facturacion/facturacion.entity';

@Injectable()
export class FacturacionRepository {
  constructor(
    // inyecta las dependencias permitiendo la comunicación con la base de datos
    @InjectRepository(Facturacion)
    private readonly facturacionRepo: Repository<Facturacion>,
  ) {}

  // Buscar factura por id_venta
  async findByVentaId(id_venta: number): Promise<Facturacion | null> {
    return await this.facturacionRepo.findOne({
      // Consulta a través de la relación busca la factura donde la relación 'venta' tenga el id_venta especificado
      where: { venta: { id_venta } },
      relations: ['venta', 'usuario'], // carga relaciones
    });
  }

  // Crear factura solo si no existe una asociada
  async createFacturacion(data: Partial<Facturacion>): Promise<Facturacion> {
    //  Validar que la venta exista
    if (!data.venta || !data.venta.id_venta) {
      throw new Error(
        'No se puede crear la factura, falta la información de la venta.',
      );
    }

    // Verificar si ya existe factura para esa venta
    const facturaExistente = await this.findByVentaId(data.venta.id_venta);
    if (facturaExistente) {
      return facturaExistente; // Retorna la existente y evita error de duplicado
    }

    // Crear nueva factura
    const nuevaFactura = this.facturacionRepo.create(data);
    return await this.facturacionRepo.save(nuevaFactura); //.save(nuevaFactura): Guarda la nueva entidad en la base de datos
  }

  // Métodos adicionales
  async listarFacturas() {
    // listar todas las facturas
    return await this.facturacionRepo.find({ relations: ['venta', 'usuario'] });
  }

  // obtener factura por id
  async obtenerFactura(id: number) {
    return await this.facturacionRepo.findOne({
      where: { id_facturacion: id },
      relations: ['venta', 'usuario'],
    });
  }

  // eliminar factura por id
  async eliminarFactura(id: number) {
    return await this.facturacionRepo.delete(id);
  }

  async findOne(options: any) {
    return await this.facturacionRepo.findOne(options);
  }
}
