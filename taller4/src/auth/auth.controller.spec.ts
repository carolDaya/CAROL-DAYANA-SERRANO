import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Roles } from './roles.decorator';

// Mock de bcrypt
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUsuarioService = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const registerDto: RegisterDto = {
    nombre: 'Test User',
    correo: 'user@test.com',
    contrasena: '123456',
    rol: Roles.EMPLEADO,// ⚡ Ajusta según tu tipo de rol o enum
  };

  const loginDto: LoginDto = {
    correo: 'user@test.com',
    contrasena: '123456',
  };

  // Usuario mock con Partial para evitar problemas de readonly
  const mockUser: Partial<any> = {
    id_usuario: 1,
    nombre: 'Test User',
    correo: 'user@test.com',
    contrasena: '$2b$10$hashedpassword', // hash simulado
    rol: 'user',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  // 🔹 Registro exitoso
  it('should register a user', async () => {
    mockUsuarioService.findByEmail.mockResolvedValue(null);
    mockUsuarioService.createUser.mockResolvedValue(mockUser);

    const result = await service.register(registerDto);

    expect(mockUsuarioService.findByEmail).toHaveBeenCalledWith(registerDto.correo);
    expect(mockUsuarioService.createUser).toHaveBeenCalled();
    expect(result).toEqual({
      id_usuario: mockUser.id_usuario,
      nombre: mockUser.nombre,
      correo: mockUser.correo,
      rol: mockUser.rol,
    });
  });

  // 🔹 Registro fallido (correo ya registrado)
  it('should throw UnauthorizedException if email exists', async () => {
    mockUsuarioService.findByEmail.mockResolvedValue(mockUser);

    await expect(service.register(registerDto)).rejects.toThrow(UnauthorizedException);
    expect(mockUsuarioService.createUser).not.toHaveBeenCalled();
  });

  // 🔹 validateUser: contraseña correcta
  it('should return user if password matches', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    mockUsuarioService.findByEmail.mockResolvedValue(mockUser);

    const result = await service.validateUser(loginDto.correo, loginDto.contrasena);

    expect(mockUsuarioService.findByEmail).toHaveBeenCalledWith(loginDto.correo);
    expect(result).toEqual({
      id_usuario: mockUser.id_usuario,
      nombre: mockUser.nombre,
      correo: mockUser.correo,
      rol: mockUser.rol,
    });
  });

  // 🔹 validateUser: contraseña incorrecta
  it('should return null if password does not match', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    mockUsuarioService.findByEmail.mockResolvedValue(mockUser);

    const result = await service.validateUser(loginDto.correo, 'wrongpass');

    expect(result).toBeNull();
  });

  // 🔹 validateUser: usuario no encontrado
  it('should return null if user does not exist', async () => {
    mockUsuarioService.findByEmail.mockResolvedValue(null);

    const result = await service.validateUser(loginDto.correo, loginDto.contrasena);

    expect(result).toBeNull();
  });

  // 🔹 Login exitoso
  it('should login a user and return access_token', async () => {
    jest.spyOn(service, 'validateUser').mockResolvedValue({
      id_usuario: mockUser.id_usuario,
      nombre: mockUser.nombre,
      correo: mockUser.correo,
      rol: mockUser.rol,
    });

    mockJwtService.sign.mockReturnValue('jwt-token');

    const result = await service.login(loginDto);

    expect(service.validateUser).toHaveBeenCalledWith(loginDto.correo, loginDto.contrasena);
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      correo: mockUser.correo,
      rol: mockUser.rol,
      sub: mockUser.id_usuario,
    });
    expect(result).toEqual({ access_token: 'jwt-token' });
  });

  // 🔹 Login fallido
  it('should throw UnauthorizedException if credentials are invalid', async () => {
    jest.spyOn(service, 'validateUser').mockResolvedValue(null);

    await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
  });
});
