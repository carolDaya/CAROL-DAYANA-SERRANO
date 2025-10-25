import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Controlador para la entidad Authors
@Controller('authors')
export class AuthorsController {
  
  // Inyección del servicio AuthorsService
  constructor(private readonly authorsService: AuthorsService) {}

  // Crear protegido
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDto: CreateAuthorDto) {
    return this.authorsService.create(createDto);
  }

  // Obtener todos los autores
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  // Obtener un autor por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  // Actualizar protegido
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAuthorDto) {
    return this.authorsService.update(id, dto);
  }

  // Eliminar protegido
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.remove(id);
  }
}
