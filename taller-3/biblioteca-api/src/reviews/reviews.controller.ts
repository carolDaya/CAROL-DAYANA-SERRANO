import { Controller, Get, Post, Body } from '@nestjs/common'; // Importación de decoradores y funciones de NestJS
import { ReviewsService } from './reviews.service'; // Importación del servicio ReviewsService

@Controller('reviews') // Decorador que define el controlador con ruta base 'reviews'
export class ReviewsController { // Declaración de la clase ReviewsController
  constructor(private svc: ReviewsService) {} // Inyección del servicio ReviewsService

  @Get() findAll() { return this.svc.findAll(); } // Decorador para método GET y llamada al servicio
  @Post() create(@Body() dto: any) { return this.svc.create(dto); } // Decorador para método POST y llamada al servicio
}