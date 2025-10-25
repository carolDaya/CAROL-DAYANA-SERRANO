import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// Controlador para manejar rutas relacionadas con perfiles de usuario
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly svc: ProfilesService) {}

  // Crear un nuevo perfil (requiere autenticación)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProfileDto) {
    return this.svc.create(dto);
  }

  // Obtener todos los perfiles
  @Get()
  findAll() {
    return this.svc.findAll();
  }

  // Obtener un perfil por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  // Actualizar un perfil existente (requiere autenticación)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfileDto) {
    return this.svc.update(id, dto);
  }

  // Eliminar un perfil (requiere autenticación)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
