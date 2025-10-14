import { Module } from '@nestjs/common'; // Importación del decorador Module de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación del módulo TypeORM para NestJS
import { Book } from './book.entity'; // Importación de la entidad Book
import { BooksService } from './books.service'; // Importación del servicio BooksService
import { BooksController } from './books.controller'; // Importación del controlador BooksController
import { Category } from '../categories/category.entity'; // Importación de la entidad Category
import { Author } from '../authors/author.entity'; // Importación de la entidad Author

@Module({ // Decorador que define un módulo de NestJS
  imports: [TypeOrmModule.forFeature([Book, Category, Author])], // Configuración de importaciones con múltiples entidades
  providers: [BooksService], // Declaración de proveedores del módulo
  controllers: [BooksController], // Declaración de controladores del módulo
  exports: [BooksService], // Exportación de servicios para uso externo
})
export class BooksModule {} // Declaración de la clase del módulo BooksModule