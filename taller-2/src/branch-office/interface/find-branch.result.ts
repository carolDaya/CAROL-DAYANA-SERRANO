import { CreateBranchOfficeDto } from '../dto/create-branch-office.dto';
import { ReceivedShipmentDto } from '../../shipment/dto/received-shipment.dto';

export interface FindBranchResult {
  found: boolean;
  index: number;
  branchItem: (CreateBranchOfficeDto & { id: number; receivedShipments: ReceivedShipmentDto[] }) | null;
}
