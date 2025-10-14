import { Module } from '@nestjs/common'; // Importación del decorador Module de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación del módulo TypeORM para NestJS
import { Review } from './review.entity'; // Importación de la entidad Review
import { ReviewsService } from './reviews.service'; // Importación del servicio ReviewsService
import { ReviewsController } from './reviews.controller'; // Importación del controlador ReviewsController
import { User } from '../users/user.entity'; // Importación de la entidad User
import { Book } from '../books/book.entity'; // Importación de la entidad Book

@Module({ // Decorador que define un módulo de NestJS
  imports: [TypeOrmModule.forFeature([Review, User, Book])], // Configuración de importaciones con múltiples entidades
  providers: [ReviewsService], // Declaración de proveedores del módulo
  controllers: [ReviewsController], // Declaración de controladores del módulo
})
export class ReviewsModule {} // Declaración de la clase del módulo ReviewsModule