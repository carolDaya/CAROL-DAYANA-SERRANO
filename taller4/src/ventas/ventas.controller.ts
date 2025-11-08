// src/ventas/ventas.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { CreateVentaDto } from './dto/create-venta.dto';
import { CreateVentaDoc } from './decorators/documentation/Create';
import { DeleteVentaDoc } from './decorators/documentation/Delete';
import { GetAllVentasDoc } from './decorators/documentation/GetAll';
import { ListVentasDoc } from './decorators/documentation/List';
import { UpdateVentaDoc } from './decorators/documentation/Update';
import { Ventas } from './ventas.entity';

/**
 * Controlador responsable de manejar las rutas relacionadas con las ventas.
 *
 * Define los endpoints para crear, listar, obtener, actualizar y eliminar ventas.
 *
 * @controller VentasController
 * @route /ventas
 */
@Controller('ventas')
export class VentasController {
  /**
   * Inyecta el servicio de ventas para manejar la lógica de negocio.
   *
   * @param ventasService Servicio que gestiona las operaciones sobre las ventas.
   */
  constructor(private readonly ventasService: VentasService) {}

  /**
   * Crea una nueva venta en el sistema.
   *
   * @route POST /ventas/crear
   * @param datos Datos de la venta (CreateVentaDto).
   * @returns La venta creada.
   */
  @CreateVentaDoc()
  @Post('crear')
  async create(@Body() datos: CreateVentaDto): Promise<Ventas> {
    return this.ventasService.createVenta(datos);
  }

  /**
   * Lista todas las ventas registradas.
   *
   *Este método actualmente usa `updateVenta(0, {})` como temporal.
   *
   * @route GET /ventas/listar
   * @returns Lista de ventas registradas.
   */
  @ListVentasDoc()
  @Get('listar')
  async list(): Promise<Ventas[]> {
    // Llamamos al método que devuelve todas las ventas
    return this.ventasService.findAll();
  }

  /**
   * Obtiene una venta específica por su ID.
   *
   * @route GET /ventas/:id
   * @param id Identificador numérico de la venta.
   * @returns La venta encontrada.
   */
  @GetAllVentasDoc()
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Ventas | null> {
    return this.ventasService.getVenta(id);
  }

  /**
   * Actualiza los datos de una venta existente.
   *
   * @route PATCH /ventas/:id
   * @param id Identificador de la venta a actualizar.
   * @param body Datos de actualización (UpdateVentaDto).
   * @returns La venta actualizada.
   */
  @UpdateVentaDoc()
  @Patch(':id')
  async allowUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateVentaDto,
  ): Promise<Ventas | null> {
    return this.ventasService.updateVenta(id, body);
  }

  /**
   * Elimina una venta por su ID.
   *
   * @route DELETE /ventas/:id
   * @param id Identificador numérico de la venta.
   * @returns Mensaje de confirmación o resultado de la eliminación.
   */
  @DeleteVentaDoc()
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.ventasService.deleteVenta(id);
    return { message: `Venta ${id} eliminada correctamente` };
  }
}
