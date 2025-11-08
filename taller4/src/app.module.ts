import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importa primero los módulos que NO dependen de otros
import { CategoriaModule } from './categoria/categoria.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FacturacionModule } from './facturacion/facturacion.module';
import { VentasModule } from './ventas/ventas.module';
import { VentaProductoModule } from './venta_producto/venta_producto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carga variables de entorno globalmente

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 5432),
        username: config.get<string>('DATABASE_USER', 'postgres'),
        password: config.get<string>('DATABASE_PASSWORD', '250622'),
        database: config.get<string>('DATABASE_NAME', 'ferreteria'),
        autoLoadEntities: true,
        synchronize: true, // Solo para desarrollo
      }),
    }),

    // Módulos de la aplicación
    CategoriaModule,
    ProveedorModule,
    ProductoModule,
    UsuarioModule,
    FacturacionModule,
    VentasModule,
    VentaProductoModule,
    AuthModule,
  ],
})
export class AppModule {}
