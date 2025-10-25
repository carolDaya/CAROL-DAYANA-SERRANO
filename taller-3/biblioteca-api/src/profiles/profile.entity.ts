import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

// Entidad que representa el perfil de un usuario en la base de datos
@Entity('profiles') 
export class Profile {

  // Clave primaria autogenerada para identificar de forma única cada perfil
  @PrimaryGeneratedColumn()
  id: number;

  // Almacena el apodo o nombre visible del usuario
  @Column('varchar', { length: 255, nullable: true })
  nickname: string | null;

  // Almacena una descripción o biografía del usuario
  @Column('text', { nullable: true })
  bio: string | null;

  // Guarda la URL del avatar o imagen de perfil del usuario
  @Column('varchar', { length: 1024, nullable: true })
  avatarUrl: string | null;

  // Relación uno a uno con la entidad User
  // Cada perfil pertenece a un solo usuario
  // Si el usuario se elimina, el perfil también se borra (CASCADE)
  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  user: User;
}

