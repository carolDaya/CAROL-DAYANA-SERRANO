import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

// DTO para crear un perfil de usuario
export class CreateProfileDto {

  // Campo opcional: apodo o nombre corto del usuario
  @IsOptional()
  @IsString()
  nickname?: string;

  // Campo opcional: biografía o descripción del usuario
  @IsOptional()
  @IsString()
  bio?: string;

  // Campo opcional: URL de la imagen de perfil
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  // Campo obligatorio: ID del usuario al que pertenece el perfil
  @IsInt()
  userId: number;
}
