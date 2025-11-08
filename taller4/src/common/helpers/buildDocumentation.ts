import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseDocumentation } from '../classes/BaseDocumentation';

export class SwaggerDocumentation extends BaseDocumentation {
  constructor(protected readonly app: INestApplication) {
    super(app);
  }

  async build(): Promise<void> {
    const config = new DocumentBuilder()
      .setTitle('Auth App')
      .setDescription(
        'Documentación del API para el taller 4 - Autenticación y entidades',
      )
      .setVersion('1.0')
      .setTermsOfService('https://example.com/terms')
      .setLicense('MIT', 'https://example.com/license')
      .addServer('http://localhost:3000')
      .addBearerAuth()
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document);
  }
}
