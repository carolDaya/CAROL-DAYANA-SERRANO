import { Injectable } from '@nestjs/common'; // Importación del decorador Injectable de NestJS
import { PassportStrategy } from '@nestjs/passport'; // Importación de la clase base para estrategias Passport
import { ExtractJwt, Strategy } from 'passport-jwt'; // Importación de estrategia JWT y extractor de tokens
import { ConfigService } from '@nestjs/config'; // Importación del servicio de configuración
import { AuthService } from './auth.service'; // Importación del servicio AuthService

@Injectable() // Decorador que marca como servicio inyectable
export class JwtStrategy extends PassportStrategy(Strategy) { // Declaración de la clase JwtStrategy que extiende PassportStrategy
  constructor(cfg: ConfigService, private authSvc: AuthService) { // Declaración del constructor con inyección de servicios
    super({ // Llamada al constructor de la clase padre con configuración
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Configuración para extraer JWT del header Authorization como Bearer token
      secretOrKey: cfg.get<string>('JWT_SECRET') || 'default_jwt_secret', // Obtención del secreto JWT con valor por defecto
    });
  }

  async validate(payload: any) { // Declaración del método validate para procesar el payload
    const user = await this.authSvc.findById(payload.sub); // Consulta al servicio para obtener usuario por ID del payload
    return { id: user.id, email: user.email, name: user.name }; // Retorno del objeto de usuario con id, email y nombre
  }
}