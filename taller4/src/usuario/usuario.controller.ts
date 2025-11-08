import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUserDoc } from './decorators/documentation/Create';
import { DeleteUserDoc } from './decorators/documentation/Delete';
import { GetAllUsersDoc } from './decorators/documentation/GetAll';
import { UpdateUserDoc } from './decorators/documentation/Update';
import { ListUsersDoc } from './decorators/documentation/List';
//import { DefaultErrorsDoc } from 'src/common/decorators/defaultErrorsDoc';

@Controller('usuario') //definimos la ruta base para este controlador
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  // @DefaultErrorsDoc()
  // Crear usuario
  @Post('register')
  @CreateUserDoc()
  createUser(@Body() body: CreateUsuarioDto) {
    return this.userService.createUser(body);
  }

  @ListUsersDoc()
  // Listar usuarios
  @Get('list')
  listUsers() {
    return this.userService.listUsers();
  }

  @GetAllUsersDoc()
  // Obtener usuario por ID
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUser(id);
    // Manejo de errores: Si el Servicio devuelve null/undefined
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return user;
  }

  @UpdateUserDoc()
  // Actualizar usuario
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUsuarioDto, //// El Body se valida con UpdateUsuarioDto todos los campos opcionales
  ) {
    const updated = await this.userService.updateUser(id, body);
    // verifica si la actualización fue exitosa
    if (!updated) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return updated;
  }

  @DeleteUserDoc()
  // Eliminar usuario
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.deleteUser(id);
    if (!result) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return { message: `Usuario ${id} eliminado correctamente` };
  }
}
