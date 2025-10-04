import { Controller, Post, Body, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CreateBranchOfficeDto } from './dto/create-branch-office.dto';
import { ReceivedShipmentDto } from './dto/received-shipment.dto';
import { FindBranchResult } from './interface/FindBranchResult';

@Controller('branches')
export class BranchOfficeController {

  // Mock data store for branches (used instead of a real database)
  private branchList: (CreateBranchOfficeDto & { id: number; receivedShipments: ReceivedShipmentDto[] })[] = [];
  private nextId = 1; // Auto-increment ID for new branches

  // Helper method to find a branch by ID in the mock data array.
  private findBranchById(branchId: number): FindBranchResult {
    const branchIndex = this.branchList.findIndex(branch => branch.id === branchId);
    if (branchIndex === -1) return { found: false, index: -1, branchItem: null };

    return {
      found: true,
      index: branchIndex,
      branchItem: this.branchList[branchIndex],
    };
  }

  // Helper to ensure branch exists, returns branchItem or null
  private ensureBranchExists(branchId: number) {
    const { branchItem } = this.findBranchById(branchId);
    return branchItem || null;
  }
  
  // Endpoint to register a new branch office in the mock array
  @Post('register')
  registerBranch(@Body() branchData: CreateBranchOfficeDto) {
    const newBranch = { id: this.nextId++, ...branchData, receivedShipments: [] };
    this.branchList.push(newBranch);

    return {
      message: 'Branch successfully registered.',
      data: newBranch,
    };
  }

  // Endpoint to register a received shipment for a specific branch
  @Post(':branchId/receive-shipment')
  registerShipment(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Body() shipmentInfo: ReceivedShipmentDto
  ) {
    const branch = this.ensureBranchExists(branchId);
    if (!branch) return { message: `Branch with ID ${branchId} not found.`, data: null };

    const exists = branch.receivedShipments.some(s => s.trackingId === shipmentInfo.trackingId);
    if (exists) return { message: `Shipment with tracking ID ${shipmentInfo.trackingId} already exists.`, data: null };

    branch.receivedShipments.push(shipmentInfo);
    return {
      message: 'Shipment successfully registered.',
      data: shipmentInfo,
    };
  }


  // Get details of a specific branch
  @Get(':branchId')
  getBranchDetails(@Param('branchId', ParseIntPipe) branchId: number) {
    const branch = this.ensureBranchExists(branchId);
    if (!branch) return { message: `Branch with ID ${branchId} not found.`, data: null };

    return {
      message: 'Branch details obtained.',
      data: branch,
    };
  }

  // List all branches with optional pagination
  @Get()
  listAllBranches(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    const data = limit && limit > 0 ? this.branchList.slice(0, limit) : this.branchList;

    return {
      message: 'List of all branches obtained.',
      data
    };
  }
}
