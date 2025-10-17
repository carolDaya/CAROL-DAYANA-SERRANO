import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) 
    private repo: Repository<Category> // Inject Category repository
  ) {}

  // Retrieves all categories
  findAll(): Promise<Category[]> { 
    return this.repo.find(); 
  }

  // Retrieves a category by ID
  async findOne(id: string): Promise<Category> { 
    const category = await this.repo.findOne({ where: { id } });
    if (!category) {
      // Throw error if category is not found
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return category;
  }

  // Creates a new category from DTO data
  async create(data: CreateCategoryDto): Promise<Category> { 
    const category = this.repo.create(data); 
    return this.repo.save(category);
  }

  // Updates an existing category by ID
  async update(id: string, data: UpdateCategoryDto): Promise<Category> { 
    await this.repo.update(id, data);
    // Fetch and return the updated entity
    return this.findOne(id); 
  }

  // Removes a category by ID
  async remove(id: string): Promise<{ deleted: true }> { 
    const res = await this.repo.delete(id);
    
    // Check if any rows were affected
    if (res.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    
    return { deleted: true };
  }
}