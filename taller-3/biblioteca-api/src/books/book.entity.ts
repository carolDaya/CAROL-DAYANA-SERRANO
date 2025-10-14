// Importación de decoradores de TypeORM para definir la entidad y sus relaciones
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
// Importación de las entidades relacionadas
import { Category } from '../categories/category.entity';
import { Author } from '../authors/author.entity';
import { Loan } from '../loans/loan.entity';
import { Review } from '../reviews/review.entity';

// Decorador que marca la clase como entidad de base de datos y define el nombre de la tabla como 'books'
@Entity('books')
export class Book {
  // Columna primaria que se genera automáticamente como UUID único para cada libro
  @PrimaryGeneratedColumn('uuid') id: string;
  
  // Columna para almacenar el título del libro
  @Column() title: string;
  
  // Columna para el código ISBN, puede ser nula (nullable: true)
  @Column({ nullable: true }) isbn: string;
  
  // Columna numérica para las copias disponibles, valor por defecto es 1
  @Column({ type: 'int', default: 1 }) copiesAvailable: number;
  
  // Columna para la descripción del libro, puede ser nula
  @Column({ nullable: true }) description: string;

  // Relación muchos-a-uno: muchos libros pueden pertenecer a una categoría
  // { eager: true } significa que la categoría se cargará automáticamente con el libro
  @ManyToOne(() => Category, category => category.books, { eager: true }) category: Category;
  
  // Relación muchos-a-muchos: un libro puede tener múltiples autores y viceversa
  // { eager: true } significa que los autores se cargarán automáticamente con el libro
  // @JoinTable define la tabla intermedia para la relación muchos-a-muchos
  @ManyToMany(() => Author, author => author.books, { eager: true })
  @JoinTable({ name: 'book_authors' }) authors: Author[];
  
  // Relación uno-a-muchos: un libro puede tener múltiples préstamos
  // Relación lazy (por defecto) - los préstamos se cargan bajo demanda
  @OneToMany(() => Loan, loan => loan.book) loans: Loan[];
  
  // Relación uno-a-muchos: un libro puede tener múltiples reseñas
  // Relación lazy (por defecto) - las reseñas se cargan bajo demanda
  @OneToMany(() => Review, review => review.book) reviews: Review[];
}