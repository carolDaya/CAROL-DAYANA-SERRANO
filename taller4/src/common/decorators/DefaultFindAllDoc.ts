import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { DefaultSuccessResponse } from '../interfaces/IResponse';
import { ApiDefaultResponses } from './ApiDefaultResponses';

/**
 * Decorador que documenta la operación de LISTAR TODOS (GET /entidad).
 * @param entityName Nombre de la entidad (ej: 'Categoría').
 * @param entitySchema Entidad o DTO de salida (ej: Categoria).
 * @param entityArrayExample Array JSON de ejemplo de las entidades.
 */
export const DefaultFindAllDoc = <T extends Type<any>>(
  entityName: string,
  entitySchema: T,
  entityArrayExample: Record<string, any>[], // Array de ejemplos
): MethodDecorator => {
  const successMessage = `Listado de ${entityName.toLowerCase()}s`;

  return applyDecorators(
    ApiExtraModels(DefaultSuccessResponse, entitySchema),
    ApiBearerAuth(),

    ApiOperation({
      summary: `Listar todas las ${entityName.toLowerCase()}s`,
      description: `Devuelve un listado completo de todas las ${entityName.toLowerCase()}s registradas.`,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: successMessage,
      content: {
        'application/json': {
          example: {
            status: HttpStatus.OK,
            message: successMessage,
            data: entityArrayExample,
          },
          schema: {
            allOf: [
              { $ref: getSchemaPath(DefaultSuccessResponse) },
              {
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: getSchemaPath(entitySchema) },
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
