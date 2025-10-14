import { Injectable, NotFoundException } from '@nestjs/common'; // Importación de decoradores y excepciones de NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Importación del decorador para inyectar repositorios
import { Repository } from 'typeorm'; // Importación de Repository para operaciones de base de datos
import { Author } from './author.entity'; // Importación de la entidad Author

@Injectable() // Decorador que marca como servicio inyectable
export class AuthorsService { // Declaración de la clase AuthorsService
  constructor(@InjectRepository(Author) private repo: Repository<Author>) {} // Inyección del repositorio de autores

  findAll() { return this.repo.find(); } // Declaración del método para buscar todos los autores

  async findOne(id: string) { // Declaración del método para buscar un autor por ID
    const author = await this.repo.findOne({ where: { id } }); // Consulta para buscar autor por ID
    if (!author) throw new NotFoundException('Author not found'); // Validación de que el autor existe
    return author; // Retorno del autor encontrado
  }

  async create(data: Partial<Author>) { // Declaración del método para crear autor
    const author = this.repo.create(data); // Creación de instancia de autor
    return this.repo.save(author); // Operación de guardar autor en la base de datos
  }

  async update(id: string, data: Partial<Author>) { // Declaración del método para actualizar autor
    await this.repo.update(id, data); // Operación de actualizar autor en la base de datos
    return this.findOne(id); // Retorno del autor actualizado
  }

  async remove(id: string) { // Declaración del método para eliminar autor
    const res = await this.repo.delete(id); // Operación de eliminar autor de la base de datos
    if (!res.affected) throw new NotFoundException('Author not found'); // Validación de que se eliminó el autor
    return { deleted: true }; // Retorno de confirmación de eliminación
  }
}