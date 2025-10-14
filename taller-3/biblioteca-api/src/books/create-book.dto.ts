import { IsString, IsOptional, IsUUID, IsInt, Min, IsArray } from 'class-validator'; // Importación de decoradores de validación

export class CreateBookDto { // Declaración de la clase DTO para crear libros
  @IsString() title: string; // Decorador para validar que title sea string
  @IsOptional() @IsString() isbn?: string; // Decoradores para validar que isbn sea string opcional
  @IsOptional() @IsInt() @Min(0) copiesAvailable?: number; // Decoradores para validar que copiesAvailable sea número entero opcional mínimo 0
  @IsOptional() @IsString() description?: string; // Decoradores para validar que description sea string opcional
  @IsOptional() @IsUUID() categoryId?: string; // Decoradores para validar que categoryId sea UUID opcional
  @IsOptional() @IsArray() authorIds?: string[]; // Decoradores para validar que authorIds sea array opcional
}