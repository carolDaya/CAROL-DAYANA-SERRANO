// Importación de decoradores de TypeORM para definir la entidad y sus relaciones
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// Importación de la entidad Book para establecer la relación uno-a-muchos
import { Book } from '../books/book.entity';

// Decorador que marca la clase como entidad de base de datos y define el nombre de la tabla como 'categories'
@Entity('categories')
export class Category {
  // Columna primaria que se genera automáticamente como UUID único para cada categoría
  @PrimaryGeneratedColumn('uuid') id: string;
  
  // Columna para almacenar el nombre de la categoría (ej: "Ficción", "Ciencia", "Terror")
  @Column() name: string;
  
  // Relación uno-a-muchos: una categoría puede contener múltiples libros
  // Primer parámetro: target entity (Book)
  // Segundo parámetro: cómo se accede a esta relación desde la entidad Book (book.category)
  @OneToMany(() => Book, book => book.category) books: Book[];
}