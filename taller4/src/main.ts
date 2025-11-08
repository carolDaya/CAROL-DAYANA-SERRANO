import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerDocumentation } from './common/helpers/buildDocumentation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const documentation = new SwaggerDocumentation(app);
  await documentation.build();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` Documentación disponible en http://localhost:${PORT}/api`);
}

bootstrap();
