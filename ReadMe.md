# RentMinderV2

RentMinderV2 is a property management application designed to help landlords manage their properties, tenants, leases, and maintenance requests efficiently.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Client](#client)
- [Contributing](#contributing)
- [License](#license)

## Features

- Manage properties, tenants, leases, and maintenance requests
- User authentication with Firebase
- RESTful API built with ASP.NET Core
- Frontend built with React and Vite
- Responsive design with Tailwind CSS

## Installation

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [PostgreSQL](https://www.postgresql.org/)

### Backend (API)

1. Navigate to the `API` directory:
   ```sh
   cd API
   ```
2. Restore the .NET dependencies:
   ```sh
   dotnet restore
   ```
3. Update the database connection string in appsettings.Development.json to match your PostgreSQL setup.
4. Apply database migrations:
   ```sh
   dotnet ef database update
   ```
5. Run the API:
   ```sh
   dotnet run
   ```

### Frontend (Client)

1. Navigate to the Client directory:
   ```sh
   cd Client
   ```
2. Install the Node.js dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```


## Usage
### Backend
The backend API will be available at http://localhost:5000 (HTTP) or https://localhost:7123 (HTTPS). You can access the Swagger UI for API documentation at http://localhost:5000/swagger.

### Frontend
The frontend application will be available at http://localhost:3000.

   
