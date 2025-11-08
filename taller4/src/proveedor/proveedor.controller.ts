import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './proveedor.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DefaultErrorsDoc } from '../common/decorators/defaultErrorsDoc';
import { DefaultCreateDoc } from '../common/decorators/DefaultCreateDoc';
import { DefaultFindAllDoc } from '../common/decorators/DefaultFindAllDoc';
import { DefaultFindOneDoc } from '../common/decorators/DefaultFindOneDoc';
import { DefaultUpdateDoc } from '../common/decorators/DefaultUpdateDoc';
import { DefaultDeleteDoc } from '../common/decorators/DefaultDeleteDoc';
import {
  ProveedorSingularExample,
  ProveedorArrayExample,
} from './docs/ProveedorExample';
/**
 * Controlador encargado de gestionar las operaciones relacionadas con los proveedores.
 *
 * Este controlador maneja las solicitudes HTTP relacionadas con la creación,
 * consulta, actualización y eliminación de proveedores.
<<<<<<< HEAD
=======
 *
 * Se conecta con el servicio `ProveedorService` para ejecutar la lógica de negocio.
>>>>>>> 55e99079 (Guardo cambios locales antes del rebase)
 */
@ApiTags('Proveedores')
@Controller('proveedores')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  /**
   * Obtiene la lista completa de proveedores registrados junto con sus productos asociados.
   * @returns Una lista con todos los proveedores y sus productos.
   */
  @Get()
  @DefaultFindAllDoc('Proveedor', Proveedor, ProveedorArrayExample)
  findAll() {
    return this.proveedorService.findAll();
  }

  /**
   * Busca un proveedor específico por su identificador único.
   * @param id - Identificador numérico del proveedor a buscar.
   * @returns El proveedor correspondiente o `null` si no existe.
   */
  @Get(':id')
  @DefaultFindOneDoc('Proveedor', Proveedor, ProveedorSingularExample)
  findOne(@Param('id') id: number) {
    return this.proveedorService.findOne(id);
  }

  /**
   * Crea un nuevo registro de proveedor.
   * @param proveedor - Datos del proveedor que se desea registrar.
   * @returns El proveedor creado con su información almacenada en la base de datos.
   */
  @Post()
  @DefaultCreateDoc('Proveedor', Proveedor, Proveedor, ProveedorSingularExample)
  create(@Body() proveedor: Proveedor) {
    return this.proveedorService.create(proveedor);
  }

  /**
   * Actualiza la información de un proveedor existente.
   * @param id - Identificador del proveedor a actualizar.
   * @param proveedor - Nuevos datos del proveedor.
   * @returns El proveedor actualizado o `null` si no existe.
   */
  @Put(':id')
  @DefaultUpdateDoc('Proveedor', Proveedor, Proveedor, ProveedorSingularExample)
  update(@Param('id') id: number, @Body() proveedor: Proveedor) {
    return this.proveedorService.update(id, proveedor);
  }

  /**
   * Elimina un proveedor existente por su ID.
   * @param id - Identificador único del proveedor a eliminar.
   * @returns Un mensaje de confirmación o error si no existe.
   */
  @Delete(':id')
  @DefaultDeleteDoc('Proveedor')
  remove(@Param('id') id: number) {
    return this.proveedorService.remove(id);
  }
}
