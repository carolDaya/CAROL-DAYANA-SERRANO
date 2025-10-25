import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../books/book.entity';

// Creación de la entidad Author
@Entity('authors')
export class Author {
  // Clave primaria auto-generada
  @PrimaryGeneratedColumn()
  id: number;

  // Nombre del autor
  @Column({ length: 255 })
  name: string;

  // Biografía del autor (opcional)
  @Column({ type: 'text', nullable: true })
  biography?: string;

  // Un autor puede tener muchos libros
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
