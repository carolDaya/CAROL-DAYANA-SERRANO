import { ShipmentWithId } from './interface/shipment-with.Id';

export type TrackingInfo = Pick<ShipmentWithId, 'id' | 'trackingId' | 'status' | 'currentBranchId'>;
