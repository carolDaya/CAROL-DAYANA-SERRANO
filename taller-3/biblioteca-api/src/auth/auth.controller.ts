import { Controller, Post, Body, BadRequestException } from '@nestjs/common'; // Importación de decoradores y excepciones de NestJS
import { AuthService } from './auth.service'; // Importación del servicio AuthService
import { RegisterDto } from './register.dto'; // Importación del DTO para registro
import { LoginDto } from './login.dto'; // Importación del DTO para login

@Controller('auth') // Decorador que define el controlador con ruta base 'auth'
export class AuthController {
  // Declaración de la clase AuthController
  constructor(private authSvc: AuthService) {} // Inyección del servicio AuthService

  @Post('register') // Decorador para método POST en ruta 'register'
  register(@Body() dto: RegisterDto) {
    // Declaración del método para registro
    if (!dto.email || !dto.password || !dto.name)
      // Validación de campos requeridos
      throw new BadRequestException('Missing fields'); // Excepción si faltan campos
    return this.authSvc.register(dto.name, dto.email, dto.password); // Llamada al servicio de registro
  }

  @Post('login') // Decorador para método POST en ruta 'login'
  async login(@Body() dto: LoginDto) {
    // Declaración del método para login
    const user = await this.authSvc.validateUser(dto.email, dto.password); // Validación de credenciales de usuario
    return this.authSvc.login(user); // Llamada al servicio de login para generar token
  }
}
