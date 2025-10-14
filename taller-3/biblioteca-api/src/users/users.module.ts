import { Module } from '@nestjs/common'; // Importación del decorador Module de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación del módulo TypeORM para NestJS
import { User } from './user.entity'; // Importación de la entidad User
import { UsersService } from './users.service'; // Importación del servicio UsersService
import { UsersController } from './users.controller'; // Importación del controlador UsersController

@Module({ // Decorador que define un módulo de NestJS
  imports: [TypeOrmModule.forFeature([User])], // Configuración de importaciones del módulo
  providers: [UsersService], // Declaración de proveedores del módulo
  controllers: [UsersController], // Declaración de controladores del módulo
  exports: [UsersService], // Exportación de servicios para uso externo
})
export class UsersModule {} // Declaración de la clase del módulo UsersModule 