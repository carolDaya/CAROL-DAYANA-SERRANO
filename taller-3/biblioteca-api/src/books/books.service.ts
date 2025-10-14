import { Injectable, NotFoundException } from '@nestjs/common'; // Importación de decoradores y excepciones de NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Importación del decorador para inyectar repositorios
import { Repository, In } from 'typeorm'; // Importación de Repository y función In para consultas
import { Book } from './book.entity'; // Importación de la entidad Book
import { Category } from '../categories/category.entity'; // Importación de la entidad Category
import { Author } from '../authors/author.entity'; // Importación de la entidad Author
import { CreateBookDto } from './create-book.dto'; // Importación del DTO para crear libros

@Injectable() // Decorador que marca como servicio inyectable
export class BooksService { // Declaración de la clase BooksService
  constructor( // Declaración del constructor con múltiples repositorios
    @InjectRepository(Book) // Decorador para inyectar repositorio de libros
    private readonly booksRepo: Repository<Book>, // Inyección del repositorio de libros como readonly

    @InjectRepository(Category) // Decorador para inyectar repositorio de categorías
    private readonly catRepo: Repository<Category>, // Inyección del repositorio de categorías como readonly

    @InjectRepository(Author) // Decorador para inyectar repositorio de autores
    private readonly authorRepo: Repository<Author>, // Inyección del repositorio de autores como readonly
  ) {}

  async create(dto: CreateBookDto): Promise<Book> { // Declaración del método para crear libro con tipo de retorno
    const book = this.booksRepo.create({ // Creación de instancia de libro
      title: dto.title, // Asignación del título
      isbn: dto.isbn, // Asignación del ISBN
      copiesAvailable: dto.copiesAvailable ?? 0, // Asignación de copias disponibles con valor por defecto 0
      description: dto.description, // Asignación de la descripción
    });

    // Categoría
    if (dto.categoryId) { // Validación de existencia de categoryId
      const category = await this.catRepo.findOne({ where: { id: dto.categoryId } }); // Consulta para buscar categoría por ID
      if (!category) throw new NotFoundException('Category not found'); // Validación de que la categoría existe
      book.category = category; // Asignación de categoría al libro
    }

    // Autores
    if (dto.authorIds && dto.authorIds.length) { // Validación de existencia de autores
      const authors = await this.authorRepo.findBy({ id: In(dto.authorIds) }); // Consulta para buscar autores usando findBy con In
      if (!authors.length) throw new NotFoundException('Authors not found'); // Validación de que se encontraron autores
      book.authors = authors; // Asignación de autores al libro
    }

    return this.booksRepo.save(book); // Operación de guardar libro en la base de datos
  }

  async findAll(): Promise<Book[]> { // Declaración del método para buscar todos los libros con tipo de retorno
    return this.booksRepo.find({ // Operación de buscar todos los libros
      relations: ['category', 'authors'], // Inclusión de relaciones con categoría y autores
    });
  }

  async findOne(id: string): Promise<Book> { // Declaración del método para buscar un libro por ID con tipo de retorno
    const book = await this.booksRepo.findOne({ // Consulta para buscar libro por ID
      where: { id }, // Condición de búsqueda por ID
      relations: ['category', 'authors'], // Inclusión de relaciones con categoría y autores
    });
    if (!book) throw new NotFoundException('Book not found'); // Validación de que el libro existe
    return book; // Retorno del libro encontrado
  }

  async remove(id: string): Promise<void> { // Declaración del método para eliminar libro con tipo de retorno void
    const result = await this.booksRepo.delete(id); // Operación de eliminar libro de la base de datos
    if (result.affected === 0) throw new NotFoundException('Book not found'); // Validación de que se eliminó el libro
  }

  async updateCopies(id: string, delta: number): Promise<Book> { // Declaración del método para actualizar copias con tipo de retorno
    const book = await this.findOne(id); // Obtención del libro por ID
    book.copiesAvailable = Math.max((book.copiesAvailable ?? 0) + delta, 0); // Actualización de copias disponibles con límite mínimo 0
    return this.booksRepo.save(book); // Operación de guardar cambios en la base de datos
  }
}