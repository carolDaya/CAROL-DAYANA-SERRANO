import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facturacion } from './facturacion.entity';
import { Ventas } from '../ventas/ventas.entity';
import { Usuario } from '../usuario/usuario.entity';
import { FacturacionService } from './facturacion.service';
import { FacturacionController } from './facturacion.controller';
import { FacturacionRepository } from '../usuario/providers/facturacion.repository';

@Module({
  // Registra las entidades necesarias para que TypeORM pueda trabajar con ellas (consultas, guardado, relaciones, etc.)
  imports: [
    TypeOrmModule.forFeature([
      Facturacion, // Entidad principal de facturación.
      Ventas, // Entidad relacionada: cada factura pertenece a una venta.
      Usuario, // Entidad relacionada: cada factura está asociada a un usuario.
    ]),
  ],
  controllers: [FacturacionController],
  providers: [FacturacionService, FacturacionRepository],
  exports: [FacturacionService, FacturacionRepository],
})
export class FacturacionModule {}
