import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MetodoPago } from '../enums/metodo-pago.enum';

export class CreateFacturacionDto {
  @ApiProperty({
    description: 'Número de la factura',
    example: 'FAC-2025-001',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Length(2, 50)
  numero_factura!: string;

  @ApiProperty({
    description: 'Tipo de factura',
    example: 'Factura de venta',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @Length(2, 30)
  tipo_factura!: string;

  @ApiProperty({
    description: 'Método de pago',
    enum: MetodoPago,
    example: MetodoPago.EFECTIVO,
  })
  @IsEnum(MetodoPago, {
    message:
      'El método de pago debe ser efectivo, tarjeta, transferencia u otro',
  })
  metodo_pago!: MetodoPago;

  @ApiProperty({
    description: 'Total de la factura',
    example: 125000.5,
  })
  @IsNumber()
  total!: number;

  @ApiProperty({
    description: 'ID de la venta asociada (opcional)',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_venta?: number;

  @ApiProperty({
    description: 'ID del usuario que realiza la factura (opcional)',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_usuario?: number;
}
