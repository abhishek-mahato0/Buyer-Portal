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

- **Backend**: Controller-Service-Repository pattern for clear separation of concerns.
- **Frontend**: Atomic Design (Atoms, Molecules, Organisms) for highly reusable UI components.

## ⚡ Caching & State Management (Custom `useQuery`)

To avoid heavy dependencies like TanStack Query, this project features a custom-built lightweight state management and caching system:

- **`useQuery` Hook**: A powerful custom hook that handles data fetching, loading states, error handling, and component synchronization.
- **`queryClient`**: A centralized cache that stores query results. It uses a subscriber pattern (Observable) to notify all components using the same data whenever a query is invalidated or updated.
- **Stale-While-Revalidate**: Supports `staleTime` and `cacheTime` to optimize network requests and provide a snappy UI experience.
- **Optimistic Updates**: Favoriting properties uses optimistic updates to instantly reflect changes in the UI before the server responds.

## 🔐 Authentication Flow (Multi-Token Strategy)

The system implements a secure, professional-grade authentication mechanism:

1. **Short-lived Access Token**: Valid for **15 minutes**. Sent in the `Authorization: Bearer` header for every request to minimize the window for token misuse.
2. **Long-lived Refresh Token**: Valid for **7 days**. Stored securely and used to obtain new access tokens.
3. **Token Rotation**: Every time a refresh token is used, a new pair (Access + Refresh) is generated, invalidating the old refresh token to prevent replay attacks.
4. **Axios Interceptor**: A smart frontend interceptor that automatically catches `401 TOKEN_EXPIRED` errors, requests a new access token, and retries the original failed request seamlessly without the user noticing.

## 📄 License

This project is licensed under the ISC License.
