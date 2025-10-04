import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { ShipmentStatus } from "../../shipment/enums/shipment-status";

export class ReceivedShipmentDto {
  @IsString()
  @IsNotEmpty()
  trackingId: string;

  @IsEnum(ShipmentStatus)
  status: ShipmentStatus; // received, dispatched, etc.

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  receivedAt?: Date;
}
