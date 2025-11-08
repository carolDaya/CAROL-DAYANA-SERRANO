import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Ventas } from './ventas.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Facturacion } from '../facturacion/facturacion.entity';
import { UpdateVentaDto } from './dto/update-venta.dto';

/**
 * Servicio que maneja la lógica de negocio para las operaciones de ventas.
 *
 * Este servicio permite crear ventas, actualizar registros, obtener información
 * y eliminar ventas del sistema. Además, al crear una venta se genera
 * automáticamente una facturación asociada.
 *
 * @service VentasService
 */
@Injectable()
export class VentasService {
  /**
   * Inyecta los repositorios de `Ventas`, `Usuario` y `Facturacion`
   * para gestionar las operaciones con la base de datos.
   *
   * @param ventaRepo Repositorio para la entidad Ventas.
   * @param usuarioRepo Repositorio para la entidad Usuario.
   * @param facturacionRepo Repositorio para la entidad Facturacion.
   */
  constructor(
    @InjectRepository(Ventas)
    private readonly ventaRepo: Repository<Ventas>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    @InjectRepository(Facturacion)
    private readonly facturacionRepo: Repository<Facturacion>,
  ) {}

  /**
   * Crea una nueva venta en el sistema y genera automáticamente su facturación asociada.
   *
   * Flujo:
   * 1 Busca al usuario por su ID.
   * 2 Crea una nueva venta vinculada al usuario.
   * 3 Genera una factura asociada con la venta.
   * 4 Devuelve la venta con sus relaciones cargadas.
   *
   * @async
   * @param data Objeto que contiene el total y el ID del usuario.
   * @throws Error Si el usuario no existe.
   * @returns La venta creada junto con su facturación y usuario.
   */
  async createVenta(data: {
    total: number;
    id_usuario: number;
  }): Promise<Ventas> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id_usuario: data.id_usuario },
    });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const nuevaVenta = this.ventaRepo.create({
      total: data.total,
      usuario: usuario,
    });
    const ventaGuardada = await this.ventaRepo.save(nuevaVenta);

    const nuevaFactura = this.facturacionRepo.create({
      venta: ventaGuardada,
      usuario: usuario,
      fecha_emision: new Date(),
      total: ventaGuardada.total,
    });
    await this.facturacionRepo.save(nuevaFactura);

    const ventaConFactura = await this.ventaRepo.findOne({
      where: { id_venta: ventaGuardada.id_venta },
      relations: ['usuario', 'facturacion'],
    });

    return ventaConFactura as Ventas;
  }

  /**
   * Obtiene todas las ventas registradas.
   *
   * @async
   * @returns Un arreglo con todas las ventas.
   */
  async findAll(): Promise<Ventas[]> {
    return await this.ventaRepo.find({
      relations: ['usuario', 'facturacion'],
    });
  }

  /**
   * Actualiza los datos de una venta existente.
   *
   * @async
   * @param id Identificador de la venta a actualizar.
   * @param body Datos de la venta a modificar (UpdateVentaDto).
   * @throws Error Si la venta no existe.
   * @returns La venta actualizada.
   */
  async updateVenta(id: number, body: UpdateVentaDto): Promise<Ventas | null> {
    const venta = await this.ventaRepo.findOne({ where: { id_venta: id } });
    if (!venta) {
      throw new Error('Venta no encontrada');
    }
    this.ventaRepo.merge(venta, body);
    return await this.ventaRepo.save(venta);
  }

  /**
   * Obtiene una venta específica por su ID, incluyendo sus relaciones.
   *
   * @async
   * @param id Identificador de la venta.
   * @returns La venta encontrada con su usuario y facturación.
   */
  async getVenta(id: number): Promise<Ventas | null> {
    return await this.ventaRepo.findOne({
      where: { id_venta: id },
      relations: ['usuario', 'facturacion'],
    });
  }

  /**
   * Elimina una venta del sistema por su ID.
   *
   * @async
   * @param id Identificador de la venta a eliminar.
   * @returns Resultado de la operación de eliminación.
   */
  async deleteVenta(id: number): Promise<DeleteResult> {
    return await this.ventaRepo.delete(id);
  }
}
