import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

// Define la tabla 'loans' en la base de datos
@Entity('loans')
export class Loan {
  // Crea columna id auto-incremental
  @PrimaryGeneratedColumn()
  id: number;

  // Fecha del préstamo
  @Column({ type: 'date' })
  loanDate: string;

  // Fecha de devolución opcional
  @Column({ type: 'date', nullable: true })
  returnDate?: string | null;

  // Indica si el libro fue devuelto
  @Column({ default: false })
  returned: boolean;

  // Fecha de creación del registro
  @CreateDateColumn()
  createdAt: Date;

  // Fecha de última actualización
  @UpdateDateColumn()
  updatedAt: Date;

  //Relaiones
  @ManyToOne(() => Book, (book) => book.loans, { eager: true, onDelete: 'CASCADE' })
  book: Book;

  @ManyToOne(() => User, (user) => user.loans, { eager: true, onDelete: 'CASCADE' })
  user: User;
}
