import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Profile } from '../profiles/profile.entity';
import { Loan } from '../loans/loan.entity';
import { Review } from '../reviews/review.entity';

// Entidad que representa a un usuario en la base de datos
@Entity('users')
export class User {

  // Identificador único del usuario
  @PrimaryGeneratedColumn()
  id: number;
  
  // Nombre del usuario
  @Column({ length: 255 })
  name: string;

  // Correo electrónico único
  @Column({ length: 255, unique: true })
  email: string;

  // Contraseña almacenada como hash
  @Column({ length: 255 })
  password: string;

  // Fecha de creación del registro
  @CreateDateColumn()
  createdAt: Date;

  // Relación uno a uno con el perfil
  @OneToOne(() => Profile, (profile) => profile.user)
  profile?: Profile;

  // Relación uno a muchos con préstamos
  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  // Relación uno a muchos con reseñas
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
