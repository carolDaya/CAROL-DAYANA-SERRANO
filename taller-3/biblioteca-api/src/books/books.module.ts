import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Category } from '../categories/category.entity';
import { Author } from '../authors/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category, Author])],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}