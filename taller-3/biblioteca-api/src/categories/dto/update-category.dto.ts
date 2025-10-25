import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

// Clase DTO para actualizar una categoría
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}