import { Module } from '@nestjs/common'; // Importación del decorador Module de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación del módulo TypeORM para NestJS
import { Loan } from './loan.entity'; // Importación de la entidad Loan
import { LoansService } from './loans.service'; // Importación del servicio LoansService
import { LoansController } from './loans.controller'; // Importación del controlador LoansController
import { User } from '../users/user.entity'; // Importación de la entidad User
import { Book } from '../books/book.entity'; // Importación de la entidad Book

@Module({ // Decorador que define un módulo de NestJS
  imports: [TypeOrmModule.forFeature([Loan, User, Book])], // Configuración de importaciones con múltiples entidades
  providers: [LoansService], // Declaración de proveedores del módulo
  controllers: [LoansController], // Declaración de controladores del módulo
})
export class LoansModule {} // Declaración de la clase del módulo LoansModule