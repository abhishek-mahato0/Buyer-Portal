# Property Management System (Buyer Portal)

A modern, full-stack Property Management web application designed with a premium aesthetic and robust features. Built using React, Express, and Prisma with MongoDB.

## 🚀 Features

- **Property Listings**: Explore properties with advanced filtering (Price, Location, Rooms, Country, City).
- **Infinite Scroll**: Seamlessly browse properties without manual pagination.
- **Favorites System**: Save your favorite properties for quick access, with real-time synchronization between the dashboard and favorites page.
- **Authentication**: Secure multi-token system (short-lived Access Tokens, long-lived Refresh Tokens) with automatic token rotation.
- **Modern UI**: Built with Atomic Design principles, custom CSS (FlashCSS), and a focus on premium user experience.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios, React Router, FlashCSS (my own css utility framework).
- **Backend**: Node.js, Express, Prisma, JWT, MongoDB, schema-validex (my own schema validation library).
- **Database**: MongoDB Atlas.

## 📋 Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB instance)

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd property-management
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   PORT=3000
   JWT_ACCESS_SECRET="your-access-secret"
   JWT_REFRESH_SECRET="your-refresh-secret"
   ```
4. Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

The project follows a modular and scalable architecture:

- **Backend**: Controller-Service-Repository pattern.
- **Frontend**: Atomic Design (Atoms, Molecules, Organisms) for components, and page-based routing.

## 🔐 Authentication Flow

The system uses a state-of-the-art authentication mechanism:

1. **Login/Register**: Returns a short-lived Access Token and a long-lived Refresh Token.
2. **Access Token**: Sent in the `Authorization: Bearer` header for every request.
3. **Refresh Token**: Used to automatically issue a new Access Token via an Axios interceptor when the original expires (401 error), ensuring a continuous user session without re-login.

## 📄 License

This project is licensed under the ISC License.
