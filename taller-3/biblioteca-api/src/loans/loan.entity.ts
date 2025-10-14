// Importación de decoradores de TypeORM para definir la entidad y sus relaciones
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
// Importación de las entidades relacionadas
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';

// Decorador que marca la clase como entidad de base de datos y define el nombre de la tabla como 'loans'
@Entity('loans')
export class Loan {
  // Columna primaria que se genera automáticamente como UUID único para cada préstamo
  @PrimaryGeneratedColumn('uuid') id: string;
  
  // Relación muchos-a-uno: muchos préstamos pueden pertenecer a un usuario
  // { eager: true } significa que el usuario se cargará automáticamente con el préstamo
  @ManyToOne(() => User, user => user.loans, { eager: true }) user: User;
  
  // Relación muchos-a-uno: muchos préstamos pueden pertenecer a un libro
  // { eager: true } significa que el libro se cargará automáticamente con el préstamo
  @ManyToOne(() => Book, book => book.loans, { eager: true }) book: Book;
  
  // Columna de tipo fecha para almacenar la fecha en que se realizó el préstamo
  @Column({ type: 'date' }) loanDate: string;
  
  // Columna de tipo fecha para almacenar la fecha de devolución, puede ser nula (cuando no se ha devuelto)
  @Column({ type: 'date', nullable: true }) returnDate: string;
  
  // Columna booleana para indicar si el libro ha sido devuelto, valor por defecto es false
  @Column({ default: false }) returned: boolean;
  
  // Columna que almacena automáticamente la fecha y hora de creación del registro del préstamo
  @CreateDateColumn() createdAt: Date;
}