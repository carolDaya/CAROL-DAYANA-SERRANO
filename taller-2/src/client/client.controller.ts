import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, Patch } from '@nestjs/common';
import { ClientDto } from './dto/client.dto';
import { ReceivedShipmentDto } from '../shipment/dto/received-shipment.dto';

@Controller('clients')
export class ClientController {
    // Mock data store for clients
    private clients: (ClientDto & { id: number; shipments: ReceivedShipmentDto[]; active: boolean })[] = [];
    private nextId = 1;

    // Helper method to find a client by ID in the mock data array.
    private findClientById(id: number) {
        const index = this.clients.findIndex(client => client.id === id);
        return { index, client: index >= 0 ? this.clients[index] : null };
    }

    // Endpoint to create a new client
    @Post('register')
    createClient(@Body() body: ClientDto) {
        const newClient = {...body, id: this.nextId++,shipments: [],active: true,};
        this.clients.push(newClient);

        return {
            message: 'Client created successfully.',
            data: newClient,
        };
    }

    // list all clients with optional filtering by active status and limit
    @Get()
    listAllClients(
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
        @Query('active') active?: string
    ) {
        let data = this.clients;

        if (active) {
            const isActive = active.toLowerCase() === 'true';
            data = data.filter(client => client.active === isActive);
        }

        if (limit && limit > 0) data = data.slice(0, limit);

        return {
            message: 'List of clients obtained successfully.',
            total: data.length,
            data,
        };
    }

    // obtain details of a specific client by ID
    @Get(':id')
    getClientDetails(@Param('id', ParseIntPipe) id: number) {
        const { client } = this.findClientById(id);
        if (!client) return { message: `Client with ID ${id} not found.`, data: null };

        return {
            message: 'Client details obtained successfully.',
            data: client,
        };
    }

    // deactivate a client by ID (soft delete)
    @Patch(':id/deactivate')
    deactivateClient(@Param('id', ParseIntPipe) id: number) {
        const { client } = this.findClientById(id);
        if (!client) return { message: `Client with ID ${id} not found.`, data: null };

        client.active = false;

        return {
            message: `Client with ID ${id} has been deactivated.`,
            data: client,
         };
    }

    //update client details by ID
    @Patch(':id')
    updateClient(
        @Param('id', ParseIntPipe) id: number,
        @Body() partialData: Partial<ClientDto>
    ) {
        const { client } = this.findClientById(id);
        if (!client) return { message: `Client with ID ${id} not found.`, data: null };

        Object.assign(client, partialData);

        return {
            message: `Client with ID ${id} updated successfully.`,
            data: client,
        };
    }

}
