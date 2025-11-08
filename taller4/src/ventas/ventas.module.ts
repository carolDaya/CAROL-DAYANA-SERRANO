import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ventas } from './ventas.entity';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { VentasRepository } from '../usuario/providers/ventas.repository';
import { Usuario } from '../usuario/usuario.entity';
import { Facturacion } from '../facturacion/facturacion.entity';
import { FacturacionModule } from '../facturacion/facturacion.module';

/**
 * Módulo de Ventas
 * Agrupa todo lo relacionado con el manejo de ventas (entidad, controlador, servicio y repositorio).
 */
@Module({
  // Importa las entidades necesarias y el módulo de facturación.
  imports: [
    TypeOrmModule.forFeature([Ventas, Usuario, Facturacion]),
    FacturacionModule, // permite usar FacturacionRepository y FacturacionService
  ],

  // Declara el controlador para manejar las peticiones HTTP de ventas.
  controllers: [VentasController],

  // Declara los servicios y repositorios que contienen la lógica del negocio.
  providers: [VentasService, VentasRepository],
})

// Clase principal del módulo de ventas.
export class VentasModule {}
