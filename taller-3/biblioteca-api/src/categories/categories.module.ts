import { Module } from '@nestjs/common'; // Importación del decorador Module de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación del módulo TypeORM para NestJS
import { Category } from './category.entity'; // Importación de la entidad Category
import { CategoriesService } from './categories.service'; // Importación del servicio CategoriesService
import { CategoriesController } from './categories.controller'; // Importación del controlador CategoriesController

@Module({ // Decorador que define un módulo de NestJS
  imports: [TypeOrmModule.forFeature([Category])], // Configuración de importaciones del módulo con TypeORM
  providers: [CategoriesService], // Declaración de proveedores del módulo
  controllers: [CategoriesController], // Declaración de controladores del módulo
  exports: [CategoriesService], // Exportación de servicios para uso externo
})
export class CategoriesModule {} // Declaración de la clase del módulo CategoriesModule