import { IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateLoanDto {
  // Fecha de devolución opcional
  @IsOptional()
  @IsDateString()
  returnDate?: string;

  // Indica si el libro fue devuelto
  @IsOptional()
  @IsBoolean()
  returned?: boolean;
}
