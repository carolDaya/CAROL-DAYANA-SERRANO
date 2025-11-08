import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Entidades que serán gestionadas o consultadas por este Módulo
import { Usuario } from './usuario.entity';
import { Ventas } from '../ventas/ventas.entity';
import { Facturacion } from '../facturacion/facturacion.entity';
// Componentes funcionales
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './providers/usuario.repository';
// Repositorios de otras entidades que se inyectarán en este módulo (por ejemplo, en un servicio)
import { VentasRepository } from './providers/ventas.repository';
import { FacturacionRepository } from './providers/facturacion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Ventas, Facturacion])],
  controllers: [UsuarioController],
  providers: [
    // Exportar el Servicio y los Repositorios es una práctica común para que la funcionalidad
    // pueda ser usada por la capa de Autenticación o por otros módulos
    UsuarioService,
    UsuarioRepository,
    VentasRepository,
    FacturacionRepository,
  ],
  exports: [
    // Exportar el Servicio y los Repositorios es una práctica común para que la funcionalidad
    //pueda ser usada por la capa de Autenticación o por otros módulos
    UsuarioService,
    UsuarioRepository,
    VentasRepository,
    FacturacionRepository,
  ],
})
export class UsuarioModule {}
