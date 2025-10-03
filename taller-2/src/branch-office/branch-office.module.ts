import { Module } from '@nestjs/common';
import { BranchOfficeController } from './branch-office.controller';

@Module({
  controllers: [BranchOfficeController]
})
export class BranchOfficeModule {}
