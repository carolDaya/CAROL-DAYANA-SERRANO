import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DefaultResponse } from '../interfaces/IResponse';

export const DefaultErrorsDoc = (entityName: string): MethodDecorator => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: `${entityName} no fue creado correctamente`,
      type: DefaultResponse,
      example: {
        status: HttpStatus.BAD_REQUEST,
        message: `${entityName} no fue creado correctamente`,
      },
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: `${entityName} creado correctamente`,
      type: DefaultResponse,
      example: {
        status: HttpStatus.OK,
        data: {
          id: 1,
          message: `${entityName} creado correctamente`,
        },
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
      description: `No tiene permisos para crear ese ${entityName}`,
      type: DefaultResponse,
      example: {
        status: HttpStatus.UNAUTHORIZED,
        message: `No tiene permisos para crear ese ${entityName}`,
      },
    }),
  );
};
