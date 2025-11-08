import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VentaProducto } from './venta_producto.entity';
import { Ventas } from '../ventas/ventas.entity';
import { Producto } from '../producto/producto.entity';

/**
 * Servicio de VentaProducto
 * Contiene la lógica de negocio relacionada con los productos asociados a una venta,
 * incluyendo agregar productos, listarlos y eliminarlos.
 */
@Injectable()
export class VentaProductoService {
  constructor(
    @InjectRepository(VentaProducto)
    private readonly saleProductRepo: Repository<VentaProducto>,

    @InjectRepository(Ventas)
    private readonly saleRepo: Repository<Ventas>,

    @InjectRepository(Producto)
    private readonly productRepo: Repository<Producto>,
  ) {}

  /**
   * Agrega un producto a una venta específica.
   * Valida que la venta y el producto existan, y que haya suficiente stock.
   * Luego crea el registro en la tabla intermedia venta_producto y actualiza el stock del producto.
   *
   * @param saleId - ID de la venta
   * @param productId - ID del producto
   * @param quantity - Cantidad de productos a agregar
   * @returns El nuevo registro de venta-producto creado
   * @throws NotFoundException si la venta o el producto no existen o si no hay stock suficiente
   */
  async addProductToSale(saleId: number, productId: number, quantity: number) {
    const sale = await this.saleRepo.findOne({ where: { id_venta: saleId } });
    if (!sale) throw new NotFoundException('Venta no encontrada');

    const product = await this.productRepo.findOne({
      where: { id_producto: productId },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');

    if (quantity > product.stock) {
      throw new NotFoundException(
        `Stock insuficiente. Disponible: ${product.stock}`,
      );
    }

    // Calcular subtotal
    const subtotal = Number(product.precio) * quantity;

    // Crear el registro
    const saleProduct = this.saleProductRepo.create({
      cantidad: quantity,
      precio_unitario: product.precio,
      subtotal,
      venta: sale,
      producto: product,
    });

    // Guardar el registro y actualizar el stock
    const newRecord = await this.saleProductRepo.save(saleProduct);
    product.stock -= quantity;
    await this.productRepo.save(product);

    return newRecord;
  }

  /**
   * Lista todos los productos asociados a una venta específica.
   * Incluye relaciones con la entidad producto y venta.
   *
   * @param saleId - ID de la venta
   * @returns Lista de productos vinculados a la venta
   */
  async findBySale(saleId: number) {
    return await this.saleProductRepo.find({
      where: { venta: { id_venta: saleId } },
      relations: ['producto', 'venta'],
    });
  }

  /**
   * Elimina un registro de venta-producto por su ID.
   *
   * @param id - ID del registro venta-producto
   * @returns Resultado de la operación de eliminación
   * @throws NotFoundException si el registro no existe
   */
  async remove(id: number) {
    const existingRecord = await this.saleProductRepo.findOne({
      where: { id_venta_producto: id },
    });
    if (!existingRecord) throw new NotFoundException('Registro no encontrado');
    return await this.saleProductRepo.delete(id);
  }
}
