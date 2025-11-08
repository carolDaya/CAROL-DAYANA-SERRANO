import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, IsPositive, IsNotEmpty } from 'class-validator';

/**
 * Define las propiedades necesarias para agregar un producto a una venta existente.
 */
export class CreateVentaProductoDto {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'ID de la venta existente a la que se añadirá el producto.',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El ID de la venta es obligatorio.' })
  @IsInt({ message: 'El ID de la venta debe ser un número entero.' })
  @IsPositive({ message: 'El ID de la venta debe ser un número positivo.' })
  idVenta: number;

  @ApiProperty({
    type: 'number',
    example: 5,
    description: 'ID del producto existente que se está vendiendo.',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
  @IsInt({ message: 'El ID del producto debe ser un número entero.' })
  @IsPositive({ message: 'El ID del producto debe ser un número positivo.' })
  idProducto: number;

  @ApiProperty({
    type: 'number',
    example: 3,
    description:
      'Cantidad de unidades del producto que se desean agregar a la venta.',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'La cantidad es obligatoria.' })
  @IsInt({ message: 'La cantidad debe ser un número entero.' })
  @IsPositive({ message: 'La cantidad debe ser mayor a cero.' })
  cantidad: number;
}
