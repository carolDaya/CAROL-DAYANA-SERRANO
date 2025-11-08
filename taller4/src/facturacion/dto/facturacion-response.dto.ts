import { ApiProperty } from '@nestjs/swagger';
import { MetodoPago } from '../enums/metodo-pago.enum';


// DTO con información mínima del usuario relacionada con la factura
class UsuarioMinResponseDto {
  @ApiProperty({ example: 5 })
  id_usuario: number;
}

// DTO con información mínima de la venta relacionada con la factura
class VentaMinResponseDto {
  @ApiProperty({ example: 10 })
  id_venta: number;
}

export class FacturacionResponseDto {
  @ApiProperty({ example: 1 })
  id_facturacion: number;

  @ApiProperty({ example: 'FAC-2025-001' })
  numero_factura: string;

  @ApiProperty({ example: 'Factura de venta' })
  tipo_factura: string;

  @ApiProperty({
    enum: MetodoPago,
    example: MetodoPago.EFECTIVO,
  })
  metodo_pago: MetodoPago;

  @ApiProperty({ example: 125000.5 })
  total: number;

  @ApiProperty({ example: '2025-11-05T15:30:00.000Z' })
  fecha_emision: Date;

    // Relación con la venta correspondiente 
    @ApiProperty({ type: VentaMinResponseDto, nullable: true })
    venta: VentaMinResponseDto;

    // Relación con el usuario que generó la factura
    @ApiProperty({ type: UsuarioMinResponseDto, nullable: true })
    usuario: UsuarioMinResponseDto;
}
