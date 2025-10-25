import { IsEmail, IsString, MinLength } from 'class-validator';

// DTO para crear un nuevo usuario
export class CreateUserDto {
  // Nombre del usuario
  @IsString()
  name: string;

  // Correo electrónico válido
  @IsEmail()
  email: string;

  // Contraseña (mínimo 6 caracteres)
  @IsString()
  @MinLength(6)
  password: string;
}
