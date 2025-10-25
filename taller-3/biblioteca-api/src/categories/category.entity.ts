import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../books/book.entity';

// Define la tabla 'categories' en la base de datos
@Entity('categories')
export class Category {
  // Crea una columna id auto-incremental
  @PrimaryGeneratedColumn()
  id: number;

  // Columna de texto con longitud máxima 255
  @Column({ length: 255 })
  name: string;

  // Campo opcional o null
  @Column({ type: 'text', nullable: true })
  description?: string | null;

  // Relación uno a muchos con Book
  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
