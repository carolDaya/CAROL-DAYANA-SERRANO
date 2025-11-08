import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import * as bcrypt from 'bcrypt'; // librería para encriptar contraseñas

@Injectable()
export class UsuarioRepository {
  // inyecta dependencias
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  // Crea usuario (hashea contraseña)
  async createUser(body: CreateUsuarioDto) {
    // Crea un nuevo registro de Usuario en la base de datos
    // La parte crítica es hashear (cifrar) la contraseña antes de guardarla
    const saltRounds = 10; // número de iteraciones para cifrar la contraseña
    const hashed = await bcrypt.hash(body.contrasena, saltRounds);
    const user = this.repo.create({
      nombre: body.nombre,
      correo: body.correo,
      contrasena: hashed, //se almacena el hash de la contraseña
      rol: body.rol,
    });
    return this.repo.save(user);
  }
  // Listar todos los usuarios
  findAll() {
    return this.repo.find();
  }
  // Obtener usuario por ID
  findOne(id: number) {
    return this.repo.findOne({ where: { id_usuario: id } });
  }
  // Obtener usuario por correo
  findByEmail(email: string) {
    return this.repo.findOne({ where: { correo: email } });
  }
  // Actualizar los datos de un usuario por ID
  async updateUser(id: number, body: UpdateUsuarioDto): Promise<Usuario> {
    // si actualiza contraseña, hashearla
    if (body.contrasena) {
      // si la incluye, se volvera a hashear antes de guardar
      const saltRounds = 10;
      body.contrasena = await bcrypt.hash(body.contrasena, saltRounds);
    }
    await this.repo.update({ id_usuario: id }, { ...body });
    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new Error(
        `Usuario con ID ${id} no encontrado después de la actualización.`,
      );
    }
    return updatedUser;
  }
  // Eliminar usuario por ID
  deleteUser(id: number) {
    return this.repo.delete({ id_usuario: id });
  }
}
