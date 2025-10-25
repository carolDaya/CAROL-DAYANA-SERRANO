import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

//Servicio para manejar la logica de los autores
@Injectable()
export class AuthorsService {

  //Inyecta el repositorio de autores
  constructor(
    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
  ) {}

  // Crea un nuevo autor
  async create(createDto: CreateAuthorDto): Promise<Author> {
    const ent = this.authorRepo.create(createDto);
    return this.authorRepo.save(ent);
  }

  // Obtiene todos los autores
  findAll(): Promise<Author[]> {
    return this.authorRepo.find({ relations: ['books'] });
  }

  // Obtiene un autor por su ID
  async findOne(id: number): Promise<Author> {
    const a = await this.authorRepo.findOne({ where: { id }, relations: ['books'] });
    if (!a) throw new NotFoundException(`Author with id ${id} not found`);
    return a;
  }

  // Actualiza un autor existente
  async update(id: number, dto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    Object.assign(author, dto);
    return this.authorRepo.save(author);
  }

  // Elimina un autor por su ID
  async remove(id: number): Promise<void> {
    const res = await this.authorRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Author with id ${id} not found`);
  }
}
