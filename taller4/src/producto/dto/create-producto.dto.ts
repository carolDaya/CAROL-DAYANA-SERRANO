import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';

/**
 * Create Producto DTO
 * @category DTO
 * @description Define las propiedades necesarias para registrar un nuevo producto en el sistema.
 */
export class CreateProductoDto {
  /**
   * Nombre del producto
   */
  @ApiProperty({
    name: 'nombre',
    required: true,
    type: String,
    description: 'Nombre del producto que se registrará',
    example: 'Taladro percutor Bosch GSB 550',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  nombre: string;

  /**
   * Descripción del producto
   */
  @ApiPropertyOptional({
    name: 'descripcion',
    type: String,
    description: 'Descripción detallada del producto (opcional)',
    example:
      'Taladro percutor de 550W con velocidad variable y reversa, ideal para trabajos de bricolaje.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  /**
   * Precio del producto
   */
  @ApiProperty({
    name: 'precio',
    required: true,
    type: Number,
    description: 'Precio de venta del producto',
    example: 249900,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precio: number;

  /**
   * Cantidad disponible en inventario
   */
  @ApiProperty({
    name: 'stock',
    required: true,
    type: Number,
    description: 'Cantidad de unidades disponibles en el inventario',
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;

  /**
   * Identificador del proveedor asociado
   */
  @ApiProperty({
    name: 'proveedorId',
    required: true,
    type: Number,
    description: 'ID del proveedor que suministra el producto',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  proveedorId: number;

  /**
   * Identificador de la categoría del producto
   */
  @ApiProperty({
    name: 'categoriaId',
    required: true,
    type: Number,
    description: 'ID de la categoría a la que pertenece el producto',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  categoriaId: number;
}
