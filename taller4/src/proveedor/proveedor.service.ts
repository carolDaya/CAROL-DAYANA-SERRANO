import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './proveedor.entity';

/**
 * Servicio encargado de gestionar la lógica de negocio de los proveedores.
 *
 * Este servicio implementa las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * sobre la entidad `Proveedor`. Se comunica directamente con la base de datos.
 */
@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  /**
   * Obtiene todos los proveedores registrados con sus productos asociados.
   * @returns Una promesa con la lista de proveedores y sus productos.
   */
  async findAll(): Promise<any[]> {
    const proveedores = await this.proveedorRepository.find({
      relations: ['productos'],
    });
    return proveedores.map((p) => ({
      ...p,
      correo: p.getDecryptedEmail(),
    }));
  }

  /**
   * Busca un proveedor por su ID.
   * @param id - Identificador del proveedor.
   * @returns El proveedor encontrado o `null` si no existe.
   */
  async findOne(id: number): Promise<any> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id_proveedor: id },
      relations: ['productos'],
    });
    if (!proveedor) return null;
    return { ...proveedor, correo: proveedor.getDecryptedEmail() };
  }

  /**
   * Registra un nuevo proveedor en la base de datos.
   * @param proveedor - Objeto con la información del proveedor.
   * @returns El proveedor creado.
   */
  async create(proveedor: Proveedor): Promise<Proveedor> {
    return await this.proveedorRepository.save(proveedor);
  }

  /**
   * Actualiza los datos de un proveedor existente.
   * @param id - ID del proveedor a actualizar.
   * @param proveedor - Nuevos datos para actualizar.
   * @returns El proveedor actualizado o `null` si no existe.
   */
  async update(id: number, proveedor: Proveedor): Promise<Proveedor | null> {
    await this.proveedorRepository.update(id, proveedor);
    const actualizado = await this.proveedorRepository.findOneBy({
      id_proveedor: id,
    });
    if (actualizado) {
      actualizado.correo = actualizado.getDecryptedEmail();
    }
    return actualizado;
  }

  /**
   * Elimina un proveedor de la base de datos.
   * @param id - ID del proveedor a eliminar.
   */
  async remove(id: number): Promise<void> {
    await this.proveedorRepository.delete(id);
  }
}
