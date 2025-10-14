import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'; // Importación de decoradores y excepciones de NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Importación del decorador para inyectar repositorios
import { Repository } from 'typeorm'; // Importación de Repository para operaciones de base de datos
import { Loan } from './loan.entity'; // Importación de la entidad Loan
import { User } from '../users/user.entity'; // Importación de la entidad User
import { Book } from '../books/book.entity'; // Importación de la entidad Book
import { CreateLoanDto } from './create-loan.dto'; // Importación del DTO para crear préstamos

@Injectable() // Decorador que marca como servicio inyectable
export class LoansService { // Declaración de la clase LoansService
  constructor( // Declaración del constructor con múltiples repositorios
    @InjectRepository(Loan) private repo: Repository<Loan>, // Inyección del repositorio de préstamos
    @InjectRepository(User) private userRepo: Repository<User>, // Inyección del repositorio de usuarios
    @InjectRepository(Book) private bookRepo: Repository<Book>, // Inyección del repositorio de libros
  ) {}

  findAll() { return this.repo.find(); } // Declaración del método para buscar todos los préstamos

  async create(dto: CreateLoanDto) { // Declaración del método para crear préstamo
    const user = await this.userRepo.findOne({ where: { id: dto.userId } }); // Consulta para buscar usuario por ID
    const book = await this.bookRepo.findOne({ where: { id: dto.bookId } }); // Consulta para buscar libro por ID

    if (!user || !book) throw new NotFoundException('User or Book not found'); // Validación de que usuario y libro existen
    if (book.copiesAvailable < 1) throw new BadRequestException('Book not available'); // Validación de disponibilidad de copias

    book.copiesAvailable -= 1; // Decremento de copias disponibles
    await this.bookRepo.save(book); // Operación de guardar cambios en el libro

    const loan = this.repo.create({ user, book, loanDate: dto.loanDate }); // Creación de instancia de préstamo
    return this.repo.save(loan); // Operación de guardar préstamo en la base de datos
  }

  async markReturned(id: string) { // Declaración del método para marcar préstamo como devuelto
    const loan = await this.repo.findOne({ where: { id } }); // Consulta para buscar préstamo por ID
    if (!loan) throw new NotFoundException('Loan not found'); // Validación de que el préstamo existe
    if (loan.returned) throw new BadRequestException('Already returned'); // Validación de que no está ya devuelto

    loan.returned = true; // Marcado como devuelto
    await this.repo.save(loan); // Operación de guardar cambios en el préstamo

    const book = await this.bookRepo.findOne({ where: { id: loan.book.id } }); // Consulta para buscar libro asociado
    if (book) { // Validación de que el libro existe
      book.copiesAvailable += 1; // Incremento de copias disponibles
      await this.bookRepo.save(book); // Operación de guardar cambios en el libro
    }

    return { returned: true }; // Retorno de confirmación de devolución
  }
}