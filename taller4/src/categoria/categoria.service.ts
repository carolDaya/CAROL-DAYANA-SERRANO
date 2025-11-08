import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

/**
 * Servicio que gestiona las operaciones CRUD para las categorías de productos.
 *
 * Implementa la lógica necesaria para crear, consultar, actualizar y eliminar categorías
 * en la base de datos, utilizando el repositorio de TypeORM.
 */
@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  /**
   * Crea una nueva categoría en la base de datos.
   * @param dto - Datos de la categoría a crear.
   * @returns La categoría creada.
   */
  create(dto: CreateCategoriaDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  /**
   * Obtiene todas las categorías registradas.
   * @returns Lista completa de categorías.
   */
  findAll() {
    return this.repo.find();
  }

  /**
   * Busca una categoría específica por su ID.
   * @param id - Identificador de la categoría.
   * @returns La categoría encontrada o lanza un error si no existe.
   */
  async findOne(id: number) {
    const cat = await this.repo.findOne({ where: { id_categoria: id } });
    if (!cat) throw new NotFoundException('Categoría no encontrada');
    return cat;
  }

  /**
   * Actualiza los datos de una categoría existente.
   * @param id - ID de la categoría a actualizar.
   * @param dto - Nuevos valores para la categoría.
   * @returns La categoría actualizada.
   */
  async update(id: number, dto: UpdateCategoriaDto) {
    const cat = await this.findOne(id);
    this.repo.merge(cat, dto);
    return this.repo.save(cat);
  }

  /**
   * Elimina una categoría de la base de datos.
   * @param id - ID de la categoría a eliminar.
   * @returns Confirmación de eliminación.
   */
  async remove(id: number) {
    const cat = await this.findOne(id);
    return this.repo.remove(cat);
  }
}
