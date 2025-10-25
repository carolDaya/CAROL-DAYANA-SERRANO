import { IsInt, IsString, Min, Max } from 'class-validator';

// DTO para crear una reseña de un libro
export class CreateReviewDto {
  // ID del libro al que pertenece la reseña
  @IsInt()
  bookId: number;

  // ID del usuario que realiza la reseña (opcional)
  @IsInt()
  userId?: number;

  // Contenido o texto de la reseña
  @IsString()
  content: string;

  // Calificación del libro (de 1 a 5)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
