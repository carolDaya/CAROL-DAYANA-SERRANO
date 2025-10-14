import { Module } from '@nestjs/common'; // Importación del decorador Module de NestJS
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'; // Importación del módulo JWT para NestJS
import { SignOptions } from 'jsonwebtoken'; // Importación de opciones de firma de JSON Web Token
import { PassportModule } from '@nestjs/passport'; // Importación del módulo Passport para autenticación
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación del módulo TypeORM para NestJS
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importación del módulo de configuración
import { User } from '../users/user.entity'; // Importación de la entidad User
import { AuthService } from './auth.service'; // Importación del servicio AuthService
import { AuthController } from './auth.controller'; // Importación del controlador AuthController
import { JwtStrategy } from './jwt.strategy'; // Importación de la estrategia JWT

@Module({ // Decorador que define un módulo de NestJS
  imports: [ // Configuración de importaciones del módulo
    ConfigModule, // Importación del módulo de configuración
    PassportModule, // Importación del módulo Passport
    TypeOrmModule.forFeature([User]), // Configuración de TypeORM con la entidad User
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (cfg: ConfigService): Promise<JwtModuleOptions> => {
      const raw = cfg.get<string>('JWT_EXPIRES_IN') ?? '1h';
      const expiresIn: string | number = /^\d+$/.test(raw) ? Number(raw) : raw;
      return {
        secret: cfg.get<string>('JWT_SECRET') ?? 'default_jwt_secret',
        signOptions: { expiresIn } as SignOptions,
    };
  },
}),
  ],
  providers: [AuthService, JwtStrategy], // Declaración de proveedores del módulo
  controllers: [AuthController], // Declaración de controladores del módulo
  exports: [AuthService], // Exportación de servicios para uso externo
})
export class AuthModule {} // Declaración de la clase del módulo AuthModule