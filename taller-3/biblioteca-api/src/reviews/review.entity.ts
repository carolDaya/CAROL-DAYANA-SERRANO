// Importación de decoradores de TypeORM para definir la entidad y sus relaciones
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// Importación de las entidades relacionadas
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';

// Decorador que marca la clase como entidad de base de datos y define el nombre de la tabla como 'reviews'
@Entity('reviews')
export class Review {
  // Columna primaria que se genera automáticamente como UUID único para cada reseña
  @PrimaryGeneratedColumn('uuid') id: string;
  
  // Columna numérica para almacenar la calificación (rating) de la reseña
  @Column({ type: 'int' }) rating: number;
  
  // Columna para almacenar el comentario de la reseña, puede ser nula (reseñas solo con rating)
  @Column({ nullable: true }) comment: string;
  
  // Relación muchos-a-uno: muchas reseñas pueden pertenecer a un usuario
  // { eager: true } significa que el usuario se cargará automáticamente con la reseña
  @ManyToOne(() => User, user => user.reviews, { eager: true }) user: User;
  
  // Relación muchos-a-uno: muchas reseñas pueden pertenecer a un libro
  // { eager: true } significa que el libro se cargará automáticamente con la reseña
  @ManyToOne(() => Book, book => book.reviews, { eager: true }) book: Book;
}