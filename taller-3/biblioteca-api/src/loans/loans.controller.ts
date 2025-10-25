import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('loans') // Define la ruta base /loans
export class LoansController {
  constructor(private readonly svc: LoansService) {} // Inyecta el servicio de préstamos

  @UseGuards(JwtAuthGuard) // Requiere autenticación con JWT
  @Post() // Ruta POST /loans
  create(@Body() dto: CreateLoanDto) { // Recibe los datos del préstamo
    return this.svc.create(dto); // Llama al servicio para crear el préstamo
  }

  @Get() // Ruta GET /loans
  findAll() {
    return this.svc.findAll(); // Retorna todos los préstamos
  }

  @Get(':id') // Ruta GET /loans/:id
  findOne(@Param('id', ParseIntPipe) id: number) { // Convierte id a número
    return this.svc.findOne(id); // Retorna un préstamo por id
  }

  @UseGuards(JwtAuthGuard) // Requiere autenticación con JWT
  @Patch(':id') // Ruta PATCH /loans/:id
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLoanDto) { // Recibe id y datos actualizados
    return this.svc.update(id, dto); // Actualiza un préstamo
  }

  @UseGuards(JwtAuthGuard) // Requiere autenticación con JWT
  @Delete(':id') // Ruta DELETE /loans/:id
  remove(@Param('id', ParseIntPipe) id: number) { // Convierte id a número
    return this.svc.remove(id); // Elimina un préstamo
  }
}
