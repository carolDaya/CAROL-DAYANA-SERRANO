import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming this path is correct

@Controller('books')
export class BooksController {
  constructor(private readonly svc: BooksService) {}

  // Retrieves all books
  @Get()
  findAll() {
    return this.svc.findAll();
  }

  // Retrieves a book by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  // Creates a new book (Authentication required)
  @UseGuards(JwtAuthGuard) 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBookDto) {
    return this.svc.create(dto);
  }

  // Updates the number of available copies (Authentication required)
  // Delta represents the change (e.g., +5 for stock refill, -1 for a loan)
  @UseGuards(JwtAuthGuard) 
  @Patch(':id/copies/:delta')
  updateCopies(@Param('id') id: string, @Param('delta') delta: string) {
    return this.svc.updateCopies(id, Number(delta));
  }

  // Removes a book (Authentication required)
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}