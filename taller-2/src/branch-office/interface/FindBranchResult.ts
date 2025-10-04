import { CreateBranchOfficeDto } from '../dto/create-branch-office.dto';
import { ReceivedShipmentDto } from '../dto/received-shipment.dto';

export interface FindBranchResult {
  found: boolean;
  index: number;
  branchItem: (CreateBranchOfficeDto & { id: number; receivedShipments: ReceivedShipmentDto[] }) | null;
}
