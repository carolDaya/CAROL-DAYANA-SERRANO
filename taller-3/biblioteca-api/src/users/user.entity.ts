// Importación de decoradores y tipos de TypeORM para definir la entidad
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
// Importación de la entidad Loan para la relación
import { Loan } from '../loans/loan.entity';
// Importación de la entidad Review para la relación
import { Review } from '../reviews/review.entity';

// Decorador que marca la clase como entidad de base de datos y define el nombre de la tabla
@Entity('users')
export class User {
  // Columna primaria que se genera automáticamente como UUID
  @PrimaryGeneratedColumn('uuid') id: string;

  // Columna para email con constraint de unicidad (no se pueden repetir emails)
  @Column({ unique: true }) email: string;
  // Columna para el nombre del usuario
  @Column() name: string;
  // Columna para almacenar la contraseña
  @Column() password: string;
  // Relación uno-a-muchos: un usuario puede tener múltiples préstamos
  @OneToMany(() => Loan, loan => loan.user) loans: Loan[];
  // Relación uno-a-muchos: un usuario puede tener múltiples reseñas
  @OneToMany(() => Review, review => review.user) reviews: Review[];
  // Columna que almacena automáticamente la fecha de creación del registro
  @CreateDateColumn() createdAt: Date;
}