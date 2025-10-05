import { IsString, IsNumber, IsEnum, IsPositive, IsNotEmpty } from 'class-validator';
import { VehicleStatus } from '../enums/vehicle-status';

export class VehicleDto {
  @IsString()
  @IsNotEmpty({ message: 'plateNumber cannot be empty' })
  plateNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'type cannot be empty' })
  type: string;

  @IsNumber()
  @IsPositive({ message: 'capacityKg must be a positive number' })
  capacityKg: number;

  @IsNumber()
  @IsPositive({ message: 'currentBranchId must be a positive number' })
  currentBranchId: number;

  @IsEnum(VehicleStatus, { message: 'status must be a valid VehicleStatus value' })
  status: VehicleStatus;
}
