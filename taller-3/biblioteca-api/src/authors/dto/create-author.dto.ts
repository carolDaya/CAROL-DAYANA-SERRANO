import { IsString, IsOptional, MaxLength } from 'class-validator';

// Creación del DTO para la entidad Author
export class CreateAuthorDto {
  // Nombre del autor
  @IsString()
  @MaxLength(200)
  name: string;

  // Biografía del autor (opcional)
  @IsOptional()
  @IsString()
  biography?: string;
}
