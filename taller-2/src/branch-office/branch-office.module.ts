import { Module } from '@nestjs/common';
import { BranchOfficeController } from './branch-office.controller';

@Module({
  imports: [],
  controllers: [BranchOfficeController],
  providers: []
})
export class BranchOfficeModule {}
