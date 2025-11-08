import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { CreateProductoDoc } from './decorators/documentation/Create';
import { DeleteProductoDoc } from './decorators/documentation/Delete';
import { GetAllProductoDoc } from './decorators/documentation/GetAll';
import { ListProductoDoc } from './decorators/documentation/List';
import { UpdateProductoDoc } from './decorators/documentation/Update';
import { Producto } from './producto.entity';

/**
 * Controlador encargado de manejar las operaciones relacionadas con los productos.
 *
 * Define las rutas para crear, obtener, actualizar y eliminar productos,
 * comunicándose con el servicio correspondiente.
 *
 * @controller ProductoController
 * @route /productos
 */
@Controller('productos')
export class ProductoController {
  /**
   * Inyecta el servicio de productos para manejar la lógica de negocio.
   *
   * @param productoService Servicio que gestiona las operaciones de productos.
   */
  constructor(private readonly productoService: ProductoService) {}

  /**
   * Obtiene todos los productos registrados en el sistema.
   *
   * @route GET /productos
   * @returns Lista de productos disponibles.
   */
  @ListProductoDoc()
  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  /**
   * Obtiene un producto específico por su identificador numérico.
   *
   * @route GET /productos/:id
   * @param id Identificador del producto a buscar.
   * @returns El producto correspondiente al ID.
   */
  @GetAllProductoDoc()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Producto | null> {
    // convierte el id automáticamente a número
    return this.productoService.findOne(id);
  }

  /**
   * Crea un nuevo producto en la base de datos.
   *
   * @route POST /productos
   * @param data Datos del nuevo producto (CreateProductoDto).
   * @returns El producto creado.
   */
  @CreateProductoDoc()
  @Post()
  async create(@Body() data: CreateProductoDto): Promise<Producto> {
    return this.productoService.create(data);
  }

  /**
   * Actualiza los datos de un producto existente.
   *
   * @route PUT /productos/:id
   * @param id Identificador del producto a actualizar.
   * @param data Datos actualizados del producto (UpdateProductoDto).
   * @returns El producto actualizado.
   */
  @UpdateProductoDoc()
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductoDto,
  ): Promise<Producto | null> {
    return this.productoService.update(id, data);
  }

  /**
   * Elimina un producto del sistema.
   *
   * @route DELETE /productos/:id
   * @param id Identificador del producto a eliminar.
   * @returns Resultado de la operación de eliminación.
   */
  @DeleteProductoDoc()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productoService.remove(id);
  }
}
