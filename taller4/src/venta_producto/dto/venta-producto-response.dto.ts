import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO que representa una vista mínima de una venta.
 * Se utiliza dentro de otras respuestas para mostrar únicamente el identificador de la venta.
 */
class VentaMinResponseDto {
  @ApiProperty({ example: 1 })
  id_venta: number;
}

/**
 * DTO que representa una vista mínima de un producto.
 * Muestra solo los datos esenciales del producto asociados a una venta.
 */
class ProductoMinResponseDto {
  @ApiProperty({ example: 5 })
  id_producto: number;
  @ApiProperty({ example: 'Producto A' })
  nombre: string;
}

/**
 * DTO de respuesta para la entidad `VentaProducto`.
 * Representa el detalle de los productos vendidos dentro de una venta.
 */
export class VentaProductoResponseDto {
  @ApiProperty({ example: 1 })
  id_venta_producto: number;

  @ApiProperty({ example: 3 })
  cantidad: number;

  @ApiProperty({ example: 10000.0 })
  precio_unitario: number;

  @ApiProperty({ example: 30000.0 })
  subtotal: number;

  @ApiProperty({ type: VentaMinResponseDto })
  venta: VentaMinResponseDto;

  @ApiProperty({ type: ProductoMinResponseDto })
  producto: ProductoMinResponseDto;
}
