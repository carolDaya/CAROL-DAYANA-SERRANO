import { Module } from '@nestjs/common'; // Importación del decorador Module de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación del módulo TypeORM para NestJS
import { Author } from './author.entity'; // Importación de la entidad Author
import { AuthorsService } from './authors.service'; // Importación del servicio AuthorsService
import { AuthorsController } from './authors.controller'; // Importación del controlador AuthorsController

@Module({ // Decorador que define un módulo de NestJS
  imports: [TypeOrmModule.forFeature([Author])], // Configuración de importaciones del módulo con TypeORM
  providers: [AuthorsService], // Declaración de proveedores del módulo
  controllers: [AuthorsController], // Declaración de controladores del módulo
  exports: [AuthorsService], // Exportación de servicios para uso externo
})
export class AuthorsModule {} // Declaración de la clase del módulo AuthorsModule