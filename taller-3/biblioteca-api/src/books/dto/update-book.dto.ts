import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateCategoryDto extends PartialType(CreateBookDto) {}