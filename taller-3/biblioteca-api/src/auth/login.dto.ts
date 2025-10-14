import { IsEmail, IsString, MinLength } from 'class-validator'; // Importación de decoradores de validación

export class LoginDto { // Declaración de la clase DTO para login
  @IsEmail() email: string; // Decorador para validar que email sea formato email válido

  @IsString() // Decorador para validar que password sea string
  @MinLength(6) // Decorador para validar longitud mínima de 6 caracteres
  password: string; // Definición de propiedad password
}