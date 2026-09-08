# BookWebStore - Version 2

BookWebStore is a full-stack online bookstore application. Version 2 is organized as three separate applications: a customer-facing React frontend, an admin React frontend, and an Express backend API.

## Features

- Customer registration and login
- Browse books and filter books by genre
- Add books to a shopping cart
- Checkout and Razorpay payment integration
- Order tracking page
- Admin registration and login
- Admin dashboard for adding and managing books
- JWT-based authentication with HTTP-only cookies
- Supabase database integration
- Redis connection for server-side caching and session-related data
- Light and dark theme state managed with Redux Toolkit

## Project Structure

```text
BookWebStore/
|-- backend/          Express API, authentication, books, cart, and admin routes
|-- user-frontend/    Customer storefront built with React and Vite
|-- admin-frontend/   Admin dashboard built with React and Vite
`-- README.md
```

## Technology Stack

### Frontend

- React 18
- Vite
- React Router
- Redux Toolkit and React Redux
- Tailwind CSS
- Styled Components
- Lucide React icons

### Backend

- Node.js
- Express 5
- Supabase
- Redis
- PostgreSQL client support
- JSON Web Tokens
- bcrypt
- cookie-parser and CORS

## Prerequisites

- Node.js 18 or newer
- npm
- A Supabase project
- A Redis instance
- Razorpay credentials for payment checkout

## Installation

Clone the repository and install dependencies in each application:

```bash
git clone <repository-url>
cd BookWebStore

cd backend
npm install

cd ../user-frontend
npm install

cd ../admin-frontend
npm install
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=replace_with_a_long_random_secret
REDIS_URL=redis://localhost:6379
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Create `.env` files in both `user-frontend/` and `admin-frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Add the Razorpay key to `user-frontend/.env`:

```env
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

Never commit `.env` files or expose the Supabase service-role key in either frontend.

## Running The Project

Open three terminals from the project root.

### 1. Start the backend

```bash
cd backend
npm start
```

The API runs at `http://localhost:5000` by default.

### 2. Start the user frontend

```bash
cd user-frontend
npm run dev
```

Vite normally serves the customer application at `http://localhost:5173`.

### 3. Start the admin frontend

```bash
cd admin-frontend
npm run dev
```

Vite normally serves the admin application at `http://localhost:5174` when the user frontend is already using port 5173.

## Available Scripts

Both frontend applications provide:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

The backend provides:

```bash
npm start         # Start the API with Nodemon
```

## Production Notes

- Set `NODE_ENV=production` before deploying the backend.
- Use a strong, unique `JWT_SECRET`.
- Configure the production frontend URLs in the backend CORS settings.
- Store all secrets in the deployment platform's environment configuration.
- Build each frontend with `npm run build` and serve the generated `dist/` directory.

## Version 2

This README documents the Version 2 structure of BookWebStore, including the separated user and admin applications, the Express API, authentication, cart and checkout flow, and the Supabase and Redis integrations.
