import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Author } from '../authors/author.entity';
import { Loan } from '../loans/loan.entity';
import { Review } from '../reviews/review.entity';

 // Creación de la entidad Book
@Entity('books')
export class Book {
  // Clave primaria auto-generada
  @PrimaryGeneratedColumn()
  id: number;

  // Título del libro
  @Column({ length: 255 })
  title: string;

  // ISBN del libro (opcional y único)
  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  isbn: string | null;

  // Descripción del libro (opcional) 
  @Column({ type: 'text', nullable: true })
  description?: string | null;

  // Fecha de publicación del libro (opcional)
  @Column({ type: 'date', name: 'published_at', nullable: true })
  publishedAt?: Date | null;

  // Número de copias totales y disponibles
  @Column({ type: 'int', default: 0 })
  copies: number;

  // Número de copias disponibles
  @Column({ type: 'int', name: 'copies_available', default: 0 })
  copiesAvailable: number;

  // Fecha de creación del registro
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relaciones con Category y Author
  @ManyToOne(() => Category, (category) => category.books, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  category?: Category | null;

  // Relaciones con Author
  @ManyToOne(() => Author, (author) => author.books, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  author?: Author | null;

  // Relaciones inversas
  @OneToMany(() => Loan, (loan) => loan.book)
  loans: Loan[];

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
