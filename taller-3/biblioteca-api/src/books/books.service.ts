import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Book } from './book.entity';
import { Category } from '../categories/category.entity';
import { Author } from '../authors/author.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) 
    private readonly booksRepo: Repository<Book>,
    @InjectRepository(Category) 
    private readonly catRepo: Repository<Category>,
    @InjectRepository(Author) 
    private readonly authorRepo: Repository<Author>,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const book = this.booksRepo.create({
      title: dto.title,
      isbn: dto.isbn,
      // Use 0 as default if copiesAvailable is undefined or null
      copiesAvailable: dto.copiesAvailable ?? 0, 
      description: dto.description,
    });

    // Handle Category Relationship
    if (dto.categoryId) {
      const category = await this.catRepo.findOne({ where: { id: dto.categoryId } });
      if (!category) throw new NotFoundException('Category not found');
      book.category = category;
    }

    // Handle Authors Relationship (Many-to-Many)
    if (dto.authorIds && dto.authorIds.length) {
      // Use TypeORM 'In' operator to efficiently fetch all authors by ID array
      const authors = await this.authorRepo.findBy({ id: In(dto.authorIds) });
      if (!authors.length) throw new NotFoundException('Authors not found');
      book.authors = authors;
    }

    return this.booksRepo.save(book);
  }

  async findAll(): Promise<Book[]> {
    // Load category and authors with the book for the list view
    return this.booksRepo.find({ 
      relations: ['category', 'authors'],
    });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepo.findOne({ 
      where: { id },
      relations: ['category', 'authors'],
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async remove(id: string): Promise<void> {
    const result = await this.booksRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Book not found');
  }

  // Handles updating stock by a positive or negative 'delta'
  async updateCopies(id: string, delta: number): Promise<Book> {
    const book = await this.findOne(id);
    // Ensure copiesAvailable never drops below zero (Math.max)
    book.copiesAvailable = Math.max((book.copiesAvailable ?? 0) + delta, 0); 
    return this.booksRepo.save(book);
  }
}