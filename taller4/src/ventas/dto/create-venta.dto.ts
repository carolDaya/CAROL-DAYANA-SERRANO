import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

/**
 * DTO para crear una venta
 * @description Define las propiedades necesarias para registrar una venta en el sistema
 */
export class CreateVentaDto {
  @ApiPropertyOptional({
    name: 'fecha',
    required: false,
    type: String,
    description: 'Fecha en la que se realiza la venta (opcional)',
    example: '2025-11-03T15:30:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiProperty({
    name: 'total',
    required: true,
    type: Number,
    description: 'Valor total de la venta',
    example: 150000,
  })
  @IsNumber()
  @IsPositive()
  total: number;

  @ApiProperty({
    name: 'id_usuario',
    required: true,
    type: Number,
    description: 'Identificador del usuario que realiza la venta',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  id_usuario: number;
}
