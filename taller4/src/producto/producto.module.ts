import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { Proveedor } from '../proveedor/proveedor.entity';
import { Categoria } from '../categoria/categoria.entity';
import { ProveedorModule } from '../proveedor/proveedor.module';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Proveedor, Categoria]),
    ProveedorModule,
    CategoriaModule,
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
