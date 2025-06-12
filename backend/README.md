# TechEazy Parcel Service API (Backend)

This is the backend for the TechEazy Order Management System, a comprehensive project built with Java and Spring Boot. It provides a secure, role-based RESTful API for managing parcels, delivery orders, and vendors.

## Features

- **JWT-Based Authentication:** Secure login/registration system for vendors and admins.
- **Role-Based Access Control (RBAC):**
  - **ADMIN:** Full control over all parcels (Create, Read, Update, Delete) and can view all delivery orders.
  - **VENDOR:** Can upload delivery order files and view their own orders.
  - **Public:** Unauthenticated users can track parcels using a tracking ID.
- **Delivery Order Management:** Vendors can upload files containing parcel data for a specific delivery date.
- **Parcel Management:** Admins have full CRUD capabilities for all parcels in the system.
- **In-Memory Database:** Uses H2 for easy setup and development, with a web console for debugging.
- **File Storage:** Handles file uploads and stores them locally.

## Tech Stack

- **Java 17**
- **Spring Boot 3.x**
- **Spring Security** (for Authentication & Authorization with JWT)
- **Spring Data JPA** (for database interaction)
- **H2 In-Memory Database**
- **Lombok**
- **Maven** (for dependency management and build)

## Prerequisites

- Java Development Kit (JDK) 17 or higher.
- Apache Maven (usually comes with IDEs like IntelliJ or can be installed separately).
- An IDE like IntelliJ IDEA or VS Code.
- [Postman](https://www.postman.com/downloads/) for testing the API endpoints.

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd parcel-service
    ```
3.  The project uses the Maven Wrapper, so you don't need to install Maven separately. All dependencies will be downloaded automatically when you run the application for the first time.

## Running the Application

You can run the application using your IDE by running the `ParcelServiceApplication.java` file, or from the command line:

```bash
# On Windows
mvnw.cmd spring-boot:run

# On Mac/Linux
./mvnw spring-boot:run
```

The backend server will start on http://localhost:8080.
# API Endpoints
A Postman collection (postman_collection.json) is included for easy testing of all endpoints.
## Public Endpoints
POST /api/auth/register: Register a new VENDOR.
POST /api/auth/login: Login as ADMIN or VENDOR to get a JWT.
GET /api/public/parcels/{trackingId}: Track a parcel by its tracking number.
## VENDOR Role Endpoints
POST /api/delivery-orders/upload: Upload a delivery order file (requires Bearer Token).
GET /api/delivery-orders: Get a paginated list of the logged-in vendor's orders (requires Bearer Token).
## ADMIN Role Endpoints
GET /api/delivery-orders: Get a paginated list of all delivery orders (requires Bearer Token).
GET /api/parcels: Get a list of all parcels.
POST /api/parcels: Create a new parcel.
GET /api/parcels/{id}: Get a parcel by its numeric ID.
PUT /api/parcels/{id}: Update a parcel by its numeric ID.
DELETE /api/parcels/{id}: Delete a parcel by its numeric ID.
## Database Access (H2 Console)
For development, you can access the H2 in-memory database console to view the tables and data.
Make sure the application is running.
Open your browser and navigate to http://localhost:8080/h2-console.
Use the following settings to connect:
Driver Class: org.h2.Driver
JDBC URL: jdbc:h2:mem:testdb
User Name: sa
Password: (leave empty)
Click Connect. You can now run SQL queries against the database.
