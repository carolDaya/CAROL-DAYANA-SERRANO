import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DefaultResponse } from '../interfaces/IResponse';

export const ApiDefaultResponses = (entityName: string): MethodDecorator => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: `Error al crear el ${entityName.toLowerCase()}`,
      type: DefaultResponse,
      example: {
        status: HttpStatus.BAD_REQUEST,
        message: `Error al crear el ${entityName.toLowerCase()}`,
      },
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: `${entityName} ya existe`,
      type: DefaultResponse,
      example: {
        status: HttpStatus.CONFLICT,
        message: `${entityName} ya existe`,
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'No autorizado para realizar esta acción',
      type: DefaultResponse,
      example: {
        status: HttpStatus.UNAUTHORIZED,
        message: 'No autorizado para realizar esta acción',
      },
    }),
  );
};
