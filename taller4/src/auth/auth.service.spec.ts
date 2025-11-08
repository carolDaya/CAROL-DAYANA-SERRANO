import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from '../usuario/enums/roles.enum';
import { Usuario } from '../usuario/usuario.entity';

// ✅ Mock global para evitar errores de redefinición
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let mockUsuarioService: jest.Mocked<UsuarioService>;
  let mockJwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockUsuarioService = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    } as unknown as jest.Mocked<UsuarioService>;

    mockJwtService = {
      sign: jest.fn().mockReturnValue('token-mock'),
    } as unknown as jest.Mocked<JwtService>;

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('debería registrar un usuario si no existe', async () => {
      const dto: RegisterDto = {
        nombre: 'Erika',
        correo: 'erika@mail.com',
        contrasena: 'password123',
        rol: Roles.ADMIN,
      };

      const mockUser = {
  id_usuario: 1,
  nombre: 'Erika',
  correo: 'erika@mail.com',
  contrasena: 'hash123',
  rol: Roles.ADMIN,
  apellido: 'Pesca',
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;


      mockUsuarioService.findByEmail.mockResolvedValue(null);
      mockUsuarioService.createUser.mockResolvedValue(mockUser as Usuario);

      const result = await service.register(dto);

      // ✅ Usa toMatchObject para comparar solo los campos esperados
      expect(result).toMatchObject({
        id_usuario: 1,
        nombre: 'Erika',
        correo: 'erika@mail.com',
        rol: Roles.ADMIN,
      });

      expect(mockUsuarioService.findByEmail).toHaveBeenCalledWith(dto.correo);
      expect(mockUsuarioService.createUser).toHaveBeenCalledWith(dto);
    });

    it('debería lanzar UnauthorizedException si el correo ya existe', async () => {
      const dto: RegisterDto = {
        nombre: 'Erika',
        correo: 'erika@mail.com',
        contrasena: 'password123',
        rol: Roles.ADMIN,
      };

      mockUsuarioService.findByEmail.mockResolvedValue({ id_usuario: 1 } as Usuario);
      await expect(service.register(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUser', () => {
    it('debería retornar el usuario sin contraseña si coincide', async () => {
      const mockUser: Partial<Usuario> = {
        id_usuario: 1,
        correo: 'erika@mail.com',
        contrasena: 'hash',
        rol: Roles.ADMIN,
      };

      mockUsuarioService.findByEmail.mockResolvedValue(mockUser as Usuario);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('erika@mail.com', 'password123');

      expect(result).toEqual({
        id_usuario: 1,
        correo: 'erika@mail.com',
        rol: Roles.ADMIN,
      });
    });

    it('debería retornar null si usuario no existe', async () => {
      mockUsuarioService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('no@mail.com', 'password123');
      expect(result).toBeNull();
    });

    it('debería retornar null si la contraseña no coincide', async () => {
      const mockUser: Partial<Usuario> = {
        id_usuario: 1,
        correo: 'erika@mail.com',
        contrasena: 'hash',
        rol: Roles.ADMIN,
      };

      mockUsuarioService.findByEmail.mockResolvedValue(mockUser as Usuario);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('erika@mail.com', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('debería retornar un token si las credenciales son correctas', async () => {
      const loginDto: LoginDto = { correo: 'erika@mail.com', contrasena: 'password123' };
      const mockUser = { id_usuario: 1, correo: 'erika@mail.com', rol: Roles.ADMIN };

      jest.spyOn(service, 'validateUser').mockResolvedValue(mockUser as any);

      const result = await service.login(loginDto);
      expect(result).toEqual({ access_token: 'token-mock' });
    });

    it('debería lanzar UnauthorizedException si credenciales inválidas', async () => {
      const loginDto: LoginDto = { correo: 'erika@mail.com', contrasena: 'wrong' };
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
