# Package Delivery System - REST API

## Description

This project is a REST API built with **NestJS** for managing a package delivery system.  
It includes CRUD operations for **Branches, Clients, Shipments, and Vehicles**, with in-memory storage for testing purposes.


## Project setup
```bash

npm install
# development
npm run start
# watch mode
npm run start:dev
# production mode
npm run start:prod

API Endpoints

Branches
 -POST /branches/register → Create a new branch
 -POST /branches/:branchId/receive-shipment → Register a shipment for a branch
 
 -GET /branches → List all branches (optional limit)
 -GET /branches/:branchId → Get branch details

Clients
 -POST /clients/register → Create a new client
 
 -GET /clients → List all clients (optional limit and active query params)
 -GET /clients/:id → Get client details

 -PATCH /clients/:id → Update client partially
 -PATCH /clients/:id/deactivate → Deactivate a client

Shipments
 -POST /shipments/create → Create a new shipment
 -POST /shipments/:id/events → Add a new event to a shipment

 -GET /shipments → List all shipments (optional limit and status)
 -GET /shipments/:id/tracking → Get tracking info of a shipment

 -DELETE /shipments/:id → Cancel a shipment
 -DELETE /shipments/:id/events/:eventId → Delete a specific event

Vehicles
 -POST /vehicles/register → Register a new vehicle
 -POST /vehicles/:id/maintenance → Add maintenance record

 -PUT /vehicles/:id → Replace full vehicle info
 -PUT /vehicles/:id/maintenance → Replace maintenance history

Notes
-All endpoints use in-memory storage, so data is lost when the server restarts.
-This API is intended for learning and testing purposes.