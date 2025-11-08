import { INestApplication } from '@nestjs/common';
import { IDocumentation } from '../interfaces/IDocumentation';

export abstract class BaseDocumentation implements IDocumentation {
  constructor(protected readonly app: INestApplication) {}

  abstract build(): Promise<void>;
}
