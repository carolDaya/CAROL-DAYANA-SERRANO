import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'; // Importación de decoradores y funciones de NestJS
import { UsersService } from './users.service'; // Importación del servicio UsersService

@Controller('users') // Decorador que define el controlador con ruta base 'users'
export class UsersController { // Declaración de la clase UsersController
  constructor(private svc: UsersService) {} // Inyección del servicio UsersService

  @Get() findAll() { return this.svc.findAll(); } // Decorador para método GET y llamada al servicio
  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); } // Decorador para GET con parámetro y llamada al servicio
  @Post() create(@Body() dto: any) { return this.svc.create(dto); } // Decorador para método POST y llamada al servicio
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto); } // Decorador para PATCH con parámetro y llamada al servicio
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); } // Decorador para DELETE con parámetro y llamada al servicio
}