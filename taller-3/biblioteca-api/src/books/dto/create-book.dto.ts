import { IsString, IsOptional, IsInt, Min, IsDateString } from 'class-validator';

// Creación del DTO para la entidad Book
export class CreateBookDto {
  // Título del libro (obligatorio)
  @IsString()
  title: string;

  // ISBN del libro (opcional)
  @IsOptional()
  @IsString()
  isbn?: string | null;

  // Descripción del libro (opcional)
  @IsOptional()
  @IsString()
  description?: string | null;

  // Fecha de publicación del libro (opcional)
  @IsOptional()
  @IsDateString()
  publishedAt?: string | null;

  // Número de copias del libro (opcional, mínimo 0)
  @IsOptional()
  @IsInt()
  @Min(0)
  copies?: number;

  // Número de copias disponibles del libro (opcional, mínimo 0)
  @IsOptional()
  @IsInt()
  @Min(0)
  copiesAvailable?: number;

  // ID de la categoría del libro (opcional)  
  @IsOptional()
  @IsInt()
  categoryId?: number;

  // ID del autor del libro (opcional)
  @IsOptional()
  @IsInt()
  authorId?: number;
}
