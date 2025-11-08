import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';

@Module({
  //Registra la entidad Categoria para que TypeORM pueda trabajar con ella (consultas, guardado, etc.)
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}
