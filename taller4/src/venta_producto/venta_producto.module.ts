import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaProducto } from './venta_producto.entity';
import { VentaProductoService } from './venta_producto.service';
import { VentaProductoController } from './venta_producto.controller';
import { Ventas } from '../ventas/ventas.entity';
import { Producto } from '../producto/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VentaProducto, Ventas, Producto])],
  controllers: [VentaProductoController],
  providers: [VentaProductoService],
  exports: [VentaProductoService],
})
export class VentaProductoModule {}
