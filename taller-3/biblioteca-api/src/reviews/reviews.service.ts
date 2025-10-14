import { Injectable, NotFoundException } from '@nestjs/common'; // Importación de decoradores y excepciones de NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Importación del decorador para inyectar repositorios
import { Repository } from 'typeorm'; // Importación de Repository para operaciones de base de datos
import { Review } from './review.entity'; // Importación de la entidad Review
import { User } from '../users/user.entity'; // Importación de la entidad User
import { Book } from '../books/book.entity'; // Importación de la entidad Book

@Injectable() // Decorador que marca como servicio inyectable
export class ReviewsService { // Declaración de la clase ReviewsService
  constructor( // Declaración del constructor con múltiples repositorios
    @InjectRepository(Review) private repo: Repository<Review>, // Inyección del repositorio de reseñas
    @InjectRepository(User) private userRepo: Repository<User>, // Inyección del repositorio de usuarios
    @InjectRepository(Book) private bookRepo: Repository<Book>, // Inyección del repositorio de libros
  ) {}

  findAll() { return this.repo.find(); } // Declaración del método para buscar todas las reseñas

  async create(data: any) { // Declaración del método para crear reseña
    const user = await this.userRepo.findOne({ where: { id: data.userId } }); // Consulta para buscar usuario por ID
    const book = await this.bookRepo.findOne({ where: { id: data.bookId } }); // Consulta para buscar libro por ID
    if (!user || !book) throw new NotFoundException('User or Book not found'); // Validación de que usuario y libro existen

    const review = this.repo.create({ rating: data.rating, comment: data.comment, user, book }); // Creación de instancia de reseña
    return this.repo.save(review); // Operación de guardar reseña en la base de datos
  }
}