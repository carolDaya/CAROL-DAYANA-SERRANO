import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductoDto } from './create-producto.dto';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  /**
   * Nombre del producto
   */
  @ApiPropertyOptional({
    name: 'nombre',
    type: String,
    description: 'Nombre actualizado del producto',
    example: 'Taladro percutor Stanley SDH600',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  nombre?: string;

  /**
   * Descripción del producto
   */
  @ApiPropertyOptional({
    name: 'descripcion',
    type: String,
    description: 'Descripción actualizada del producto',
    example:
      'Taladro percutor de 600W con reversa y empuñadura lateral ergonómica.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  /**
   * Precio del producto
   */
  @ApiPropertyOptional({
    name: 'precio',
    type: Number,
    description: 'Precio actualizado del producto',
    example: 279900,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio?: number;

  /**
   * Cantidad disponible en inventario
   */
  @ApiPropertyOptional({
    name: 'stock',
    type: Number,
    description: 'Cantidad de unidades actualizada en el inventario',
    example: 40,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  /**
   * Identificador del proveedor asociado
   */
  @ApiPropertyOptional({
    name: 'proveedorId',
    type: Number,
    description: 'ID del proveedor actualizado del producto',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  proveedorId?: number;

  /**
   * Identificador de la categoría del producto
   */
  @ApiPropertyOptional({
    name: 'categoriaId',
    type: Number,
    description: 'ID de la categoría actualizada del producto',
    example: 4,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  categoriaId?: number;
}
