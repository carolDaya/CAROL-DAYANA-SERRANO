import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

// DTO para actualizar datos de un usuario
export class UpdateUserDto {
  // Nuevo nombre (opcional)
  @IsOptional()
  @IsString()
  name?: string;

  // Nuevo correo (opcional)
  @IsOptional()
  @IsEmail()
  email?: string;

  // Nueva contraseña (opcional, mínimo 6 caracteres)
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
