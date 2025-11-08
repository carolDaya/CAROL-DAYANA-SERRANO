import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './proveedor.entity';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])],
  providers: [ProveedorService],
  controllers: [ProveedorController],
  exports: [ProveedorService],
})
export class ProveedorModule {}
