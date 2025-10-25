import { IsOptional, IsString, IsUrl } from 'class-validator';

// DTO para actualizar un perfil de usuario existente
export class UpdateProfileDto {

  // Campo opcional: permite actualizar el apodo del usuario
  @IsOptional()
  @IsString()
  nickname?: string;

  // Campo opcional: permite actualizar la biografía del usuario
  @IsOptional()
  @IsString()
  bio?: string;

  // Campo opcional: permite actualizar la URL del avatar o imagen de perfil
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
