import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// Creación del controlador para la entidad "books"
@Controller('books')
export class BooksController {
  // Inyección del servicio de libros
  constructor(private readonly booksService: BooksService) {}

  // Protección de la ruta con JWT para crear un libro
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  // Obtención de todos los libros
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // Obtención de un libro por su ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  // Protección de la ruta con JWT para actualizar un libro
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  // Protección de la ruta con JWT para eliminar un libro
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
