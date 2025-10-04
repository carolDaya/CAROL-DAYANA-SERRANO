import { Controller, Get, Post, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ShipmentDto } from './dto/shipment.dto';
import { ShipmentStatus } from './enums/shipment-status';
import { ShipmentWithId } from './interface/ShipmentWithId';
import { TrackingInfo } from './shipment.types';

@Controller('shipments')
export class ShipmentController {
  //In-memory storage for shipments.
  private shipments: ShipmentWithId[] = [];
  private nextId = 1;

  //Helper method to find a shipment by its ID
  private findShipmentIndexAndData(id: number) {
    const index = this.shipments.findIndex(shipment => shipment.id === id);
    return { index, shipment: index >= 0 ? this.shipments[index] : null };
  }

  //Helper method to get a shipment or return a standardized error response
  private getShipmentOrError(id: number) {
    const { shipment } = this.findShipmentIndexAndData(id);
    return shipment
      ? { shipment }
      : { shipment: null, error: { message: `Shipment with ID ${id} not found.`, data: null } };
  }

  // Creates and registers a new shipment
  @Post('create')
  createShipment(@Body() shipmentDto: ShipmentDto) {
    const newShipment: ShipmentWithId = { id: this.nextId++, ...shipmentDto, events: [] };
    this.shipments.push(newShipment);
    return { 
      message: 'Shipment successfully created.', 
      data: newShipment 
    };
  }

  // adds a new event to a shipment 
  @Post(':id/events')
  addEventToShipment(
    @Param('id', ParseIntPipe) id: number, 
    @Body() body: { status: ShipmentStatus }
  ) {
    const { shipment, error } = this.getShipmentOrError(id);
    if (!shipment) return error;

    const newEvent = { id: Date.now(), description: `Status changed to ${body.status}` };
    shipment.status = body.status;  
    shipment.events.push(newEvent);

    return {
      message: `New event added to shipment ${id}.`,
      data: shipment,
    };
  }

  // Retrieves tracking information for a specific shipment.
  @Get(':id/tracking')
  getShipmentTracking(@Param('id', ParseIntPipe) id: number) {
    const { shipment, error } = this.getShipmentOrError(id);
    if (!shipment) return error;

    const trackingData: TrackingInfo = {
      id: shipment.id,
      trackingId: shipment.trackingId,
      status: shipment.status,
      currentBranchId: shipment.currentBranchId,
    };

    return {
      message: 'Tracking information retrieved successfully.',
      data: trackingData,
    };
  }

  // Lists all shipments with optional filters for limit and status.
  @Get()
  getAllShipments(
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('status') status?: ShipmentStatus
  ) {
    let data = this.shipments;

    if (status) data = data.filter(s => s.status === status);
    if (limit) data = data.slice(0, limit);

    return { message: 'List of shipments retrieved successfully.', data };
  }

  //Cancels (deletes) a shipment by its ID.
  @Delete(':id')
  cancelShipment(@Param('id', ParseIntPipe) id: number) {
    const { shipment, error } = this.getShipmentOrError(id);
    if (!shipment) return error;

    const { index } = this.findShipmentIndexAndData(id);
    const deleted = this.shipments.splice(index, 1);
    return { message: `Shipment ${id} cancelled successfully.`, data: deleted[0] };
  }

  //Deletes a specific event from a shipment.
  @Delete(':id/events/:eventId')
  deleteShipmentEvent(
    @Param('id', ParseIntPipe) id: number, 
    @Param('eventId', ParseIntPipe) eventId: number
  ) {
    const { shipment, error } = this.getShipmentOrError(id);
    if (!shipment) return error;

    const events = shipment.events ?? [];
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
      return { message: `Event ${eventId} not found in shipment ${id}.`, data: null };
    }

    const deletedEvent = events.splice(eventIndex, 1)[0];
    return { 
      message: `Event ${eventId} from shipment ${id} deleted successfully.`, 
      data: deletedEvent 
    };
  }
  
}
