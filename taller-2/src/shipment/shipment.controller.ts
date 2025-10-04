import { Controller, Get, Post, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ShipmentDto } from './dto/shipment.dto';
import { ShipmentStatus } from './enums/shipment-status';
import { ShipmentWithId } from './interface/ShipmentWithId';

@Controller('shipments')
export class ShipmentController {
  private shipments: ShipmentWithId[] = [];
  private nextId = 1;

  // Helper to find shipment by ID
  private findShipmentById(id: number) {
    const index = this.shipments.findIndex(shipment => shipment.id === id);
    return { index, shipment: index >= 0 ? this.shipments[index] : null };
  }

  // Helper to get shipment or return error
  private getShipment(id: number) {
    const { shipment } = this.findShipmentById(id);
    return shipment
      ? { shipment }
      : { shipment: null, error: { message: `Shipment with ID ${id} not found.`, data: null } };
  }

  @Post('create')
  create(@Body() shipmentDto: ShipmentDto) {
    const newShipment: ShipmentWithId = { id: this.nextId++, ...shipmentDto, events: [] };
    this.shipments.push(newShipment);
    return { message: 'Shipment successfully created.', data: newShipment };
  }

  @Post(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: { status: ShipmentStatus }) {
    const { shipment, error } = this.getShipment(id);
    if (!shipment) return error;

    shipment.status = body.status;
    return { message: `Status of shipment ${id} updated successfully.`, data: shipment };
  }

  @Get(':id/tracking')
  getTracking(@Param('id', ParseIntPipe) id: number) {
    const { shipment, error } = this.getShipment(id);
    if (!shipment) return error;

    type TrackingInfo = Pick<ShipmentWithId, 'id' | 'trackingId' | 'status' | 'currentBranchId'>;

    const trackingData: TrackingInfo = {
      id: shipment.id,
      trackingId: shipment.trackingId,
      status: shipment.status,
      currentBranchId: shipment.currentBranchId,
    };

    return {
      message: 'Tracking information obtained.',
      data: trackingData,
    };
  }

  @Get()
  findAll(@Query('limit') limit?: string, @Query('status') status?: ShipmentStatus) {
    let data = this.shipments;
    if (status) data = data.filter(s => s.status === status);
    if (limit) {
      const parsedLimit = parseInt(limit);
      if (!isNaN(parsedLimit)) data = data.slice(0, parsedLimit);
    }
    return { message: 'List of shipments obtained.', data, total: data.length };
  }

  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: number) {
    const { shipment, error } = this.getShipment(id);
    if (!shipment) return error;

    const { index } = this.findShipmentById(id);
    const deleted = this.shipments.splice(index, 1);
    return { message: `Shipment ${id} cancelled successfully.`, data: deleted[0] };
  }

  @Delete(':id/events/:eventId')
  deleteEvent(@Param('id', ParseIntPipe) id: number, @Param('eventId', ParseIntPipe) eventId: number) {
    const { shipment, error } = this.getShipment(id);
    if (!shipment) return error;

    const events = shipment.events ?? [];
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return { message: `Event ${eventId} not found in shipment ${id}.`, data: null };

    const deletedEvent = events.splice(eventIndex, 1)[0];
    return { message: `Event ${eventId} from shipment ${id} deleted successfully.`, data: deletedEvent };
  }
}
