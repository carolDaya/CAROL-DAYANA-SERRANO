import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ventas } from '../../ventas/ventas.entity';
import { Usuario } from 'usuario/usuario.entity';
import { Facturacion } from '../../facturacion/facturacion.entity';
import { CreateVentaDto } from '../../ventas/dto/create-venta.dto';
import { UpdateVentaDto } from '../../ventas/dto/update-venta.dto';

@Injectable()
export class VentasRepository {
  constructor(
    //inyección de dependencias
    // 1. ventasRepo: Repositorio principal para la entidad Ventas
    // 2. usuarioRepo: Repositorio para buscar el Usuario asociado a la venta
    // 3. facturacionRepo: Repositorio para crear automáticamente la Factura después de la venta
    @InjectRepository(Ventas)
    private ventasRepo: Repository<Ventas>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Facturacion)
    private facturacionRepo: Repository<Facturacion>,
  ) {}
  // Crea una nueva Venta y automáticamente crea la Factura asociada en la misma
  async createVenta(data: CreateVentaDto) {
    // Buscar usuario
    const usuario = await this.usuarioRepo.findOne({
      where: { id_usuario: data.id_usuario },
    });
    // Si no existe, lanzar error
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Crear la venta
    const nuevaVenta = this.ventasRepo.create({
      total: data.total,
      // Asignar el usuario
      usuario,
    });
    // Guardar la venta
    const ventaGuardada = await this.ventasRepo.save(nuevaVenta);

    // Crear la factura asociada automáticamente
    const nuevaFactura = this.facturacionRepo.create({
      total: ventaGuardada.total,
      fecha_emision: new Date(), // Fecha de emisión de la factura
      venta: ventaGuardada,
      usuario,
    });
    // Guardar la factura
    await this.facturacionRepo.save(nuevaFactura);

    // Retornar la venta con su factura y usuario
    return await this.ventasRepo.findOne({
      where: { id_venta: ventaGuardada.id_venta },
      relations: ['usuario', 'facturacion', 'ventaProductos'],
    });
  }
  // Listar todas las ventas
  async findAll() {
    return await this.ventasRepo.find({
      // Carga las relaciones para mostrar quién compró, qué facturó y qué productos incluyó
      relations: ['usuario', 'facturacion', 'ventaProductos'],
    });
  }
  // Obtener una venta por ID
  async findOne(id: number) {
    return await this.ventasRepo.findOne({
      where: { id_venta: id },
      relations: ['usuario', 'facturacion', 'ventaProductos'],
    });
  }
  // Actualizar una venta
  async updateVenta(id: number, data: UpdateVentaDto) {
    await this.ventasRepo.update(id, data);
    return this.findOne(id);
  }
  // Eliminar una venta
  async deleteVenta(id: number) {
    return await this.ventasRepo.delete(id);
  }
}
