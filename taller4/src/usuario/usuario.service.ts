// Clase Servicio: Contiene la Lógica de Negocio central de la entidad Usuario.
// Este servicio actúa como intermediario: recibe peticiones del Controlador y
// delega las operaciones de DB al Repositorio.
// Se encarga de la validación de existencia (ej. antes de actualizar o eliminar).

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from './providers/usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './usuario.entity';

/**
 * Servicio encargado de manejar la lógica de negocio para la entidad `Usuario`.
 *
 * Este servicio actúa como intermediario entre el controlador y el repositorio,
 * gestionando la creación, consulta, actualización y eliminación de usuarios.
 * También realiza validaciones de existencia antes de ejecutar operaciones.
 *
 * @service UsuarioService
 */
@Injectable()
export class UsuarioService {
  /**
   * Inyecta el repositorio de usuarios.
   *
   * @param userRepo Repositorio responsable de la comunicación con la base de datos.
   */
  constructor(
    @Inject(UsuarioRepository)
    private readonly userRepo: UsuarioRepository,
  ) {}

  /**
   * Crea un nuevo usuario en la base de datos.
   *
   * @param body Datos del nuevo usuario (CreateUsuarioDto).
   * @returns El usuario creado.
   */
  async createUser(body: CreateUsuarioDto): Promise<Usuario> {
    return this.userRepo.createUser(body);
  }

  /**
   * Obtiene la lista de todos los usuarios registrados.
   *
   * @returns Un arreglo con todos los usuarios.
   */
  async listUsers(): Promise<Usuario[]> {
    return this.userRepo.findAll();
  }

  /**
   * Busca un usuario por su ID.
   *
   * @param id Identificador único del usuario.
   * @throws NotFoundException Si el usuario no existe.
   * @returns El usuario encontrado.
   */
  async getUser(id: number): Promise<Usuario> {
    const u = await this.userRepo.findOne(id);
    if (!u) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return u;
  }

  /**
   * Actualiza los datos de un usuario existente.
   *
   * @param id Identificador del usuario a actualizar.
   * @param body Datos a modificar (UpdateUsuarioDto).
   * @throws NotFoundException Si el usuario no existe.
   * @returns El usuario actualizado.
   */
  async updateUser(id: number, body: UpdateUsuarioDto): Promise<Usuario> {
    const u = await this.userRepo.findOne(id);
    if (!u) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return this.userRepo.updateUser(id, body);
  }

  /**
   * Elimina un usuario de la base de datos.
   *
   * @param id Identificador del usuario a eliminar.
   * @throws NotFoundException Si el usuario no existe.
   * @returns Resultado de la eliminación (confirmación o registro eliminado).
   */
  async deleteUser(id: number): Promise<any> {
    const u = await this.userRepo.findOne(id);
    if (!u) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return this.userRepo.deleteUser(id);
  }

  /**
   * Busca un usuario por su dirección de correo electrónico.
   *
   * Este método se utiliza principalmente para autenticación.
   *
   * @param email Correo electrónico del usuario.
   * @returns El usuario encontrado o `undefined` si no existe.
   */
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.userRepo.findByEmail(email);
  }
}
