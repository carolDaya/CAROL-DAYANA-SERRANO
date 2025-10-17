import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Author } from '../authors/author.entity';
import { Loan } from '../loans/loan.entity';
import { Review } from '../reviews/review.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid') 
  id: string;
  
  @Column() 
  title: string;
  
  @Column({ nullable: true }) 
  isbn: string;
  
  @Column({ type: 'int', default: 1 }) 
  copiesAvailable: number;
  
  @Column({ nullable: true }) 
  description: string;

  // Relationship: Many books belong to one Category (FK)
  // eager: true ensures Category loads automatically with the Book
  @ManyToOne(() => Category, category => category.books, { eager: true }) 
  category: Category;
  
  // Relationship: Many-to-Many with Authors
  // @JoinTable defines the intermediate table 'book_authors'
  @ManyToMany(() => Author, author => author.books, { eager: true })
  @JoinTable({ name: 'book_authors' }) 
  authors: Author[];
  
  // Relationship: One book can have many Loans (lazy)
  @OneToMany(() => Loan, loan => loan.book) 
  loans: Loan[];
  
  // Relationship: One book can have many Reviews (lazy)
  @OneToMany(() => Review, review => review.book) 
  reviews: Review[];
}