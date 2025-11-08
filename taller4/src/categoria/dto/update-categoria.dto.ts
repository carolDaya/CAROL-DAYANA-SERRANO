import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';

// Esta clase define los datos permitidos al ACTUALIZAR una categoría existente.
// Extiende de CreateCategoriaDto, pero convierte todos sus campos en opcionales.
export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
