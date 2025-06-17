# TechEazy Parcel Service UI (Frontend)

This is the React-based user interface for the TechEazy Order Management System. It provides a user-friendly way for Admins, Vendors, and the Public to interact with the backend API.

## Features

- **Secure Login/Logout:** JWT-based authentication flow with token storage in `localStorage`.
- **Role-Aware Interface:** The UI dynamically changes based on the user's role (ADMIN, VENDOR, or unauthenticated).
- **Protected Routes:** Pages are protected, ensuring only authorized users can access them.
- **Admin Dashboard:**
  - View all delivery orders from all vendors.
  - Full CRUD (Create, Read, Update, Delete) functionality for managing parcels.
- **Vendor Dashboard:**
  - Upload new delivery order files.
  - View a list of their own past delivery orders.
- **Public Parcel Tracking:** A dedicated page for anyone to track a parcel by its tracking number without needing to log in.

## Tech Stack

- **React 18**
- **React Router DOM** (for page navigation and routing)
- **Axios** (for making API calls to the backend)
- **React Context API** (for global authentication state management)
- **CSS** (for styling)

## Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm) version 16 or higher.
- A running instance of the [backend API](#) on `http://localhost:8080`.

## Installation & Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd parcel-service/frontend
    ```
2.  **Install dependencies:**
    This command will read the `package.json` file and download all the necessary libraries (like React, Axios, etc.) into a `node_modules` folder.
    ```bash
    npm install
    ```

## Running the Application

Once the dependencies are installed, you can start the local development server.

```bash
npm start
```
This will:
Start the React development server.
Automatically open the application in your default web browser at http://localhost:3000.
Hot-reload the application whenever you make changes to the code.
Available Scripts
In the project directory, you can run:
```bash
npm start: Runs the app in development mode.
npm test: Launches the test runner in interactive watch mode.
npm run build: Builds the app for production to the build folder.
npm run eject: A one-way operation. Do not run this unless you know what you are doing.
```
Environment Variables
The backend API URL is configured in src/services/api.js. For a production build, it is recommended to use an environment variable. You can create a .env file in the frontend root directory:
```bash
REACT_APP_API_BASE_URL=http://localhost:8080
```