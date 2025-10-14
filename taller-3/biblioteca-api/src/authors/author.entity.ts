// Importación de decoradores de TypeORM para definir la entidad y sus relaciones
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
// Importación de la entidad Book para establecer la relación muchos-a-muchos
import { Book } from '../books/book.entity';

// Decorador que marca la clase como entidad de base de datos y define el nombre de la tabla como 'authors'
@Entity('authors')
export class Author {
  // Columna primaria que se genera automáticamente como UUID único para cada autor
  @PrimaryGeneratedColumn('uuid') id: string;
  
  // Columna para almacenar el nombre del autor
  @Column() name: string;
  
  // Relación muchos-a-muchos: un autor puede tener múltiples libros y un libro puede tener múltiples autores
  // Primer parámetro: target entity (Book)
  // Segundo parámetro: cómo se accede a esta relación desde la entidad Book (book.authors)
  @ManyToMany(() => Book, book => book.authors) books: Book[];
}