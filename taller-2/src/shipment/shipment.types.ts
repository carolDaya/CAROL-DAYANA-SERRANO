import { ShipmentWithId } from './interface/ShipmentWithId';

export type TrackingInfo = Pick<ShipmentWithId, 'id' | 'trackingId' | 'status' | 'currentBranchId'>;
