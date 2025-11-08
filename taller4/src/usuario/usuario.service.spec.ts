import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './providers/usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { Roles } from './enums/roles.enum';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repo: UsuarioRepository;

  const mockRepo = {
    createUser: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: UsuarioRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repo = module.get<UsuarioRepository>(UsuarioRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const dto: CreateUsuarioDto = {
        nombre: 'Erika',
        apellido: 'Pesca',
        correo: 'erika@test.com',
        contrasena: '12345678',
        rol: Roles.EMPLEADO,
      };

      const mockUser: Usuario = {
        id_usuario: 1,
        nombre: 'Erika',
        apellido: 'Pesca',
        correo: 'erika@test.com',
        contrasena: '12345678',
        rol: Roles.EMPLEADO,
        updatedAt: expect.any(Date),
        deletedAt: null,
      };

      mockRepo.createUser.mockResolvedValue(mockUser);

      const result = await service.createUser(dto);
      expect(result).toEqual(mockUser);
      expect(mockRepo.createUser).toHaveBeenCalledWith(dto);
    });
  });

  describe('listUsers', () => {
    it('should return all users', async () => {
      const users: Usuario[] = [
        { id_usuario: 1, nombre: 'Erika', correo: 'erika@test.com' } as Usuario,
        { id_usuario: 2, nombre: 'Juan', correo: 'juan@test.com' } as Usuario,
      ];
      mockRepo.findAll.mockResolvedValue(users);

      const result = await service.listUsers();
      expect(result).toEqual(users);
      expect(mockRepo.findAll).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const user: Usuario = { id_usuario: 1, nombre: 'Erika', correo: 'erika@test.com' } as Usuario;
      mockRepo.findOne.mockResolvedValue(user);

      const result = await service.getUser(1);
      expect(result).toEqual(user);
      expect(mockRepo.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      await expect(service.getUser(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const dto: UpdateUsuarioDto = { nombre: 'Erika Updated' };
      const updatedUser: Usuario = { id_usuario: 1, nombre: 'Erika Updated', correo: 'erika@test.com', contrasena: '12345678', rol: 'empleado' } as Usuario;

      mockRepo.findOne.mockResolvedValue(updatedUser);
      mockRepo.updateUser.mockResolvedValue(updatedUser);

      const result = await service.updateUser(1, dto);
      expect(result).toEqual(updatedUser);
      expect(mockRepo.updateUser).toHaveBeenCalledWith(1, dto);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      await expect(service.updateUser(999, {} as UpdateUsuarioDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const user: Usuario = { id_usuario: 1 } as Usuario;
      mockRepo.findOne.mockResolvedValue(user);
      mockRepo.deleteUser.mockResolvedValue({ affected: 1 });

      const result = await service.deleteUser(1);
      expect(result).toEqual({ affected: 1 });
      expect(mockRepo.deleteUser).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      await expect(service.deleteUser(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user: Usuario = { id_usuario: 1, correo: 'erika@test.com' } as Usuario;
      mockRepo.findByEmail.mockResolvedValue(user);

      const result = await service.findByEmail('erika@test.com');
      expect(result).toEqual(user);
      expect(mockRepo.findByEmail).toHaveBeenCalledWith('erika@test.com');
    });
  });
});
