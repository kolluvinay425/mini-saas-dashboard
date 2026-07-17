# Mini SaaS Dashboard

A full-stack SaaS project management dashboard built with **React, Node.js, Express, PostgreSQL, and Docker**.

The application allows users to create an account, authenticate using JWT, and manage projects through a responsive dashboard interface.

---

# Features

## Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Logout functionality
- Password hashing with bcrypt

---

## Project Management

- Create projects
- Update projects
- Delete projects
- View projects
- Search projects
- Filter projects by status

---

## Dashboard

- Total projects statistics
- Active projects count
- On-hold projects count
- Total budget calculation

---

## User Experience

- Responsive UI
- Form validation
- Error notifications
- Success notifications
- Loading states
- Delete confirmation modal

---

# Tech Stack

## Frontend

- React
- React Router
- Axios
- React Hook Form
- Tailwind CSS
- React Icons

---

## Backend

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---

## DevOps

- Docker
- Docker Compose

⸻

## Project Structure

```text
mini-saas-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── routes/
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── docker-compose.yml
└── README.md
```

⸻

# Running the Application with Docker

## Requirements

Install:

- Docker
- Docker Compose

No need to install:

- Node.js
- npm
- PostgreSQL

Docker will run all services.

---

## Environment Configuration

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=saas_dashboard
DB_USER=admin
DB_PASSWORD=password
JWT_SECRET=my_super_secret_key
FRONTEND_URL=http://localhost:3000
```

Create:

```text
frontend/.env
```

Add:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Start Application

From the project root:

```bash
docker compose up --build
```

Docker starts:

| Service             | Container          | Port |
| ------------------- | ------------------ | ---- |
| React Frontend      | mini-saas-frontend | 3000 |
| Express Backend     | mini-saas-backend  | 5000 |
| PostgreSQL Database | mini-saas-postgres | 5433 |

---

## Database Seeding

After starting the containers, run the seed command:

```bash
docker exec -it mini-saas-backend npm run seed
```

This will add sample project data.

---

## Access Application

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

Database:

```text
localhost:5433
```

---

## Stop Application

Stop containers:

```bash
docker compose down
```

---

## Reset Database

Remove containers and database data:

```bash
docker compose down -v
```

Start again:

```bash
docker compose up --build
```

⸻

# Application Architecture

```text
                 Browser
                    |
                    |
          React Frontend Container
               Port 3000
                    |
                    |
          Express Backend Container
               Port 5000
                    |
                    |
        PostgreSQL Database Container
               Port 5432
```

Docker Compose creates a private network between services.

The backend connects to PostgreSQL using:

```env
DB_HOST=postgres
```

Containers communicate using service names instead of `localhost`.

---

# Authentication Flow

1. User registers an account.
2. Password is hashed using bcrypt.
3. User logs in with email and password.
4. Backend validates credentials.
5. Backend generates a JWT token.
6. Frontend stores the token and user information in local storage.
7. Protected API requests include:

```http
Authorization: Bearer <token>
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "password"
}
```

---

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

Response:

```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com"
  }
}
```

---

# Project API

All project routes require JWT authentication.

Header:

```http
Authorization: Bearer TOKEN
```

---

## Get Projects

```http
GET /api/projects
```

---

## Create Project

```http
POST /api/projects
```

Example:

```json
{
  "name": "Website Redesign",
  "description": "New company website",
  "status": "ACTIVE",
  "budget": 5000
}
```

---

## Update Project

```http
PUT /api/projects/:id
```

---

## Delete Project

```http
DELETE /api/projects/:id
```

---

# Useful Docker Commands

View running containers:

```bash
docker ps
```

View backend logs:

```bash
docker compose logs backend
```

View all logs:

```bash
docker compose logs
```

Rebuild images:

```bash
docker compose build
```

Restart services:

```bash
docker compose restart
```

---

# Development Workflow

Start the complete application:

```bash
docker compose up --build
```

This starts:

- React frontend
- Express backend
- PostgreSQL database

No local Node.js or PostgreSQL installation is required when using Docker.

---

# Running Without Docker

If you prefer running the application locally, install the required dependencies first.

## Requirements

Install:

- Node.js v18 or higher  
  (Project developed using Node.js v20.18.3)

- npm

- PostgreSQL v16 or higher  
  (Project tested with PostgreSQL v17.5)

---

# Database Setup

1. Start PostgreSQL locally.

2. Create database:

```sql
CREATE DATABASE saas_dashboard;
```

3. Create database user:

```sql
CREATE USER admin WITH PASSWORD 'password';
```

4. Grant permissions:

```sql
GRANT ALL PRIVILEGES ON DATABASE saas_dashboard TO admin;
```

---

# Backend Setup

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
touch .env
```

Add:

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=saas_dashboard
DB_USER=admin
DB_PASSWORD=password
JWT_SECRET=my_super_secret_key
FRONTEND_URL=http://localhost:3000
```

Start backend:

```bash
npm run server
```

Backend will run on:

```text
http://localhost:5000
```

## Database Seeding

The project includes a seed script to add sample project data.

Run:

```bash
cd backend
npm run seed
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
touch .env
```

Add:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm start
```

Frontend will run on:

```text
http://localhost:3000
```
