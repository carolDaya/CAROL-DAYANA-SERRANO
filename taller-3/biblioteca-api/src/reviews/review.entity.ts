import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

// Entidad que representa una reseña de un libro
@Entity('reviews')
export class Review {
  // Identificador único de la reseña
  @PrimaryGeneratedColumn()
  id: number;

  // Relación con el libro reseñado (si se borra el libro, se elimina la reseña)
  @ManyToOne(() => Book, (book) => book.reviews, { eager: true, onDelete: 'CASCADE' })
  book: Book;

  // Relación con el usuario que hizo la reseña (si se borra el usuario, se deja en null)
  @ManyToOne(() => User, (user) => user.reviews, { eager: true, onDelete: 'SET NULL', nullable: true })
  user?: User | null;

  // Texto o contenido de la reseña
  @Column({ type: 'text' })
  content: string;

  // Calificación otorgada al libro (por defecto 5)
  @Column({ type: 'int', default: 5 })
  rating: number;

  // Fecha de creación de la reseña
  @CreateDateColumn()
  createdAt: Date;
}

