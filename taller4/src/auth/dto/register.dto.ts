import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Roles } from '../../usuario/enums/roles.enum';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(8)
  contrasena: string;

  @IsEnum(Roles)
  rol: Roles;
}
