import { Injectable, NotFoundException } from '@nestjs/common'; // Importación de decoradores y excepciones de NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Importación del decorador para inyectar repositorios
import { Repository } from 'typeorm'; // Importación de Repository para operaciones de base de datos
import { Category } from './category.entity'; // Importación de la entidad Category

@Injectable() // Decorador que marca como servicio inyectable
export class CategoriesService { // Declaración de la clase CategoriesService
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {} // Inyección del repositorio de categorías

  findAll() { return this.repo.find(); } // Declaración del método para buscar todas las categorías

  async findOne(id: string) { // Declaración del método para buscar una categoría por ID
    const category = await this.repo.findOne({ where: { id } }); // Consulta para buscar categoría por ID
    if (!category) throw new NotFoundException('Category not found'); // Validación de que la categoría existe
    return category; // Retorno de la categoría encontrada
  }

  async create(data: Partial<Category>) { // Declaración del método para crear categoría
    const category = this.repo.create(data); // Creación de instancia de categoría
    return this.repo.save(category); // Operación de guardar categoría en la base de datos
  }

  async update(id: string, data: Partial<Category>) { // Declaración del método para actualizar categoría
    await this.repo.update(id, data); // Operación de actualizar categoría en la base de datos
    return this.findOne(id); // Retorno de la categoría actualizada
  }

  async remove(id: string) { // Declaración del método para eliminar categoría
    const res = await this.repo.delete(id); // Operación de eliminar categoría de la base de datos
    if (!res.affected) throw new NotFoundException('Category not found'); // Validación de que se eliminó la categoría
    return { deleted: true }; // Retorno de confirmación de eliminación
  }
}