import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  // Registro (usa el repo existente, que ya hace hashing)
  async register(dto: RegisterDto) {
    // Revisa si ya existe correo
    const existing = await this.usuarioService.findByEmail(dto.correo);
    if (existing) {
      throw new UnauthorizedException('Correo ya registrado');
    }

    // Usa el service que ya delega al repo (que hashea)
    const created = await this.usuarioService.createUser({
      nombre: dto.nombre,
      correo: dto.correo,
      contrasena: dto.contrasena,
      rol: dto.rol,
    } as any); // cast según tu DTO
    // no devolvemos contraseña
    const { contrasena, ...rest } = created as any;
    return rest;
  }

  // Validar credenciales (devuelve usuario sin contraseña)
  async validateUser(correo: string, contrasena: string) {
    const user = await this.usuarioService.findByEmail(correo);
    if (!user) return null;
    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return null;
    const { contrasena: _, ...result } = user as any;
    return result;
  }

  // Generar token con payload
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.correo, loginDto.contrasena);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      correo: user.correo,
      rol: user.rol,
      sub: user.id_usuario,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
