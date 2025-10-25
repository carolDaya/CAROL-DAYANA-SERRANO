import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// Indica que puede ser inyectado como servicio
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  // Crea una nueva categoría
  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create({
      name: dto.name,
      description: dto.description ?? null,
    });
    return this.categoryRepo.save(category);
  }

  // Retorna todas las categorías con sus relaciones
  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find({ relations: ['books'] });
  }

  // Busca una categoría por id
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  // Actualiza una categoría existente
  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    if (dto.name !== undefined) category.name = dto.name;
    if (dto.description !== undefined) {
      category.description = dto.description ?? null;
    }

    return this.categoryRepo.save(category);
  }

  // Elimina una categoría por id
  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
  }
}
