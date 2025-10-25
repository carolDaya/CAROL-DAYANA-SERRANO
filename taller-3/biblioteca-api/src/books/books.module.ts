import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Category } from '../categories/category.entity';
import { Author } from '../authors/author.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

// Creación del módulo Books
@Module({
  imports: [TypeOrmModule.forFeature([Book, Category, Author])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
