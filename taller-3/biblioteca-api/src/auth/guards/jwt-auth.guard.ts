import { Injectable } from '@nestjs/common'; // Importación del decorador Injectable de NestJS
import { AuthGuard } from '@nestjs/passport'; // Importación de la clase base AuthGuard de Passport

@Injectable() // Decorador que marca como servicio inyectable
export class JwtAuthGuard extends AuthGuard('jwt') {} // Declaración de la clase JwtAuthGuard que extiende AuthGuard con estrategia 'jwt'