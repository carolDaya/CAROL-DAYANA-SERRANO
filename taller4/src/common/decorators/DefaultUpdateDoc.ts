import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { DefaultSuccessResponse } from '../interfaces/IResponse';
import { ApiDefaultResponses } from './ApiDefaultResponses';

/**
 * Decorador que documenta la operación de ACTUALIZACIÓN (PATCH /entidad/:id).
 * @param entityName Nombre de la entidad (ej: 'Categoría').
 * @param updateDto DTO de entrada para la actualización (ej: UpdateCategoriaDto).
 * @param entitySchema Entidad o DTO de salida (ej: Categoria).
 * @param entityExample Objeto JSON de ejemplo de la entidad actualizada.
 */
export const DefaultUpdateDoc = <T extends Type<any>>(
  entityName: string,
  updateDto: T,
  entitySchema: T,
  entityExample: Record<string, any>,
): MethodDecorator => {
  const successMessage = `${entityName} actualizado(a) correctamente`;
  const entityLower = entityName.toLowerCase();

  return applyDecorators(
    ApiExtraModels(DefaultSuccessResponse, entitySchema),
    ApiBearerAuth(),

    ApiOperation({
      summary: `Actualizar ${entityLower} por ID`,
      description: `Modifica los campos de una ${entityLower} existente.`,
    }),

    ApiParam({
      name: 'id',
      description: `Identificador numérico de la ${entityLower} a actualizar`,
      type: Number,
      example: 1,
    }),
    ApiBody({
      description: `Datos para actualizar la ${entityLower}`,
      type: updateDto,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: successMessage,
      content: {
        'application/json': {
          example: {
            status: HttpStatus.OK,
            message: successMessage,
            data: entityExample,
          },
          schema: {
            allOf: [
              { $ref: getSchemaPath(DefaultSuccessResponse) },
              {
                properties: {
                  data: {
                    $ref: getSchemaPath(entitySchema),
                  },
                },
              },
            ],
          },
        },
      },
    }),
    ApiDefaultResponses(entityName),
  );
};
