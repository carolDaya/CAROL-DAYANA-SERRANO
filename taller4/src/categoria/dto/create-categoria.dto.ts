import { IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Categoría A',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @Length(2, 100)
  nombre!: string;

  @ApiProperty({
    description: 'Descripción opcional de la categoría',
    example: 'Categoría de productos de ferreteria',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
