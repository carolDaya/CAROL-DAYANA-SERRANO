import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { DefaultSuccessResponse } from '../interfaces/IResponse';
import { ApiDefaultResponses } from './ApiDefaultResponses';

/**
 * Decorador que documenta la operación de ELIMINACIÓN (DELETE /entidad/:id).
 * @param entityName Nombre de la entidad (ej: 'Categoría').
 */
export const DefaultDeleteDoc = (entityName: string): MethodDecorator => {
  const successMessage = `${entityName} eliminada correctamente`;
  const entityLower = entityName.toLowerCase();

  return applyDecorators(
    ApiExtraModels(DefaultSuccessResponse),
    ApiBearerAuth(),

    ApiOperation({
      summary: `Eliminar ${entityLower} por ID`,
      description: `Elimina una ${entityLower} del sistema de forma lógica o física.`,
    }),

    ApiParam({
      name: 'id',
      description: `Identificador numérico de la ${entityLower} a eliminar`,
      type: Number,
      example: 1,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: successMessage,
      content: {
        'application/json': {
          example: {
            status: HttpStatus.OK,
            message: successMessage,
            data: null,
          },
          schema: {
            $ref: getSchemaPath(DefaultSuccessResponse),
          },
        },
      },
    }),
    ApiDefaultResponses(entityName),
  );
};
