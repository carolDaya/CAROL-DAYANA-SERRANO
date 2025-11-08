import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Roles } from '../enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
// definimos la estructura de datos de un usuario
export class CreateUsuarioDto {
  @ApiProperty({
    name: 'nombre',
    required: true,
    type: String,
    description: 'Nombre del usuario',
    example: 'Erika',
  })
  @IsString() // cadena de texto
  @MinLength(3) // longitud mínima 3
  @MaxLength(100) // longitud máxima 100
  @IsNotEmpty() // no puede estar vacío
  nombre: string; // nombre

  @ApiProperty({
    name: 'apellido',
    required: true,
    type: String,
    description: 'Apellido del usuario',
    example: 'Pesca',
  })
  @IsString() // cadena de texto
  @MinLength(3) // longitud mínima 3
  @MaxLength(100) // longitud máxima 100
  @IsNotEmpty() // no puede estar vacío
  apellido: string; // apellido

  @ApiProperty({
    name: 'correo',
    required: true,
    type: String,
    description: 'Correo del usuario',
    example: 'erika@gmail.com',
  })
  @IsEmail() //formato para el correo
  @MinLength(5) // longitud mínima 5
  @MaxLength(100) // longitud máxima 100
  @IsNotEmpty() // no puede estar vacío
  correo: string; // correo

  @ApiProperty({
    name: 'contrasena',
    required: true,
    type: String,
    description: 'Contraseña del usuario',
    example: '123456',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @IsNotEmpty()
  contrasena: string;

  @ApiProperty({
    name: 'rol',
    required: true,
    enum: String,
    description: 'Rol del usuario',
    example: 'Administrador',
  })
  @IsEnum(Roles) // validar que sea uno de los roles qu estan definidos en el enum
  @IsNotEmpty()
  rol: Roles;
}
