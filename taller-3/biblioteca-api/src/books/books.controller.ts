import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common'; // Importación de decoradores y funciones de NestJS
import { BooksService } from './books.service'; // Importación del servicio BooksService
import { CreateBookDto } from './create-book.dto'; // Importación del DTO para crear libros
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Importación del guard de autenticación JWT

@Controller('books') // Decorador que define el controlador con ruta base 'books'
export class BooksController { // Declaración de la clase BooksController
  constructor(private readonly svc: BooksService) {} // Inyección del servicio BooksService como readonly

  // Obtener todos los libros
  @Get() // Decorador para método GET
  findAll() { // Declaración del método para obtener todos los libros
    return this.svc.findAll(); // Llamada al servicio para obtener todos los libros
  }

  // Obtener un libro por ID
  @Get(':id') // Decorador para método GET con parámetro id
  findOne(@Param('id') id: string) { // Declaración del método para obtener un libro por ID
    return this.svc.findOne(id); // Llamada al servicio para obtener un libro por ID
  }

  // Crear un nuevo libro (requiere autenticación)
  @UseGuards(JwtAuthGuard) // Decorador para aplicar guard de autenticación JWT
  @Post() // Decorador para método POST
  create(@Body() dto: CreateBookDto) { // Declaración del método para crear libro
    return this.svc.create(dto); // Llamada al servicio para crear libro
  }

  // Actualizar la cantidad de copias disponibles (requiere autenticación)
  @UseGuards(JwtAuthGuard) // Decorador para aplicar guard de autenticación JWT
  @Patch(':id/copies/:delta') // Decorador para método PATCH con parámetros id y delta
  updateCopies(@Param('id') id: string, @Param('delta') delta: string) { // Declaración del método para actualizar copias
    return this.svc.updateCopies(id, Number(delta)); // Llamada al servicio para actualizar copias con conversión a número
  }

  // Eliminar un libro (requiere autenticación)
  @UseGuards(JwtAuthGuard) // Decorador para aplicar guard de autenticación JWT
  @Delete(':id') // Decorador para método DELETE con parámetro id
  remove(@Param('id') id: string) { // Declaración del método para eliminar libro
    return this.svc.remove(id); // Llamada al servicio para eliminar libro
  }
}