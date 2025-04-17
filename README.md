# Full-Stack CRUD Application

A complete web application with React frontend, Express backend, and PostgreSQL database.

## Features

- User authentication with JWT
- CRUD operations for items
- Protected routes
- RESTful API

## Project Structure

- `/frontend` - React.js application
- `/backend` - Express.js server
- Database - PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/crud_app
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
3. Configuration de la base de données
   Nous avons configuré PostgreSQL et créé la base de données crud_app avec les tables nécessaires.

-- Create users table 
```
CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
```

-- Create items table 
```
CREATE TABLE IF NOT EXISTS items ( id SERIAL PRIMARY KEY, title VARCHAR(100) NOT NULL, description TEXT, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
```

## API Endpoints

- Authentication:
  - POST `/api/auth/register` - Register a new user
  - POST `/api/auth/login` - Login a user

- Items (Protected):
  - GET `/api/items` - Get all items
  - GET `/api/items/:id` - Get a specific item
  - POST `/api/items` - Create a new item
  - PUT `/api/items/:id` - Update an item
  - DELETE `/api/items/:id` - Delete an item
