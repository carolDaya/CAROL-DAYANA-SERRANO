import { IsString, IsNotEmpty, IsNumber, IsPositive, IsEnum, IsOptional, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { ShipmentStatus } from "../enums/shipment-status";

export class ShipmentDto {
  @IsString()
  @IsNotEmpty()
  trackingId: string;

  @IsNumber()
  @IsPositive()
  clientId: number;

  @IsString()
  @IsNotEmpty()
  senderName: string;

  @IsString()
  @IsNotEmpty()
  recipientAddress: string;

  @IsString()
  @IsNotEmpty()
  recipientCity: string;

  @IsNumber()
  @IsPositive()
  packageWeight: number;
  
  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ShipmentStatus)
  status: ShipmentStatus;

  @IsNumber()
  @IsPositive()
  currentBranchId: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  deliveryDate?: Date;
}
