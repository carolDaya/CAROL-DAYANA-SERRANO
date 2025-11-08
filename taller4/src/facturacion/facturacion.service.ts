import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facturacion } from './facturacion.entity';
import { CreateFacturacionDto } from './dto/create-facturacion.dto';
import { UpdateFacturacionDto } from './dto/update-facturacion.dto';

/**
 * Servicio encargado de manejar la lógica de negocio relacionada con las facturas.
 * Este servicio permite crear, obtener, actualizar y eliminar registros de facturación.
 *
 * @module FacturacionService
 */
@Injectable()
export class FacturacionService {
  /**
   * Inyecta el repositorio de la entidad `Facturacion` para interactuar con la base de datos.
   *
   * @param repo - Repositorio de TypeORM para la entidad `Facturacion`.
   */
  constructor(
    @InjectRepository(Facturacion)
    private readonly repo: Repository<Facturacion>,
  ) {}

  /**
   * Crea una nueva factura en la base de datos.
   *
   * @param dto - Objeto que contiene los datos necesarios para crear una factura.
   * @returns La factura recién creada.
   */
  create(dto: CreateFacturacionDto) {
    const nuevaFactura = this.repo.create(dto);
    return this.repo.save(nuevaFactura);
  }

  /**
   * Obtiene todas las facturas almacenadas en la base de datos.
   *
   * @returns Una lista de todas las facturas con su relación `venta`.
   */
  findAll() {
    return this.repo.find({ relations: ['venta'] });
  }

  /**
   * Busca una factura específica por su identificador.
   *
   * @param id - Identificador de la factura a buscar.
   * @returns La factura encontrada.
   * @throws {NotFoundException} Si la factura no existe.
   */
  async findOne(id: number) {
    const factura = await this.repo.findOne({
      where: { id_facturacion: id },
      relations: ['venta'],
    });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }

  /**
   * Actualiza una factura existente.
   *
   * @param id - Identificador de la factura a actualizar.
   * @param dto - Datos nuevos que reemplazarán los anteriores.
   * @returns La factura actualizada.
   */
  async update(id: number, dto: UpdateFacturacionDto) {
    const factura = await this.findOne(id);
    this.repo.merge(factura, dto);
    return this.repo.save(factura);
  }

  /**
   * Elimina una factura de la base de datos.
   *
   * @param id - Identificador de la factura a eliminar.
   * @returns La factura eliminada.
   */
  async remove(id: number) {
    const factura = await this.findOne(id);
    return this.repo.remove(factura);
  }
}
