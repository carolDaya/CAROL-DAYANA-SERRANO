import { VehicleDto } from '../dto/vehicle.dto';
import { MaintenanceDto } from '../dto/maintenance.dto';

export interface VehicleWithId extends VehicleDto {
  id: number;
  maintenanceHistory: MaintenanceDto[];
}