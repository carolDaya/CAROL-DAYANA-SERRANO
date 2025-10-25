import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

// Marca la clase como un servicio inyectable dentro del sistema de dependencias de NestJS
@Injectable()
export class LoansService {
  // Inyección de repositorios TypeORM para las entidades Loan, Book y User
  constructor(
    @InjectRepository(Loan) private loanRepo: Repository<Loan>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  // Método para crear un nuevo préstamo
  async create(dto: CreateLoanDto): Promise<Loan> {
    // Busca el libro asociado al préstamo por su ID
    const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
    // Lanza una excepción si el libro no existe
    if (!book) throw new NotFoundException('Book not found');

    // Busca el usuario asociado al préstamo por su ID
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    // Lanza una excepción si el usuario no existe
    if (!user) throw new NotFoundException('User not found');

    // Crea una nueva instancia de Loan con los datos proporcionados
    const ent = this.loanRepo.create({
      book,
      user,
      loanDate: dto.loanDate,
      returnDate: dto.returnDate ?? null, // Usa null si no se proporciona fecha de devolución
      returned: !!dto.returnDate, // Marca como devuelto si existe returnDate
    });

    // Guarda el préstamo en la base de datos y lo retorna
    return this.loanRepo.save(ent);
  }

  // Retorna todos los préstamos registrados
  findAll(): Promise<Loan[]> {
    return this.loanRepo.find();
  }

  // Busca un préstamo específico por ID
  async findOne(id: number): Promise<Loan> {
    const l = await this.loanRepo.findOne({ where: { id } });
    // Lanza excepción si no se encuentra el préstamo
    if (!l) throw new NotFoundException('Loan not found');
    return l;
  }

  // Actualiza los datos de un préstamo existente
  async update(id: number, dto: UpdateLoanDto): Promise<Loan> {
    // Verifica que el préstamo exista antes de actualizarlo
    const l = await this.findOne(id);
    // Asigna las nuevas propiedades desde el DTO
    Object.assign(l, dto);
    // Si se proporciona una fecha de devolución, marca como devuelto
    if (dto.returnDate) l.returned = true;
    // Guarda los cambios en la base de datos
    return this.loanRepo.save(l);
  }

  // Elimina un préstamo por su ID
  async remove(id: number): Promise<void> {
    // Verifica que el préstamo exista antes de eliminarlo
    const l = await this.findOne(id);
    // Elimina el registro del repositorio
    await this.loanRepo.remove(l);
  }
}
