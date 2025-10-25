import { IsString, IsOptional, MaxLength } from 'class-validator';

// Clase DTO para crear una categoría
export class CreateCategoryDto {
  // Nombre de la categoría (obligatorio)
  @IsString() 
  @MaxLength(255) 
  name: string; 

  // Descripción opcional de la categoría
  @IsOptional() 
  @IsString() 
  description?: string | null; 
}