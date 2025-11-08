import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaService } from './categoria.service';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let repo: Partial<Record<keyof Repository<Categoria>, jest.Mock>>;

  // Se ejecuta antes de cada test para inicializar mocks y módulo de prueba
  beforeEach(async () => {
    // Se define un mock del repositorio con los métodos principales
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      merge: jest.fn(),
      remove: jest.fn(),
    };

    // Se crea el módulo de testing de NestJS con inyección de dependencias
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriaService,
        { provide: getRepositoryToken(Categoria), useValue: repo }, // Se inyecta el mock
      ],
    }).compile();

    service = module.get<CategoriaService>(CategoriaService);
    jest.clearAllMocks(); // Limpia todos los mocks antes de cada test
  });

  // Mock de categoría para pruebas
  const categoriaMock: Categoria = {
    id_categoria: 1,
    nombre: 'Categoria Test',
    descripcion: 'Descripción de prueba',
    productos: [],
  };

  // Test del método create
  describe('create', () => {
    it('debe crear una categoría correctamente', async () => {
      const dto: CreateCategoriaDto = {
        nombre: 'Categoria Test',
        descripcion: 'Descripción de prueba',
      };

      // Simula los métodos create y save del repositorio
      repo.create!.mockReturnValue(categoriaMock);
      repo.save!.mockResolvedValue(categoriaMock);

      const result = await service.create(dto);

      // Verifica que los métodos se hayan llamado correctamente y que el resultado sea correcto
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(categoriaMock);
      expect(result).toEqual(categoriaMock);
    });
  });

  // Test del método findAll
  describe('findAll', () => {
    it('debe retornar todas las categorías', async () => {
      repo.find!.mockResolvedValue([categoriaMock]); // Simula la respuesta de find
      const result = await service.findAll();
      expect(result).toEqual([categoriaMock]);
    });
  });

  // Test del método findOne
  describe('findOne', () => {
    it('debe retornar la categoría si existe', async () => {
      repo.findOne!.mockResolvedValue(categoriaMock); // Simula que encuentra la categoría
      const result = await service.findOne(1);
      expect(result).toEqual(categoriaMock);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repo.findOne!.mockResolvedValue(null); // Simula que no encuentra la categoría
      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Categoría no encontrada'),
      );
    });
  });

  // Test del método update
  describe('update', () => {
    it('debe actualizar una categoría existente', async () => {
      const dto: UpdateCategoriaDto = { nombre: 'Categoria Actualizada' };
      repo.findOne!.mockResolvedValue(categoriaMock); // Encuentra la categoría existente
      repo.save!.mockResolvedValue({ ...categoriaMock, ...dto }); // Devuelve la categoría actualizada

      const result = await service.update(1, dto);

      // Verifica que merge y save se hayan llamado correctamente
      expect(result.nombre).toBe('Categoria Actualizada');
      expect(repo.merge).toHaveBeenCalledWith(categoriaMock, dto);
      expect(repo.save).toHaveBeenCalledWith(categoriaMock);
    });
  });

  // Test del método remove
  describe('remove', () => {
    it('debe eliminar una categoría existente', async () => {
      repo.findOne!.mockResolvedValue(categoriaMock); // Encuentra la categoría
      repo.remove!.mockResolvedValue(categoriaMock); // Simula la eliminación

      const result = await service.remove(1);

      // Verifica que remove se haya llamado correctamente y que el resultado sea correcto
      expect(result).toEqual(categoriaMock);
      expect(repo.remove).toHaveBeenCalledWith(categoriaMock);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repo.findOne!.mockResolvedValue(null); // Simula que no encuentra la categoría
      await expect(service.remove(999)).rejects.toThrow(
        new NotFoundException('Categoría no encontrada'),
      );
    });
  });
});
