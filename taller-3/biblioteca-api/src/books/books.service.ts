import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Category } from '../categories/category.entity';
import { Author } from '../authors/author.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// Creación del servicio para gestionar libros
@Injectable()
export class BooksService {
  // Inyección de los repositorios necesarios
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
  ) {}

  // Método para crear un nuevo libro
  async create(dto: CreateBookDto): Promise<Book> {
    const book = this.bookRepo.create({
      title: dto.title,
      isbn: dto.isbn ?? null,
      description: dto.description ?? null,
      publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : null,
      copies: dto.copies ?? 0,
      copiesAvailable:
        dto.copiesAvailable !== undefined ? dto.copiesAvailable : dto.copies ?? 0,
    });

    // Asociar categoría si se proporciona
    if (dto.categoryId !== undefined && dto.categoryId !== null) {
      const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
      if (!category) throw new NotFoundException('Category not found');
      book.category = category;
    }

    // Asociar autor si se proporciona
    if (dto.authorId !== undefined && dto.authorId !== null) {
      const author = await this.authorRepo.findOne({ where: { id: dto.authorId } });
      if (!author) throw new NotFoundException('Author not found');
      book.author = author;
    }

    return this.bookRepo.save(book);
  }

  // Método para obtener todos los libros
  async findAll(): Promise<Book[]> {
    return this.bookRepo.find();
  }

  // Método para obtener un libro por su ID
  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  // Método para actualizar un libro existente
  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (dto.title !== undefined) book.title = dto.title;
    if (dto.isbn !== undefined) book.isbn = dto.isbn ?? null;
    if (dto.description !== undefined) book.description = dto.description ?? null;
    if (dto.publishedAt !== undefined)
      book.publishedAt = dto.publishedAt ? new Date(dto.publishedAt) : null;
    if (dto.copies !== undefined) book.copies = dto.copies;
    if (dto.copiesAvailable !== undefined) book.copiesAvailable = dto.copiesAvailable;

    // Manejo de la categoría
    if (dto.categoryId !== undefined) {
      if (dto.categoryId === null) {
        book.category = null;
      } else {
        const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
        if (!category) throw new NotFoundException('Category not found');
        book.category = category;
      }
    }

    // Manejo del autor
    if (dto.authorId !== undefined) {
      if (dto.authorId === null) {
        book.author = null;
      } else {
        const author = await this.authorRepo.findOne({ where: { id: dto.authorId } });
        if (!author) throw new NotFoundException('Author not found');
        book.author = author;
      }
    }

    return this.bookRepo.save(book);
  }

  // Método para eliminar un libros
  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepo.remove(book);
  }

}
