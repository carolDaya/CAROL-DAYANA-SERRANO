// Limpiar import innecesario
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { DefaultSuccessResponse } from '../interfaces/IResponse';
import { ApiDefaultResponses } from './ApiDefaultResponses';

export const DefaultCreateDoc = <T extends Type<any>>(
  entityName: string,
  createDto: T,
  entitySchema: T,
  entityExample: Record<string, any>,
): MethodDecorator => {
  const successMessage = `${entityName} creado(a) correctamente`;
  const entityLower = entityName.toLowerCase();

  return applyDecorators(
    ApiExtraModels(DefaultSuccessResponse, entitySchema),
    ApiBearerAuth(),
    ApiOperation({
      summary: `Crear un(a) nuevo(a) ${entityLower}`,
      description: `Registra un(a) nuevo(a) ${entityLower} en el sistema.`,
    }),
    ApiBody({
      description: `Datos para crear el ${entityLower}`,
      type: createDto,
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: successMessage,
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(DefaultSuccessResponse) },
          example: {
            status: HttpStatus.CREATED,
            message: successMessage,
            data: entityExample,
          },
        },
      },
    }),
    ApiDefaultResponses(entityName),
  );
};
