# Tech Eazy - AWS Internship Project

This is a full-stack parcel management application built for the Tech Eazy AWS Internship assignment.

## Tech Stack

*   **Backend:** Java, Spring Boot
*   **Frontend:** ReactJS
*   **Build Tool:** Maven

## Features

*   Create new parcels via a REST API.
*   View all existing parcels.
*   Simple, in-memory storage (no database required for this assignment).
*   A responsive frontend to interact with the API.

## How to Run

### Prerequisites

*   Java JDK 17 or higher
*   Apache Maven
*   Node.js and npm

### 1. Run the Backend Server

```bash
# Navigate to the backend directory
cd parcel-service

# Run the Spring Boot application
./mvnw spring-boot:run # or use mvnw.cmd spring-boot:run
```

The backend will be running on http://localhost:8080.
2. Run the Frontend Application
# In a new terminal, navigate to the frontend directory
```bash
cd frontend
```
# Install dependencies
```bash
npm install
```
# Start the development server
```bash
npm start
```
The frontend will be running on http://localhost:3000.
# API Endpoints
A full collection of API endpoints is available in the resources/ folder. You can import postman_collection.json into Postman to test the API.
POST /api/parcels - Create a new parcel.
GET /api/parcels - Get a list of all parcels.
GET /api/parcels/{trackingId} - Get a specific parcel by its tracking ID.
