import { Module } from '@nestjs/common'; 
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

// Modulo de Autenticación
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): JwtModuleOptions => {
        const raw = cfg.get<string>('JWT_EXPIRES_IN') ?? '1h';
        const expiresIn: string | number = /^\d+$/.test(String(raw))
          ? Number(raw)
          : raw;
        const secret = cfg.get<string>('JWT_SECRET') ?? 'default_jwt_secret';
        return {
          secret,
          signOptions: { expiresIn } as SignOptions,
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
