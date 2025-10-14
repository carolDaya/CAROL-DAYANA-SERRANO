import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common'; // Importación de decoradores y funciones de NestJS
import { LoansService } from './loans.service'; // Importación del servicio LoansService
import { CreateLoanDto } from './create-loan.dto'; // Importación del DTO para crear préstamos

@Controller('loans') // Decorador que define el controlador con ruta base 'loans'
export class LoansController { // Declaración de la clase LoansController
  constructor(private svc: LoansService) {} // Inyección del servicio LoansService

  @Get() findAll() { return this.svc.findAll(); } // Decorador para método GET y llamada al servicio
  @Post() create(@Body() dto: CreateLoanDto) { return this.svc.create(dto); } // Decorador para método POST y llamada al servicio
  @Patch(':id/return') markReturned(@Param('id') id: string) { return this.svc.markReturned(id); } // Decorador para PATCH con parámetro y llamada al servicio
}