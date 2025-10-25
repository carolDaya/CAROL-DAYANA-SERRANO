// Importación de decoradores y módulos principales de NestJS
import { Module } from '@nestjs/common'; // Importación del decorador Module de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación del módulo TypeORM para NestJS
import { ConfigModule } from '@nestjs/config'; // Importación del módulo de configuración

// Controlador y servicio principal de la aplicación
import { AppController } from './app.controller'; // Importación del controlador AppController
import { AppService } from './app.service'; // Importación del servicio AppService

// Importación de los módulos de la biblioteca virtual
import { UsersModule } from './users/users.module'; // Importación del módulo de usuarios
import { AuthModule } from './auth/auth.module'; // Importación del módulo de autenticación
import { BooksModule } from './books/books.module'; // Importación del módulo de libros
import { AuthorsModule } from './authors/authors.module'; // Importación del módulo de autores
import { CategoriesModule } from './categories/categories.module'; // Importación del módulo de categorías
import { LoansModule } from './loans/loans.module'; // Importación del módulo de préstamos
import { ReviewsModule } from './reviews/reviews.module'; // Importación del módulo de reseñas
import { ProfilesModule } from './profiles/profiles.module'; // Importación del módulo de perfiles

@Module({ // Decorador que define el módulo principal de NestJS
  imports: [ // Configuración de importaciones del módulo
    // Carga de variables de entorno globalmente desde el archivo .env
    ConfigModule.forRoot({ // Configuración del módulo de configuración
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),

    // Configuración de conexión a PostgreSQL mediante TypeORM
    TypeOrmModule.forRoot({ // Configuración de TypeORM para la base de datos
      type: 'postgres', // Tipo de base de datos PostgreSQL
      host: process.env.DB_HOST || 'localhost', // Host de la base de datos con valor por defecto
      port: +(process.env.DB_PORT || 5432),  // Puerto de la base de datos con valor por defecto
      username: process.env.DB_USER || 'postgres', // Usuario de la base de datos con valor por defecto
      password: process.env.DB_PASS || 'power7531', // Contraseña de la base de datos con valor por defecto
      database: process.env.DB_NAME || 'biblioteca_db', // Nombre de la base de datos con valor por defecto
      autoLoadEntities: true, // Carga automática de todas las entidades registradas en los módulos
      synchronize: true, // Sincronización automática del esquema (solo desarrollo)
      logging: true, // Registra las consultas SQL en consola (útil para depurar)
    
    }),

    // Módulos funcionales
    UsersModule, // Importación del módulo de usuarios
    AuthModule, // Importación del módulo de autenticación
    BooksModule, // Importación del módulo de libros
    AuthorsModule, // Importación del módulo de autores
    CategoriesModule, // Importación del módulo de categorias
    LoansModule, // Importación del módulo de prestamos
    ReviewsModule, // Importación del módulo de reseñas
    ProfilesModule, // Importación del módulo de perfiles
  ],

  controllers: [AppController], // Declaración de controladores del módulo
  providers: [AppService], // Declaración de proveedores del módulo
})
export class AppModule {} // Declaración de la clase del módulo principal AppModule