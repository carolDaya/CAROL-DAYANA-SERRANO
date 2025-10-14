import { createParamDecorator, ExecutionContext } from '@nestjs/common'; // Importación de funciones para crear decoradores y contexto de ejecución

export const CurrentUser = createParamDecorator( // Declaración del decorador personalizado CurrentUser
  (_data: unknown, ctx: ExecutionContext) => { // Función factory del decorador con parámetros
    const request = ctx.switchToHttp().getRequest(); // Obtención del objeto request del contexto HTTP
    return request.user; // Retorno del usuario autenticado desde el request
  },
);