import { PartialType } from '@nestjs/mapped-types';
import { CreateFacturacionDto } from './create-facturacion.dto';

/**
 * DTO para actualizar una factura existente.
 * Hereda los campos de CreateFacturacionDto pero los vuelve opcionales.
 */
export class UpdateFacturacionDto extends PartialType(CreateFacturacionDto) {}
