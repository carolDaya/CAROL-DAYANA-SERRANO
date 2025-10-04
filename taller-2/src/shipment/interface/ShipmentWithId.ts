import { ShipmentDto } from '../dto/shipment.dto';

export interface ShipmentWithId extends ShipmentDto {
  id: number;
  events?: { id: number; description: string }[];
}
