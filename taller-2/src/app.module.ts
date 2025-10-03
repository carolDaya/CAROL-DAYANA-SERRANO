import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { BranchOfficeModule } from './branch-office/branch-office.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ShipmentModule } from './shipment/shipment.module';

@Module({
  imports: [ClientModule, BranchOfficeModule, VehiclesModule, ShipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
