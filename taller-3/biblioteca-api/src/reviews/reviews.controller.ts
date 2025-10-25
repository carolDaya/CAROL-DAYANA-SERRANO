import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// Controlador para manejar las rutas de reseñas
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly svc: ReviewsService) {}

  // Crear una nueva reseña (requiere autenticación)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.svc.create(dto);
  }

  // Obtener todas las reseñas
  @Get()
  findAll() {
    return this.svc.findAll();
  }

  // Obtener una reseña por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  // Actualizar una reseña (requiere autenticación)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReviewDto) {
    return this.svc.update(id, dto);
  }

  // Eliminar una reseña (requiere autenticación)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
