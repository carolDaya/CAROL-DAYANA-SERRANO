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
 * Decorador que documenta la operación de BUSCAR POR ID (GET /entidad/:id).
 * @param entityName Nombre de la entidad (ej: 'Categoría').
 * @param entitySchema Entidad o DTO de salida (ej: Categoria).
 * @param entityExample Objeto JSON de ejemplo de la entidad (elemento singular).
 */
export const DefaultFindOneDoc = <T extends Type<any>>(
  entityName: string,
  entitySchema: T,
  entityExample: Record<string, any>,
): MethodDecorator => {
  const successMessage = `${entityName} encontrada`;
  const entityLower = entityName.toLowerCase();

  return applyDecorators(
    ApiExtraModels(DefaultSuccessResponse, entitySchema),
    ApiBearerAuth(),

    ApiOperation({
      summary: `Obtener ${entityLower} por ID`,
      description: `Busca una ${entityLower} específica usando su identificador único.`,
    }),

    //Parámetro de Ruta
    ApiParam({
      name: 'id',
      description: `Identificador numérico de la ${entityLower}`,
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
