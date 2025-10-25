import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable() 
//Clase que extiende el AuthGuard de Passport para manejar la autenticación JWT
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const method = req?.method?.toUpperCase?.() ?? '';
    if (method === 'GET') return true;
    return super.canActivate(context);
  }

//Manejo personalizado de la respuesta de autenticación
  handleRequest(err: any, user: any, info: any) {
    if (err) throw err;
    if (!user) {
      throw new UnauthorizedException('Token inválido o no proporcionado');
    }
    return user;
  }
}

