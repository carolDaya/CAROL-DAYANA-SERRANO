import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

// Creación del DTO para actualizar un libro, extendiendo el DTO de creación
export class UpdateBookDto extends PartialType(CreateBookDto) {}