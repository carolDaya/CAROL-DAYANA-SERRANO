import { Injectable, NotFoundException } from '@nestjs/common'; // Importación de decoradores y excepciones de NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Importación del decorador para inyectar repositorios
import { Repository } from 'typeorm'; // Importación de Repository para operaciones de base de datos
import { User } from './user.entity'; // Importación de la entidad User

@Injectable() // Decorador que marca como servicio inyectable
export class UsersService { // Declaración de la clase UsersService
  constructor(@InjectRepository(User) private repo: Repository<User>) {} // Inyección del repositorio de usuarios

  findAll() { // Declaración del método para buscar todos los usuarios
    return this.repo.find(); // Operación de buscar todos los usuarios
  }

  async findOne(id: string) { // Declaración del método para buscar un usuario por ID
    const user = await this.repo.findOne({ where: { id } }); // Consulta para buscar usuario por ID
    if (!user) throw new NotFoundException('User not found'); // Validación de que el usuario existe
    return user; // Retorno del usuario encontrado
  }

  async create(data: Partial<User>) { // Declaración del método para crear usuario
    const user = this.repo.create(data); // Creación de instancia de usuario
    return this.repo.save(user); // Operación de guardar usuario en la base de datos
  }

  async update(id: string, data: Partial<User>) { // Declaración del método para actualizar usuario
    await this.repo.update(id, data); // Operación de actualizar usuario en la base de datos
    return this.findOne(id); // Retorno del usuario actualizado
  }

  async remove(id: string) { // Declaración del método para eliminar usuario
    const res = await this.repo.delete(id); // Operación de eliminar usuario de la base de datos
    if (!res.affected) throw new NotFoundException('User not found'); // Validación de que se eliminó el usuario
    return { deleted: true }; // Retorno de confirmación de eliminación
  }
}