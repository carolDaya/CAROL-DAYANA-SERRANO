import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Roles } from './enums/roles.enum';

describe('Pruebas del UsuarioController', () => {
  let controller: UsuarioController;
  let mockUsuarioService: Record<string, jest.Mock>;

  beforeEach(async () => {
    mockUsuarioService = {
      createUser: jest.fn(),
      listUsers: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
      ],
    }).compile();

    controller = moduleRef.get<UsuarioController>(UsuarioController);
    jest.clearAllMocks();
  });

  // Crear usuario
  it('Debería crear un usuario', async () => {
    const usuarioDto: CreateUsuarioDto = {
      nombre: 'Erika',
      apellido: 'Pesca',
      correo: 'erika@test.com',
      contrasena: '12345678',
      rol: Roles.ADMIN,
    };

    const usuarioCreado = { id: 1, ...usuarioDto };
    mockUsuarioService.createUser.mockResolvedValue(usuarioCreado);

    // Act
    const result = await controller.createUser(usuarioDto);

    // Assert
    expect(mockUsuarioService.createUser).toHaveBeenCalledTimes(1);
    expect(mockUsuarioService.createUser).toHaveBeenCalledWith(usuarioDto);
    expect(result).toEqual(usuarioCreado);
  });

  // 🧪 Listar usuarios
  it('Debería listar todos los usuarios', async () => {
    const usuarios = [
      { id: 1, nombre: 'Erika', apellido: 'Pesca' },
      { id: 2, nombre: 'Laura', apellido: 'García' },
    ];

    mockUsuarioService.listUsers.mockResolvedValue(usuarios);

    const result = await controller.listUsers();

    expect(mockUsuarioService.listUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(usuarios);
  });
});
