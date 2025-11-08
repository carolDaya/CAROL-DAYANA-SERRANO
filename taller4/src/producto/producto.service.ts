import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Proveedor } from '../proveedor/proveedor.entity';
import { Categoria } from '../categoria/categoria.entity';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  //  Obtener todos los productos
  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['proveedor', 'categoria'], // carga relaciones
    });
  }

  // Obtener un producto por ID
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: ['proveedor', 'categoria'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return producto;
  }

  // Crear producto
  async create(dto: CreateProductoDto): Promise<Producto> {
    const { proveedorId, categoriaId, ...data } = dto;

    // Buscar entidades relacionadas
    const proveedor = await this.proveedorRepository.findOne({
      where: { id_proveedor: proveedorId },
    });
    const categoria = await this.categoriaRepository.findOne({
      where: { id_categoria: categoriaId },
    });

    if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const nuevoProducto = this.productoRepository.create({
      ...data,
      proveedor,
      categoria,
    });

    return this.productoRepository.save(nuevoProducto);
  }

  //  Actualizar producto
  //  Actualizar producto
  async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: ['proveedor', 'categoria'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    const { proveedorId, categoriaId, ...data } = dto;

    // Actualizar proveedor si viene un nuevo ID
    if (proveedorId) {
      const proveedor = await this.proveedorRepository.findOne({
        where: { id_proveedor: proveedorId },
      });
      if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
      producto.proveedor = proveedor;
    }

    // Actualizar categoría si viene un nuevo ID
    if (categoriaId) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id_categoria: categoriaId },
      });
      if (!categoria) throw new NotFoundException('Categoría no encontrada');
      producto.categoria = categoria;
    }

    // Actualizar los demás campos
    Object.assign(producto, data);

    return this.productoRepository.save(producto);
  }

  // Eliminar producto
  async remove(id: number): Promise<void> {
    const producto = await this.productoRepository.findOne({
      where: { id_producto: id },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    await this.productoRepository.remove(producto);
  }
}
