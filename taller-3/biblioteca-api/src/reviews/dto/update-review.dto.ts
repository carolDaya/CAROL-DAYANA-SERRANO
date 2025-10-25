import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

// DTO para actualizar una reseña existente
export class UpdateReviewDto {
  // Nuevo contenido de la reseña (opcional)
  @IsOptional()
  @IsString()
  content?: string;

  // Nueva calificación (opcional, entre 1 y 5)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
