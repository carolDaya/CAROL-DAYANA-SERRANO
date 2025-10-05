import { Controller, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { VehicleDto } from './dto/vehicle.dto';
import { MaintenanceDto } from './dto/maintenance.dto';
import { VehicleWithId } from './interface/vehicle-with-id';
import { VehicleStatus } from './enums/vehicle-status';

@Controller('vehicles')
export class VehiclesController {
  // In-memory array to store vehicles
  private vehicles: VehicleWithId[] = [];
  private nextId = 1;

  // Helper method to find a vehicle by ID
  private findVehicleById(id: number) {
    const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
    return { index, vehicle: index >= 0 ? this.vehicles[index] : null };
  }

  // Helper to return a standardized error if vehicle not found
  private getVehicleOrError(id: number) {
    const { vehicle } = this.findVehicleById(id);
    return vehicle
      ? { vehicle }
      : { vehicle: null, error: { message: `Vehicle with ID ${id} not found.`, data: null } };
  }

  //Register a new vehicle
  @Post('register')
  registerVehicle(@Body() vehicleDto: VehicleDto) {
    const newVehicle: VehicleWithId = { id: this.nextId++, ...vehicleDto, maintenanceHistory: [] };
    this.vehicles.push(newVehicle);

    return {
      message: 'Vehicle successfully registered',
      data: newVehicle,
    };
  }

  //Register maintenance for a specific vehicle
  @Post(':id/maintenance')
  registerMaintenance(
    @Param('id', ParseIntPipe) id: number,
    @Body() maintenanceData: MaintenanceDto
  ) {
    const { vehicle, error } = this.getVehicleOrError(id);
    if (!vehicle) return error;

    vehicle.maintenanceHistory.push(maintenanceData);

    return {
      message: `Maintenance successfully registered for vehicle ${id}.`,
      data: maintenanceData,
    };
  }

  //Replace vehicle information
  @Put(':id')
  replaceVehicleInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() vehicleData: VehicleDto
  ) {
    const { vehicle, error } = this.getVehicleOrError(id);
    if (!vehicle) return error;

    const updatedVehicle: VehicleWithId = {...vehicle,...vehicleData,id,maintenanceHistory: vehicle.maintenanceHistory };

    const { index } = this.findVehicleById(id);
    this.vehicles[index] = updatedVehicle;

    return {
      message: `Vehicle ${id} replaced successfully.`,
      data: updatedVehicle,
    };
  }

  //Replace maintenance history for a specific vehicle
  @Put(':id/maintenance')
  replaceMaintenanceHistory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { maintenanceHistory: MaintenanceDto[] }
  ) {
    const { vehicle, error } = this.getVehicleOrError(id);
    if (!vehicle) return error;

    vehicle.maintenanceHistory = body.maintenanceHistory;

    return {
      message: `Maintenance history for vehicle ${id} replaced successfully.`,
      data: vehicle,
    };
  }

}
