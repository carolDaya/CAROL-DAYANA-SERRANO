import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';

@Module({
  controllers: [ShipmentController]
})
export class ShipmentModule {}
